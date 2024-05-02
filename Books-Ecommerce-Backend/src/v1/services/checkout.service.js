"use strict";

const { DISCOUNT_APPLY_TO } = require("../const/discount");
const { ORDER_STATUS, ORDER_DETAIL_STATUS } = require("../const/order");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const db = require("../models/sequelize/models");
const { calTotalPriceCart } = require("../utils/calculateTotalPrice");
const CartService = require("./cart.service");
const DiscountService = require("./discount.service");
const PaymentService = require("./payment");
const { acquireLock, releaselock } = require("./redis.service");
/*
    Key features: Cart Service
    - checkout cart review
    - checkout product review
    - place order (create order and add to order details)
*/

class CheckoutService {
  //rollbackOrder
  static async rollbackOrder({ orderId }) {
    const foundOrder = await db.order.findByPk(orderId);
    if (!foundOrder) throw new NotFoundError("Order not found");

    const orderBooks = await db.order_book.findAll({
      where: {
        ob_order_id: orderId,
      },
    });

    let result = [];
    for (let i = 0; i < orderBooks.length; i++) {
      const oneOrder = orderBooks[i];
      if (
        oneOrder.ob_status === ORDER_DETAIL_STATUS.CANCELLED ||
        oneOrder.ob_status === ORDER_DETAIL_STATUS.REFUNDED
      ) {
        //rollback inventory stock
        const foundBook = await db.book.findByPk(oneOrder.ob_book_id);
        if (foundBook) {
          const bookStock = await db.inventory.findOne({
            where: {
              inven_book_id: foundBook.dataValues.book_id,
            },
          });
          //update inventory
          if (bookStock) {
            await bookStock.set({
              inven_stock:
                bookStock.dataValues.inven_stock + oneOrder.ob_quantity,
            });
            await bookStock.save();
          }
          //update book status
          if (foundBook.dataValues.book_status === 0) {
            await foundBook.set({
              book_status: 1,
            });
            await foundBook.save();
          }
        }
        result.push({
          rollback_book_id: oneOrder.ob_book_id,
          rollback_quantity: oneOrder.ob_quantity,
        });
      }
    }

    return result;
  }

  //Create transaction
  static async createTransaction({ userId, sId, orderId, status, total }) {
    const foundUser = await db.user.findOne({
      where: {
        user_sid: userId,
      },
    });
    if (!foundUser) throw new NotFoundError("User not found");

    const foundTran = await db.transaction.findOne({
      where: {
        tran_sid: sId,
      },
    });
    if (foundTran) throw new BadRequestError("Create transaction failed");

    const foundOrder = await db.order.findByPk(orderId);
    if (!foundOrder) throw new NotFoundError("Order not found");

    const newTran = await db.transaction.create({
      tran_sid: sId,
      tran_order_id: orderId,
      tran_user_id: foundUser.dataValues.user_id,
      tran_status: status,
      tran_total: total,
    });

    if (!newTran) throw new BadRequestError("Create transaction failed");

    const { tran_sid, tran_order_id, tran_user_id, tran_status, tran_total } =
      newTran;
    return { tran_sid, tran_order_id, tran_user_id, tran_status, tran_total };
  }

  //Update order Status
  static async updateOrderStatus({ orderId, status }) {
    const foundOrder = await db.order.findByPk(orderId);
    if (!foundOrder) throw new NotFoundError("Order not found");

    //update order details
    if (status === ORDER_STATUS.CANCELLED || status === ORDER_STATUS.REFUNDED) {
      await db.order_book.update(
        {
          ob_status: status,
          update_time: new Date(),
        },
        {
          where: {
            ob_order_id: foundOrder.dataValues.order_id,
          },
        }
      );
    } else if (status === ORDER_STATUS.COMPLETED) {
      await db.order_book.update(
        {
          ob_status: ORDER_DETAIL_STATUS.DELIVERED,
          update_time: new Date(),
        },
        {
          where: {
            ob_order_id: foundOrder.dataValues.order_id,
          },
        }
      );
    }

    //update order
    await foundOrder.set({
      order_status: status,
      update_time: new Date(),
    });
    const result = await foundOrder.save();

    return result;
  }

  /*
    "book": {
      "bookId": 2,
      "quantity": 1,
      "price": 129600
    },
    "discount": {
      "discountId": 2,
      "discountCode": ""
    },
    "payment": {
      "method": "cod"
    },
  */
  //  Place order
  static async placeOrder({
    book = {},
    userId,
    discount = {},
    shipping = {},
    feeService = 0,
    payment = {},
    addressId = null,
    url = null,
  }) {
    //check data input
    if (Object.keys(payment) <= 0)
      throw new BadRequestError("Not found valid payment method");

    if (Object.keys(shipping).length <= 0 || !shipping.shippingCode)
      throw new BadRequestError("Not found valid shipping method");

    //find user
    const foundUser = await db.user.findOne({
      where: {
        user_sid: userId,
      },
    });
    if (!foundUser) throw new NotFoundError("User not found");

    // review order
    let reviewOrder = null;
    let type = "cart";
    if (Object.keys(book).length > 0) {
      type = "book";
      reviewOrder = await CheckoutService.checkoutProductReview({
        userId,
        book,
        discount,
        feeShip: shipping.feeShip,
        feeService,
      });
    } else {
      reviewOrder = await CheckoutService.checkoutCartReview({
        userId,
        discount,
        feeShip: shipping.feeShip,
        feeService,
      });
    }

    //lock and check quantity in inventory
    const acquireBooks = [];
    //checkout cart
    if (reviewOrder.cart_count_products > 0) {
      const { cart_data } = await CartService.getListCarts({ userId });
      for (let i = 0; i < cart_data.length; i++) {
        const key = await acquireLock(
          cart_data[i].cb_book_id,
          cart_data[i].cb_book_num
        );
        acquireBooks.push({
          key,
          bookId: cart_data[i].cb_book_id,
          quantity: cart_data[i].cb_book_num,
          totalPrice:
            cart_data[i].cb_book_num * cart_data[i].book.book_spe_price,
        });
      }
    }
    //checkout product
    else {
      const key = await acquireLock(
        reviewOrder.book.bookId,
        reviewOrder.book.bookQuantity
      );
      acquireBooks.push({
        key,
        bookId: reviewOrder.book.bookId,
        quantity: reviewOrder.book.bookQuantity,
        totalPrice: reviewOrder.book.bookPrice * reviewOrder.book.bookQuantity,
      });
    }

    //create a new order
    const order = await db.order.create({
      order_user_id: foundUser.dataValues.user_id,
      order_tracking_code: shipping.shippingCode,
      order_discounts: reviewOrder?.data_amount?.discountId
        ? [reviewOrder?.data_amount?.discountId]
        : [],
      order_payment: payment.method,
      order_num_books: reviewOrder.data_review.cart_count_products || 1,
      order_old_total: reviewOrder.data_review.oldTotal,
      order_spe_total: reviewOrder.data_review.reviewTotal,
      order_fee_service: reviewOrder.data_review.feeService,
      order_fee_shiping: reviewOrder.data_review.feeShip,
      order_discount_amount: reviewOrder?.data_amount?.amount,
    });
    if (!order) throw new BadRequestError("Create order failed");

    //create order details and release key lock
    for (let i = 0; i < acquireBooks.length; i++) {
      const newOrderDetail = await db.order_book.create({
        ob_order_id: order.dataValues.order_id,
        ob_book_id: acquireBooks[i].bookId,
        ob_quantity: acquireBooks[i].quantity,
        ob_total_price: acquireBooks[i].totalPrice,
      });

      if (!newOrderDetail) throw new BadRequestError("Create order failed!");

      //release lock
      await releaselock(acquireBooks[i].key);
    }

    //apply discount
    if (Object.keys(discount).length > 0) {
      const applyDiscount = await DiscountService.applyDiscount({
        userId,
        discountId: reviewOrder?.data_amount?.discountId,
        product: {
          productId: reviewOrder?.book?.bookId,
          quantity: reviewOrder?.book?.bookQuantity,
          price: reviewOrder?.book?.bookPrice,
        },
        order: {
          orderId: order.dataValues.order_id,
          price: order.dataValues.order_spe_total,
          feeShip: order.dataValues.order_fee_shiping,
          feeService: order.dataValues.order_fee_service,
        },
      });
      if (!applyDiscount) throw new BadRequestError("Discount was not applied");
    }

    //create payment method
    let paymentResult = null;
    if (payment.method === "vnpay") {
      paymentResult = await PaymentService.vnpay({
        orderId: order.dataValues.order_id,
        urlReturn: `${url || process.env.FRONTEND_BASE_URL}/order-detail/${
          order.dataValues.order_id
        }&type=${type}`,
        totalPrice: order.dataValues.order_spe_total,
        description: `Khach hang ${userId} thanh toan hoa don ${order.dataValues.order_id} bang hinh thuc ${payment.method}`,
      });
    } else if (payment.method === "paypal") {
      paymentResult = await PaymentService.paypal({
        urlReturn: `${url || process.env.FRONTEND_BASE_URL}/order-detail/${
          order.dataValues.order_id
        }&statusCode=00&price=${order.dataValues.order_spe_total}&type=${type}`,
        urlCancel: `${url || process.env.FRONTEND_BASE_URL}/order-detail/${
          order.dataValues.order_id
        }&statusCode=404&price=${
          order.dataValues.order_spe_total
        }&type=${type}`,
        totalPrice: order.dataValues.order_spe_total,
        description: `Khach hang ${userId} thanh toan hoa don ${order.dataValues.order_id} bang hinh thuc ${payment.method}`,
      });
    } else if (payment.method === "cod") {
      paymentResult = {
        method: payment.method,
        paymentUrl: `${url || process.env.FRONTEND_BASE_URL}/order-detail/${
          order.dataValues.order_id
        }&statusCode=102&price=${
          order.dataValues.order_spe_total
        }&tranId=cod-${new Date().getTime()}&type=${type}`,
      };
    } else {
      throw new NotFoundError("Payment method not found");
    }
    if (!paymentResult) throw new BadRequestError("Can not pay for this order");

    return {
      order_data: order,
      payment_data: paymentResult,
    };
  }

  //checkout cart review
  static async checkoutCartReview({
    userId,
    discount = {},
    feeShip = 0,
    feeService = 0,
  }) {
    //check user exists
    // const foundUserId = await db.user.findOne({
    //   where: {
    //     user_sid: userId,
    //   },
    // });
    // if (!foundUserId) throw new NotFoundError("User not found");

    //check cart
    const cart = await CartService.getListCarts({ userId });
    if (cart.cart_count_products <= 0)
      throw new NotFoundError("No Books in cart");

    if (cart.cart_count_products === 1) {
      return await CheckoutService.checkoutProductReview({
        userId,
        book: {
          bookId: cart.cart_data[0].cb_book_id,
          quantity: cart.cart_data[0].cb_book_num,
          price: cart.cart_data[0].book.book_spe_price,
        },
        discount,
        feeShip,
        feeService,
      });
    }

    let orderReview = {
      price: calTotalPriceCart(cart.cart_data),
      feeShip,
      feeService,
    };

    let amount = null;
    if (Object.keys(discount).length > 0) {
      amount = await DiscountService.getDiscountAmount({
        discountId: discount.discountId,
        discountCode: discount.discountCode,
        userId,
        order: orderReview,
      });
    }

    return {
      data_amount: amount,
      cart_count_products: cart.cart_count_products,
      data_review: {
        oldTotal:
          orderReview.price + orderReview.feeShip + orderReview.feeService,
        feeShip,
        feeService,
        reviewTotal: amount?.discountedPrice
          ? amount?.discountedPrice
          : orderReview.price + orderReview.feeShip + orderReview.feeService,
      },
    };
  }

  //checkout product review
  static async checkoutProductReview({
    userId,
    book = {},
    discount = {},
    feeShip = 0,
    feeService = 0,
  }) {
    //check data input
    if (Object.keys(book).length <= 0 || book.quantity <= 0)
      throw new BadRequestError("Input data is invalid");

    //check user exists
    const foundUserId = await db.user.findOne({
      where: {
        user_sid: userId,
      },
    });
    if (!foundUserId) throw new NotFoundError("User not found");

    //check book exists
    const foundBook = await db.book.findByPk(book.bookId);
    if (!foundBook) throw new NotFoundError("Book not found");
    if (
      foundBook.dataValues.book_status === 0 ||
      foundBook.dataValues.is_deleted === 1
    )
      throw new BadRequestError("Book is available");

    //check quantity in stock
    const foundInStock = await db.inventory.findByPk(book.bookId);
    if (foundInStock?.dataValues?.inven_stock < book.quantity)
      throw new BadRequestError("Quantity out of range in stock");

    //Create order review
    /*
        order{
          orderId,
          price,
          feeShip,
          feeService
        }
      */
    let orderReview = {
      price: foundBook.dataValues.book_spe_price * book.quantity,
      feeShip,
      feeService,
    };

    let amount = null;
    if (Object.keys(discount).length > 0) {
      amount = await DiscountService.getDiscountAmount({
        discountId: discount.discountId,
        discountCode: discount.discountCode,
        userId,
        product: {
          productId: foundBook.dataValues.book_id,
          quantity: book.quantity,
          price: foundBook.dataValues.book_spe_price,
        },
        order: orderReview,
      });
    }

    return {
      data_amount: amount,
      book: {
        bookId: foundBook.dataValues.book_id,
        bookPrice: foundBook.dataValues.book_spe_price,
        bookQuantity: book.quantity,
      },
      data_review: {
        oldTotal:
          orderReview.price + orderReview.feeShip + orderReview.feeService,
        feeShip,
        feeService,
        reviewTotal: amount?.discountedPrice
          ? amount.discountApplyTo === DISCOUNT_APPLY_TO.ALL
            ? amount?.discountedPrice
            : amount?.discountedPrice +
              orderReview.feeShip +
              orderReview.feeService
          : orderReview.price + orderReview.feeShip + orderReview.feeService,
      },
    };
  }
}

module.exports = CheckoutService;

"use strict";

const { DISCOUNT_APPLY_TO } = require("../const/discount");
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
  static async placeOrder({
    book = {},
    userId,
    discount = {},
    shipping = {},
    feeService = 0,
    payment = {},
    addressId = null,
  }) {
    //check data input
    if (Object.keys(payment) <= 0)
      throw new BadRequestError("Not found valid payment method");

    if (Object.keys(shipping).length <= 0 || !shipping.shippingCode)
      throw new BadRequestError("Not found valid shipping method");

    // review order
    let reviewOrder = null;
    if (Object.keys(book).length > 0) {
      console;
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
      order_user_id: userId,
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
        urlReturn: `${process.env.FRONTEND_BASE_URL}/order-detail/${order.dataValues.order_id}`,
        totalPrice: order.dataValues.order_spe_total,
        description: `Khach hang ${userId} thanh toan hoa don ${order.dataValues.order_id} bang hinh thuc ${payment.method}`,
      });
    } else if (payment.method === "paypal") {
      paymentResult = await PaymentService.paypal({
        urlReturn: `${process.env.FRONTEND_BASE_URL}/order-detail/${order.dataValues.order_id}&statusCode=00&price=${order.dataValues.order_spe_total}`,
        urlCancel: `${process.env.FRONTEND_BASE_URL}/order-detail/${order.dataValues.order_id}&statusCode=404&price=${order.dataValues.order_spe_total}`,
        totalPrice: order.dataValues.order_spe_total,
        description: `Khach hang ${userId} thanh toan hoa don ${order.dataValues.order_id} bang hinh thuc ${payment.method}`,
      });
    } else if (payment.method === "cod") {
      paymentResult = payment.method;
    } else {
      throw new NotFoundError("Payment method not found");
    }
    if (!paymentResult) throw new BadRequestError("Can not pay for this order");

    return {
      order_data: order,
      payment_data: paymentResult,
    };
  }

  static async checkoutCartReview({
    userId,
    discount = {},
    feeShip = 0,
    feeService = 0,
  }) {
    //check user exists
    const foundUserId = await db.user.findByPk(userId);
    if (!foundUserId) throw new NotFoundError("User not found");

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
    const foundUserId = await db.user.findByPk(userId);
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
    const foundInStock = db.inventory.findByPk(book.bookId);
    if (foundInStock?.dataValues?.inven_stock < book.quantity)
      throw new BadRequestError("Book was sold out");

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

'use strict';

const { BadRequestError, NotFoundError } = require('../core/error.response');
const db = require('../models/sequelize/models')
/*
    Key features: Cart Service
    - add product to cart
    - reduce product quantity by one
    - increase product quantity by one
    - get list carts
    - delete cart by publisher id
    - delete cart item
*/


class CartService {
    
    static async getListCarts({userId}){
        const userCart = await db.cart.findOne({ where: { cart_userid: userId } });
        if(!userCart){
            throw new NotFoundError('User Cart not found');
        }
        const listCarts = await db.cart_book.findAll({
            where: { cb_cart_id: userCart.dataValues.cart_id },
            include: [
              {
                model: db.book,
                attributes: ['book_title', 'book_img', 'book_spe_price', 'book_old_price', 'book_publisherId']
              },
              {
                model: db.book_detail,
                attributes: ['book_authors_name', 'book_pulisherName', 'book_layout']
              }
            ],
            attributes: ['cb_book_id', 'cb_book_num']
          });

        return listCarts
    }

    static async deleteCartsByPublisherId({userId, publisherId}) {
        const userCart = await db.cart.findOne({ where: { cart_userid: userId } });
        if(!userCart){
            throw new NotFoundError('User Cart not found');
        }

        const deletedCount = await db.cart_book.destroy({
            where: {
                cb_book_id: db.sequelize.literal(`cb_book_id IN (SELECT book_id FROM book WHERE book_publisherId = ${publisherId})`),
                cb_cart_id: userCart.dataValues.cart_id
            }
        });

        if(deletedCount === 0) throw new NotFoundError('No books were found');

        await userCart.set({ cart_count_products: userCart.dataValues.cart_count_products -  deletedCount});
        return await userCart.save();
    }

    static async createUserCart(userId){
       return await db.cart.create({cart_userid: userId});
    }

    static async addToCart({userId, book={}}){
    
        //check cart existed
        let userCart = await db.cart.findOne({ where: { cart_userid: userId } });
        if(!userCart) {
            //Create new cart
            userCart = await CartService.createUserCart(userId)
            if(!userCart){
                throw new BadRequestError("Create Cart Failed!");
            }
        }

        // check book existed
        const existBook = await db.cart_book.findOne({
            where: {
                cb_cart_id: userCart.dataValues.cart_id,
                cb_book_id: book.book_id,
            }
        })
        

        if(!existBook){
            //check vaild param
            if(book.quantity <= 0) throw new BadRequestError('Request data is not valid');

            //Create card book
            const newCartBook = await db.cart_book.create({
                cb_cart_id: userCart.dataValues.cart_id,
                cb_book_id: book.book_id,
                cb_book_num: book.quantity
            })
            //update cart_count_products in cart
            if(newCartBook){
                await userCart.set({ cart_count_products: userCart.dataValues.cart_count_products + 1 });
                await userCart.save();
                return { 
                    cart_count_products: userCart.dataValues.cart_count_products,
                    cart_data: await CartService.getListCarts({userId})
                }
            }
            else{
                throw new BadRequestError('Add To Cart Failed!')
            }
        }
        else{
            //remove book from cart
            if(book.quantity === 0){
                const removeBook = await db.cart_book.destroy({
                    where: {
                        cb_cart_id: existBook.dataValues.cb_cart_id,
                        cb_book_id: existBook.dataValues.cb_book_id
                    },
                  })
                if(removeBook !== 1){
                    BadRequestError('Remove Book From Cart Failed!')
                }
                await userCart.set({ cart_count_products: userCart.dataValues.cart_count_products - 1 });
                await userCart.save();
                return { 
                    cart_count_products: userCart.dataValues.cart_count_products,
                    cart_data: await CartService.getListCarts({userId})
                }
            }

            //add book to cart
            await existBook.set({cb_book_num: book.quantity});
            return  await existBook.save();
        }
    }
}

module.exports = CartService
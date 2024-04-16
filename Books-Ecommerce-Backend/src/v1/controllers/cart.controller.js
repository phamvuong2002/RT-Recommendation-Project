"use strict";

const { SuccessResponse } = require("../core/success.response");
const CartService = require("../services/cart.service");

class CartController {
  
  addToCart = async (req, res, next) =>{
    const data = await CartService.addToCart(req.body);
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }

  deleteCartsByPublisherId = async (req, res, next) =>{
    const data = await CartService.deleteCartsByPublisherId(req.body);
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }

  getListCarts = async (req, res, next) =>{
    const data = await CartService.getListCarts(req.body);
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }
}

module.exports = new CartController();

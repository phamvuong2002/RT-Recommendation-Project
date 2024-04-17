'use strict';

const { DISCOUNT_WALLET_STATUS } = require("../const/discount");
const { NotFoundError, BadRequestError } = require("../core/error.response");

const checkDiscountCode = (model) => {
    //check discount exists
    if(!model) throw new NotFoundError('Discount not found!');

    //check discount is available
    if(!model.dataValues.discount_is_active)
    throw new BadRequestError('Discount is not available');

    if(!model.dataValues.discount_count_used >= model.dataValues.discount_max_uses)
    throw new BadRequestError('Discount usage limit has been reached');

    //Check outdated
    if(model.discount_end_date < new Date())
    throw new BadRequestError('Discount is expired');

    return model
}

const checkAndupdateDiscountWallet = async (model, wallet) => {
    //check discount exists
    let message = null;
    if(!model) throw new NotFoundError('Discount not found!');

    //check discount is available
    if(!model.dataValues.discount_is_active)
        message = 'Discount is not available';

    else if(!model.dataValues.discount_count_used >= model.dataValues.discount_max_uses)
        message = 'Discount usage limit has been reached';

    //Check outdated
    else if(model.discount_end_date < new Date())
        message = 'Discount is expired';

    else{
        return model
    }

    await wallet.set({
        dw_discount_status: DISCOUNT_WALLET_STATUS.INACTIVE,
        update_time: new Date()
    });

    await wallet.save();

    throw new BadRequestError(message);
}

module.exports = {
    checkDiscountCode,
    checkAndupdateDiscountWallet
}
//This function for testing
import { formatNumberToText } from "./formatNumberToText";

const calculateDiscount = (total, percent, price, max_discount) => {
    let final_discount = Math.max(total * percent, price);
    final_discount = Math.min(final_discount, max_discount)
    return final_discount
}

export const checkCouponCode = (inputCouponCode, couponList, total) => {
    const foundCoupon = couponList.find(coupon => coupon.couponCode === inputCouponCode);

    if (foundCoupon) {
        if (foundCoupon.isAvailable) {
            if (total >= foundCoupon.min_condition) {
                const currentDate = new Date();
                const expiredDate = new Date(foundCoupon.expiredDate);
                if (currentDate <= expiredDate) {
                    return {
                        valid: true,
                        final_discount: calculateDiscount(total, foundCoupon.discount_percent, foundCoupon.discount_price, foundCoupon.max_discount),
                        currency: foundCoupon.currency,
                    };
                } else {
                    return { valid: false, message: 'Mã giảm giá đã hết hạn' };
                }
            }
            else {
                return { valid: false, message: `Bạn cần mua thêm ${formatNumberToText(foundCoupon.max_discount - total)} ${foundCoupon.currency} để được áp dụng mã giảm giá!` };
            }
        } else {
            return { valid: false, message: 'Mã giảm giá không khả dụng' };
        }
    } else {
        return { valid: false, message: 'Mã giảm giá không hợp lệ' };
    }
};
import React from 'react'
import NavigationPath from '../components/NavigationPath'
import { Payment } from '../components/PaymentComponent'

export const PaymentPage = () => {
    const paths = [
        { path: '/', label: 'Trang Chủ' },
        { path: `/${'shoppingcarts'}`, label: `${'Giỏ hàng'}` },
        { path: `/${'payment'}`, label: `${'Thanh Toán'}` },
    ]

    return (
        <div className='flex flex-col'>
            <NavigationPath components={paths} />
            <div className="bg-gray-100 flex flex-col xl:px-28 gap-[0.2rem]">
                <div className="pb-2">
                    <Payment />
                </div>
            </div>
        </div>
    )
}

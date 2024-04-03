import React from 'react'
import { ShoppingCarts } from '../components/ShoppingCarts'
import NavigationPath from '../components/NavigationPath'

export const ShoppingCartsPage = () => {
    const paths = [
        { path: '/', label: 'Trang Chủ' },
        { path: `/${'shoppingcarts'}`, label: `${'Giỏ hàng'}` }
    ]
    return (
        <div>
            <NavigationPath components={paths} />
            <div className="bg-gray-100 flex flex-col gap-[0.2rem]">
                <ShoppingCarts />
            </div>
        </div>
    )
}

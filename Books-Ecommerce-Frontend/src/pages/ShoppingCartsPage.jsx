import React from 'react'
import NavigationPath from '../components/NavigationPath'
import { ShoppingCarts } from '../components/ShoppingCarts'

export const ShoppingCartsPage = () => {
    const paths = [
        { path: '/', label: 'Trang Chủ' },
        { path: `/${'shoppingcarts'}`, label: `${'Giỏ hàng'}` }
    ]
    return (
        <div>
            <NavigationPath components={paths} />
            <div className="bg-gray-100 xl:px-28 flex flex-col gap-[0.2rem]">
                <ShoppingCarts />
            </div>
        </div>
    )
}

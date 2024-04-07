import { React, useState } from 'react'
import NavigationPath from '../components/NavigationPath'
import SideBarNav from '../components/SideBarNav'
import ProductListStatus from '../components/ProductListStatus'
import { GeneralInfo } from '../components/GeneralInfo'
import { OrderInfo } from '../components/OrderInfo'


export const AccountPage = () => {
    const [selectedPage, setSelectedPage] = useState('Tổng quan')
    const paths = [
        { path: '/', label: 'Trang Chủ' },
        { path: `/${'account'}`, label: `${'Tài khoản'}` }
    ]
    return (
        <div>
            <NavigationPath components={paths} />
            <div className='grid-cols-1 sm:flex sm:align-top h-lvh w-full justify-between lg:justify-evenly overflow-hidden pt-4'>
                <SideBarNav setSelectedPage={setSelectedPage} />
                {
                    selectedPage == 'Tổng quan' ? <GeneralInfo />
                        : selectedPage == 'Thông tin tài khoản' ? ""
                            : selectedPage == 'Thông tin đơn hàng' ? <OrderInfo />
                                : selectedPage == 'Theo dõi sách' ? <ProductListStatus /> : ""
                }

            </div>

        </div>
    )
}

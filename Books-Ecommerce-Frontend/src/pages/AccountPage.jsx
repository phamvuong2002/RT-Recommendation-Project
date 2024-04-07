import { React, useEffect, useState } from 'react'
import NavigationPath from '../components/NavigationPath'
import SideBarNav from '../components/SideBarNav'
import ProductListStatus from '../components/ProductListStatus'
import { GeneralInfo } from '../components/GeneralInfo'
import { useParams } from 'react-router-dom'

const TAB = {
    "general-infomation": "Tổng Quan",
    "profile-infomation": "Thông Tin Tài Khoản",
    "orders-infomation": "Thông Tin Đơn Hàng",
    "following-infomation": "Theo Dõi Sách"
}

export const AccountPage = () => {
    const [selectedPage, setSelectedPage] = useState(TAB["general-infomation"])
    const [selectedPageId, setSelectedPageId] = useState("general-infomation")
    const [paths, setPaths] = useState([])
    // const paths = [
    //     { path: '/', label: 'Trang Chủ' },
    //     { path: `/${'account'}`, label: `${'Tài khoản'}` },
    //     { path: `/${'account'}/${selectedPageId}`, label: `${selectedPage}` },
    // ]

    const { tab } = useParams();

    useEffect(() => {
        if (!tab) {
            return
        } else {
            setSelectedPageId(tab)
            setSelectedPage(TAB[tab])
        }
    }, [])

    useEffect(() => {
        setPaths([
            { path: '/', label: 'Trang Chủ' },
            { path: `/${'account'}`, label: `${'Tài khoản'}` },
            { path: `/${'account'}/${selectedPageId}`, label: `${TAB[selectedPageId]}` },
        ])
        setSelectedPage(TAB[selectedPageId])
    }, [selectedPageId])


    useEffect(() => {
        console.log(selectedPage, TAB[selectedPageId])
    }, [selectedPageId])

    return (
        <div>
            <NavigationPath components={paths} />
            <div className='grid-cols-1 sm:flex sm:align-top h-lvh w-full justify-between lg:justify-evenly overflow-hidden pt-4'>
                <SideBarNav setSelectedPage={setSelectedPage} setSelectedPageId={setSelectedPageId} />
                {
                    // selectedPage === TAB[selectedPageId] ? <GeneralInfo />
                    //     : selectedPage === TAB[selectedPageId] ? ""
                    //         : selectedPage === TAB[selectedPageId] ? ""
                    //             : selectedPage === TAB[selectedPageId] ? <ProductListStatus /> : ""
                    selectedPageId === 'general-infomation' && <GeneralInfo />
                }
                {
                    selectedPageId === 'profile-infomation' && <div></div>
                }
                {
                    selectedPageId === 'orders-infomation' && <div></div>
                }
                {
                    selectedPageId === 'following-infomation' && <ProductListStatus />
                }
            </div>

        </div>
    )
}

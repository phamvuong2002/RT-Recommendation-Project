import React, { useEffect, useRef, useState } from 'react'
import { isMobileDevice } from '../utils/isMobileDevice';
import Bills from './Bills';
import { ShoppingCartLoader } from './loaders/ShoppingCartLoader';

import { fetchData } from '../helpers/fetch';
import { Link } from 'react-router-dom';

export const OrderInfo = () => {

    const [activeTab, setActiveTab] = useState(1)
    const containerRef = useRef(null)

    const [bills, setBills] = useState([]);
    const [reloadBill, setReloadBill] = useState(false);

    //Fetch Shopping Carts
    useEffect(() => {
        const url = '../data/test/bills.json';
        const BillsData = async () => {
            try {
                const billsData = await fetchData(url);
                setBills(billsData)
            } catch (error) {
                // throw error;
            }
        }
        //ví dụ tải các sản phẩm trong giỏ hàng của khách
        setTimeout(() => {
            BillsData()
            setReloadBill(false)
        }, 1000)

    }, [reloadBill])

    const handleSetActiveTab = (tabID) => {
        setActiveTab(tabID);
    };

    const convertToNumber = {
        "All": 0,
        "PendingConfirmation": 1,
        "PendingDelivery": 2,
        "Delivered": 3,
        "Cancelled": 4,
        "Refunded": 5,
    }

    const handleSetScrollTab = (tabID) => {
        const element = containerRef.current.children[convertToNumber[tabID]]
        element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        console.log('a', element.getBoundingClientRect())
    };

    const handleTabClick = (tabID) => {
        handleSetActiveTab(tabID);
        if (isMobileDevice())
            handleSetScrollTab(tabID);
    };


    const generateTabClassName = (isActive) => {
        const notActiveClassName = "flex flex-[1] justify-center items-center py-2 md:py-4 text-black";
        const activeClassName = "flex flex-[1] justify-center items-center py-2 md:py-4 text-[#fc4848] font-semibold border-b-2 border-b-red-400 text-center";

        if (isActive) {
            return `${activeClassName}`;
        } else {
            return `${notActiveClassName}`;
        }
    };

    return (
        <div className="bg-white xl:w-2/3 overflow-y-auto h-full flex flex-col">
            <div className=''>
                {/*Tabs*/}
                <ul ref={containerRef} className='overflow-x-auto md:overflow-hidden whitespace-nowrap snap-x snap-mandatory flex gap-4 md:gap-0 list-none text-[15px] md:text-[18px] overflow-hidden mb-3 sticky'>
                    <li onClick={() => handleTabClick(1)} className={generateTabClassName(activeTab === 1)}>Tất cả</li>
                    <li onClick={() => handleTabClick(2)} className={generateTabClassName(activeTab === 2)}>Chờ xác nhận</li>
                    <li onClick={() => handleTabClick(3)} className={generateTabClassName(activeTab === 3)}>Chờ giao hàng</li>
                    <li onClick={() => handleTabClick(4)} className={generateTabClassName(activeTab === 4)}>Đã giao</li>
                    <li onClick={() => handleTabClick(5)} className={generateTabClassName(activeTab === 5)}>Đã hủy</li>
                    <li onClick={() => handleTabClick(6)} className={generateTabClassName(activeTab === 6)}>Hoàn trả</li>
                </ul>


                {/*Content*/}
                <div className={activeTab === 1 ? "block m-2 h-full overflow-y-auto no-scrollbar" : "hidden"}>
                    {
                        reloadBill ? <ShoppingCartLoader items={5} /> :
                            !bills.length ?
                                <div className="flex flex-col gap-1 items-center justify-center text-gray-300">
                                    <img src="/img/empty-box.png" />
                                    Bạn chưa có đơn hàng nào gần đây
                                </div>
                                :
                                <Bills className='' bills={bills} setReload={setReloadBill} />
                    }

                </div>

                <div className={activeTab === 2 ? "block" : "hidden"}>

                    <h1>22</h1>
                </div>

                <div className={activeTab === 3 ? "block" : "hidden"}>

                    <h1>3333</h1>
                </div>

                <div className={activeTab === 4 ? "block" : "hidden"}>

                    <h1>444</h1>
                </div>

                <div className={activeTab === 5 ? "block" : "hidden"}>

                    <h1>55</h1>
                </div>


                <div className={activeTab === 6 ? "block" : "hidden"}>

                    <h1>666</h1>
                </div>

            </div>
        </div>
    );
}
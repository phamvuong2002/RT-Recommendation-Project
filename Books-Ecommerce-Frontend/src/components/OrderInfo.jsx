import React, { useEffect, useRef, useState } from 'react'
import { isMobileDevice } from '../utils/isMobileDevice';
import Bills from './Bills';
import { ShoppingCartLoader } from './loaders/ShoppingCartLoader';
import { SingleBill } from './SingleBill';
import { determineBillStatus } from '../helpers/detemindBillsStatus';

import { fetchData } from '../helpers/fetch';
import { Link } from 'react-router-dom';

export const OrderInfo = () => {
    const TOTALBILLSTATUS = {
        "Completed": { name: "Hoàn thành", bgColor: "bg-green-500", textColor: "bg-green-500" },
        "Shipping": { name: "Đang vận chuyển", bgColor: "bg-blue-500", textColor: "bg-blue-500" },
        "Refunded": { name: "Hoàn Trả", bgColor: "bg-red-200", textColor: "bg-red-200" },
        "Processing": { name: "Đang xử lý", bgColor: "bg-gray-500", textColor: "bg-gray-500" }
    }

    const [activeTab, setActiveTab] = useState('Completed')
    const containerRef = useRef(null)

    const [bills, setBills] = useState([]);
    const [reloadBill, setReloadBill] = useState(false);

    //Fetch Bills Data
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

    const groupBooksByBillId = (bills) => {
        const groupedBills = {};
        bills.forEach(bill => {
            const { billId, ...bookDetails } = bill;
            if (groupedBills[billId]) {
                groupedBills[billId].push(bookDetails);
            } else {
                groupedBills[billId] = [bookDetails];
            }
        });
        return groupedBills;
    }
    const groupedBills = groupBooksByBillId(bills);

    // Return Grouped Bills (check by Status) To Show At Correct Tab
    const checkGroupedBillsStaus = (groupedBills, activeTab) => {
        const jsxElements = Object.keys(groupedBills).reduce((accumulator, billID) => {
            const status = determineBillStatus(groupedBills[billID]);
            {/*return a JSX code in function by use push*/ }
            if (status === activeTab) {
                accumulator.push(
                    <div key={billID} className="">
                        <div className="flex items-center text-xs justify-between xl:text-base gap-3 xl:py-2 xl:h-8 xl:rounded-full h-7 w-full text-white px-1 font-semibold bg-red-500">
                            <div className="flex gap-1">
                                <div className="xl:pl-1"> Số hoá đơn #{billID}</div>
                                <div className="xl:pr-1">({groupedBills[billID].length} đơn hàng)</div>
                            </div>
                            <div className={`flex items-center bg-gray-400 rounded-full xl:text-sm xl:px-2 xl:items-center`}>  {/*${TOTALBILLSTATUS[status].bgColor} */}
                                <div className="flex items-center px-1 h-5 xl:h-5 xl:mb-[0.1rem]">
                                    {TOTALBILLSTATUS[status].name}
                                </div>
                            </div>
                        </div>
                        {/* Render Swiper here for each group of bills */}
                        {groupedBills[billID].map(bill => (
                            <SingleBill key={bill.detailBillId} bill={bill} setReload={setReloadBill} />
                        ))}
                    </div>
                );
            }
            return accumulator;
        }, []);

        // Kiểm tra nếu biến jsxElements rỗng thì trả về nội dung thích hợp
        if (jsxElements.length === 0) {
            return (
                <div className="flex flex-col gap-1 items-center justify-center text-gray-300">
                    <img src="/img/empty-box.png" />
                    Chưa có đơn hàng
                </div>
            );
        } else {
            // Nếu có phần tử trong jsxElements thì trả về chính các phần tử đó
            return jsxElements;
        }
    };


    const handleSetActiveTab = (tabID) => {
        setActiveTab(tabID);
    };

    const handleSetScrollTab = (tabID) => {
        const element = containerRef.current.children[tabID];
        element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    };

    const handleTabClick = (tabID) => {
        handleSetActiveTab(tabID);
        if (isMobileDevice) {
            handleSetScrollTab(tabID);
        }
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
                <ul ref={containerRef} className='overflow-x-auto md:overflow-hidden whitespace-nowrap snap-x snap-mandatory flex gap-4 md:gap-0 list-none text-[15px] md:text-[18px] overflow-hidden m-2'>
                    <li onClick={() => handleTabClick('All')} className={generateTabClassName(activeTab === 'All')}>Tất cả</li>
                    <li onClick={() => handleTabClick('Processing')} className={generateTabClassName(activeTab === 'Processing')}>Chờ xác nhận</li>
                    <li onClick={() => handleTabClick('Shipping')} className={generateTabClassName(activeTab === 'Shipping')}>Chờ giao hàng</li>
                    <li onClick={() => handleTabClick('Completed')} className={generateTabClassName(activeTab === 'Completed')}>Đã giao</li>
                    <li onClick={() => handleTabClick('Cancel')} className={generateTabClassName(activeTab === 'Cancel')}>Đã hủy</li>
                    <li onClick={() => handleTabClick('Refunded')} className={generateTabClassName(activeTab === 'Refunded')}>Hoàn trả</li>
                </ul>


                {/*Content*/}
                <div className="m-2">
                    <div className={activeTab === 'All' ? "block h-full overflow-y-auto no-scrollbar" : "hidden"}>
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

                    <div className={activeTab === 'Processing' ? "block" : "hidden"}>
                        {
                            checkGroupedBillsStaus(groupedBills, activeTab)
                        }
                    </div>

                    <div className={activeTab === 'Shipping' ? "block" : "hidden"}>
                        {
                            checkGroupedBillsStaus(groupedBills, activeTab)
                        }
                    </div>

                    <div className={activeTab === 'Completed' ? "block" : "hidden"}>
                        {
                            checkGroupedBillsStaus(groupedBills, activeTab)
                        }
                    </div>

                    <div className={activeTab === 'Cancel' ? "block" : "hidden"}>
                        {
                            checkGroupedBillsStaus(groupedBills, activeTab)
                        }
                    </div>


                    <div className={activeTab === 'Refunded' ? "block" : "hidden"}>
                        {
                            checkGroupedBillsStaus(groupedBills, activeTab)
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}
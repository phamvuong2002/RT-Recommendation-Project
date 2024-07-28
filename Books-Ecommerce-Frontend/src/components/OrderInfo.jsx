import React, { useEffect, useRef, useState, useContext } from 'react'
import { isMobileDevice } from '../utils/isMobileDevice';
import Bills from './Bills';
import { ShoppingCartLoader } from './loaders/ShoppingCartLoader';
import { SingleBill } from './SingleBill';
import { fetchAPI } from '../helpers/fetch';
import { getorders } from '../apis/order';
import { AppContext } from '../contexts/main';
import { Link } from 'react-router-dom';

export const OrderInfo = () => {
    const { userId } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('PendingConfirmation')
    const containerRef = useRef(null)

    const [bills, setBills] = useState([]);
    const [reloadBill, setReloadBill] = useState(false);

    //Fetch Bills Data
    useEffect(() => {
        const BillsData = async () => {
            setReloadBill(true)
            const billlData = await fetchAPI(`../${getorders}`, 'POST', {
                userId: userId,
                page: 1,
                limit: 10,
            });
            if (billlData.status === 200) {
                setBills(billlData.metadata);
            } else {
                setBills([]);
            }
            setReloadBill(false);
        };
        BillsData()
    }, [userId])


    // Return Grouped Bills (check by Status) To Show At Correct Tab
    const checkGroupedBillsStaus = (bills, activeTab) => {
        const groupBillByStatusAndID = bills.reduce((accumulator, bill) => {
            if (bill.status === activeTab) {
                const billId = bill.billId; //tại rảnh nên thích gán như vậy, 
                //mà nếu gán như vậy thì nó sẽ gọi 1 cái bill 1 lần thôi rồi chọn id ra, tối ưu hơn
                if (!accumulator[billId]) {
                    accumulator[billId] = []; // Tạo một mảng mới nếu chưa có số hóa đơn
                }
                accumulator[billId].push(bill); // Thêm đơn hàng vào mảng tương ứng với số hóa đơn
            }

            return accumulator;
        }, {});
        //console.log("BILLL", Object.keys(groupBillByStatusAndID))
        const renderedBills = Object.keys(groupBillByStatusAndID).map(billId => {
            return (
                <div key={billId}>
                    <div className="flex items-center text-xs justify-between xl:text-base gap-3 xl:py-2 xl:h-8 xl:rounded-full h-7 w-full text-white px-1 font-semibold bg-red-500">
                        <Link className="flex gap-1" to={`../order-detail/${billId}`}>
                            <div className="xl:pl-1" > Số hoá đơn #{billId}</div>
                            <div className="xl:pr-1">({groupBillByStatusAndID[billId].length} đơn hàng)</div>
                        </Link>
                    </div>
                    {/* Render Swiper here for each group of bills */}
                    {groupBillByStatusAndID[billId].map(bill => (
                        <SingleBill key={bill.billId} bill={bill} billId={billId} setReload={setReloadBill} />
                    ))}
                </div>
            );
        });

        if (groupBillByStatusAndID.length === 0) {
            return (
                <div className="flex flex-col gap-1 items-center justify-center text-gray-300">
                    <img src="/img/empty-box.png" />
                    Chưa có đơn hàng
                </div>
            );
        } else {
            return renderedBills;
        }
    };


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
            return `${activeClassName} + cursor-pointer`;
        } else {
            return `${notActiveClassName} + hover:bg-red-200 hover:text-red-500 cursor-pointer`;
        }
    };

    return (
        <div className="bg-white xl:w-2/3 overflow-y-auto no-scrollbar h-full flex flex-col">
            <div className=''>
                {/*Tabs*/}
                <ul ref={containerRef} className='overflow-x-auto md:overflow-hidden whitespace-nowrap snap-x snap-mandatory flex gap-4 md:gap-0 list-none text-[15px] md:text-[18px] overflow-hidden m-2'>
                    <li onClick={() => handleTabClick('All')} className={generateTabClassName(activeTab === 'All')}>Tất cả</li>
                    <li onClick={() => handleTabClick('PendingConfirmation')} className={generateTabClassName(activeTab === 'PendingConfirmation')}>Chờ xác nhận</li>
                    <li onClick={() => handleTabClick('PendingDelivery')} className={generateTabClassName(activeTab === 'PendingDelivery')}>Chờ giao hàng</li>
                    <li onClick={() => handleTabClick('Delivered')} className={generateTabClassName(activeTab === 'Delivered')}>Đã giao</li>
                    <li onClick={() => handleTabClick('Cancelled')} className={generateTabClassName(activeTab === 'Cancelled')}>Đã hủy</li>
                    <li onClick={() => handleTabClick('Refunded')} className={generateTabClassName(activeTab === 'Refunded')}>Hoàn trả</li>
                </ul>


                {/*Content*/}
                <div className="m-2">
                    {/*Tất cả đơn hàng*/}
                    <div className={activeTab === 'All' ? "block h-full overflow-y-auto" : "hidden"}>
                        {reloadBill ? (
                            <ShoppingCartLoader items={5} />
                        ) : !bills.length ? (
                            <div className="flex flex-col gap-1 items-center justify-center text-gray-300">
                                <img src="/img/empty-box.png" />
                                Bạn chưa có đơn hàng nào gần đây
                            </div>
                        ) : (
                            <Bills className='' bills={bills} setReload={setReloadBill} />)
                        }

                    </div>

                    {/*Đơn hàng chờ xác nhận*/}
                    <div className={activeTab === 'PendingConfirmation' ? "block" : "hidden"}>
                        {
                            checkGroupedBillsStaus(bills, activeTab)
                        }
                    </div>

                    {/*Đơn hàng chờ giao*/}
                    <div className={activeTab === 'PendingDelivery' ? "block" : "hidden"}>
                        {
                            checkGroupedBillsStaus(bills, activeTab)
                        }
                    </div>

                    {/*Đã giao*/}
                    <div className={activeTab === 'Delivered' ? "block" : "hidden"}>
                        {
                            checkGroupedBillsStaus(bills, activeTab)
                        }
                    </div>

                    {/*Đã hủy*/}
                    <div className={activeTab === 'Cancelled' ? "block" : "hidden"}>
                        {
                            checkGroupedBillsStaus(bills, activeTab)
                        }
                    </div>

                    {/*Hoàn trả*/}
                    <div className={activeTab === 'Refunded' ? "block" : "hidden"}>
                        {
                            checkGroupedBillsStaus(bills, activeTab)
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}
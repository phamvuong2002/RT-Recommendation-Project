import React, { useEffect, useState } from 'react'
import { maskPhone, maskEmail } from '../utils/hideSensitiveInfo'
import { fetchData } from '../helpers/fetch';
import Bills from './Bills';
import { ShoppingCartLoader } from './loaders/ShoppingCartLoader';
import { SelectAddressPopup } from '../helpers/SelectAddressPopup';

export const GeneralInfo = () => {
    const [bills, setBills] = useState([]);
    const [reload, setReload] = useState(false);
    const [addressDefault, setAddressDefault] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [isAddrPopupOpen, setIsAddrPopupOpen] = useState(false);

    const handleChangeAddress = async () => {
        try {
            const url = '../data/test/useraddresses.json';
            const addData = await fetchData(url);
            setAddresses(addData)
        } catch (error) {
            // throw error;
        }
    }

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
            setReload(false)
        }, 100)

    }, [reload])

    useEffect(() => {
        const url = '../data/test/useraddresses.json';
        const getAddressDefault = async () => {
            try {
                const addData = await fetchData(url);
                setAddressDefault(addData[0])
            } catch (error) {
                // throw error;
            }
        }
        setTimeout(() => {
            getAddressDefault()
        }, 1000)
    }, [])

    return (
        <div className="flex flex-col xl:w-2/3 overflow-y-auto h-full">
            <div className="flex flex-col xl:flex-row w-full gap-1 font-inter">
                <div className="font-semibold text-red-500 py-2 bg-white xl:hidden">Quản Lý Tài Khoản</div>
                {/* Thông tin cá nhân */}
                <div className='bg-white mt-1 xl:mt-0 xl:w-1/3 px-1 xl:px-4'>
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex xl:gap-2 py-2 text-sm justify-between xl:border-b xl:border-slate-300">
                            <div className="flex">
                                <span className="font-semibold">Thông Tin Cá Nhân</span>
                            </div>
                            <button className="text-red-500 xl:hover:text-red-700 hidden xl:block">Chỉnh sửa</button>
                        </div>
                        <div className="flex flex-col gap-4 text-sm px-1">
                            <div className="flex xl:gap-2 justify-between">
                                <label htmlFor="Họ Tên">Họ Tên</label>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <div>Pham Vuong</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 xl:hidden">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            </div>
                            <hr className="xl:hidden" />
                            <div className="flex xl:gap-2 justify-between">
                                <label htmlFor="Email">Email</label>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <div className="text-gray-400">{maskEmail("girflerpham@gmail.com")}</div>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 xl:hidden">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            </div>
                            <hr className="xl:hidden" />
                            <div className="flex xl:gap-2 justify-between">
                                <label htmlFor="Số Điện Thoại">Số Điện Thoại</label>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <div className="text-gray-400">{maskPhone("0948908485")}</div>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 xl:hidden">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            </div>
                            <hr className="border-t border-white xl:hidden" />
                        </div>
                    </div>
                </div>
                {/* Địa Chỉ */}
                <div className="bg-white mt-1 xl:mt-0 xl:w-2/3 px-1 xl:px-4">
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex xl:gap-2 py-2 text-sm justify-between xl:border-b xl:border-slate-300">
                            <div className="flex w-full xl:w-40 justify-between items-center xl:justify-start">
                                <span className="font-semibold">Sổ Địa Chỉ</span>
                                <SelectAddressPopup
                                    isAddrPopupOpen={isAddrPopupOpen}
                                    setIsAddrPopupOpen={setIsAddrPopupOpen}
                                    defaultAddress={addressDefault}
                                    setDefaultAddress={setAddressDefault}
                                    userAddresses={addresses}
                                    setUserAddresses={setAddresses}
                                    icon={
                                        <div className="flex items-center h-8 w-20 bg-white justify-end mr-1 xl:hidden" onClick={handleChangeAddress}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-400 ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </div>
                                    }
                                />

                            </div>
                            <button className="text-red-500 xl:hover:text-red-700 hidden xl:block">Chỉnh sửa</button>
                        </div>
                    </div>
                    <div className="flex flex-col xl:flex-row text-sm gap-4 xl:gap-8 xl:mt-2">
                        <div className="mb-1 w-full">
                            <div className="text-xs font-normal text-gray-300">Địa chỉ nhận hàng mặc định</div>
                            <div className="flex flex-col gap-2 mt-1">
                                <div className="font-semibold">{addressDefault.userFullName}</div>
                                <div className="flex flex-col gap-1 text-[0.8rem]">
                                    <div className="flex justify-between xl:justify-start">
                                        <label className="xl:hidden" htmlFor="Địa Chỉ Chi Tiết">Địa Chỉ Chi Tiết</label>
                                        <div className="text-gray-400">{addressDefault.addressDetail}</div>
                                    </div>
                                    <div className="flex justify-between xl:justify-start">
                                        <label className="xl:hidden" htmlFor="Mã Vùng">Mã Vùng</label>
                                        <div className="text-gray-400">{addressDefault.proviceName} - {addressDefault.distristName} - {addressDefault.wardName}</div>
                                    </div>
                                    <div className="flex justify-between xl:justify-start">
                                        <label className="xl:hidden" htmlFor="Số Điện Thoại">SĐT</label>
                                        <div className="text-gray-400">(+84) {addressDefault.userPhone}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="xl:hidden" />
                        <div className="border-l border-gray-200 mx-4 hidden xl:inline"></div>
                        <div className="mb-1 w-full">
                            <div className="text-xs font-normal text-gray-300">Địa chỉ thanh toán mặc định</div>
                            <div className="flex flex-col gap-2 mt-1">
                                <div className="font-semibold">{addressDefault.userFullName}</div>
                                <div className="flex flex-col gap-1 text-[0.8rem]">
                                    <div className="flex justify-between xl:justify-start">
                                        <label className="xl:hidden" htmlFor="Địa Chỉ Chi Tiết">Địa Chỉ Chi Tiết</label>
                                        <div className="text-gray-400">{addressDefault.addressDetail}</div>
                                    </div>
                                    <div className="flex justify-between xl:justify-start">
                                        <label className="xl:hidden" htmlFor="Mã Vùng">Mã Vùng</label>
                                        <div className="text-gray-400">{addressDefault.proviceName} - {addressDefault.distristName} - {addressDefault.wardName}</div>
                                    </div>
                                    <div className="flex justify-between xl:justify-start">
                                        <label className="xl:hidden" htmlFor="Số Điện Thoại">SĐT</label>
                                        <div className="text-gray-400">(+84) {addressDefault.userPhone}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* Đơn hàng gần đây */}
            <div className="px-1 xl:px-4 mt-2 gap-2 bg-white xl:overflow-y-auto">
                <div className="font-semibold text-red-500 py-2 bg-white xl:hidden">Đơn Hàng Gần Đây ({bills.length})</div>
                <div className="xl:h-full overflow-y-auto no-scrollbar">
                    <div className="font-semibold hidden xl:inline mb-2">Đơn Hàng Gần Đây ({bills.length})</div>
                    {
                        reload ? <ShoppingCartLoader items={5} /> :
                            !bills.length ?
                                <div className="flex flex-col gap-1 items-center justify-center text-gray-300">
                                    <img src="/img/empty-box.png" />
                                    Bạn chưa có đơn hàng nào gần đây
                                </div>
                                :
                                <Bills className="mt-2" bills={bills} setReload={setReload} />
                    }
                </div>
            </div>
        </div>
    )
}



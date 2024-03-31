import React, { useEffect, useState } from 'react'
import { PopupLeftPanel } from '../components/popup/PopupLeftPanel'
import { ShoppingCartLoader } from '../components/loaders/ShoppingCartLoader'
import { fetchData } from './fetch'
import { AddNewAddressPopup } from './AddNewAddressPopup';


export const SelectAddressPopup = ({ isAddrPopupOpen = false, setIsAddrPopupOpen, icon = '', defaultAddress = { addressid: 0 }, setDefaultAddress, userAddresses = [], setUserAddresses }) => {
    const [openChooseAdd, setOpenChooseAdd] = useState(false);

    const handleChooseAddress = async (addressID) => {
        const url = '../data/test/useraddresses.json';
        try {
            setDefaultAddress({ addressid: 0 })
            setIsAddrPopupOpen(false);
            setTimeout(async () => {
                const addressData = await fetchData(url);
                const newAddress = addressData.find(a => a.addressid === addressID)
                setDefaultAddress(newAddress)
            }, 1000) // ví dụ xử lý thời gian cập nhập lại địa chỉ (1s)
        } catch (error) {
            // throw error;
        }
    }

    return (
        <div>
            <PopupLeftPanel
                open={isAddrPopupOpen}
                setOpen={setIsAddrPopupOpen}
                icon={
                    icon
                }
                title={
                    "Chọn Địa Chỉ Giao Hàng"
                }
                content={
                    <div className="px-1">
                        <AddNewAddressPopup
                            open={openChooseAdd}
                            setOpen={setOpenChooseAdd}
                            setUserAddresses={setUserAddresses}
                            userAddresses={userAddresses}
                            icon={
                                <div
                                    className="xl:flex justify-end px-4 pb-2  text-red-500 text-sm hidden xl:hover:text-red-700 cursor-pointer"
                                    onClick={() => setOpenChooseAdd(true)}>
                                    Thêm địa chỉ mới
                                </div>
                            } />


                        <div className="flex flex-col gap-2 xl:gap-4">
                            <div
                                className="flex p-2 gap-2 border border-blue-600 rounded-md xl:gap-4 md:gap-4 items-center justify-center h-[4rem] xl:hidden"
                                onClick={() => setOpenChooseAdd(true)}>
                                <div className=" text-xs w-25 text-blue-600 font-semibold cursor-pointer">
                                    + Thêm địa chỉ mới
                                </div>
                            </div>
                            {userAddresses.length === 0 ?
                                <ShoppingCartLoader items={4} />
                                :
                                userAddresses.map((address) => (
                                    <div key={address.addressid}
                                        className={`flex p-2 gap-2 border rounded-lg xl:gap-4 md:gap-4 ${address.addressid === defaultAddress.addressid ? 'border-red-500 ' : 'border-gray-200 '} cursor-pointer xl:hover:border-red-300`}
                                        onClick={() => handleChooseAddress(address.addressid)}>
                                        {/* checkbox */}
                                        <div className="h-full pt-1 hidden xl:flex md:flex">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 accent-red-500 "
                                                checked={address.addressid === defaultAddress.addressid}
                                                readOnly />

                                        </div>
                                        {/* detail */}
                                        <div className="flex flex-col text-xs gap-1 xl:text-sm md:text-sm">
                                            <div className="flex gap-2">
                                                <div>{address.userFullName}</div>
                                                <div>{address.userPhone}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                {address.isHome ?
                                                    <div className="font-semibold uppercase text-[0.5rem] xl:text-xs xl:text-center xl:px-2 xl:pt-[0.2rem] md:text-xs md:text-center md:px-2 md:pt-[0.2rem] text-white bg-gradient-to-t from-pink-500 to-yellow-500 rounded-lg px-[0.2rem]">
                                                        Nhà riêng
                                                    </div> :
                                                    <div className="font-semibold uppercase text-[0.5rem] xl:text-xs xl:text-center xl:px-2 xl:pt-[0.2rem] md:text-xs md:text-center md:px-2 md:pt-[0.2rem] text-white bg-gradient-to-t  from-green-400 to-blue-500 rounded-lg px-[0.2rem]">
                                                        Văn Phòng
                                                    </div>
                                                }
                                                <div>{address.addressDetail}</div>
                                            </div>
                                            <div className="flex xl:text-xs md:text-xs gap-1 text-gray-400">
                                                <div>Mã vùng: </div>
                                                <div className="overflow-x-auto">
                                                    <div>{`${address.proviceName} - ${address.distristName} - ${address.wardName}`}</div>
                                                </div>
                                            </div>

                                            <div className="h-6">
                                                <div className="flex gap-1 text-[0.6rem] xl:text-xs xl:gap-2 md:text-xs md:gap-2 text-red-600 py-1 items-center">
                                                    {address.addressDefault && <div className="border border-red-400 rounded-md px-[0.1rem] xl:px-2 xl:py-[0.1rem] md:px-2 md:py-[0.1rem]">
                                                        <div>
                                                            Địa chỉ nhận hàng mặc định
                                                        </div>
                                                    </div>}
                                                    {address.addressPayment && <div className="border border-red-400 rounded-md px-[0.1rem] xl:px-2 xl:py-[0.1rem] md:px-2 md:py-[0.1rem]">
                                                        <div>
                                                            Địa chỉ thanh toán mặc định
                                                        </div>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
            />
        </div>
    )
}

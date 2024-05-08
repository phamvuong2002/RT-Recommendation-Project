import React, { useContext, useEffect, useState } from 'react';
import { PopupLeftPanel } from '../components/popup/PopupLeftPanel';
import { ShoppingCartLoader } from '../components/loaders/ShoppingCartLoader';
import { fetchAPI, fetchData } from './fetch';
import { AddNewAddressPopup } from './AddNewAddressPopup';
import { AppContext } from '../contexts/main';
import { removeaddress } from '../apis/address';
import { popupContent } from './popupContent';
import { Popup } from '../components/popup/Popup';

export const SelectAddressPopup = ({
  isAddrPopupOpen = false,
  setIsAddrPopupOpen,
  icon = '',
  defaultAddress,
  setDefaultAddress,
  userAddresses = [],
  setUserAddresses,
  isLoading,
  setIsLoading,
}) => {
  const [openChooseAdd, setOpenChooseAdd] = useState(false);
  const { userId } = useContext(AppContext);

  const handleChooseAddress = async (addressID) => {
    setIsAddrPopupOpen(false);
    const newAddress = userAddresses.find((a) => a.address_id === addressID);
    setDefaultAddress(newAddress);
  };

  const handleRemoveAddress = async (addressID) => {
    const addresses = await fetchAPI(`../${removeaddress}`, 'POST', {
      userId,
      addressId: addressID,
    });
    if (addresses.status !== 200) {
      return addresses.status;
    } else {
      setUserAddresses(addresses.metadata);
      if (addressID === defaultAddress.address_id) {
        setDefaultAddress(addresses.metadata?.[0]);
      }
      return addresses.status;
    }
  };

  return (
    <div>
      <PopupLeftPanel
        open={isAddrPopupOpen}
        setOpen={setIsAddrPopupOpen}
        icon={icon}
        title={'Chọn Địa Chỉ Giao Hàng'}
        content={
          <div className="px-1">
            <AddNewAddressPopup
              open={openChooseAdd}
              setOpen={setOpenChooseAdd}
              setUserAddresses={setUserAddresses}
              userAddresses={userAddresses}
              icon={
                <div
                  className={`${userAddresses.length <= 0 ? 'xl:hidden' : ''} xl:flex justify-end px-4 pb-2  text-red-500 text-sm hidden xl:hover:text-red-700 cursor-pointer`}
                  onClick={() => setOpenChooseAdd(true)}
                >
                  Thêm địa chỉ mới
                </div>
              }
            />

            <div className="flex flex-col gap-2 xl:gap-4">
              <div
                className="flex p-2 gap-2 border border-blue-600 rounded-md xl:gap-4 md:gap-4 items-center justify-center h-[4rem] xl:hidden"
                onClick={() => setOpenChooseAdd(true)}
              >
                <div
                  className={`text-xs w-25 text-blue-600 font-semibold cursor-pointer`}
                >
                  + Thêm địa chỉ mới
                </div>
              </div>
              {isLoading ? (
                <ShoppingCartLoader items={4} />
              ) : userAddresses.length === 0 ? (
                <div className="flex flex-col gap-16 mt-4">
                  <div
                    className="hidden xl:flex h-[6rem] p-2 gap-2 border border-red-500 text-red-500 rounded-md md:gap-4 items-center justify-center cursor-pointer hover:border-red-200 hover:bg-red-50"
                    onClick={() => setOpenChooseAdd(true)}
                  >
                    <div className={`text-sm w-25  font-inter`}>
                      + Thêm địa chỉ mới
                    </div>
                  </div>
                  <div>
                    <img
                      src="/img/not_found_address.png"
                      alt="not-found-address"
                    />
                  </div>
                </div>
              ) : (
                userAddresses.map((address) => (
                  <div
                    key={address.address_id}
                    className={`flex p-2 gap-2 border rounded-lg xl:gap-4 md:gap-4 ${
                      address.address_id === defaultAddress?.address_id
                        ? 'border-red-500 '
                        : 'border-gray-200 '
                    } cursor-pointer xl:hover:border-red-300`}
                  >
                    {/* checkbox */}
                    <div
                      className="h-full pt-1 hidden xl:flex md:flex"
                      onClick={() => handleChooseAddress(address.address_id)}
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-red-500 "
                        checked={
                          address.address_id === defaultAddress?.address_id
                        }
                        readOnly
                      />
                    </div>
                    {/* detail */}
                    <div
                      className="flex flex-col text-xs gap-1 xl:text-sm md:text-sm w-full"
                      onClick={() => handleChooseAddress(address.address_id)}
                    >
                      <div className="flex gap-2">
                        <div>{address.address_user_name}</div>
                        <div>{address.address_user_phone}</div>
                      </div>
                      <div className="flex gap-2">
                        {address.address_is_home ? (
                          <div className="font-semibold uppercase text-[0.5rem] xl:text-xs xl:text-center xl:px-2 xl:pt-[0.2rem] md:text-xs md:text-center md:px-2 md:pt-[0.2rem] text-white bg-gradient-to-t from-pink-500 to-yellow-500 rounded-lg px-[0.2rem]">
                            Nhà riêng
                          </div>
                        ) : (
                          <div className="font-semibold uppercase text-[0.5rem] xl:text-xs xl:text-center xl:px-2 xl:pt-[0.2rem] md:text-xs md:text-center md:px-2 md:pt-[0.2rem] text-white bg-gradient-to-t  from-green-400 to-blue-500 rounded-lg px-[0.2rem]">
                            Văn Phòng
                          </div>
                        )}
                        <div className="whitespace-nowrap overflow-x-auto no-scrollbar max-w-[18rem]">
                          {address.address_detail}
                        </div>
                      </div>
                      <div className="flex xl:text-xs md:text-xs gap-1 text-gray-400">
                        <div>Mã vùng: </div>
                        <div className="overflow-x-auto">
                          <div>{`${address.address_province_name} - ${address.address_district_name} - ${address.address_ward_name}`}</div>
                        </div>
                      </div>

                      <div className="h-6">
                        <div className="flex gap-1 text-[0.55rem] xl:text-xs xl:gap-2 md:text-xs md:gap-2 text-red-600 py-1 items-center">
                          {Boolean(address.address_default) === false ? (
                            ''
                          ) : (
                            <div className="border border-red-400 rounded-md px-[0.1rem] xl:px-2 xl:py-[0.1rem] md:px-2 md:py-[0.1rem]">
                              <div>Địa chỉ nhận hàng mặc định</div>
                            </div>
                          )}
                          {Boolean(address.address_default_payment) ===
                          false ? (
                            ''
                          ) : (
                            <div className="border border-red-400 rounded-md px-[0.1rem] xl:px-2 xl:py-[0.1rem] md:px-2 md:py-[0.1rem]">
                              <div>Địa chỉ thanh toán mặc định</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Remove */}
                    <div className="flex items-end justify-end">
                      <Popup
                        icon={
                          <div className="w-6 h-6 text-gray-500 xl:hover:text-red-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </div>
                        }
                        onYesClick={() =>
                          handleRemoveAddress(address.address_id)
                        }
                        onNoClick={() => {
                          console.log('End');
                        }}
                        Option={{ yes: 'Xoá', no: 'Thoát' }}
                        Title={'Xóa khỏi giỏ hàng'}
                        Content={popupContent(
                          null,
                          'Bạn có đồng ý xoá địa chỉ này?',
                        )}
                        ErrorHandling={{
                          title: 'Lỗi xoá địa chỉ',
                          message: 'Không thể xoá địa chỉ, vui lòng thử lại!',
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        }
      />
    </div>
  );
};

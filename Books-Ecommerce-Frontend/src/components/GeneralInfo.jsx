import React, { useEffect, useState, useContext } from 'react';
import { maskPhone, maskEmail } from '../utils/hideSensitiveInfo';
import { fetchData } from '../helpers/fetch';
import Bills from './Bills';
import { ShoppingCartLoader } from './loaders/ShoppingCartLoader';
import { SelectAddressPopup } from '../helpers/SelectAddressPopup';
import { ChangeNamePopup } from '../helpers/ChangeNamePopup';
import { TextLoader } from './loaders/TextLoader';
import { ChangEmailPhone } from '../helpers/ChangEmailPhone';
import { AddEmailPhone } from '../helpers/AddEmailPhone';

//USER SERVICE
import { getUserInfo, updateUserInfo } from '../apis/user';
import { AppContext } from '../contexts/main';
import { fetchAPI } from '../helpers/fetch';
import { getorders } from '../apis/order';
import { shortenString } from '../utils/shortenString';
import { getaddresses } from '../apis/address';
import { Link } from 'react-router-dom';

export const GeneralInfo = () => {
  const [bills, setBills] = useState([]);
  const [reloadBill, setReloadBill] = useState(false);
  const [addressDefault, setAddressDefault] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [isAddrPopupOpen, setIsAddrPopupOpen] = useState(false);
  const [isChangeNameOpen, setIsChangeNameOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [reloadUserData, setReloadUserData] = useState(false);
  const [openChangeEPPopup, setOpenChangeEPPopup] = useState(false);
  const [emailChange, setEmailChange] = useState('');
  const [phoneChange, setPhoneChange] = useState('');

  const [OpenEmailPhoneAdd, setOpenEmailPhoneAdd] = useState(false);
  const [isAddedEmail, setAddEmail] = useState('');
  const [isChangeEmail, setChangeEmail] = useState('');

  const NUMLOADERS = 1;

  //user-service
  const [pageLoading, setPageLoading] = useState(true);
  const { userId, session, setIsLoading, token } = useContext(AppContext);

  // //Xử lý mở popup thay đổi địa chỉ
  const handleChangeAddress = async (e) => {
    e.preventDefault();
    const address = await fetchAPI(`../${getaddresses}`, 'POST', {
      userId,
    });
    if (address.status !== 200) {
      setAddresses([]);
      setIsAddrPopupOpen(true);
    } else {
      setAddresses(address.metadata);
      setIsAddrPopupOpen(true);
    }
  };

  //Xử lý mở popup thay đổi tên
  const handleChangeName = async () => {
    setIsChangeNameOpen(true);
  };

  //xử lý mở popup thay đổi email và số điện thoại
  const handleChangeEmailPhone = async (type) => {
    if (type === 'email') {
      if (!userData.email) {
        // console.log('in add email')
        setAddEmail(true);
        setOpenEmailPhoneAdd(true);
      } else {
        // console.log('in change email')
        setEmailChange(userData.email);
        setPhoneChange(userData.phonenumber);
        setChangeEmail(true);
        setOpenChangeEPPopup(true);
      }
      // console.log('in set email change');
    } else if (type === 'phone') {
      if (!userData.phonenumber) {
        setAddEmail(false);
        // console.log('in add phone')
        setOpenEmailPhoneAdd(true);
      } else {
        // console.log('in change phone')
        setEmailChange(userData.email);
        setPhoneChange(userData.phonenumber);
        setChangeEmail(false);
        setOpenChangeEPPopup(true);
      }
    }
  };

  //Fetch Bills
  useEffect(() => {
    const BillsData = async () => {
      if (!userId) {
        return;
      }
      setReloadBill(true);
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
    BillsData();
  }, [userId, token]);

  //Lấy thông tin Address
  useEffect(() => {
    const getAddresses = async () => {
      if (!userId) return;
      const address = await fetchAPI(`../${getaddresses}`, 'POST', {
        userId,
      });
      if (address.status !== 200) {
        setAddressDefault('');
      } else {
        setAddressDefault(address.metadata?.[0]);
      }
    };
    getAddresses();
  }, [userId]);

  //Load thông tin user
  useEffect(() => {
    //console.log('reload');
    setPageLoading(true);
    const loadUserData = async () => {
      if (!userId) return;
      const user_data = await fetchAPI(`../${getUserInfo}`, 'POST', {
        userId,
      });
      if (user_data.status === 200) {
        setUserData(user_data.metadata.user_data);
      }

      setPageLoading(false);

      setReloadUserData(false);
    };

    loadUserData();
    setTimeout(() => {
      setEmailChange('');
      setPhoneChange('');
      setReloadUserData(false);
      setIsChangeNameOpen(false);
    }, 50);
  }, [reloadUserData, userId, token]);

  return (
    <div className="flex flex-col xl:w-2/3 overflow-y-auto h-full">
      <div className="flex flex-col xl:flex-row w-full gap-1 font-inter">
        <div className="font-semibold text-red-500 py-2 bg-white xl:hidden">
          Quản Lý Tài Khoản
        </div>
        {/* Thông tin cá nhân */}
        <div className={`bg-white mt-1 xl:mt-0 xl:w-1/3 px-1 xl:px-4`}>
          <div className="flex flex-col w-full gap-2">
            <div className="flex xl:gap-2 py-2 text-sm justify-between xl:border-b xl:border-slate-300">
              <div className="flex">
                <span className="font-semibold">Thông Tin Cá Nhân</span>
              </div>
              <Link
                to="../account/profile-infomation"
                className="text-red-500 xl:hover:text-red-700 hidden xl:block"
              >
                Chỉnh sửa
              </Link>
            </div>
            {reloadUserData ? (
              <TextLoader items={1} />
            ) : (
              <div className="flex flex-col gap-4 text-sm px-1 cursor-pointer">
                <div
                  className="flex xl:gap-2 justify-between mt-2"
                  onClick={handleChangeName}
                >
                  <label htmlFor="Họ Tên">Họ Tên</label>
                  <div className="flex items-center gap-2 text-gray-400">
                    <div>{shortenString(userData.fullname, 28, true)}</div>
                    <ChangeNamePopup
                      open={isChangeNameOpen}
                      setOpen={setIsChangeNameOpen}
                      setReload={setReloadUserData}
                      fullName={userData.fullname}
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4 xl:hidden"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      }
                    />
                  </div>
                </div>
                <hr className="xl:hidden" />
                <div
                  className="flex xl:gap-2 justify-between"
                  onClick={() => handleChangeEmailPhone('email')}
                >
                  <label htmlFor="Email">Email</label>
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="text-gray-400">
                      {shortenString(maskEmail(userData.email), 30, true)}
                    </div>
                  </div>
                </div>
                <hr className="xl:hidden" />
                <div
                  className="flex xl:gap-2 justify-between"
                  onClick={() => handleChangeEmailPhone('phone')}
                >
                  <label htmlFor="Số Điện Thoại">Số Điện Thoại</label>
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="text-gray-400 xl:pr-2 ">
                      {maskPhone(userData.phonenumber)}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 xl:hidden"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
                </div>
                <ChangEmailPhone
                  open={openChangeEPPopup}
                  setOpen={setOpenChangeEPPopup}
                  email={emailChange}
                  setEmail={setEmailChange}
                  phone={phoneChange}
                  setPhone={setPhoneChange}
                  setReload={setReloadUserData}
                  isChangeEmail={isChangeEmail}
                />

                <AddEmailPhone
                  open={OpenEmailPhoneAdd}
                  setOpen={setOpenEmailPhoneAdd}
                  setReload={setReloadUserData}
                  isAddEmail={isAddedEmail}
                />
                <hr className="border-t border-white xl:hidden" />
              </div>
            )}
          </div>
        </div>
        {/* Địa Chỉ */}
        <div
          className={`${!userData ? 'hidden xl:block' : ''} bg-white mt-1 xl:mt-0 xl:w-2/3 px-1 xl:px-4`}
        >
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
                    <div
                      className="flex items-center h-8 w-20 bg-white justify-end mr-1 xl:hidden"
                      onClick={handleChangeAddress}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-400 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  }
                />
              </div>
              <button
                className="text-red-500 xl:hover:text-red-700 hidden xl:block"
                onClick={handleChangeAddress}
              >
                Chỉnh sửa
              </button>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row text-sm gap-4 xl:gap-8 xl:mt-2">
            <div className="mb-1 w-full">
              <div className="text-xs font-normal text-gray-300">
                Địa chỉ nhận hàng mặc định
              </div>
              <div className="flex flex-col gap-2 mt-1">
                <div className="font-semibold">
                  {addressDefault?.address_user_name}
                </div>
                <div className="flex flex-col gap-1 text-[0.8rem]">
                  <div className="flex justify-between xl:justify-start">
                    <label className="xl:hidden" htmlFor="Địa Chỉ Chi Tiết">
                      Địa Chỉ Chi Tiết
                    </label>
                    <div className="text-gray-400">
                      {addressDefault?.address_detail}
                    </div>
                  </div>
                  <div className="flex justify-between xl:justify-start">
                    <label className="xl:hidden" htmlFor="Mã Vùng">
                      Mã Vùng
                    </label>
                    <div className="text-gray-400">
                      {addressDefault?.address_province_name} -{' '}
                      {addressDefault?.address_district_name} -{' '}
                      {addressDefault?.address_ward_name}
                    </div>
                  </div>
                  <div className="flex justify-between xl:justify-start">
                    <label className="xl:hidden" htmlFor="Số Điện Thoại">
                      SĐT
                    </label>
                    <div className="text-gray-400">
                      (+84) {addressDefault?.address_user_phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="xl:hidden" />
            <div className="border-l border-gray-200 mx-4 hidden xl:inline"></div>
            <div className="mb-1 w-full">
              <div className="text-xs font-normal text-gray-300">
                Địa chỉ thanh toán mặc định
              </div>
              <div className="flex flex-col gap-2 mt-1">
                <div className="font-semibold">
                  {addressDefault?.address_user_name}
                </div>
                <div className="flex flex-col gap-1 text-[0.8rem]">
                  <div className="flex justify-between xl:justify-start">
                    <label className="xl:hidden" htmlFor="Địa Chỉ Chi Tiết">
                      Địa Chỉ Chi Tiết
                    </label>
                    <div className="text-gray-400">
                      {addressDefault?.address_detail}
                    </div>
                  </div>
                  <div className="flex justify-between xl:justify-start">
                    <label className="xl:hidden" htmlFor="Mã Vùng">
                      Mã Vùng
                    </label>
                    <div className="text-gray-400">
                      {addressDefault?.address_province_name} -{' '}
                      {addressDefault?.address_district_name} -{' '}
                      {addressDefault?.address_ward_name}
                    </div>
                  </div>
                  <div className="flex justify-between xl:justify-start">
                    <label className="xl:hidden" htmlFor="Số Điện Thoại">
                      SĐT
                    </label>
                    <div className="text-gray-400">
                      (+84) {addressDefault?.address_user_phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Đơn hàng gần đây */}
      <div className="px-1 xl:px-4 mt-2 gap-2 bg-white xl:overflow-y-auto no-scrollbar mb-2">
        <div className="font-semibold text-red-500 py-2 bg-white xl:hidden">
          Đơn Hàng Gần Đây ({bills.length})
        </div>
        <div className="xl:h-full xl:mt-2 overflow-y-auto no-scrollbar">
          <div className="font-semibold text-red-500 hidden xl:inline mb-2">
            Đơn Hàng Gần Đây ({bills.length})
          </div>
          {reloadBill ? (
            <ShoppingCartLoader items={5} />
          ) : !bills.length ? (
            <div className="flex flex-col gap-1 items-center justify-center text-gray-300">
              <img src="/img/empty-box.png" />
              Bạn chưa có đơn hàng nào gần đây
            </div>
          ) : (
            <Bills className="mt-2" bills={bills} setReload={setReloadBill} />
          )}
        </div>
      </div>
    </div>
  );
};

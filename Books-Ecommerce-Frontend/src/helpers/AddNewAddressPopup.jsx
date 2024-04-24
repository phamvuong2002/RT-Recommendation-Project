import React, { useContext, useEffect, useState } from 'react';
import { PopupCenterPanel } from '../components/popup/PopupCenterPanel';
import { isValidPhoneNumber } from '../utils/isValidPhoneNumber';
import { ChooseAddressGHN } from './ChooseAddressGHN';
import { createaddress } from '../apis/address';
import { fetchAPI } from './fetch';
import { AppContext } from '../contexts/main';

export const AddNewAddressPopup = ({
  open,
  setOpen,
  icon,
  setUserAddresses,
  userAddresses,
}) => {
  const { userId } = useContext(AppContext);
  // const [open, setOpen] = useState(false);
  const [type, setType] = useState('home');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [generalAddress, setGeneralAddress] = useState('');
  const [detailAddressOne, setDetailAddressOne] = useState('');
  const [detailAddressTwo, setDetailAddressTwo] = useState('');
  const [description, setDescription] = useState('');
  const [addressDefault, setAddressDefault] = useState(false);
  const [paymentDefault, setPaymentDefault] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ code: 0 });
  const [chooseAddress, setChooseAddress] = useState(false);

  const handleChooseType = (type) => {
    setType(type);
  };

  const handleChooseAddressDefault = (status) => {
    setAddressDefault(status);
  };

  const handleChoosePaymentDefault = (status) => {
    setPaymentDefault(status);
  };

  const handleSubmitNewAddress = async (e) => {
    e.preventDefault();
    // Kiểm tra các trường nhập liệu
    if (!name.trim()) {
      setErrorMessage({ code: 1, msg: 'Vui lòng nhập tên người nhận.' });
      return;
    }
    if (!phoneNumber.trim() || !isValidPhoneNumber(phoneNumber)) {
      setErrorMessage({
        code: 2,
        msg: !phoneNumber.trim()
          ? 'Vui lòng nhập số điện thoại.'
          : 'Số điện thoại không hợp lệ.',
      });
      return;
    }
    if (!generalAddress) {
      setErrorMessage({ code: 3, msg: 'Vui lòng nhập thành phố.' });
      return;
    }
    if (!detailAddressOne.trim()) {
      setErrorMessage({ code: 4, msg: 'Vui lòng nhập đường/toà nhà.' });
      return;
    }
    // Nếu tất cả các trường đã được nhập, bạn có thể xử lý dữ liệu ở đây
    // Ví dụ: gọi hàm lưu địa chỉ
    saveAddress();
  };

  // Xử lý submit
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //reset
  const reset = () => {
    setType('home');
    setName('');
    setPhoneNumber('');
    setGeneralAddress('');
    setDetailAddressOne('');
    setDetailAddressTwo('');
    setDescription('');
    setAddressDefault(false);
    setPaymentDefault(false);
    setErrorMessage({ code: 0 });
    setChooseAddress(false);
  };

  const saveAddress = async () => {
    const newAddress = {
      userId,
      userName: name,
      userPhone: phoneNumber,
      addressDetail: `${detailAddressOne} ${detailAddressTwo} ${description ? 'Mô tả thêm: ' + description : ''}`,
      provinceId: generalAddress.ProvinceID,
      districtId: generalAddress.DistrictID,
      wardId: generalAddress.WardCode,
      provinceName: generalAddress.ProvinceName,
      districtName: generalAddress.DistrictName,
      wardName: generalAddress.WardName,
      addressDefault: addressDefault,
      defaultPayment: paymentDefault,
      isHome: type === 'home',
    };

    console.log('newAddress::', newAddress);

    const updateAddresses = await fetchAPI(
      `../${createaddress}`,
      'POST',
      newAddress,
    );
    if (updateAddresses.status !== 200) {
      return;
    } else {
      setUserAddresses([...userAddresses, updateAddresses.metadata]);
      setOpen(false);
    }
    reset();
  };

  return (
    <div className="">
      <PopupCenterPanel
        open={open}
        setOpen={setOpen}
        title="Thêm địa chỉ mới"
        titleClassName={''}
        // icon={<button className="w-[20rem] h-[20rem] bg-red-500"> Thêm </button>}
        icon={icon}
        content={
          <div className="flex flex-col p-1 gap-4 font-inter text-[0.78rem]">
            {/* Họ tên */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="Tên Người Nhận"
                className="relative font-semibold"
              >
                Tên Người Nhận <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col">
                <input
                  value={name}
                  type="text"
                  className="w-full h-9 rounded-md border border-gray-400 outline-none focus:border-red-500 px-2"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {errorMessage.code === 1 ? (
                  <p className="text-red-500">{errorMessage.msg}</p>
                ) : (
                  ''
                )}
              </div>
            </div>

            <div className="flex flex-col  gap-1">
              <label htmlFor="Số Điện Thoại" className="relative font-semibold">
                Số Điện Thoại <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col">
                <div className="flex border border-gray-400 rounded-md hover:border-red-500">
                  <div className="w-[20%] flex items-center justify-center bg-gray-300 text-gray-600 rounded-l-md">
                    +84
                  </div>
                  <input
                    value={phoneNumber}
                    type="number"
                    className="w-[80%] h-9 outline-none px-2 rounded-r-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
              {errorMessage.code === 2 ? (
                <p className="text-red-500">{errorMessage.msg}</p>
              ) : (
                ''
              )}
            </div>

            <ChooseAddressGHN
              open={chooseAddress}
              setOpen={setChooseAddress}
              icon={
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="Thành Phố(Tỉnh)/Quận(Huyện)/Phường(Xã)"
                    className="relative font-semibold"
                  >
                    Thành Phố(Tỉnh)/Quận(Huyện)/Phường(Xã){' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col">
                    <div className="flex items-center w-full cursor-pointer h-9 rounded-md border border-gray-400 outline-none focus:border-red-500 px-2 xl:hover:border-red-500">
                      {generalAddress === ''
                        ? ''
                        : `${generalAddress?.ProvinceName} / ${generalAddress?.DistrictName} / ${generalAddress?.WardName}`}
                    </div>
                    {errorMessage.code === 3 ? (
                      <p className="text-red-500">{errorMessage.msg}</p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              }
              setGeneralAddress={setGeneralAddress}
            />

            <div className="flex flex-col gap-1">
              <label htmlFor="Đường/Toà Nhà" className="relative font-semibold">
                Đường/Toà Nhà <span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  value={detailAddressOne}
                  type="text"
                  className="w-full h-9 rounded-md border border-gray-400 outline-none focus:border-red-500 px-2"
                  required
                  onChange={(e) => setDetailAddressOne(e.target.value)}
                />
                {errorMessage.code === 4 ? (
                  <p className="text-red-500">{errorMessage.msg}</p>
                ) : (
                  ''
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="Số Nhà/Tầng" className="relative font-semibold">
                Số Nhà/Tầng
              </label>
              <input
                value={detailAddressTwo}
                type="text"
                className="w-full h-9 rounded-md border border-gray-400 outline-none focus:border-red-500 px-2"
                onChange={(e) => setDetailAddressTwo(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="Thông Tin Bổ Sung (Không Bắt Buộc)"
                className="relative font-semibold"
              >
                Thông Tin Bổ Sung (Không Bắt Buộc)
              </label>
              <input
                value={description}
                type="text"
                className="w-full h-9 rounded-md border border-gray-400 outline-none focus:border-red-500 px-2"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Type */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <label
                  htmlFor="Loại Địa Chỉ"
                  className="relative font-semibold"
                >
                  Loại Địa Chỉ <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  {/* Check box chọn Nhà */}
                  <div
                    className="flex justify-center items-center gap-2 cursor-pointer"
                    onClick={() => handleChooseType('home')}
                  >
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex items-center rounded-full "
                        htmlFor="customStyle"
                      >
                        <input
                          type="checkbox"
                          checked={type === 'home'}
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-600 checked:bg-red-500 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                          readOnly
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                    </div>
                    <span>Nhà</span>
                  </div>

                  {/* Check box chọn Văn Phòng */}
                  <div
                    className="flex justify-center items-center gap-2 cursor-pointer"
                    onClick={() => handleChooseType('office')}
                  >
                    <label
                      className="relative flex items-center rounded-full"
                      htmlFor="customStyle"
                    >
                      <input
                        type="checkbox"
                        checked={type === 'office'}
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-600 checked:bg-red-500 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                        readOnly
                      />
                      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                    <span>Văn Phòng</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[0.65rem] text-gray-300">
                  *Bookada sẽ cố gắng giao hàng tới bạn vào các ngày trong tuần
                  và cuối tuần
                </p>
              </div>
            </div>

            {/* Chọn Địa chỉ mặc định */}
            <div className="flex justify-between mt-3">
              <label
                htmlFor="Thông Tin Bổ Sung (Không Bắt Buộc)"
                className="relative font-normal"
              >
                Địa Chỉ Mặc Định
              </label>

              <div className="flex justify-between gap-4">
                <div
                  className="flex justify-center items-center gap-2 cursor-pointer"
                  onClick={() => handleChooseAddressDefault(true)}
                >
                  <label
                    className="relative flex items-center rounded-full"
                    htmlFor="customStyle"
                  >
                    <input
                      type="checkbox"
                      checked={addressDefault}
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-600 checked:bg-red-500 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                      readOnly
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <span>Mở</span>
                </div>
                <div
                  className="flex justify-center items-center gap-2 cursor-pointer"
                  onClick={() => handleChooseAddressDefault(false)}
                >
                  <label
                    className="relative flex items-center rounded-full"
                    htmlFor="customStyle"
                  >
                    <input
                      type="checkbox"
                      checked={addressDefault === false}
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-600 checked:bg-red-500 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                      readOnly
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <span>Tắt</span>
                </div>
              </div>
            </div>

            {/* Chọn Địa chỉ thanh toán mặc định */}
            <div className="flex justify-between my-3">
              <label
                htmlFor="Thông Tin Bổ Sung (Không Bắt Buộc)"
                className="relative font-normal"
              >
                Địa Chỉ Mặc Định
              </label>

              <div className="flex justify-between gap-4">
                <div
                  className="flex justify-center items-center gap-2 cursor-pointer"
                  onClick={() => handleChoosePaymentDefault(true)}
                >
                  <label
                    className="relative flex items-center rounded-full"
                    htmlFor="customStyle"
                  >
                    <input
                      type="checkbox"
                      checked={paymentDefault}
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-600 checked:bg-red-500 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                      readOnly
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <span>Mở</span>
                </div>
                <div
                  className="flex justify-center items-center gap-2 cursor-pointer"
                  onClick={() => handleChoosePaymentDefault(false)}
                >
                  <label
                    className="relative flex items-center rounded-full"
                    htmlFor="customStyle"
                  >
                    <input
                      type="checkbox"
                      checked={paymentDefault === false}
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-600 checked:bg-red-500 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                      readOnly
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <span>Tắt</span>
                </div>
              </div>
            </div>
            <button
              className="w-full h-10 text-white font-normal xl:font-semibold xl: text-base bg-gradient-to-r from-pink-500 to-red-500 transition-all xl:hover:from-red-400 xl:hover:to-pink-400"
              onClick={handleSubmitNewAddress}
            >
              Lưu
            </button>
          </div>
        }
      />
    </div>
  );
};

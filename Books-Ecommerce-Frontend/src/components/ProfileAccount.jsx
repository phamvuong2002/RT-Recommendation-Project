import React, { useEffect, useState, useContext } from 'react';
import { ChangeNamePopup } from '../helpers/ChangeNamePopup';
import { fetchData } from '../helpers/fetch';
import { PopupCenterPanel } from './popup/PopupCenterPanel';
import { popupContent } from '../helpers/popupContent';
import { PopupOpen } from './popup/PopupOpen';
import { isMobileDevice } from '../utils/isMobileDevice';
import { ChangePassword } from '../helpers/ChangePassword';
import { maskEmail, maskPhone } from '../utils/hideSensitiveInfo';
import { ChangEmailPhone } from '../helpers/ChangEmailPhone';
import { TextLoader } from './loaders/TextLoader';
import { ChangeSexPopup } from '../helpers/ChangeSexPopup';
import { AddEmailPhone } from '../helpers/AddEmailPhone';

import { ChangeBirthdayPopup } from '../helpers/ChangeBirthdayPopup';

//USER SERVICE
import { getUserInfo, updateUserInfo } from '../apis/user';
import { AppContext } from '../contexts/main';
import { fetchAPI } from '../helpers/fetch';

export const ProfileAccount = () => {
  const [isChangeNameOpen, setIsChangeNameOpen] = useState(false);
  const [userData, setUserData] = useState('');
  const [reloadUserData, setReloadUserData] = useState(false);
  const [openCopyPopup, setOpenCopyPopup] = useState(false);
  const [openChangePassPopup, setOpenChangePassPopup] = useState(false);
  const [openChangeSexPopup, setOpenChangeSexPopup] = useState(false);
  const [openChangeBirthdayPopup, setOpenChangeBirthdayPopup] = useState(false);
  const [openChangeEPPopup, setOpenChangeEPPopup] = useState(false);
  const [emailChange, setEmailChange] = useState('');
  const [phoneChange, setPhoneChange] = useState('');

  //user-service
  const [pageLoading, setPageLoading] = useState(true);
  const { userId, session, setIsLoading, token } = useContext(AppContext);
  const [OpenEmailPhoneAdd, setOpenEmailPhoneAdd] = useState(false);
  const [isAddedEmail, setAddEmail] = useState('');
  const [isChangeEmail, setChangeEmail] = useState('');

  //Xử lý mở popup thay đổi tên
  const handleChangeName = async () => {
    setIsChangeNameOpen(true);
  };

  //Xử lý copy ID
  const handleCopyId = async (text) => {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; // Chắc chắn rằng sẽ không làm mất vị trí trên giao diện người dùng
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'sao chép thành công' : 'không sao chép được';
      // console.log('Text đã được ' + msg);
      setOpenCopyPopup(true);
    } catch (err) {
      console.error('Không thể sao chép:', err);
    }

    document.body.removeChild(textArea);
  };

  //Xử lý thay đổi password
  const handleChangePassword = async () => {
    setOpenChangePassPopup(true);
  };

  // const handleChangeEmailPhone = async (type) => {
  //     // console.log('email change ' + userData.email);
  //     if (type === 'email') {
  //       if (!userData.email) return;
  //       if (!phoneChange) {
  //         // console.log('in set email change');
  //         setEmailChange(userData.email);
  //       }
  //     } else if (type === 'phone') {
  //       if (!userData.phonenumber) return;
  //       if (!emailChange) {
  //         setPhoneChange(userData.phonenumber);
  //       }
  //     }
  //     setOpenChangeEPPopup(true);
  //   };

  //xử lý mở popup thay đổi email và số điện thoại
  const handleChangeEmailPhone = async (type) => {
    if (type === 'email') {
      if (!userData.email) {
        console.log('in add email');
        setAddEmail(true);
        setOpenEmailPhoneAdd(true);
      } else {
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
        setEmailChange(userData.email);
        setPhoneChange(userData.phonenumber);
        setChangeEmail(false);
        setOpenChangeEPPopup(true);
      }
    }
    // console.log('general info')
  };

  //Xử lý thay đổi giới tính
  const handleChangeSex = async () => {
    setOpenChangeSexPopup(true);
  };

  //Xử lý thay đổi ngày sinh
  const handleChangeBirthday = async () => {
    setOpenChangeBirthdayPopup(true);
  };

  //fetch user Profile
  // useEffect(() => {
  //     const url = '../data/test/userprofile.json';
  //     const getUserProfile = async () => {
  //         try {
  //             const userData = await fetchData(url);
  //             setUserData(userData[0])
  //         } catch (error) {
  //             // throw error;
  //         }
  //     }
  //     setTimeout(() => {
  //         getUserProfile()
  //         setEmailChange('');
  //         setPhoneChange('');
  //         setReloadUserData(false)
  //         setIsChangeNameOpen(false)
  //         setOpenChangePassPopup(false);
  //         setOpenChangeEPPopup(false);
  //         setOpenChangeSexPopup(false);
  //         setOpenChangeBirthdayPopup(false);
  //     }, 1000)
  // }, [reloadUserData])

  //USER SERVICE
  useEffect(() => {
    setPageLoading(true);
    // console.log('reload ', userId)
    const loadUserData = async () => {
      if (!userId) return;
      const userData = await fetchAPI(`../${getUserInfo}`, 'POST', {
        userId: userId,
      });
      // console.log(userData)
      setUserData(userData.metadata.user_data);

      setPageLoading(false);
      setReloadUserData(false);
    };

    loadUserData();

    setTimeout(() => {
      setEmailChange('');
      setPhoneChange('');
      setReloadUserData(false);
      setIsChangeNameOpen(false);
      setOpenChangePassPopup(false);
      setOpenChangeEPPopup(false);
      setOpenChangeSexPopup(false);
      setOpenChangeBirthdayPopup(false);
    }, 50);
  }, [reloadUserData, userId, token]);

  return (
    <div className="flex flex-col xl:w-2/3 overflow-y-auto h-full font-inter">
      <div className="flex flex-col xl:flex-row w-full gap-1 font-inter bg-white">
        <div className="font-semibold py-2 text-red-500 w-full px-2 xl:hidden">
          Thông Tin Tài Khoản
        </div>
      </div>
      {reloadUserData ? (
        <TextLoader items={4} />
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col mt-2 lg:mt-0">
            {/* Họ Tên */}
            <div
              className="flex xl:gap-2 justify-between text-sm bg-white h-12 px-2 border-b border-gray-200"
              onClick={handleChangeName}
            >
              <label className="flex items-center" htmlFor="Họ Tên">
                Họ Tên
              </label>
              <div className="flex items-center gap-2 text-gray-400">
                <div>{userData.fullname}</div>

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

            {/* Bookada ID */}
            <div
              className="flex xl:gap-2 justify-between text-sm bg-white h-12 px-2 cursor-pointer border-b border-gray-200"
              onClick={() => handleCopyId(userData.userid)}
            >
              <label className="flex items-center" htmlFor="Bookada ID">
                Bookada ID
              </label>
              <div className="flex items-center gap-2 text-gray-400">
                <div>{userData.userid}</div>
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
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                  />
                </svg>
              </div>
              <PopupCenterPanel
                open={openCopyPopup}
                setOpen={setOpenCopyPopup}
                autoClose={1000}
                titleClassName="hidden"
                content={popupContent(
                  'text-gray-800 text-base text-center',
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="120"
                      height="120"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#4caf50"
                        d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                      ></path>
                      <path
                        fill="#ccff90"
                        d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"
                      ></path>
                    </svg>
                    <div>{`BookadaID đã được sao chép thành công!`}</div>
                  </div>,
                )}
              />
            </div>

            {/*Password*/}
            <div
              className="flex xl:gap-2 justify-between text-sm bg-white h-12 px-2 border-b border-gray-200"
              onClick={handleChangePassword}
            >
              <label className="flex items-center" htmlFor="Thay Đổi Mật Khẩu">
                Thay Đổi Mật Khẩu
              </label>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="mt-1">********</div>
                <ChangePassword
                  open={openChangePassPopup}
                  setOpen={setOpenChangePassPopup}
                  setReload={setReloadUserData}
                  userEmail={userData.email}
                  userPhone={userData.phonenumber}
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
          </div>

          <div className="flex flex-col">
            {/*Email*/}
            <div
              className="flex xl:gap-2 justify-between text-sm bg-white h-12 px-2 border-b border-gray-200"
              onClick={() => handleChangeEmailPhone('email')}
            >
              <label className="flex items-center" htmlFor="Thay Đổi Email">
                Thay Đổi Email
              </label>
              <div className="flex items-center gap-2 text-gray-400">
                <div>{maskEmail(userData.email)}</div>
              </div>
            </div>

            {/*Phone Number*/}
            <div
              className="flex xl:gap-2 justify-between text-sm bg-white h-12 px-2 border-b border-gray-200"
              onClick={() => handleChangeEmailPhone('phone')}
            >
              <label
                className="flex items-center"
                htmlFor="Thay Đổi Số Điện Thoại"
              >
                Thay Đổi Số Điện Thoại
              </label>
              <div className="flex items-center gap-2 text-gray-400">
                <div>{maskPhone(userData.phonenumber)}</div>
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

            {/* Giới Tính */}
            <div
              className="flex xl:gap-2 justify-between text-sm bg-white h-12 px-2 border-b border-gray-200"
              onClick={handleChangeSex}
            >
              <label className="flex items-center" htmlFor="Giới Tính">
                Giới Tính
              </label>
              <div className="flex items-center gap-2 text-gray-400">
                <div>
                  {userData.sex === 'male'
                    ? 'Nam'
                    : userData.sex === 'female'
                      ? 'Nữ'
                      : 'Khác'}
                </div>
                <ChangeSexPopup
                  open={openChangeSexPopup}
                  setOpen={setOpenChangeSexPopup}
                  setReload={setReloadUserData}
                  sex={userData.sex}
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

            {/* Ngày Sinh */}
            <div
              className="flex xl:gap-2 justify-between text-sm bg-white h-12 px-2 border-b border-gray-200"
              onClick={handleChangeBirthday}
            >
              <label className="flex items-center" htmlFor="Ngày Sinh">
                Ngày Sinh
              </label>
              <div className="flex items-center gap-2 text-gray-400">
                <div>{userData.birthday}</div>
                <ChangeBirthdayPopup
                  open={openChangeBirthdayPopup}
                  setOpen={setOpenChangeBirthdayPopup}
                  setReload={setReloadUserData}
                  sex={userData.birthday}
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
          </div>
        </div>
      )}
    </div>
  );
};

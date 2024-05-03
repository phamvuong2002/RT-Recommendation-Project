import React, { useState, useEffect } from 'react'
import { PopupCenterPanel } from '../components/popup/PopupCenterPanel'
import { AuthenticationPopup } from './AuthenticationPopup'
import { validateEmail } from '../utils/validateEmail';
import { isValidPhoneNumber } from '../utils/isValidPhoneNumber';
//USER SERVICE
import { updateUserInfo, checkEmailnPhone } from '../apis/user'
import { fetchAPI } from './fetch'
import { AppContext } from '../contexts/main';
import { useContext } from 'react';
export const AddEmailPhone = ({ open, setOpen, icon = '', type = '', setReload }) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [authenStatus, setAuthenStatus] = useState('pending');
    const [isOpenChange, setIsOpenChange] = useState(true);
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');
    const [ishowAuthenPopup, setIsShowAuthenPopup] = useState(false);

    // USER SERVICE 
    const { userId, setIsLoading } = useContext(AppContext);

    const handleUpdateEmail = async () => {
        const isValidEmail = validateEmail(value)
        //email hợp lệ
        if (isValidEmail.status) {
            const isRegistered = await fetchAPI(`../${checkEmailnPhone}`, 'POST', {
                method: "email",
                methodValue: value,
            });

            if (isRegistered.status === 200) {
                if (isRegistered.metadata.isUsed) {
                    setMessage('Email đã được đăng ký, vui lòng thêm Email khác')
                    return;
                } else {
                    setEmail(value)
                    console.log('email value ', value)
                }
            } else {
                setMessage('Đã xảy ra lỗi trong quá trình cập nhật. Vui lòng thử lại sau')
            }
        }
        else {
            setMessage("Email không hợp lệ");
            return;
        }


    }

    const handleUpdatePhone = async () => {
        //xử lý update tên
        if (isValidPhoneNumber(value)) {
            const isRegistered = await fetchAPI(`../${checkEmailnPhone}`, 'POST', {
                method: 'phone',
                methodValue: value,
            });

            if (isRegistered.status === 200) {
                if (isRegistered.metadata.isUsed) {
                    setMessage('Số điện thoại đã được đăng ký, vui lòng cập nhật bằng Số điện thoại khác');
                    return;
                } else {
                    setPhone(value)
                    console.log('phone value ', value)
                }
            } else {
                setMessage('Đã xảy ra lỗi trong quá trình cập nhật. Vui lòng thử lại sau');
            }
        }
        else {
            setMessage("Số điện thoại không đúng định dạng.");
        }


    }

    useEffect(() => {
        console.log('in authen status add email phone ', authenStatus)


        const updateInfo = async () => {
            let updateValue = ''
            if (email) {
                updateValue = 'email'
            } else {
                updateValue = 'phonenumber'
            }
            console.log(updateValue)
            const update = await fetchAPI(`../${updateUserInfo}`, 'POST', {
                updatedField: updateValue,
                updatedValue: value,
                userId: userId
            });
            if (update.status === 200) {
                //thành công  
                setReload(true);
            }
        }

        if (authenStatus === 'success') {
            console.log('authen success, run UpdateInfo')
            updateInfo();
        }
        else {
            setReload(false);
        }

    }, [authenStatus])

    // useEffect(() => {
    //     if (!isOpenChange) {
    //         setAuthenStatus('pending');
    //         setValue('');
    //         setMessage('');
    //         setOpen(false);
    //         setEmail('');
    //         setPhone('');
    //     }
    // }, [isOpenChange])


    useEffect(() => {
        console.log('in set authen pop up')
        console.log(email, phone)
        if (email.length > 0) {

            setIsShowAuthenPopup(true)
        }

    }, [email])

    useEffect(() => {   
        console.log('in set authen pop up')
        console.log(email, phone)
        if (phone.length > 0) {

            setIsShowAuthenPopup(true)
        }

    }, [phone])


    return (
        <div>
            <PopupCenterPanel
                titleClassName="hidden"
                open={open}
                setOpen={setOpen}
                content={
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-center font-semibold">Nhập {type=='email' ? 'Email' : 'Số Điện Thoại'}</div>
                        <div className="">
                            <label className="text-gray-400 text-xs" htmlFor="Nhập email mới">Nhập {type=='email'  ? 'Email' : 'Số Điện Thoại'} mới</label>
                            <div className="flex border-b border-gray-200">
                                <input
                                    type={type=='email' ? "email" : "number"}
                                    className="w-full h-8 outline-none forcus:outline-none"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                // readOnly
                                />
                                <div className="flex items-center text-gray-400" onClick={() => setValue('')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-1 text-xs text-red-500">{message}</div>

                        </div>
                        <div className="flex items-center mt-4 justify-center">
                            <button className={`${type == 'email' ? '' : 'hidden'} w-4/5 h-10 rounded-full text-white font-normal xl:font-semibold xl: text-base bg-gradient-to-r from-pink-500 to-red-500 transition-all xl:hover:from-red-400 xl:hover:to-pink-400`}
                                onClick={handleUpdateEmail}
                            >
                                Xác nhận
                            </button>
                            <button className={`${type == 'phone' ? '' : 'hidden'} w-4/5 h-10 rounded-full text-white font-normal xl:font-semibold xl: text-base bg-gradient-to-r from-pink-500 to-red-500 transition-all xl:hover:from-red-400 xl:hover:to-pink-400`}
                                onClick={handleUpdatePhone}
                            >
                                Xác nhận
                            </button>
                        </div>

                    </div>
                }
            />
            <AuthenticationPopup
                open={ishowAuthenPopup}
                setOpen={setIsShowAuthenPopup}
                emailInput={email}
                phoneInput={phone}
                setAuthenStatus={setAuthenStatus}
                authenStatus={authenStatus}
                nextStep={() => setIsOpenChange(false)}
                icon={icon}
            />


        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { AuthenticationPopup } from './AuthenticationPopup'
import { PopupCenterPanel } from '../components/popup/PopupCenterPanel';
import { validateEmail } from '../utils/validateEmail';
import { isValidPhoneNumber } from '../utils/isValidPhoneNumber';

import { updateUserInfo, checkEmailnPhone } from '../apis/user';
import { fetchAPI } from './fetch';
import { AppContext } from '../contexts/main';
import { useContext } from 'react';

export const ChangEmailPhone = ({ open, setOpen, icon, email = '', setEmail, phone = '', setPhone, setReload , isChangeEmail}) => {
    const [authenStatus, setAuthenStatus] = useState('pending');
    const [isOpenChange, setIsOpenChange] = useState(false);
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');
    

    // USER SERVICE 
    const { userId, session, setIsLoading } = useContext(AppContext);

    const handleUpdateEmail = async () => {

        if (value === email) {
            // setOpen(false);
            setReload(false);
            setIsOpenChange(false);
            setAuthenStatus('pending')
            console.log('same email');
            return;
        }
        const check = validateEmail(value);
        if (check.status) {
            const isRegistered = await fetchAPI(`../${checkEmailnPhone}`, 'POST', {
                method: 'email',
                methodValue: value
            })

            if (isRegistered.status === 200) {
                if (isRegistered.metadata.isUsed) {
                    setMessage('Email đã được đăng ký, vui lòng cập nhật bằng Email khác');
                    return;
                } else {
                    //xử lý update email
                    const updateEmail = await fetchAPI(`../${updateUserInfo}`, 'POST', {
                        updatedField: 'email',
                        updatedValue: value,
                        userId: userId
                    });

                    // let statusUpdate = ''
                    // if (updateEmail.metadata.update_result) {
                    //     statusUpdate = 'ok'
                    // }

                    if (updateEmail.status === 200) { //update thành công
                        setOpen(false);
                        setReload(true);
                        setAuthenStatus('pending')
                    }
                    else { //update thất bại
                        setMessage("Lỗi cập nhật! vui lòng thử lại sau.");
                        setOpen(false);
                    }
                }
            } else {
                setMessage("Lỗi cập nhật! vui lòng thử lại sau.");
                setOpen(false);
            }

        } else {
            setMessage(check.message);
        }
    }

    const handleUpdatePhone = async () => {

        if (isValidPhoneNumber(value)) {
            const isRegistered = await fetchAPI(`../${checkEmailnPhone}`, 'POST', {
                method: 'phone',
                methodValue: value,
            });

            if (isRegistered.status === 200) {
                if (isRegistered.metadata.isUsed) {
                    setMessage('Số điện thoại đã được đăng ký, vui lòng đăng ký bằng Số điện thoại khác');
                    return;
                } else {
                    //xử lý update phone number
                    const updateEmail = await fetchAPI(`../${updateUserInfo}`, 'POST', {
                        updatedField: 'phonenumber',
                        updatedValue: value,
                        userId: userId
                    });

                    if (updateEmail.status === 200) { //update thành công
                        setOpen(false);
                        setReload(true);
                        setAuthenStatus('pending')
                    }
                    else { //update thất bại
                        setMessage("Lỗi cập nhật! vui lòng thử lại sau.");
                        setOpen(false);
                    }
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
        if (authenStatus === 'failed') {
            setOpen(false);
            console.log('Failed rôif')
        }
        if (authenStatus === 'success') {
            setOpen(false)
            setIsOpenChange(true)
            console.log('OKOK')
        }
    }, [open])

    useEffect(() => {
        if (!isOpenChange) {
            setAuthenStatus('pending');
            setValue('');
            setMessage('');
            setOpen(false);
            setEmail('');
            setPhone('');
        }
    }, [isOpenChange])

    return (
        <div>
            <AuthenticationPopup
                open={open}
                setOpen={setOpen}
                emailInput={email}
                phoneInput={phone}
                setAuthenStatus={setAuthenStatus}
                authenStatus={authenStatus}
                nextStep={() => setIsOpenChange(true)}
                icon={icon}
            />

            < PopupCenterPanel
                titleClassName="hidden"
                open={isOpenChange}
                setOpen={setIsOpenChange}
                content={
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-center font-semibold">Thay Đổi {isChangeEmail ? 'Email' : 'Số Điện Thoại'}</div>
                        <div className="">
                            <label className="text-gray-400 text-xs" htmlFor="Nhập email mới">Nhập {isChangeEmail ? 'Email' : 'Số Điện Thoại'} mới</label>
                            <div className="flex border-b border-gray-200">
                                <input
                                    type={isChangeEmail? "email" : "number"}
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
                            <button className={`${isChangeEmail ? '' : 'hidden'} w-4/5 h-10 rounded-full text-white font-normal xl:font-semibold xl: text-base bg-gradient-to-r from-pink-500 to-red-500 transition-all xl:hover:from-red-400 xl:hover:to-pink-400`}
                                onClick={handleUpdateEmail}
                            >
                                Xác nhận
                            </button>
                            <button className={`${!isChangeEmail ? '' : 'hidden'} w-4/5 h-10 rounded-full text-white font-normal xl:font-semibold xl: text-base bg-gradient-to-r from-pink-500 to-red-500 transition-all xl:hover:from-red-400 xl:hover:to-pink-400`}
                                onClick={handleUpdatePhone}
                            >
                                Xác nhận
                            </button>
                        </div>

                    </div>
                }
            />

        </div>
    )
}

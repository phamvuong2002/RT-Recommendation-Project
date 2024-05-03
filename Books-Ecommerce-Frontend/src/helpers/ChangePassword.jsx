import React, { useEffect, useState, useContext } from 'react'
import { AuthenticationPopup } from './AuthenticationPopup'
import { PopupCenterPanel } from '../components/popup/PopupCenterPanel';
import { validatePassword } from '../utils/validatePassword';

import { getEmailnPhone, updateUserInfo } from '../apis/user';
import { AppContext } from '../contexts/main';
import { fetchAPI } from './fetch';

export const ChangePassword = ({ open, setOpen, icon, setReload, userEmail, userPhone }) => {
    const [authenStatus, setAuthenStatus] = useState('pending');
    const [isOpenChange, setIsOpenChange] = useState(false);
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const { userId, session, setIsLoading, token } = useContext(AppContext);

    const handleUpdatePassword = async () => {
        const check = validatePassword(value);
        if (check.length === 0) {
            //xử lý update password
            const updatePW = await fetchAPI(`../${updateUserInfo}`, 'POST',
                {
                    updatedField: 'pw',
                    updatedValue: value,
                    userId: userId
                }
            );
            // const statusUpdate = 'ok'
            // if (statusUpdate === 'ok') { //update thành công
            if (updatePW.status === 200) {
                setOpen(false);
                setReload(true);
                setIsOpenChange(false);
                setAuthenStatus('pending')
            }
            else { //update thất bại
                setMessages([{ code: "400", message: "Lỗi cập nhật! vui lòng thử lại sau." }]);
                setOpen(false);
                setIsOpenChange(false);
            }
        } else {
            setMessages(check);
        }
    }


    useEffect(() => {
        if (authenStatus === 'failed') {
            setOpen(false);
            console.log('Failed rồi')
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
            setMessages([]);
            setOpen(false);
        }
    }, [isOpenChange])

    // useEffect(() => {
    //     const checkEmailPhone = async () => {
    //         const userEmailnPhone = await fetchAPI(`../${getEmailnPhone}`, 'POST',
    //             { userId: userId }
    //         )
    //         if (userEmailnPhone.status == 200) {
    //             if (userEmailnPhone.metadata) {
    //                 setEmail(userEmailnPhone.metadata.email_n_phone.email)
    //                 setPhone(userEmailnPhone.metadata.email_n_phone.phone)
    //             }
    //         } else {
    //             console.log('error');
    //             return;
    //         }
    //     }
    //     checkEmailPhone();
    //     console.log('in change pw ', email, phone)
    // }, [email,phone,authenStatus])

    return (
        <div>
            <AuthenticationPopup
                open={open}
                setOpen={setOpen}
                setAuthenStatus={setAuthenStatus}
                authenStatus={authenStatus}
                emailInput={userEmail}
                phoneInput={userPhone}
                nextStep={() => setIsOpenChange(true)}
                icon={icon}
            />

            < PopupCenterPanel
                titleClassName="hidden"
                open={isOpenChange}
                setOpen={setIsOpenChange}
                content={
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-center font-semibold">Thay Đổi Mật Khẩu</div>
                        <div className="">
                            <label className="text-gray-400 text-xs" htmlFor="Nhập email mới">Nhập Mật Khẩu Mới</label>
                            <div className="flex border-b border-gray-200">
                                <input
                                    type={"password"}
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

                            <div className="flex flex-col gap-1 mt-1 text-xs text-red-500">
                                <div className={`${messages.length === 0 ? 'hidden' : ''}`}>
                                    {console.log(messages.length)}
                                    Mật khẩu phải bao gồm:
                                </div>
                                {
                                    messages.map((message) => (
                                        <div key={message.code}>{message.message}</div>
                                    ))
                                }
                            </div>


                        </div>
                        <div className="flex items-center mt-4 justify-center">
                            <button className={`w-4/5 h-10 rounded-full text-white font-normal xl:font-semibold xl: text-base bg-gradient-to-r from-pink-500 to-red-500 transition-all xl:hover:from-red-400 xl:hover:to-pink-400`}
                                onClick={handleUpdatePassword}
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

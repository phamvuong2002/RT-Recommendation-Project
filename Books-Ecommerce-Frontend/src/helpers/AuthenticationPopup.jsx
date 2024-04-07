import React, { useEffect, useState } from 'react'
import { PopupCenterPanel } from '../components/popup/PopupCenterPanel'
import { TextLoader } from '../components/loaders/TextLoader';
import OtpInput from 'react-otp-input';
import { fetchData } from './fetch';

export const AuthenticationPopup = ({ open, setOpen, icon, authenStatus, setAuthenStatus, nextStep, handleError }) => {    // const handleAuthenEmail = async (user) => {
    const [reload, setReload] = useState(false);
    const [sendOtpStatus, setSendOtpStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [otp, setOtp] = useState('');
    const [vaildOtpMessage, setVaildOtpMessage] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);

    const NUMLOADERS = 1;
    const RESENDOTPTIME = 60

    const handleReturn = () => {
        setEmail('');
        setPhonenumber('');
        setReload(!reload);
    }

    const handleChooseEmail = async () => {
        //Xử lý gửi mã OTP tới Email
        setLoading(true);
        setTimeout(() => {
            setEmail("girfler@gmail.com");
            setTimeLeft(RESENDOTPTIME);
            setSendOtpStatus(true);
            setLoading(false);
        }, 1000)
    }

    const handleChooseSMS = async () => {
        //Xử lý gửi mã OTP tới số điện thoại
        setLoading(true);
        setTimeout(() => {
            setPhonenumber("0948908485");
            setTimeLeft(RESENDOTPTIME);
            setSendOtpStatus(true);
            setLoading(false);
        }, 1000)
    }

    const handleSubmit = async () => {
        //Xử lý xác thực mã otp
        setLoading(true);
        // const url = '';
        try {
            // const status = await fetchData(url);
            const status = 'ok'
            setVaildOtpMessage('')
            setTimeout(() => {
                if (status === 'ok') {
                    setAuthenStatus('success');
                }
                else {
                    setVaildOtpMessage('Mã OTP không khớp. Vui lòng thử lại!')
                    setAuthenStatus('falied');
                }
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }

    //Xử lý gửi lại mã OTP
    const handleResendOTP = async () => {
        if (timeLeft > 0) {
            setVaildOtpMessage(`Hãy thử lại sau {timeLeft} giây`)
            return
        }
        else {
            if (email) {
                await handleChooseEmail()
            }
            else {
                await handleChooseSMS()
            }
        }
    }

    useEffect(() => {
        setOpen(false);
        setSendOtpStatus(false);
        setLoading(false);
    }, [reload])

    useEffect(() => {
        if (authenStatus === 'pending') {
            return
        }

        if (authenStatus === "success") {
            if (nextStep) {
                nextStep(true);
                setOpen(false);
            }
        }
        else {
            setLoading(false);
            setAuthenStatus('');
        }
    }, [authenStatus])

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        // Clear interval khi component bị unmount
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <PopupCenterPanel
                open={open}
                setOpen={setOpen}
                icon={icon}
                title="Xác minh bảo mật"
                titleClassName="text-base"
                content={
                    <div>
                        {
                            !loading ?
                                sendOtpStatus ?
                                    <div className="flex flex-col gap-1 w-full">
                                        <div className="font-semibold">Nhập mã</div>
                                        <div className="flex text-sm flex-col text-gray-400">
                                            <div >
                                                Nhập mã 6 ký tự đã gửi về {email ? 'Email' : 'Số điện thoại'}
                                            </div>
                                            <div>
                                                {email || phonenumber}
                                            </div>
                                        </div>
                                        <div className='flex '>
                                            <OtpInput
                                                value={otp}
                                                onChange={setOtp}
                                                numInputs={6}
                                                shouldAutoFocus={true}
                                                renderSeparator={<span> </span>}
                                                renderInput={(props, index) => (
                                                    <input
                                                        {...props}
                                                        type="number" // Đặt loại input là number
                                                        inputMode="numeric" // Đặt mode của input là numeric để hiển thị bàn phím số trên di động
                                                        maxLength={1} // Đặt độ dài tối đa của mỗi input là 1
                                                        key={index} // Key là index để đảm bảo mỗi input được render một cách độc lập
                                                    />
                                                )}
                                                inputStyle={
                                                    {
                                                        backgroundColor: "rgb(226 232 240)",
                                                        borderRadius: "8px",
                                                        width: "40px",
                                                        height: "40px",
                                                        fontSize: "14px",
                                                        fontWeight: "bold",
                                                        caretColor: "rgb(248 113 113)",
                                                        border: "none",
                                                        WebkitAppearance: "none",
                                                        margin: 0
                                                        // outline: "1px solid red",
                                                    }}
                                                containerStyle={"ml-2 xl:ml-20 mt-4 flex gap-1 xl:gap-2"}
                                            />
                                        </div>
                                        <div className="text-sm text-red-500">{vaildOtpMessage}</div>
                                        <div className="mt-2 ml-2 text-sm text-blue-500">
                                            <div>
                                                {timeLeft <= 0 ?
                                                    <div className="cursor-pointer" onClick={handleResendOTP}>Nhận mã mới</div>
                                                    :
                                                    <div>
                                                        Gửi lại sau: {timeLeft} giây
                                                    </div>
                                                }
                                            </div>

                                        </div>
                                        <div className="flex items-center justify-center">
                                            <button className=" mt-4 w-4/5 h-10 rounded-full text-white font-normal xl:font-semibold xl: text-base bg-gradient-to-r from-pink-500 to-red-500 transition-all xl:hover:from-red-400 xl:hover:to-pink-400"
                                                onClick={handleSubmit}>
                                                Xác minh
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <div className="flex flex-col gap-2 font-inter">
                                        <div className="flex items-center justify-center">
                                            <img src="/img/shield.png" alt="shield" />
                                        </div>
                                        <div className="flex px-2 text-sm xl:text-base text-gray-400 font-semibold text-center">
                                            Để bảo vệ bảo mật tài khoản của bạn, chúng tôi cần xác minh danh tính của bạn
                                        </div>
                                        <div className="flex px-2 mt-2 text-sm xl:text-base text-gray-400 font-semibold text-center justify-center">
                                            Vui lòng chọn cách xác minh:
                                        </div>
                                        <div className="flex gap-4 flex-col mt-2">
                                            <div
                                                className="flex justify-between w-full text-gray-400 h-10 border border-gray-300 px-1 hover:bg-red-500 hover:text-white cursor-pointer"
                                                onClick={handleChooseEmail}>
                                                <div className="flex gap-1 items-center  font-semibold">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(226 232 240)" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                                    </svg>

                                                    <div> Xác minh qua Email</div>
                                                </div>
                                                <div className="flex items-center font-semibold">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                    </svg>

                                                </div>
                                            </div>

                                            <div
                                                className="flex justify-between w-full text-gray-400 h-10 border border-gray-300 px-1 hover:bg-red-500 hover:text-white cursor-pointer"
                                                onClick={handleChooseSMS}
                                            >
                                                <div className="flex gap-1 items-center  font-semibold">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                                    </svg>

                                                    <div> Xác minh qua mã SMS</div>
                                                </div>
                                                <div className="flex items-center font-semibold">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="flex items-center justify-center text-[0.8rem] gap-1 font-semibold text-red-500 mt-4 pr-2 cursor-pointer" onClick={handleReturn}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                            </svg>
                                            <span>Quay Lại</span>
                                        </div> */}
                                    </div>
                                :
                                <TextLoader items={NUMLOADERS} />
                        }
                        <div className="flex items-center justify-center text-[0.8rem] gap-1 font-semibold text-red-500 mt-4 pr-2 cursor-pointer" onClick={handleReturn}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                            <span>Quay Lại</span>
                        </div>
                    </div>
                }

            />
        </div>
    )
}

import React, { useContext, useEffect, useState } from 'react';
import { PopupCenterPanel } from '../components/popup/PopupCenterPanel';
import { TextLoader } from '../components/loaders/TextLoader';
import OtpInput from 'react-otp-input';
import { fetchData } from './fetch';
import { auth } from '../configs/firebase.config';
import {
  EmailAuthCredential,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { CircleLoader } from '../components/loaders/CircleLoader';

//USER SERVICE
import { sendEmailOTP, verifyEmailOTP } from '../apis/emailOTP';
import { fetchAPI } from './fetch';
import { initializeFirebaseAuth } from '../configs/firebase_v2.config';
import { AppContext } from '../contexts/main';
import { SendingEmail } from '../components/loaders/SendingEmail';

export const AuthenticationPopup = ({
  open,
  setOpen,
  emailInput,
  phoneInput,
  icon,
  authenStatus,
  setAuthenStatus,
  nextStep,
  handleError,
}) => {
  // const handleAuthenEmail = async (user) => {
  const { setIsLoading } = useContext(AppContext);
  const [reload, setReload] = useState(false);
  const [sendOtpStatus, setSendOtpStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(emailInput);
  const [phonenumber, setPhonenumber] = useState(phoneInput);
  const [otp, setOtp] = useState('');
  const [vaildOtpMessage, setVaildOtpMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [sendOTPMessage, setSendOTPMessage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [isVerifiedbyEmail, setVerifybyEmail] = useState(false);

  const NUMLOADERS = 1;
  const RESENDOTPTIME = 60;

  const handleReturn = () => {
    // setEmail('');
    // setPhonenumber('');
    setSendOTPMessage('');
    setIsPending(false);
    setReload(!reload);
  };

  const handleChooseEmail = async () => {
    setVerifybyEmail(true);

    //Xử lý gửi mã OTP tới Email
    // setLoading(true);
    if (!emailInput) {
      setTimeout(() => {
        handleReturn();
      }, 1000);
      // setEmail('girfler@gmail.com');
    } else {
      setEmail(emailInput);
      setLoading(true);
      // setSendOtpStatus(true);
      const sendOTP = await fetchAPI(`../${sendEmailOTP}`, 'POST', {
        email: email,
      });
      
      if (sendOTP.status === 200) {
        setLoading(false);
        // console.log('in send otp success')
        setSendOtpStatus(true);
        setTimeLeft(RESENDOTPTIME);
        setLoading(false);
      } else {
        setLoading(false);
        setSendOtpStatus(false);
        setSendOTPMessage(
          'OTP đã không được gửi, vui lòng kiểm tra lại Email và thử lại!',
        );
        //auto return
        setTimeout(() => {
          handleReturn();
        }, 3000);
        // }
      }
    }
    // setTimeLeft(RESENDOTPTIME);
    // setSendOtpStatus(true);
    // setLoading(false);
  };

  //Xử lý gửi mã OTP tới số điện thoại
  const handleChooseSMS = async () => {
    setVerifybyEmail(false);
    setIsPending(true);
    if (!phoneInput) {
      setSendOtpStatus(false);
      setSendOTPMessage('Số điện thoại không đúng format. Vui lòng nhập lại!');
      setTimeout(() => {
        handleReturn();
      }, 3000);
      return;
    } else {
      setPhonenumber(phoneInput);
      // setSendOtpStatus(true);
      const auth_v2 = await initializeFirebaseAuth();
      if (auth_v2 === null) {
        setSendOTPMessage(
          'Dịch vụ xác thực bằng OTP đang bảo trì. Vui lòng sử dụng các dịch vụ khác để xác thực!',
        );
        setTimeout(() => {
          handleReturn();
        }, 2000);
        return false;
      }
      await authenFunction(phonenumber, auth_v2);
    }
    // setPhonenumber(phoneInput);
    // setSendOtpStatus(true);
    // setIsPending(false);
  };

  const handleSubmit = async () => {
    //Xử lý xác thực mã otp
    if (email) {
      const emailOTP = await fetchAPI(`../${verifyEmailOTP}`, 'POST', {
        email: email,
        otp: otp,
      });

      if (emailOTP.status === 200) {
        console.log('sucess');
        setAuthenStatus('success');
        setVaildOtpMessage('');
      } else {
        setVaildOtpMessage('Mã OTP không khớp. Vui lòng thử lại!');
        setAuthenStatus('falied');
        setOtp('');
      }
    } else if (phonenumber) {
      setIsLoading(true);
      window.confirmationResult
        .confirm(otp)
        .then(async (res) => {
          setAuthenStatus('success');
          setVaildOtpMessage('');
          setIsLoading(false);
        })
        .catch((err) => {
          setVaildOtpMessage('Mã OTP không khớp. Vui lòng thử lại!');
          setIsLoading(false);
          setAuthenStatus('falied');
          setOtp('');
        });
      // setAuthenStatus('success');
      // setVaildOtpMessage('');
    }

    // setAuthenStatus('success');
    // setVaildOtpMessage('');
    // handleReturn();
    // setOtp('');
  };

  //Xử lý gửi lại mã OTP
  const handleResendOTP = async () => {
    if (timeLeft > 0) {
      setVaildOtpMessage(`Hãy thử lại sau ${timeLeft} giây`);
      return;
    } else {
      if (email) {
        setVaildOtpMessage('');
        await handleChooseEmail();
      } else {
        setVaildOtpMessage('');
        await handleChooseSMS();
      }
    }
  };

  //Xử lý authen với dịch vụ của firebase
  const onCaptchaVerify = (auth_v2) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth_v2,
        // auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            if (!response) return;
            authenFunction(phonenumber, auth_v2);
            window.recaptchaVerifier = null;
          },
          'expired-callback': () => {},
        },
      );
    }
  };

  //Xử lý authen với firebase
  const authenFunction = async (phonenumber, auth_v2) => {
    if (!auth_v2) return;
    setSendOTPMessage('');
    onCaptchaVerify(auth);
    const appVerifier = window.recaptchaVerifier;

    const formatedPhone = `+84${phonenumber.slice(1) || phoneInput.slice(1)}`;

    // signInWithPhoneNumber(auth, formatedPhone, appVerifier)
    signInWithPhoneNumber(auth_v2, formatedPhone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setTimeLeft(RESENDOTPTIME);
        setSendOtpStatus(true);
      })
      .catch((error) => {
        // if (error.message === 'Firebase: Error (auth/too-many-requests).') {
        //   setSendOtpStatus(false);
        //   setSendOTPMessage(
        //     'OTP đã không được gửi, vui lòng kiểm tra lại SĐT và thử lại!',
        //   );
        //   //auto return
        //   setTimeout(() => {
        //     handleReturn();
        //   }, 3000);
        // }
        console.log('Firebase Error::', error);
      });
  };

  useEffect(() => {
    setOpen(false);
    setSendOtpStatus(false);
    setLoading(false);
  }, [reload]);

  useEffect(() => {
    if (authenStatus === 'pending') {
      return;
    }

    if (authenStatus === 'success') {
      if (nextStep) {
        nextStep();
        setOpen(false);
      }
    } else {
      setLoading(false);
      setAuthenStatus('');
    }
  }, [authenStatus]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clear interval khi component bị unmount
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (emailInput && !phoneInput) {
      setEmail(emailInput);
      setVerifybyEmail(true);
    } else if (!emailInput && phoneInput) {
      setPhonenumber(phoneInput);
      setVerifybyEmail(false);
    } else if (emailInput && phoneInput) {
      setPhonenumber(phoneInput);
      setEmail(emailInput);
    }
    // console.log('email phone input received', email, emailInput, phonenumber, phoneInput)
  }, [emailInput, phoneInput]);

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
            {!loading ? (
              sendOtpStatus ? (
                <div className="flex flex-col gap-1 w-full">
                  <div className="font-semibold">Nhập mã</div>
                  <div className="flex text-sm flex-col text-gray-400">
                    <div>
                      Nhập mã 6 ký tự đã gửi về{' '}
                      {isVerifiedbyEmail ? 'Email' : 'Số điện thoại'}
                    </div>
                    <div>{isVerifiedbyEmail ? email : phonenumber}</div>
                  </div>
                  <div className="flex ">
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
                      inputStyle={{
                        backgroundColor: 'rgb(226 232 240)',
                        borderRadius: '8px',
                        width: '40px',
                        height: '40px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        caretColor: 'rgb(248 113 113)',
                        border: 'none',
                        WebkitAppearance: 'none',
                        margin: 0,
                        // outline: "1px solid red",
                      }}
                      containerStyle={'ml-2 xl:ml-20 mt-4 flex gap-1 xl:gap-2'}
                    />
                  </div>
                  <div className="text-sm text-red-500">{vaildOtpMessage}</div>
                  <div className="mt-2 ml-2 text-sm text-blue-500">
                    <div>
                      {timeLeft <= 0 ? (
                        <div
                          className="cursor-pointer"
                          onClick={handleResendOTP}
                        >
                          Nhận mã mới
                        </div>
                      ) : (
                        <div>Gửi lại sau: {timeLeft} giây</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      className=" mt-4 w-4/5 h-10 rounded-full text-white font-normal xl:font-semibold xl: text-base bg-gradient-to-r from-pink-500 to-red-500 transition-all xl:hover:from-red-400 xl:hover:to-pink-400"
                      onClick={handleSubmit}
                    >
                      Xác minh
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 font-inter">
                  <div className="flex items-center justify-center">
                    <img
                      className="w-20 h-20 xl:w-28 xl:h-28"
                      src="data:image/png;base64,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"
                    ></img>
                  </div>
                  <div className="flex px-2 text-sm xl:text-base text-gray-400 font-semibold text-center">
                    Để bảo vệ bảo mật tài khoản của bạn, chúng tôi cần xác minh
                    danh tính của bạn
                  </div>
                  <div className="flex px-2 mt-2 text-sm xl:text-base text-gray-400 font-semibold text-center justify-center">
                    Vui lòng chọn cách xác minh:
                  </div>
                  <div className="flex gap-4 flex-col mt-2">
                    {emailInput && phoneInput && (
                      <div className="flex gap-4 flex-col mt-2">
                        {/* Authen by Email */}
                        <div
                          className="flex justify-between w-full text-gray-400 h-10 border border-gray-300 px-1 hover:bg-red-500 hover:text-white cursor-pointer"
                          onClick={handleChooseEmail}
                        >
                          <div className="flex gap-1 items-center  font-semibold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="rgb(226 232 240)"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                              />
                            </svg>

                            <div> Xác minh qua Email</div>
                          </div>
                          <div className="flex items-center font-semibold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m8.25 4.5 7.5 7.5-7.5 7.5"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* // Authen by SMS */}
                        <div
                          className="flex justify-between w-full text-gray-400 h-10 border border-gray-300 px-1 hover:bg-red-500 hover:text-white cursor-pointer"
                          onClick={handleChooseSMS}
                        >
                          <div className="flex gap-1 items-center font-semibold">
                            {isPending ? (
                              <CircleLoader
                                height={'h-6'}
                                width={'w-6'}
                                color={'fill-red-500'}
                              />
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                                />
                              </svg>
                            )}

                            <div>Xác minh qua mã SMS</div>
                          </div>
                          <div className="flex items-center font-semibold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m8.25 4.5 7.5 7.5-7.5 7.5"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                    {emailInput && !phoneInput && (
                      // {/* Authen by Email */}
                      <div
                        className="flex justify-between w-full text-gray-400 h-10 border border-gray-300 px-1 hover:bg-red-500 hover:text-white cursor-pointer"
                        onClick={handleChooseEmail}
                      >
                        <div className="flex gap-1 items-center  font-semibold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="rgb(226 232 240)"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                            />
                          </svg>

                          <div> Xác minh qua Email</div>
                        </div>
                        <div className="flex items-center font-semibold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                    {!emailInput && phoneInput && (
                      // Authen by SMS
                      <div
                        className="flex justify-between w-full text-gray-400 h-10 border border-gray-300 px-1 hover:bg-red-500 hover:text-white cursor-pointer"
                        onClick={handleChooseSMS}
                      >
                        <div className="flex gap-1 items-center  font-semibold">
                          {isPending ? (
                            <CircleLoader
                              height={'h-6'}
                              width={'w-6'}
                              color={'fill-red-500'}
                            />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                              />
                            </svg>
                          )}

                          <div>Xác minh qua mã SMS</div>
                        </div>
                        <div className="flex items-center font-semibold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Thông báo lỗi */}
                  <div>
                    {sendOTPMessage ? (
                      <div
                        className="flex items-center justify-center text-[0.8rem] gap-1 font-semibold text-red-500 mt-4 pr-2 cursor-pointer"
                        onClick={handleReturn}
                      >
                        <span>Có một sự cố: {sendOTPMessage}</span>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              )
            ) : (
              // <TextLoader items={NUMLOADERS} />
              <SendingEmail/>
            )}
            <div
              className="flex items-center justify-center text-[0.8rem] gap-1 font-semibold text-red-500 mt-4 pr-2 cursor-pointer"
              onClick={handleReturn}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
              <span>Quay Lại</span>
            </div>
            <div className="flex justify-center w-full mt-8">
              <div id="recaptcha-container"></div>
            </div>
          </div>
        }
      />
    </div>
  );
};

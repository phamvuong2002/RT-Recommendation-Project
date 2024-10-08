import { useState, Fragment, useEffect, useContext, useRef } from 'react';
import { Tab, Transition } from '@headlessui/react';
import { FaFacebook } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { isValidPhoneNumber } from '../utils/isValidPhoneNumber';
import { AuthenticationPopup } from '../helpers/AuthenticationPopup';
import { validatePassword } from '../utils/validatePassword';
import { ChangePassword } from '../helpers/ChangePassword';
import { AppContext } from '../contexts/main';
import { useNavigate } from 'react-router-dom';
import { fetchAPI } from '../helpers/fetch';
import { login } from '../apis/access';

import {
  checkEmailnPhone,
  getUserInfo,
  getID,
  updateUserInfo,
} from '../apis/user';
import { signup_user, login_user, login_sms } from '../apis/access';
import { TfiEmail } from 'react-icons/tfi';
import { validateEmail } from '../utils/validateEmail';

//
export default function Login_SignUp({
  reload,
  setReload,
  onlySignup = 0,
  setOpen,
  open,
}) {
  const {
    requestAuth,
    setRequestAuth,
    userId,
    token,
    setToken,
    setUserId,
    setSession,
    setIsLoading,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const [authenStatus, setAuthenStatus] = useState('pending');
  const [accountLogin, setAccountLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [againPass, setAgainPass] = useState('');
  const [isShowSMSLogin, setIsShowSMSLogin] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [message, setMessage] = useState('');
  const [ishowAuthenPopup, setIsShowAuthenPopup] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isCreatedPassSuccess, setIsCreatedPassSuccess] = useState(false);

  const [isOpenForgetPass, setIsOpenForgetPass] = useState(false);
  const [accountForgot, setAccountForgot] = useState('');

  const [isEmailSignup, setIsEmailSignup] = useState(false);
  const [emailSignupMessage, setEmailSignupMessage] = useState('');

  const [isSMSLogin, setSMSLogin] = useState(false);

  const [selectedTab, setSelectedTab] = useState('login');

  /************************CHECK AUTHENTICATION***********************************/
  //Router thủ công cho những trang yêu cầu Xác Thực Tài Khoản
  //Sử dung các biến token, userId, requestAuth (và một số biến liên quan)
  //Để xác định có cần xác thực
  //*** Lưu Ý: cần phải reset các biến yêu cầu xác thực khi xác thực thành công
  //**** SET TOKEN CHO USER ĐÃ XÁC THỰC THÀNH CÔNG
  useEffect(() => {
    if (requestAuth && (!token || token === 'unkown') && !open) {
      //Về home nếu user thoát xác thực (vấn bậc popup yêu cầu xác thực ở trang home)
      // navigate('/');
      setRequestAuth(false);
    }
  }, [requestAuth, userId, token, open]);
  /***********************************************************/

  // -------LOGIN--------------------
  //Xử lý đăng nhập bằng account
  const handleLogin = async () => {
    if (!accountLogin || !passwordLogin) {
      setMessage('Email hoặc Số điện thoại không hợp lệ');
      return;
    }
    const isValidEmail = validateEmail(accountLogin);
    const isValidPhonenum = isValidPhoneNumber(accountLogin);

    let login_user_data = '';
    setIsLoading(true);
    if (isValidEmail.status) {
      // console.log(isValidEmail)
      login_user_data = await fetchAPI(`../${login_user}`, 'POST', {
        loginMethod: 'email',
        loginMethodValue: accountLogin,
        password: passwordLogin,
      });
      // const auth = "!ok"
    } else if (isValidPhonenum) {
      // console.log(isValidPhonenum)
      login_user_data = await fetchAPI(`../${login_user}`, 'POST', {
        loginMethod: 'phone',
        loginMethodValue: accountLogin,
        password: passwordLogin,
      });
      // // const auth = "!ok"
      // console.log('login user ', login_user_data);
    } else {
      setMessage('Email hoặc Số điện thoại không hợp lệ');
      setIsLoading(false);
      return;
    }

    // console.log('login_user_data', login_user_data);
    if (login_user_data.status === 200) {
      // const userid = login_user_data.metadata.user.user._id
      // setloginuser(login_user_data)
      // // console.log(userid)
      // const user_db = await fetchAPI(`../${getUserInfo}`, 'POST', {
      //   userId: userid,
      // })
      // console.log('userdb ', user_db)
      // console.log('status 200')

      // setSession();
      if (login_user_data.metadata.tokens) {
        // console.log('tokens ', login_user_data.metadata.user.tokens);
        setToken(login_user_data.metadata.tokens.accessToken);
      }
      // console.log(login_user_data.metadata.user._id);
      setUserId(login_user_data.metadata.user._id);
      setAuthenStatus('success');
    } else {
      setMessage('Tài khoản hoặc mật khẩu không đúng!');
      setIsLoading(false);
      return;
    }
  };

  // Xử lý đăng nhập bằng SĐT
  const handleLoginSMS = async () => {
    setSMSLogin(true);
    if (!isValidPhoneNumber(phoneInput)) {
      if (!phoneInput) {
        setMessage('Bạn chưa nhập số điện thoại!');
        return;
      }
      setMessage('Số điện thoại không hợp lệ!');
      return;
    }
    const isRegistered = await fetchAPI(`../${checkEmailnPhone}`, 'POST', {
      method: 'phone',
      methodValue: phoneInput,
    });

    if (!isRegistered.metadata.isUsed) {
      setMessage(
        'Số điện thoại chưa đăng ký. Vui lòng đăng ký để sử dụng dịch vụ của chúng tôi. Xin cảm ơn',
      );
      return;
    }

    setIsShowAuthenPopup(true);
  };

  // --------SIGNUP--------------------
  //Xử lý đăng ký bằng SĐT
  const handleSignUpSMS = async () => {
    if (!isValidPhoneNumber(phoneInput)) {
      if (!phoneInput) {
        setMessage('Bạn chưa nhập số điện thoại!');
        return;
      }
      setMessage('Số điện thoại không hợp lệ!');
      return;
    }

    const isRegistered = await fetchAPI(`../${checkEmailnPhone}`, 'POST', {
      method: 'phone',
      methodValue: phoneInput,
    });

    if (isRegistered.status === 200) {
      if (isRegistered.metadata.isUsed) {
        setMessage(
          'Số điện thoại đã được đăng ký, vui lòng đăng ký bằng Số điện thoại khác',
        );
        return;
      } else {
        setIsSignUp(true);
        setIsShowAuthenPopup(true);
      }
    } else {
      setMessage('Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau');
    }
  };

  const handleSignUpFB = async () => {setMessage("Dịch vụ xác thực với Facebook đang được bảo trì. Vui lòng thử đăng ký với SĐT hoặc Email")};

  const handleSignUpGG = async () => {setMessage("Dịch vụ xác thực với Google đang được bảo trì. Vui lòng thử đăng ký với SĐT hoặc Email")};

  //Xử lý đăng ký bằng Email
  const handleSignUpEmail = async () => {
    const isValidEmail = validateEmail(emailInput);
    // console.log('in handle signup: ', emailInput);
    //email hợp lệ
    if (isValidEmail.status) {
      const isRegistered = await fetchAPI(`../${checkEmailnPhone}`, 'POST', {
        method: 'email',
        methodValue: emailInput,
      });

      if (isRegistered.status === 200) {
        if (isRegistered.metadata.isUsed) {
          setEmailSignupMessage(
            'Email đã được đăng ký, vui lòng đăng ký bằng Email khác',
          );
          return;
        } else {
          setIsSignUp(true);
          setIsShowAuthenPopup(true);
        }
      } else {
        setMessage(
          'Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau',
        );
      }
    } else {
      setEmailSignupMessage('Email không hợp lệ');
      return;
    }
  };

  useEffect(() => {
    if (isEmailSignup) {
      setPhoneInput('');
    } else {
      setEmailInput('');
      setEmailSignupMessage('');
    }
    // console.log('is email signup ', isEmailSignup)
  }, [isEmailSignup]);

  //Xử lý tạo mật khẩu
  const handleCreatePassword = async () => {
    if (againPass !== passwordSignUp) {
      setMessage('Mật khẩu nhập lại không trùng khớp!');
      return;
    }

    //Tạo mật khẩu thành công --> đăng ký
    // console.log('handle create pw')
    const check = validatePassword(againPass);

    if (check.length === 0) {
      // //xử lý tạo mật khẩu mới
      setIsCreatedPassSuccess(true);
    } else {
      setMessages(check);
    }
  };

  //Xử lý quên mật khẩu
  const handleForgetPassword = async () => {
    // Tìm email và sđt của forgot account
    // const email = 'vuongdaquen@gmail.com';
    // const phone = '0919489084';
    // console.log('forgot account: ', accountForgot);
    let resetMethod = '';
    let email = '';
    let phone = '';
    const isValidEmail = validateEmail(accountForgot);
    const isValidPhonenum = isValidPhoneNumber(accountForgot);
    let checkRegistered = '';
    // console.log(isValidEmail, isValidPhonenum);
    if (isValidEmail.status) {
      resetMethod = 'email';
      checkRegistered = await fetchAPI(`../${checkEmailnPhone}`, 'POST', {
        method: 'email',
        methodValue: accountForgot,
      });
      email = accountForgot;
    } else if (isValidPhonenum) {
      resetMethod = 'phone';
      checkRegistered = await fetchAPI(`../${checkEmailnPhone}`, 'POST', {
        method: 'phone',
        methodValue: accountForgot,
      });
      phone = accountForgot;
    } else {
      setMessage('Email hoặc Số điện thoại không hợp lệ');
      return;
    }

    // console.log('phone', phone);
    if (checkRegistered.status === 200) {
      // console.log(resetMethod);
      const userID = await fetchAPI(`../${getID}`, 'POST', {
        method: resetMethod,
        methodValue: accountForgot,
      });

      if (
        checkRegistered.metadata.isUsed &&
        resetMethod == 'email' &&
        userID.status == 200 &&
        userID.metadata.user_id
      ) {
        // console.log(userID.metadata.user_id._id)
        setUserId(userID.metadata.user_id._id);
        setEmailInput(email);
        setIsShowAuthenPopup(true);
      } else if (
        checkRegistered.metadata.isUsed &&
        resetMethod == 'phone' &&
        userID.status == 200 &&
        userID.metadata.user_id
      ) {
        setUserId(userID.metadata.user_id._id);
        setPhoneInput(phone);
        setIsShowAuthenPopup(true);
      } else {
        setMessage('Không tìm thấy tài khoản này');
      }
    } else {
      setMessage('Đã xảy ra lỗi. Vui lòng thử lại sau');
    }
  };

  //xử lý sau khi đã xác thực
  useEffect(() => {
    // console.log('authentication::', authenStatus);
    // Đăng nhập
    if (authenStatus === 'success' && !isSignUp && !isOpenForgetPass) {
      // nếu login = sms và Nhận mã otp thành công
      if (isSMSLogin) {
        const login_by_sms = async () => {
          setIsLoading(true);
          const login_result = await fetchAPI(`../${login_sms}`, 'POST', {
            phone: phoneInput,
          });
          if (login_result.status === 200) {
            // console.log('status 200')
            // setSession();
            if (login_result.metadata.tokens) {
              // console.log('tokens ', login_result.metadata.user.tokens)
              setToken(login_result.metadata.tokens.accessToken);
            }
            // console.log(login_result.metadata.user._id);
            setUserId(login_result.metadata.user._id);
            setAuthenStatus('success');
          } else {
            setMessage(
              'Đã có lỗi trong quá trình đăng nhập. Xin vui lòng thử lại sau. Xin cảm ơn',
            );
            return;
          }
          setIsLoading(false);
          // setOpen(false);
          // console.log('set token, userid after Signup')
        };
        login_by_sms();
      }
      setIsLoading(false);
      // console.log('login success');
      setOpen(false);
    }
    // Đăng ký
    if (authenStatus === 'success' && isSignUp && isCreatedPassSuccess) {
      // console.log('register')
      const signup_for_user = async () => {
        setIsLoading(true);
        //Đăng ký
        let method = '';
        let methodValue = '';
        if (emailInput) {
          method = 'email';
          methodValue = emailInput;
        } else if (phoneInput) {
          method = 'phone';
          methodValue = phoneInput;
        }
        // console.log(method, methodValue);
        const signup_ = await fetchAPI(`../${signup_user}`, 'POST', {
          signupMethod: method,
          signupMethodValue: methodValue,
          password: passwordSignUp,
        });
        // console.log('signp_up result: ', signup_);
        //TẠO THẤT BẠI
        if (signup_.status !== 201) {
          setMessages([
            { code: '400', message: 'Lỗi cập nhật! vui lòng thử lại sau.' },
          ]);
          return;
        }

        // setSession(loginuser.metadata.sessionid);
        setToken(signup_.metadata.tokens.accessToken);
        setUserId(signup_.metadata.user._id);
        setIsLoading(false);
        // setOpen(false);
        // console.log('set token, userid after Signup');
      };

      signup_for_user();
      // setUser(sampleUser);
      // console.log('after calling signup')
    }
    //Forgot password
    if (
      authenStatus === 'success' &&
      isOpenForgetPass &&
      isCreatedPassSuccess
    ) {
      const reset_pw_user = async () => {
        setIsLoading(true);
        const updatePW = await fetchAPI(`../${updateUserInfo}`, 'POST', {
          updatedField: 'pw',
          updatedValue: passwordSignUp,
          userId: userId,
        });

        if (updatePW.status === 200) {
          setOpen(false);
          setReload(true);
        } else {
          //update thất bại
          setMessages([
            { code: '400', message: 'Lỗi cập nhật! vui lòng thử lại sau.' },
          ]);
          setOpen(false);
        }
        setIsLoading(false);
      };
      // console.log('change pw');
      reset_pw_user();
    }

    setMessage('');
    setMessages([]);
  }, [authenStatus, isSignUp, isCreatedPassSuccess, isOpenForgetPass]);

  //set auto focus input
  useEffect(() => {
    if(selectedTab === 'login'){
      if(isShowSMSLogin){
        document.getElementById('sms_login').focus();
      }else{
        document.getElementById('email_login')?.focus();
      }
      
    }else{
       if(isEmailSignup){
        document.getElementById('email_signup').focus();
      }else{
        document.getElementById('sms_signup').focus();
      }
    }
  }, [isShowSMSLogin, selectedTab, isEmailSignup]);

  

  return (
    <div className="w-full max-w-md mx-auto py-auto sm:px-0 ">
      {/* Authen Popup */}
      <AuthenticationPopup
        open={ishowAuthenPopup}
        setOpen={setIsShowAuthenPopup}
        setAuthenStatus={setAuthenStatus}
        authenStatus={authenStatus}
        phoneInput={phoneInput}
        emailInput={emailInput}
        nextStep={() => setIsShowAuthenPopup(false)}
        // icon={icon}
      />
      <Tab.Group defaultIndex={onlySignup}>
        {/* Tab list: Danh sách Tab gồm (Đăng nhập, Đăng ký) */}
        <Tab.List className={`flex justify-around space-x-1 bg-white }`}>
          <Tab as={Fragment} className={`${onlySignup ? 'hidden' : ''}`}>
            {({ selected }) => (
              <button
                onClick={() => {setMessage(''); setSelectedTab("login")}}
                className={`w-1/2 py-1 sm:py-2.5 text-xs sm:text-sm font-medium leading-5 outline-none
                                    ${selected ? 'text-red-500 border-b-[1px] border-b-red-500' : ' text-black'}
                                `}
              >
                ĐĂNG NHẬP
              </button>
            )}
          </Tab>

          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                onClick={() => {setMessage(''); setSelectedTab("signup")}}
                className={`w-1/2 py-1 sm:py-2.5  text-xs sm:text-sm font-medium leading-5 bg-white outline-none
                                    ${selected ? 'text-red-500 border-b-[1px] border-b-red-500' : ' text-black'}
                                `}
              >
                ĐĂNG KÝ
              </button>
            )}
          </Tab>
        </Tab.List>

        <Tab.Panels className="bg-white">
          {/* Tab panels: gồm 2 panel lần lượt là Form Login/Signup */}
          <Tab.Panel
            className={`flex outline-none h-full flex-1 flex-col justify-center px-3 py-5 sm:py-12 lg:px-8 ${onlySignup ? 'hidden' : ''}`}
          >
            {isOpenForgetPass ? (
              <div>
                {authenStatus === 'success' ? (
                  <div>
                    {/* Password Form*/}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-center font-semibold">
                        Tạo Mật Khẩu
                      </div>
                      <div className="">
                        <div>
                          <label
                            className="text-gray-400 text-xs"
                            htmlFor="Nhập email mới"
                          >
                            Nhập Mật Khẩu
                          </label>
                          <div className="flex border-b border-gray-200">
                            <input
                              type={'password'}
                              className="w-full h-8 outline-none forcus:outline-none"
                              value={passwordSignUp}
                              onChange={(e) =>
                                setPasswordSignUp(e.target.value)
                              }
                              // readOnly
                            />
                            <div
                              className="flex items-center text-gray-400"
                              onClick={() => setPasswordSignUp('')}
                            >
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
                                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label
                            className="text-gray-400 text-xs"
                            htmlFor="Nhập email mới"
                          >
                            Nhập Lại Mật Khẩu
                          </label>
                          <div className="flex border-b border-gray-200">
                            <input
                              type={'password'}
                              className="w-full h-8 outline-none forcus:outline-none"
                              value={againPass}
                              onChange={(e) => {
                                setAgainPass(e.target.value);
                                setMessages([]);
                              }}
                              // readOnly
                            />
                            <div
                              className="flex items-center text-gray-400"
                              onClick={() => setAgainPass('')}
                            >
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
                                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 mt-1 text-xs text-red-500">
                          <div
                            className={`${messages.length === 0 ? 'hidden' : ''}`}
                          >
                            Mật khẩu phải bao gồm:
                          </div>
                          {messages.map((message) => (
                            <div key={message.code}>{message.message}</div>
                          ))}
                          {message}
                        </div>
                      </div>
                      <div className="flex items-center mt-4 justify-center">
                        <button
                          className={`w-4/5 h-10 rounded-full text-white font-normal xl:font-semibold xl: text-base bg-gradient-to-r from-pink-500 to-red-500 transition-all xl:hover:from-red-400 xl:hover:to-pink-400`}
                          onClick={handleCreatePassword}
                        >
                          Xác nhận
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm text-gray-400">
                      Vui lòng nhập tài khoản bạn muốn lấy lại mật khẩu.
                    </div>

                    <div className="mt-4">
                      <div className="text-sm font-semibold xl:mb-2">
                        Nhập Email hoặc Số Điện Thoại đã đăng ký
                      </div>
                      <div className="mt-1 mb-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex">
                            <input
                              type="text"
                              value={accountForgot}
                              onChange={(e) => {
                                setAccountForgot(e.target.value);
                                setMessage('');
                              }}
                              required
                              placeholder="Vui lòng nhập số điện thoại hoặc email"
                              className="block px-2 xl:px-3 h-10 w-full border-[1px] py-1.5 text-gray-900 placeholder:text-gray-400 placeholder:italic text-sm sm:text-sm sm:leading-6  focus:outline-none "
                            />
                          </div>
                          <div className="text-sm text-red-500">{message}</div>
                        </div>
                      </div>

                      <button
                        className="flex uppercase outline-none w-full h-10 items-center justify-center rounded-md bg-gradient-to-r from-pink-500 to-red-500 transition-all hover:from-red-400 hover:to-pink-400 px-1 sm:px-3 py-1.5  font-semibold leading-6  border-red-500  text-white shadow-sm text-xs sm:text-sm  "
                        onClick={handleForgetPassword}
                      >
                        XÁC NHẬN
                      </button>

                      <div
                        className="flex items-center justify-center text-[0.8rem] gap-1 font-semibold text-red-500 mt-4 pr-2 cursor-pointer"
                        onClick={() => setIsOpenForgetPass(false)}
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
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-2">
                  {isShowSMSLogin ? (
                    <div className="flex flex-col gap-2 mb-8">
                      {/* AUTHENTICATION */}
                      {/* SMS FORM */}
                      <div>
                        <div className="text-sm font-bold xl:mb-2">
                          Bạn Đang Dùng Số Di Động Nào?
                        </div>
                        <div className="mt-1">
                          <div className="flex flex-col gap-1">
                            <div className="flex">
                              <div className="w-[20%] text-xs flex items-center justify-center bg-gray-200 text-gray-400 rounded-l-md">
                                +84
                              </div>
                              <input
                                id="sms_login"
                                name="sms_login"
                                type="number"
                                value={phoneInput}
                                onChange={(e) => {
                                  setPhoneInput(e.target.value);
                                  setMessage('');
                                }}
                                required
                                placeholder="Nhập số di động"
                                className="block px-2 xl:px-3 h-10 rounded-r-md w-full border-[1px] py-1.5 text-gray-900 placeholder:text-gray-400 placeholder:italic text-sm sm:text-sm sm:leading-6  focus:outline-none "
                              />
                            </div>
                            <div className="text-sm text-red-500">
                              {message}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1 xl:gap-6">
                      {/* NORMAL FORM */}
                      {/* Tài Khoản */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs sm:text-sm font-medium leading-6 text-gray-900"
                        >
                          Tài Khoản
                        </label>
                        <div className="xl:mt-1">
                          <input
                            id="email_login"
                            name="email_login"
                            value={accountLogin}
                            onChange={(e) => setAccountLogin(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (document.getElementById('password_login').focus())}
                            required
                            placeholder="Vui lòng nhập Email hoặc Số điện thoại của bạn"
                            className="block px-2 xl:px-1 h-10 w-full rounded-sm border-[1px] py-1.5 text-gray-900 placeholder:text-gray-400 placeholder:italic text-xs sm:text-sm sm:leading-6  focus:outline-none "
                          />
                        </div>
                      </div>

                      {/* Mật khẩu */}
                      <div className="flex flex-col gap-2">
                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="password"
                              className="block text-xs sm:text-sm font-medium leading-6 text-gray-900 "
                            >
                              Mật Khẩu
                            </label>
                          </div>
                          <div className="xl:mt-1">
                            <input
                              id="password_login"
                              name="password_login"
                              type="password"
                              value={passwordLogin}
                              onChange={(e) => setPasswordLogin(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                              required
                              placeholder="Vui lòng nhập mật khẩu của bạn"
                              className="block px-2 xl:px-1 h-10 bg-white  w-full rounded-sm border-[1px]  py-1.5 text-gray-900 shadow-sm r placeholder:text-gray-400 placeholder:italic focus:outline-none text-xs sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="text-sm text-red-500">{message}</div>
                        <div
                          className="text-sm flex justify-end"
                          onClick={() => {
                            setIsOpenForgetPass(true);
                          }}
                        >
                          <button
                            href="#"
                            className="text-xs sm:text-sm font-semibold text-red-500 hover:text-red-400  "
                          >
                            Quên mật khẩu?
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="">
                    {isShowSMSLogin ? (
                      <button
                        type="submit"
                        className="flex outline-none w-full h-10 items-center justify-center rounded-md bg-gradient-to-r from-pink-500 to-red-500 transition-all hover:from-red-400 hover:to-pink-400 px-1 sm:px-3 py-1.5  font-semibold leading-6  border-red-500  text-white shadow-sm text-xs sm:text-sm  "
                        onClick={handleLoginSMS}
                      >
                        XÁC MINH QUA SMS
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="flex outline-none w-full h-10 items-center justify-center rounded-md bg-gradient-to-r from-pink-500 to-red-500 transition-all hover:from-red-400 hover:to-pink-400 px-1 sm:px-3 py-1.5  font-semibold leading-6  border-red-500  text-white shadow-sm text-xs sm:text-sm  "
                        onClick={handleLogin}
                      >
                        ĐĂNG NHẬP
                      </button>
                    )}
                  </div>

                  <div className="other_login_method flex flex-col ">
                    <div className="flex gap-3 xl:mt-4">
                      <div className="w-[8rem] xl:w-[10rem]">
                        <hr className="mt-[0.6rem]" />
                      </div>
                      <div className="text-gray-300 text-sm">HOẶC</div>
                      <div className="w-[8rem]">
                        <hr className="mt-[0.6rem] xl:w-[10rem]" />
                      </div>
                    </div>
                    <div className="login_button flex pt-3 mx-auto">
                      {/* SMS */}
                      <button
                        type="submit"
                        className=" flex outline-none justify-center border border-red-200 rounded-md bg-white hover:bg-slate-50 px-3 py-1.5 text-sm font-semibold leading-6   text-black shadow-sm items-center h-fit mr-4"
                        onClick={() => {
                          setIsShowSMSLogin(!isShowSMSLogin);
                          setMessage('');
                        }}
                      >
                        <div>
                          {!isShowSMSLogin ? (
                            <div>
                              <img
                                className="w-5 h-5 xl:w-6 xl:h-6"
                                src="data:image/png;base64,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"
                              />
                            </div>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="20"
                              height="20"
                              viewBox="0 0 64 64"
                            >
                              <radialGradient
                                id="mlOPB6MgzT0e4apRfleBda_119695_gr1"
                                cx="36.833"
                                cy="35.917"
                                r="26"
                                gradientUnits="userSpaceOnUse"
                                spreadMethod="reflect"
                              >
                                <stop offset="0" stopColor="#afeeff"></stop>
                                <stop offset=".193" stopColor="#bbf1ff"></stop>
                                <stop offset=".703" stopColor="#d7f8ff"></stop>
                                <stop offset="1" stopColor="#e1faff"></stop>
                              </radialGradient>
                              <path
                                fill="url(#mlOPB6MgzT0e4apRfleBda_119695_gr1)"
                                d="M10,8L10,8c2.209,0,4-1.791,4-4v0c0-2.209-1.791-4-4-4h0C7.791,0,6,1.791,6,4v0 C6,6.209,7.791,8,10,8z"
                              ></path>
                              <radialGradient
                                id="mlOPB6MgzT0e4apRfleBdb_119695_gr2"
                                cx="31.417"
                                cy="29.917"
                                r="28.77"
                                gradientUnits="userSpaceOnUse"
                                spreadMethod="reflect"
                              >
                                <stop offset="0" stopColor="#afeeff"></stop>
                                <stop offset=".193" stopColor="#bbf1ff"></stop>
                                <stop offset=".703" stopColor="#d7f8ff"></stop>
                                <stop offset="1" stopColor="#e1faff"></stop>
                              </radialGradient>
                              <path
                                fill="url(#mlOPB6MgzT0e4apRfleBdb_119695_gr2)"
                                d="M7.5,64L7.5,64c1.933,0,3.5-1.567,3.5-3.5v0c0-1.933-1.567-3.5-3.5-3.5h0 C5.567,57,4,58.567,4,60.5v0C4,62.433,5.567,64,7.5,64z"
                              ></path>
                              <radialGradient
                                id="mlOPB6MgzT0e4apRfleBdc_119695_gr3"
                                cx="32.5"
                                cy="32"
                                r="30.775"
                                gradientUnits="userSpaceOnUse"
                                spreadMethod="reflect"
                              >
                                <stop offset="0" stopColor="#afeeff"></stop>
                                <stop offset=".193" stopColor="#bbf1ff"></stop>
                                <stop offset=".703" stopColor="#d7f8ff"></stop>
                                <stop offset="1" stopColor="#e1faff"></stop>
                              </radialGradient>
                              <path
                                fill="url(#mlOPB6MgzT0e4apRfleBdc_119695_gr3)"
                                d="M62,20.5L62,20.5c0-2.485-2.015-4.5-4.5-4.5H44c-2.209,0-4-1.791-4-4v0c0-2.209,1.791-4,4-4 h2c2.209,0,4-1.791,4-4v0c0-2.209-1.791-4-4-4L22,0c-2.209,0-4,1.791-4,4v0c0,2.209,1.791,4,4,4h2c1.657,0,3,1.343,3,3v0 c0,1.657-1.343,3-3,3H10.5C8.567,14,7,15.567,7,17.5v0c0,1.933,1.567,3.5,3.5,3.5H13c1.657,0,3,1.343,3,3v0c0,1.657-1.343,3-3,3H8 c-2.761,0-5,2.239-5,5v0c0,2.761,2.239,5,5,5h5.5c1.933,0,3.5,1.567,3.5,3.5v0c0,1.933-1.567,3.5-3.5,3.5H9c-2.209,0-4,1.791-4,4v0 c0,2.209,1.791,4,4,4h8.5c1.381,0,2.5,1.119,2.5,2.5v0c0,1.381-1.119,2.5-2.5,2.5h0c-1.933,0-3.5,1.567-3.5,3.5v0 c0,1.933,1.567,3.5,3.5,3.5h30c1.933,0,3.5-1.567,3.5-3.5v0c0-1.933-1.567-3.5-3.5-3.5H47c-1.105,0-2-0.895-2-2v0 c0-1.105,0.895-2,2-2h7c2.209,0,4-1.791,4-4v0c0-2.209-1.791-4-4-4h-6.5c-1.381,0-2.5-1.119-2.5-2.5v0c0-1.381,1.119-2.5,2.5-2.5 H48c2.209,0,4-1.791,4-4v0c0-2.209-1.791-4-4-4h-1.5c-1.933,0-3.5-1.567-3.5-3.5v0c0-1.933,1.567-3.5,3.5-3.5h11 C59.985,25,62,22.985,62,20.5z"
                              ></path>
                              <radialGradient
                                id="mlOPB6MgzT0e4apRfleBdd_119695_gr4"
                                cx="35.917"
                                cy="35.417"
                                r="27.938"
                                gradientUnits="userSpaceOnUse"
                                spreadMethod="reflect"
                              >
                                <stop offset="0" stopColor="#afeeff"></stop>
                                <stop offset=".193" stopColor="#bbf1ff"></stop>
                                <stop offset=".703" stopColor="#d7f8ff"></stop>
                                <stop offset="1" stopColor="#e1faff"></stop>
                              </radialGradient>
                              <path
                                fill="url(#mlOPB6MgzT0e4apRfleBdd_119695_gr4)"
                                d="M59,40L59,40c-2.209,0-4-1.791-4-4v0c0-2.209,1.791-4,4-4h0c2.209,0,4,1.791,4,4v0 C63,38.209,61.209,40,59,40z"
                              ></path>
                              <linearGradient
                                id="mlOPB6MgzT0e4apRfleBde_119695_gr5"
                                x1="32"
                                x2="32"
                                y1="6"
                                y2="29"
                                gradientUnits="userSpaceOnUse"
                                spreadMethod="reflect"
                              >
                                <stop offset="0" stopColor="#a4a4a4"></stop>
                                <stop offset=".63" stopColor="#7f7f7f"></stop>
                                <stop offset="1" stopColor="#6f6f6f"></stop>
                                <stop offset="1" stopColor="#6f6f6f"></stop>
                              </linearGradient>
                              <path
                                fill="url(#mlOPB6MgzT0e4apRfleBde_119695_gr5)"
                                d="M32,6c-7.18,0-13,5.82-13,13v10h5V19c0-4.411,3.589-8,8-8s8,3.589,8,8v10h5V19 C45,11.82,39.18,6,32,6z"
                              ></path>
                              <linearGradient
                                id="mlOPB6MgzT0e4apRfleBdf_119695_gr6"
                                x1="32"
                                x2="32"
                                y1="25"
                                y2="57"
                                gradientUnits="userSpaceOnUse"
                                spreadMethod="reflect"
                              >
                                <stop offset="0" stopColor="#42d778"></stop>
                                <stop offset=".428" stopColor="#3dca76"></stop>
                                <stop offset="1" stopColor="#34b171"></stop>
                              </linearGradient>
                              <path
                                fill="url(#mlOPB6MgzT0e4apRfleBdf_119695_gr6)"
                                d="M49,57H15c-1.657,0-3-1.343-3-3V35c0-5.523,4.477-10,10-10h20c5.523,0,10,4.477,10,10v19 C52,55.657,50.657,57,49,57z"
                              ></path>
                              <linearGradient
                                id="mlOPB6MgzT0e4apRfleBdg_119695_gr7"
                                x1="44.5"
                                x2="44.5"
                                y1="57"
                                y2="32.367"
                                gradientUnits="userSpaceOnUse"
                                spreadMethod="reflect"
                              >
                                <stop offset="0" stopColor="#37ab6a"></stop>
                                <stop offset=".422" stopColor="#39b66f"></stop>
                                <stop offset="1" stopColor="#3ac074"></stop>
                              </linearGradient>
                              <path
                                fill="url(#mlOPB6MgzT0e4apRfleBdg_119695_gr7)"
                                d="M41,43L41,43c0,1.657,1.343,3,3,3h0.5c1.381,0,2.5,1.119,2.5,2.5v0c0,1.381-1.119,2.5-2.5,2.5 H40c-1.657,0-3,1.343-3,3v0c0,1.657,1.343,3,3,3h9c1.657,0,3-1.343,3-3V40h-8C42.343,40,41,41.343,41,43z"
                              ></path>
                              <linearGradient
                                id="mlOPB6MgzT0e4apRfleBdh_119695_gr8"
                                x1="19.5"
                                x2="19.5"
                                y1="29.262"
                                y2="55.596"
                                gradientUnits="userSpaceOnUse"
                                spreadMethod="reflect"
                              >
                                <stop offset="0" stopColor="#62de8f"></stop>
                                <stop offset=".478" stopColor="#5dd18d"></stop>
                                <stop offset="1" stopColor="#56be89"></stop>
                              </linearGradient>
                              <path
                                fill="url(#mlOPB6MgzT0e4apRfleBdh_119695_gr8)"
                                d="M23,37.5L23,37.5c0-1.381-1.119-2.5-2.5-2.5h-1c-1.381,0-2.5-1.119-2.5-2.5v0 c0-1.381,1.119-2.5,2.5-2.5h5c1.381,0,2.5-1.119,2.5-2.5v0c0-1.381-1.119-2.5-2.5-2.5H22c-5.523,0-10,4.477-10,10v5h8.5 C21.881,40,23,38.881,23,37.5z"
                              ></path>
                              <g>
                                <path
                                  fill="#fff"
                                  d="M32 38A3 3 0 1 0 32 44 3 3 0 1 0 32 38zM42 38A3 3 0 1 0 42 44 3 3 0 1 0 42 38zM22 38A3 3 0 1 0 22 44 3 3 0 1 0 22 38z"
                                ></path>
                              </g>
                            </svg>
                          )}
                        </div>
                        {/* <img className="h-5 w-5" src="/img/sms-login.png" alt="sms-login" /> */}
                        <span className="hidden sm:block sm:text-base font-normal xl:ml-2">
                          {!isShowSMSLogin ? 'SMS' : 'Password'}
                        </span>
                      </button>

                      {/* FACEBOOK */}
                      <button
                        type="submit"
                        className=" flex outline-none justify-center border border-red-200 rounded-md bg-white hover:bg-slate-50 px-3 py-1.5 text-sm font-semibold leading-6   text-black shadow-sm items-center h-fit mr-4"
                        onClick={handleSignUpFB}
                      >
                        <FaFacebook className="w-5 h-5 mr:0 sm:mr-3 text-blue-600   " />
                        <span className="hidden sm:block sm:text-base font-normal ">
                          Facebook
                        </span>
                      </button>

                      {/* GOOGLE */}
                      <button
                        type="submit"
                        className=" flex outline-none justify-center rounded-md border border-red-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-sm font-semibold leading-6    text-black shadow-sm items-center h-fit"
                        onClick={handleSignUpGG}
                      >
                        <FcGoogle className="w-5 h-5 mr-0 sm:mr-3" />
                        <span className="hidden sm:block sm:text-base font-normal">
                          {' '}
                          Google
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Tab.Panel>

          <Tab.Panel className="flex outline-none max-h-full flex-1 flex-col justify-center px-3 py-5 sm:py-12 lg:px-8">
            <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
              {authenStatus === 'success' && isSignUp ? (
                <div>
                  {/* Password Form*/}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-center font-semibold">
                      Tạo Mật Khẩu
                    </div>
                    <div className="">
                      <div>
                        <label
                          className="text-gray-400 text-xs"
                          htmlFor="Nhập email mới"
                        >
                          Nhập Mật Khẩu
                        </label>
                        <div className="flex border-b border-gray-200">
                          <input
                            type={'password'}
                            className="w-full h-8 outline-none forcus:outline-none"
                            value={passwordSignUp}
                            onChange={(e) => setPasswordSignUp(e.target.value)}
                            // readOnly
                          />
                          <div
                            className="flex items-center text-gray-400"
                            onClick={() => setPasswordSignUp('')}
                          >
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
                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          className="text-gray-400 text-xs"
                          htmlFor="Nhập email mới"
                        >
                          Nhập Lại Mật Khẩu
                        </label>
                        <div className="flex border-b border-gray-200">
                          <input
                            type={'password'}
                            className="w-full h-8 outline-none forcus:outline-none"
                            value={againPass}
                            onChange={(e) => {
                              setAgainPass(e.target.value);
                              setMessages([]);
                            }}
                            // readOnly
                          />
                          <div
                            className="flex items-center text-gray-400"
                            onClick={() => setAgainPass('')}
                          >
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
                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 mt-1 text-xs text-red-500">
                        <div
                          className={`${messages.length === 0 ? 'hidden' : ''}`}
                        >
                          Mật khẩu phải bao gồm:
                        </div>
                        {messages.map((message) => (
                          <div key={message.code}>{message.message}</div>
                        ))}
                        {message}
                      </div>
                    </div>
                    <div className="flex items-center mt-4 justify-center">
                      <button
                        className={`w-4/5 h-10 rounded-full text-white font-normal xl:font-semibold xl: text-base bg-gradient-to-r from-pink-500 to-red-500 transition-all xl:hover:from-red-400 xl:hover:to-pink-400`}
                        onClick={handleCreatePassword}
                      >
                        Xác nhận
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Sign UpForm SMS */}
                  <div className="flex flex-col gap-4">
                    {/* SMS Sign Up */}
                    <div>
                      {isEmailSignup ? (
                        <div>
                          <div className="text-sm font-bold xl:mb-2">
                            Bạn Đang Dùng Email Nào?
                          </div>
                          <div className="mt-1">
                            <div className="flex flex-col gap-1">
                              <div className="flex">
                                <div className="w-[20%] text-xs flex items-center justify-center bg-gray-200 text-gray-400 rounded-l-md">
                                  <TfiEmail className="w-5 h-5" />
                                </div>
                                <input
                                  id="email_signup"
                                  name="email_signup"
                                  type="text"
                                  value={emailInput}
                                  onChange={(e) => {
                                    setEmailInput(e.target.value);
                                    setEmailSignupMessage('');
                                  }}
                                  required
                                  placeholder="Nhập địa chỉ email"
                                  className="block px-2 xl:px-3 h-10 rounded-r-md w-full border-[1px] py-1.5 text-gray-900 placeholder:text-gray-400 placeholder:italic text-sm sm:text-sm sm:leading-6  focus:outline-none "
                                />
                              </div>
                              <div className="text-sm text-red-500">
                                {emailSignupMessage}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // SMS signup
                        <div>
                          <div className="text-sm font-bold xl:mb-2">
                            Bạn Đang Dùng Số Di Động Nào?
                          </div>
                          <div className="mt-1">
                            <div className="flex flex-col gap-1">
                              <div className="flex">
                                <div className="w-[20%] text-xs flex items-center justify-center bg-gray-200 text-gray-400 rounded-l-md">
                                  +84
                                </div>
                                <input
                                  id="sms_signup"
                                  name="sms_signup"
                                  type="number"
                                  value={phoneInput}
                                  onChange={(e) => {
                                    setPhoneInput(e.target.value);
                                    setMessage('');
                                  }}
                                  required
                                  placeholder="Nhập số di động"
                                  className="block px-2 xl:px-3 h-10 rounded-r-md w-full border-[1px] py-1.5 text-gray-900 placeholder:text-gray-400 placeholder:italic text-sm sm:text-sm sm:leading-6  focus:outline-none "
                                />
                              </div>
                              <div className="text-sm text-red-500">
                                {message}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {isEmailSignup ? (
                      <button
                        className="flex uppercase outline-none w-full h-10 items-center justify-center rounded-md bg-gradient-to-r from-pink-500 to-red-500 transition-all hover:from-red-400 hover:to-pink-400 px-1 sm:px-3 py-1.5  font-semibold leading-6  border-red-500  text-white shadow-sm text-xs sm:text-sm  "
                        onClick={handleSignUpEmail}
                      >
                        Đăng Ký Với Email
                      </button>
                    ) : (
                      <button
                        className="flex uppercase outline-none w-full h-10 items-center justify-center rounded-md bg-gradient-to-r from-pink-500 to-red-500 transition-all hover:from-red-400 hover:to-pink-400 px-1 sm:px-3 py-1.5  font-semibold leading-6  border-red-500  text-white shadow-sm text-xs sm:text-sm  "
                        onClick={handleSignUpSMS}
                      >
                        Đăng Ký Với Số Điện Thoại
                      </button>
                    )}

                    {/* OR */}
                    <div className="other_login_method flex flex-col ">
                      <div className="flex gap-3 xl:mt-4">
                        <div className="w-[8rem] xl:w-[10rem]">
                          <hr className="mt-[0.6rem]" />
                        </div>
                        <div className="text-gray-300 text-sm">HOẶC</div>
                        <div className="w-[8rem]">
                          <hr className="mt-[0.6rem] xl:w-[10rem]" />
                        </div>
                      </div>
                      <div className="login_button flex pt-3 mx-auto">
                        {/* FACEBOOK */}
                        <button
                          type="submit"
                          className=" flex outline-none justify-center border border-red-200 rounded-md bg-white hover:bg-slate-50 px-3 py-1.5 text-sm font-semibold leading-6   text-black shadow-sm items-center h-fit mr-4"
                          onClick={handleSignUpFB}
                        >
                          <FaFacebook className="w-5 h-5 mr:0 sm:mr-3 text-blue-600   " />
                          <span className="hidden sm:block sm:text-base font-normal ">
                            Facebook
                          </span>
                        </button>

                        {/* GOOGLE */}
                        <button
                          type="submit"
                          className=" flex outline-none justify-center rounded-md border border-red-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-sm font-semibold leading-6    text-black shadow-sm items-center h-fit"
                          onClick={handleSignUpGG}
                        >
                          <FcGoogle className="w-5 h-5 mr-0 sm:mr-3" />
                          <span className="hidden sm:block sm:text-base font-normal">
                            {' '}
                            Google
                          </span>
                        </button>

                        <button
                          type="submit"
                          className=" flex outline-none justify-center border border-red-200 rounded-md bg-white hover:bg-slate-50 px-3 py-1.5 text-sm font-semibold leading-6   text-black shadow-sm items-center h-fit ml-4"
                          onClick={() => {
                            setIsEmailSignup(!isEmailSignup);
                            setMessage('');
                          }}
                        >
                          <div>
                            {isEmailSignup ? (
                              <div>
                                <img
                                  className="w-5 h-5 xl:w-6 xl:h-6"
                                  src="data:image/png;base64,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"
                                />
                              </div>
                            ) : (
                              <TfiEmail className="fill-red-200 h-6 w-6" />
                            )}
                          </div>
                          {/* <img className="h-5 w-5" src="/img/sms-login.png" alt="sms-login" /> */}
                          <span className="hidden sm:block sm:text-base font-normal xl:ml-2">
                            {isEmailSignup ? 'SMS' : 'Email'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

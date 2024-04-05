import { useState, Fragment } from 'react'
import { Tab } from '@headlessui/react'


// Tab ĐĂNG NHẬP/ĐĂNG KÝ (chưa xử lý logic để Đăng nhập/đăng ký)
// Tạm thời chỉ hiển thị
export default function Login_SignUp({ setUser }) {
    const  sampleUser={id: '1',
    Name: "Nguyễn Văn b",
    shoppingCart: 10}
   
    const [emailLogin, setEmailLogin] = useState('')
    const [emailSignup, setEmailSignup] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')
    const [passwordSignup, setPasswordSignup] = useState('')
    const [re_password, setRe_password] = useState('')

    const [re_passwordError, setRe_passwordError] = useState('')
    const [emailLoginError, setEmailLoginError] = useState('')
    const [emailSignupError, setEmailSignupError] = useState('')
    const [passwordLoginError, setPasswordLoginError] = useState('')
    const [passwordSignupError, setPasswordSignupError] = useState('')

    const handleLogin = () => {
        setEmailLoginError('')
        setPasswordLoginError('')

        // Check if the user has entered both fields correctly
        // if ('' === emailLogin) {
        //     setEmailLoginError('Vui lòng nhập Email')
        //     return
        // }

        // if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailLogin)) {
        //     setEmailLoginError('Vui lòng nhập đúng địa chỉ Email')
        //     return
        // }

        // if ('' === passwordLogin) {
        //     setPasswordLoginError('Vui lòng nhập mật khẩu')
        //     return
        // }

        // if (passwordLogin.length < 7) {
        //     setPasswordLoginError('Mật khẩu phải dài ít nhất 8 ký tự')
        //     return
        // }


        setPasswordLoginError('')
        console.log('login: ' + emailLogin + ' ' + passwordLogin)
        
       setUser(sampleUser)

        // Authentication calls will be made here...
    }

    const handleSignUp = () => {
        setEmailSignupError('')
        setPasswordSignupError('')

        // Check if the user has entered both fields correctly
        if ('' === emailSignup) {
            setEmailSignupError('Vui lòng nhập Email')
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailSignup)) {
            setEmailSignupError('Vui lòng nhập đúng địa chỉ Email')
            return
        }

        if ('' === passwordSignup) {
            setPasswordSignupError('Vui lòng nhập mật khẩu')
            return
        }

        if (passwordSignup.length < 7) {
            setPasswordSignupError('Mật khẩu phải dài ít nhất 8 ký tự')
            return
        }

        if (re_password != passwordSignup) {
            setRe_passwordError('Mật khẩu xác nhận không chính xác')
            return
        }

        setRe_passwordError('')
        console.log('signup: ' + emailSignup + ' ' + passwordSignup + ' ' + re_password)
        
        // Authentication calls will be made here...


    } 
    
    return (
        <div className="w-full max-w-md mx-auto py-auto sm:px-0 " >
            <Tab.Group >
                {/* Tab list: Danh sách Tab gồm (Đăng nhập, Đăng ký) */}
                <Tab.List className="flex justify-around space-x-1 bg-white ">
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`w-1/2 py-2.5  text-sm font-medium leading-5 
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
                                className={`w-1/2 py-2.5  text-sm font-medium leading-5 bg-white
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
                    <Tab.Panel className="flex h-full flex-1 flex-col justify-center px-3 py-12 lg:px-8 " >

                        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                            <div className="space-y-6" >
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email_login"
                                            name="email_login"
                                            value={emailLogin}
                                            onChange={(e) => setEmailLogin(e.target.value)}
                                            required
                                            placeholder='abc@gmail.com'
                                            className="block px-1  w-full rounded-sm border-[1px] py-1.5 text-gray-900 placeholder:text-gray-400 placeholder:italic  sm:text-sm sm:leading-6 r focus:outline-none "

                                        />
                                    </div>
                                    <label className="errorLabel italic text-sm text-red-500" >{emailLoginError}</label>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 ">
                                            Mật khẩu
                                        </label>

                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password_login"
                                            name="password_login"
                                            
                                            value={passwordLogin}
                                            onChange={(e) => setPasswordLogin(e.target.value)}

                                            required
                                            placeholder='Ít nhất 8 ký tự'
                                            className="block px-1 bg-white  w-full rounded-sm border-[1px]  py-1.5 text-gray-900 shadow-sm r placeholder:text-gray-400 placeholder:italic focus:outline-none sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <label className="errorLabel italic text-sm text-red-500">{passwordLoginError}</label>
                                </div>
                                <div className="text-sm flex justify-end">
                                    <a href="#" className=" font-semibold text-red-500 hover:text-red-400  ">
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="flex  w-full justify-center rounded-md bg-red-400 hover:bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6  border-red-500  text-white shadow-sm  "
                                        onClick={handleLogin}
                                    >
                                        ĐĂNG NHẬP
                                    </button>
                                </div>
                            </div>
                        </div>

                    </Tab.Panel>

                    <Tab.Panel className="flex max-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                            <div className="space-y-6" >
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email_signup"
                                            name="email_signup"
                                            type="email"
                                            value={emailSignup}
                                            onChange={(e) => setEmailSignup(e.target.value)}
                                            autoComplete="email"
                                            required
                                            placeholder='abc@gmail.com'
                                            className="block px-1  w-full rounded-sm border-[1px] py-1.5 text-gray-900 placeholder:text-gray-400 placeholder:italic  sm:text-sm sm:leading-6  focus:outline-none "

                                        />
                                    </div>
                                    <label className="errorLabel italic text-sm text-red-500" >{emailSignupError}</label>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 ">
                                            Mật khẩu
                                        </label>

                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password_signup"
                                            name="password_signup"

                                            value={passwordSignup}
                                            onChange={(e) => setPasswordSignup(e.target.value)}
                                            required
                                            placeholder='Ít nhất 8 ký tự'
                                            className="block px-1 bg-white  w-full rounded-sm border-[1px]  py-1.5 text-gray-900 shadow-sm r placeholder:text-gray-400 placeholder:italic  focus:outline-none sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <label className="errorLabel italic text-sm text-red-500">{passwordSignupError}</label>
                                </div>
                                <div>
                                    <div className="flex px-1 bg-gray-50  items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Xác nhận Mật khẩu
                                        </label>

                                    </div>

                                    <div className="mt-2">
                                        <input
                                            id="re_enter_password"
                                            name="re_enter_password"

                                            value={re_password}
                                            onChange={(e) => setRe_password(e.target.value)}
                                            required
                                            placeholder='Nhập lại mật khẩu đã tạo'
                                            className="block w-full px-1 bg-white  rounded-sm border-[1px] py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 placeholder:italic focus:outline-none sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <label className="errorLabel italic text-sm text-red-500">{re_passwordError}</label>
                                </div>
                                <div className='pt-4'>
                                    <button
                                        type="submit"
                                        className="flex  w-full justify-center rounded-md bg-red-400 hover:bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6  border-red-500  text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                                        onClick={handleSignUp}
                                    >
                                        ĐĂNG KÝ
                                    </button>
                                </div>
                            </div>

                        </div></Tab.Panel>
                </Tab.Panels>
            </Tab.Group >
        </div >
    )
}

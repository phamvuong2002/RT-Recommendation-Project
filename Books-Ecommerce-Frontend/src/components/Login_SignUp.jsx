import { useState, Fragment } from 'react'
import { Tab } from '@headlessui/react'


// Tab ĐĂNG NHẬP/ĐĂNG KÝ (chưa xử lý logic để Đăng nhập/đăng ký)
// Tạm thời chỉ hiển thị
export default function Login_SignUp() {
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
                            <form className="space-y-6" action="#" method="POST">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            placeholder='abc@gmail.com'
                                            className="block px-1  w-full rounded-sm border-[1px] py-1.5 text-gray-900 placeholder:text-gray-400 placeholder:italic  sm:text-sm sm:leading-6 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                                           
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 ">
                                            Mật khẩu
                                        </label>

                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            placeholder='Ít nhất 6 ký tự'
                                            className="block px-1 bg-white  w-full rounded-sm border-[1px]  py-1.5 text-gray-900 shadow-sm r placeholder:text-gray-400 placeholder:italic ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="text-sm flex justify-end">
                                    <a href="#" className=" font-semibold text-red-500 hover:text-red-400  ">
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                <div>
                                    <button
                                        type="submit"   
                                        className="flex  w-full justify-center rounded-md bg-red-400 hover:bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6  border-red-500  text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                                    >
                                        ĐĂNG NHẬP
                                    </button>
                                </div>
                            </form>
                        </div>

                    </Tab.Panel>

                    <Tab.Panel className="flex max-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" action="#" method="POST">
                            <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            placeholder='abc@gmail.com'
                                            className="block px-1  w-full rounded-sm border-[1px] py-1.5 text-gray-900 placeholder:text-gray-400 placeholder:italic  sm:text-sm sm:leading-6 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                                           
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 ">
                                            Mật khẩu
                                        </label>

                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                          
                                            required
                                            placeholder='Ít nhất 6 ký tự'
                                            className="block px-1 bg-white  w-full rounded-sm border-[1px]  py-1.5 text-gray-900 shadow-sm r placeholder:text-gray-400 placeholder:italic ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 sm:text-sm sm:leading-6"
                                        />
                                    </div>
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
                                            type="password"

                                            required
                                            placeholder='Nhập lại mật khẩu đã tạo'
                                            className="block w-full px-1 bg-white  rounded-sm border-[1px] py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 placeholder:italic ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className='pt-4'>
                                    <button
                                        type="submit"   
                                        className="flex  w-full justify-center rounded-md bg-red-400 hover:bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6  border-red-500  text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                                    >
                                        ĐĂNG KÝ
                                    </button>
                                </div>
                            </form>

                        </div></Tab.Panel>
                </Tab.Panels>
            </Tab.Group >
        </div >
    )
}

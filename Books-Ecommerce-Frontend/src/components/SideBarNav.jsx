import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { HiChevronDown, } from "react-icons/hi2";


export default function SideBarNav({selectedPage}) {
    // const [selectedPage, setSelectedPage] = useState('Tổng quan')

    const menuData = [
        { id: 1, title: "Tổng quan", path: "/" },
        { id: 2, title: "Thông tin tài khoản", path: "/", },
        { id: 3, title: "Thông tin đơn hàng", path: "/" },
        { id: 4, title: "Theo dõi sách", path: "/" },
    ];

    return (
        <div className=" SideNav bg-white w-full  sm:shadow-lg sm:rounded-sm  sm:w-fit sm:mx-10 sm:mb-10 ">
            <ul className=" hidden h-full sm:block grid-rows-4 text-sm md:text-base font-semibold font-inter gap-10 z-50 px-3 md:px-5 py-5">
                {menuData.map((menu) =>
                    <li key={menu.id} className="text-left border-b-2 py-2">
                        <a className={`hover:cursor-pointer hover:text-red-400 ${selectedPage==menu.title? 'text-red-400':''}`} >
                            {menu.title}
                        </a>
                    </li>)}

            </ul>

            <div className=" w-full flex sm:hidden justify-end pr-4">
                <Menu as="div" className=" text-left w-[48%]">
                    <Menu.Button className="w-full group flex justify-around text-left text-base font-medium text-gray-700 hover:text-gray-900">
                        <span>
                            {selectedPage}
                        </span>
                        <HiChevronDown
                            className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                        />

                    </Menu.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute z-40 mt-2 w-[45%] rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1 ">
                                {menuData.map((option) => (
                                    <Menu.Item key={option.id}>

                                        {({ active }) => (
                                            <button
                                                name={option.id}
                                                className={(
                                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                    active ? 'bg-gray-100' : '',
                                                    'block pl-4 py-2 text-sm'
                                                )}
                                                value={`${option.title}`}
                                               
                                            >
                                                <a href={option.path}>
                                                    {option.title}
                                                </a>
                                                
                                            </button>

                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>


            </div>
        </div>


    )



}

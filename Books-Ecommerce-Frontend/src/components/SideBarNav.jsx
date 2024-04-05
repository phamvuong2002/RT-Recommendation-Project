import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { HiChevronDown, HiOutlineHome } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";
import { BiSolidBookHeart } from "react-icons/bi";


export default function SideBarNav({ setSelectedPage }) {
    const [currentPage, setCurrentPage] = useState('Tổng quan')

    const menuData = [
        { id: 1, icon: <HiOutlineHome className='mr-2 my-auto' />, title: "Tổng quan" },
        { id: 2, icon: <FaUser className='mr-2 my-auto' />, title: "Thông tin tài khoản" },
        { id: 3, icon: <LuClipboardList className='mr-2 my-auto' />, title: "Thông tin đơn hàng" },
        { id: 4, icon: <BiSolidBookHeart className='mr-2 my-auto' />, title: "Theo dõi sách" },
    ];

    const handleClick = (e) => {
        console.log(e.target.value)
        setCurrentPage(e.target.value)
        setSelectedPage(e.target.value)
    }


    return (
        <div className=" SideNav bg-white justify-self-end sm:shadow-lg sm:rounded-sm  sm:w-fit sm:ml-10 sm:mb-10 h-fit">

            <ul className="hidden h-fit w-full sm:block grid-rows-4 text-sm md:text-base font-semibold font-inter gap-10 px-3 md:px-5 py-3">
                {menuData.map((menu) =>
                    <li key={menu.id} className="text-left py-5">
                        <button value={menu.title} className={` text-gray-600 hover:cursor-pointer hover:text-red-400 flex flex-row items-center ${currentPage == menu.title ? 'text-red-400' : ''}`} onClick={handleClick} >
                            {menu.icon}
                            {menu.title}
                        </button>
                    </li>)}

            </ul>


            <div className="z-[5] w-full  flex relative sm:hidden justify-end pr-4">
                <Menu as="div" className=" text-left w-[200px]">
                    <Menu.Button className="w-full group flex justify-evenly text-left text-sm font-medium text-gray-700 hover:text-gray-900">
                        <span>
                            {currentPage}
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
                        <Menu.Items className="absolute mt-2 w-[160px] bg-white ml-5  rounded-md shadow-2xl ">
                            <div className="py-1 text-sm pl-3">
                                {menuData.map((option) => (
                                    <Menu.Item key={option.id}>

                                        {({ active }) => (
                                            <button
                                                name={option.id}
                                                className={(
                                                  
                                                    active ? 'bg-gray-100 py-2 ' : 'py-2'
                                                )}
                                                value={`${option.title}`}
                                                onClick={handleClick}
                                            >
                                                
                                                    {option.title}
                                                
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

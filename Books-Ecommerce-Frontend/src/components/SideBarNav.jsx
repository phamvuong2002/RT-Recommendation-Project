import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { HiChevronDown, HiOutlineHome } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";
import { BiSolidBookHeart } from "react-icons/bi";
import { Link, useParams } from 'react-router-dom';


export default function SideBarNav({ setSelectedPage, setSelectedPageId }) {
    const [currentPage, setCurrentPage] = useState("general-infomation")

    const { tab } = useParams();

    const TAB = {
        "general-infomation": "Tổng Quan",
        "profile-infomation": "Thông Tin Tài Khoản",
        "orders-infomation": "Thông Tin Đơn Hàng",
        "following-infomation": "Theo Dõi Sách"
    }

    const menuData = [
        { id: "general-infomation", icon: <HiOutlineHome className='mr-2 my-auto' />, title: TAB["general-infomation"] },
        { id: "profile-infomation", icon: <FaUser className='mr-2 my-auto' />, title: TAB["profile-infomation"] },
        { id: "orders-infomation", icon: <LuClipboardList className='mr-2 my-auto' />, title: TAB["orders-infomation"] },
        { id: "following-infomation", icon: <BiSolidBookHeart className='mr-2 my-auto' />, title: TAB["following-infomation"] },
    ];

    const handleClick = (e) => {
        setCurrentPage(e.target.value)
        setSelectedPage(TAB[e.target.value])
        setSelectedPageId(e.target.value)
    }

    useEffect(() => {
        if (!tab) {
            return
        } else {
            setSelectedPageId(tab)
            setSelectedPage(TAB[tab])
            setCurrentPage(tab)
        }
    }, [currentPage])


    return (
        <div className=" SideNav bg-white justify-self-end sm:shadow-lg sm:rounded-sm  sm:w-fit sm:ml-10 sm:mb-10 h-fit">

            <ul className="hidden h-fit w-full sm:block grid-rows-4 text-sm md:text-base font-semibold font-inter gap-10 px-3 md:px-5 py-3">
                {menuData.map((menu) =>
                    <li key={menu.id} className="text-left py-5">
                        <Link to={`../account/${menu.id}`} value={menu.id} className={` text-gray-600 hover:cursor-pointer hover:text-red-400 flex flex-row items-center ${currentPage === menu.id ? 'text-red-400' : ''}`} onClick={handleClick} >
                            {menu.icon}
                            {menu.title}
                        </Link>
                    </li>)}

            </ul>


            <div className="z-[5] w-full  flex relative sm:hidden justify-end pr-4">
                <Menu as="div" className=" text-left w-[200px]">
                    <Menu.Button className="w-full group flex justify-evenly text-left text-sm font-medium text-gray-700 hover:text-gray-900">
                        <span>
                            {TAB[currentPage]}
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
                                                name={TAB[option.id]}
                                                className={(

                                                    active ? 'bg-gray-100 py-2 ' : 'py-2'
                                                )}
                                                value={`${option.id}`}
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

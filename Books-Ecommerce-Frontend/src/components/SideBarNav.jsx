import { Fragment, useEffect, useState, useContext } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { HiChevronDown, HiOutlineHome } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";
import { BiSolidBookHeart } from "react-icons/bi";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchAPI } from '../helpers/fetch';
import { logout } from '../apis/access';
import { LuLogOut } from 'react-icons/lu';
import { AppContext } from '../contexts/main';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SideBarNav({ setSelectedPage, setSelectedPageId }) {
    const {
        userId,
        token,
        setToken,
        setUserId,
      } = useContext(AppContext);
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState("general-infomation")
    const { tab } = useParams();

    const TAB = {
        "general-infomation": "Tổng Quan",
        "profile-infomation": "Thông Tin Tài Khoản",
        "orders-infomation": "Thông Tin Đơn Hàng",
        "following-infomation": "Mục yêu thích"
    }

    const menuData = [
        { id: "general-infomation", icon: <HiOutlineHome className='mr-2 my-auto' />, title: TAB["general-infomation"] },
        { id: "profile-infomation", icon: <FaUser className='mr-2 my-auto' />, title: TAB["profile-infomation"] },
        { id: "orders-infomation", icon: <LuClipboardList className='mr-2 my-auto' />, title: TAB["orders-infomation"] },
        { id: "following-infomation", icon: <BiSolidBookHeart className='mr-2 my-auto' />, title: TAB["following-infomation"] },
    ];

    const handleClick = (value, e) => {
        e.stopPropagation()
        console.log('click ', value)
        setCurrentPage(value)
        setSelectedPage(TAB[value])
        setSelectedPageId(value)
        navigate(`../account/${value}`)
    }

    useEffect(() => {

        if (!tab) {
            return
        } else {
            //console.log(tab)
            setSelectedPageId(tab)
            setSelectedPage(TAB[tab])
            setCurrentPage(tab)
        }
    }, [tab])
    // LOGOUT
    const handleLogout = async () => {
        console.log(token.accessToken);
        let access_token = '';
        if (token.accessToken) {
            access_token = token.accessToken;
        } else {
            access_token = token;
        }

        console.log(userId);
        const logout_result = await fetchAPI(
            `../${logout}`,
            'POST',
            {},
            {
                userId: userId,
                token: access_token,
            },
        );

        console.log(logout_result);
        if (logout_result.status === 200) {
            setUserId('');
            setToken('');
            // setSession('')
            window.location.assign('/')
            console.log('in logout success');
        }
        console.log('in logout');

        //nhận lại kết quả, xem Logout có thành công
    };


    return (
        <div className="SideNav bg-white justify-self-end sm:shadow-lg sm:rounded-sm  sm:w-fit sm:ml-10 sm:mb-10 h-fit">

            <ul className="hidden h-fit w-full sm:block grid-rows-4 text-sm md:text-base font-semibold font-inter gap-10 px-3 md:px-5 py-3">
                {menuData.map((menu) =>
                    <li key={menu.id} className="text-left py-5">
                        <button value={menu.id} className={` text-gray-600 hover:cursor-pointer hover:text-red-400 flex flex-row items-center ${currentPage === menu.id ? 'text-red-400' : ''}`}
                            onClick={(e) => handleClick(menu.id, e)} >
                            <div onClick={(e) => handleClick(menu.id, e)}>
                                {menu.icon}
                            </div>
                            {menu.title}
                        </button>
                    </li>)}

            </ul>


            <div className="z-[5] w-full grid relative sm:hidden  pr-4">
                <Menu as="div" className="text-left w-[14rem] flex justify-self-end bg-white">
                    <Menu.Button className="w-full group grid grid-cols-3   text-left text-sm font-semibold text-gray-700 hover:text-gray-900 my-2 rounded-sm font-inter items-center">
                        <span className='justify-self-center col-span-2 my-[0.1rem] ml-[0.3rem]'>
                            {TAB[currentPage]}
                        </span>
                        <HiChevronDown
                            className="h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-gray-500 justify-self-end my-[0.1rem] mr-[0.1rem]"
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
                        <Menu.Items className="absolute mt-10 w-[14rem] bg-white  rounded-md shadow-2xl ">
                            <div className="py-1 text-[1rem] pl-3">

                                {menuData.map((menu) => (
                                    <Menu.Item key={menu.id}>
                                        {({ active }) => (
                                            // <Link to={`../account/${option.id}`} value={option.id}
                                            //     className={` ${active ? 'bg-gray-100 py-2 ' : 'py-2'} text-gray-600 hover:cursor-pointer hover:text-red-400 flex flex-row items-center  ${currentPage === option.id ? 'text-red-400' : ''}`}
                                            //     onClick={handleClick} >
                                            //     {option.icon}
                                            //     {option.title}
                                            // </Link>
                                            <button value={menu.id} className={` text-gray-600 hover:cursor-pointer hover:text-red-400 flex flex-row items-center py-2 ${currentPage === menu.id ? 'text-red-400' : ''}`}
                                                onClick={(e) => handleClick(menu.id, e)} >
                                                <div onClick={(e) => handleClick(menu.id, e)}>
                                                    {menu.icon}
                                                </div>
                                                {menu.title}
                                            </button>

                                        )}
                                    </Menu.Item>
                                ))}
                                <div
                                    name="logout-option"
                                    className={`text-gray-600 hover:cursor-pointer hover:text-red-400 flex flex-row items-center py-2 `}
                                    onClick={handleLogout}
                                >
                                    <LuLogOut className="mr-2" />
                                    Đăng xuất
                                </div>
                            </div>

                        </Menu.Items>
                    </Transition>
                </Menu>


            </div>
        </div>


    )



}

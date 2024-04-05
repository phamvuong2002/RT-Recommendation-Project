import { React, Fragment, useState, useEffect, useRef } from 'react'
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Menu, Transition } from '@headlessui/react'
import { IoCartOutline } from "react-icons/io5";
import Search from './Search';
import { ShoppingCartsPopup } from './ShoppingCartsPopup';
import { PopupCenterPanel } from './popup/PopupCenterPanel';
import Login_SignUp from './Login_SignUp';
import Category_dropdown from './Category_Dropdown';
import { HiMiniSquares2X2, HiChevronDown } from "react-icons/hi2";

import { Link } from 'react-router-dom';

// Navbar chính 
export const Navbar = () => {
    const [isOpenShoppingCarts, setIsOpenShoppingCarts]=useState(false)

    const [user, setUser]=useState( {id: '',
    Name: "",
    shoppingCart: 0})

    // Mở Drop down của Tài khoản
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)
    const [openDropdown, setOpenDropdown] = useState(dropdownRef, false)
    const [mouseOverButton, setMouseOverButton] = useState(false)
    const [mouseOverMenu, setMouseOverMenu] = useState(false)

    const timeoutDuration = 100
    let timeoutButton
    let timeoutMenu


    const onMouseEnterButton = () => {
        clearTimeout(timeoutButton)
        setOpenDropdown(true)
        setMouseOverButton(true)
    }
    const onMouseLeaveButton = () => {
        timeoutButton = setTimeout(() => setMouseOverButton(false), timeoutDuration)
    }

    const onMouseEnterMenu = () => {
        clearTimeout(timeoutMenu)
        setMouseOverMenu(true)
    }
    const onMouseLeaveMenu = () => {
        timeoutMenu = setTimeout(() => setMouseOverMenu(false), timeoutDuration)
    }

    const show = openDropdown && (mouseOverMenu || mouseOverButton)


    const accountOption = [
        { name: 'Tài khoản', path: '/account' },
        { name: 'Đơn hàng của tôi', path: '/' },
        { name: 'Mục yêu thích', path: '/' },
        { name: 'Đăng xuất', path: '/' }
    ]


    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleClickShoppingCarts=()=>{
        setIsOpenShoppingCarts(!isOpenShoppingCarts)
    }

    return (
       
        <nav className='max-w-screen-2xl font-inter flex flex-col '>
            <div className=" mx-auto my-1  sm:max-w-screen-md md:max-w-screen-2xl flex justify-between items-center md:justify-around lg:grid lg:grid-cols-6 lg:gap-4 lg:justify-items-start container  relative ">
                <Link to="/" className='hidden lg:block text-xs sm:text-lg lg:text-xl lg:pl-6 lg:col-span-1'> [NAME+LOGO] </Link>

                <div className="block lg:hidden w-4 h-4 ml-2 mb-1 md:absolute md:left-0  ">
                    <button onClick={toggleMenu} >
                        {
                            isMenuOpen ? "" : <FaBars className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 " />
                        }
                    </button>
                </div>

                <div className="hidden lg:block cate_drop_down group relative mx-auto lg:col-span-1" >
                    <button className=" p-2 text-gray-400 hover:text-gray-500 flex items-center " onClick={toggleMenu} >
                        <HiMiniSquares2X2 className="h-7 w-7 " aria-hidden="true" />
                        <HiChevronDown
                            className="mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                        />
                    </button>

                </div>

                {/* Vị trí thanh Search - Còn chỉnh sửa */}
                <div className="search-bar-container relative inline-block w-3/5 md:w-[55%] lg:col-span-2 lg:w-full ">
                    <Search setResults={''} />
                </div>


                {/* ACCOUNT: Guest/User*/}
                <div className="text-xl lg:text-lg sm:flex inline-flex justify-between gap-1 mr-1 md:absolute  md:right-4 md:mr-0 lg:relative lg:mr-3 sm:my-auto sm:gap-4   text-black lg:col-span-2 lg:justify-self-center lg:gap-10 ">
                    <div className="flex items-center">
                        {/* Chưa đăng nhập sẽ hiển thị popup Đăng ký/Đăng nhập */}
                        <div className={`group flex items-center text-lg font-medium text-black  ${user.id.length <= 0 ? 'block' : 'hidden'}`} >
                            <PopupCenterPanel open={open} setOpen={setOpen} 
                            icon={
                            <div className=' flex items-center text-lg font-medium text-black '>
                                <FaUser  className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 text-xs "  />
                                <p className='hidden lg:block ml-2'>Tài khoản  </p>
                            </div>} title={''}
                                titleClassName='p-2' content={<>
                                    <Login_SignUp  setUser={setUser} />
                                </>}
                            />
                        </div>


                        {/* Đã đăng nhập thì cho khi người dùng hover vào--> Hiển thị:
                            + Tài khoản: Trang cá nhân
                            + Đơn hàng của tôi
                            + Mục yêu thích
                            + Đăng xuất */}
                        <Menu as="div" className={`${user.id.length > 0 ? 'block' : 'hidden'} relative inline-block text-left`}>
                            {({ }) => (
                                <div>
                                    <div onClick={() => setOpenDropdown(!openDropdown)}
                                        onMouseEnter={onMouseEnterButton}
                                        onMouseLeave={onMouseLeaveButton}>
                                        <Menu.Button className={`group flex items-center  text-lg font-medium text-gray-700 hover:text-gray-90`} >
                                            <FaUser className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                                            <p className='hidden lg:block'> {user.Name}
                                            </p>
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        show={show}
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            ref={dropdownRef}
                                            onMouseEnter={onMouseEnterMenu}
                                            onMouseLeave={onMouseLeaveMenu}
                                            className={'absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'} >
                                            <div className="py-1">
                                                {accountOption.map((option) => (
                                                    <Menu.Item key={option.name} onClick={() => setOpenDropdown(false)}>
                                                        {(active) => (
                                                            <Link  to={option.path}
                                                                name={option.name}
                                                                className={(
                                                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm hover:text-red-500'
                                                                )}
                                                             
                                                            >
                                                                {option.name}
                                                            </Link>

                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </div>
                            )}
                        </Menu>

                    </div>

                    <button  className="flex items-center sm:gap-2" onClick={handleClickShoppingCarts}>
                        <div className='flex'>
                            <IoCartOutline className="text-red-500 h-5 w-5 sm:h-6 sm:w-6 " />
                            <span className='cart-quantity text-center text-sm min-w-[20px] h-[20px] rounded-[50%] ml-[-10px] mt-[-5px] bg-[red] text-white'> {user.shoppingCart >= 100 ? '99+' : user.shoppingCart}  </span>
                        </div>
                        <p className='hidden lg:block '>Giỏ hàng</p>
                        <ShoppingCartsPopup open={isOpenShoppingCarts} setOpen={setIsOpenShoppingCarts}/>
                    </button>
                </div>


            </div>

            <div className={`desktop_menu absolute lg:mt-[4rem] lg:mx-[7rem]  z-10  ${isMenuOpen ? "" : "hidden"}`}>
                <Category_dropdown />
            </div>

            <div className={`block lg:hidden absolute inset-y-0 left-0 lg:mx-auto lg:mt-1 z-10  w-full ease-in-out duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>

                <div className=' w-full  flex lg:hidden text-center  bg-red-500 py-5 text-white font-bold'>
                    <button className=' ml-2 md:ml-5 text-white text-center' onClick={() => setIsMenuOpen(false)}>
                        <FaTimes className='h-5 w-6  md:h-7 md:w-7 mx-auto' />
                    </button>
                    <h1 className=' mx-auto text-sm md:text-lg'> DANH MỤC SẢN PHẨM</h1>
                </div>
                <Category_dropdown />
            </div>



        </nav>
      
    )
}

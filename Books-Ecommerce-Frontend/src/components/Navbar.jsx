import { React, Fragment, useState, useEffect, useRef } from 'react'
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import {  Menu, Transition } from '@headlessui/react'
import { IoCartOutline } from "react-icons/io5";
import Search from './Search';
import MenuItems from './MenuItems';
import { PopupCenterPanel } from './popup/PopupCenterPanel';
import Login_SignUp from './Login_SignUp';

// Navbar chính 
export const Navbar = () => {
    
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


    const sampleUser = {
        userid: '1',
        userName: 'Nguyễn Văn',
        shoppingCart: 10
    }

    const accountOption = [
        { name: 'Tài khoản', path: '/' },
        { name: 'Đơn hàng của tôi', path: '/' },
        { name: 'Mục yêu thích', path: '/' },
        { name: 'Đăng xuất', path: '/' }
    ]


    const menuData = [
        { title: "Trang Chủ", path: "/" },
        {
            title: "Sản Phẩm", path: "/",
            submenu: [{ title: "Tất cả", path: "/" },
            { title: "Văn học Việt Nam", path: "/" },
            {
                title: "Độ tuổi", path: "/",
                submenu: [{ title: "Mẫu giáo", path: "/" },
                { title: "Nhi đồng", path: "/" },
                { title: "Thiếu niên", path: "/" },
                { title: "Tuổi mới lớn", path: "/" },
                { title: "Tuổi trưởng thành", path: "/" },],
            },
            { title: "Văn học nước ngoài", path: "/" },
            { title: "Manga - Comic", path: "/" },

            { title: "Light-novel", path: "/" },
            { title: "Sách giáo khoa", path: "/" },
            { title: "Kiến thức khoa học", path: "/" },]
        },
        { title: "Về [name]", path: "/" },
        { title: "Liên Hệ", path: "/" },


    ];


    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const toggleSubMenu = (e) => {
        e.stopPropagation();

        let submenu = e.target.querySelector("ul");

        if (!submenu) return;

        if (submenu.style.display === "none" || !submenu.style.display) {
            submenu.style.display = "block";
        } else {
            submenu.style.display = "none";
        }
    };

    const renderSubMenu = (subMenu) => {
        return (
            <div className="bg-white w-10.8 text-left text-base font-regular">
                <ul className="submenu group-hover:block pl-10 cursor-pointer ">
                    {subMenu.map((subItem, index) => (
                        <li key={index} onClick={toggleSubMenu}>
                            {subItem.title}
                            {subItem.submenu && renderSubMenu(subItem.submenu)}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (

        <header className='max-w-screen-2xl flex flex-col'>
            <div className=' flex justify-around top_second col-span-2'>
                <nav className="flex justify-between lg:justify-around container pt-2 pb-2 items-center">
                    <a href="/" className='hidden sm:block text-xs sm:text-lg lg:text-xl'> [NAME+LOGO] </a>
                    
                    <div className="block items-center sm:hidden  w-4 h-4 mb-2 ml-2">
                        <button onClick={toggleMenu} >
                            {
                                isMenuOpen ? <FaTimes className="w-4 h-4 text-[red] " /> : <FaBars className="w-4 h-4 text-[red] " />
                            }
                        </button>
                    </div>
                    
                    {/* Vị trí thanh Search - Còn chỉnh sửa */}
                    <div className="search-bar-container relative inline-block w-1/2 sm:w-1/3 ">
                        <Search />
                    </div>


                    {/* ACCOUNT: Guest/User. Sau này phân loại và hiển theo 2 loại người dùng này 
                      Hiện tại Kiểm tra theo độ dài UserName (>0--> đã đăng nhập, <=0 chưa đăng nhập)*/}
                    <div className="text-xl lg:text-lg sm:flex inline-flex sm: gap-4 lg:gap-6 ml-2 text-black font-inter font-medium">
                        <div className="flex items-center">
                     
                        {/* Chưa đăng nhập sẽ hiển thị popup Đăng ký/Đăng nhập */}
                            <div className={`group flex items-center text-lg font-medium text-black  ${sampleUser.userName.length <= 0 ? 'block' : 'hidden'}`} >
                                <FaUser className="text-[red] mx-2 text-lg " />
                                <PopupCenterPanel open={open} setOpen={setOpen} icon={'Tài khoản'} title={''}
                                    titleClassName='p-2' content={<>
                                        <Login_SignUp />
                                    </>}
                                />
                            </div>


                            {/* Đã đăng nhập thì cho khi người dùng hover vào--> Hiển thị:
                            + Tài khoản: Trang cá nhân
                            + Đơn hàng của tôi
                            + Mục yêu thích
                            + Đăng xuất */}
                            <Menu as="div" className={`${sampleUser.userName.length > 0 ? 'block' : 'hidden'} relative inline-block text-left`}>
                                {({ }) => (
                                    <div>
                                        <div onClick={() => setOpenDropdown(!openDropdown)}
                                            onMouseEnter={onMouseEnterButton}
                                            onMouseLeave={onMouseLeaveButton}>
                                            <Menu.Button className={`group flex items-center  text-lg font-medium text-gray-700 hover:text-gray-90 ${sampleUser.userName.length > 0 ? 'block' : 'hidden'}`} >
                                                <FaUser className="text-[red] mx-2 text-lg" />
                                                <p className='hidden md:block'> {sampleUser.userName}
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
                                                className={`${sampleUser.userName.length <= 0 ? 'hidden' : 'absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'}`} >
                                                <div className="py-1">
                                                    {accountOption.map((option) => (
                                                        <Menu.Item key={option.name} onClick={() => setOpenDropdown(false)}>
                                                            {(active) => (
                                                                <a
                                                                    name={option.name}
                                                                    className={(
                                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm hover:text-red-500'
                                                                    )}
                                                                    href={option.path}
                                                                >
                                                                    {option.name}
                                                                </a>

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

                        <a href="/" className="flex items-center sm:gap-2">
                            <div className='flex'>
                                <IoCartOutline className="text-[red] text-2xl" />
                                <span className='cart-quantity text-center text-sm min-w-[20px] h-[20px] rounded-[50%] ml-[-10px] mt-[-5px] bg-[red] text-white'> {sampleUser.shoppingCart >= 100 ? '99+' : sampleUser.shoppingCart}  </span>
                            </div>
                            <p className='hidden lg:block '>Giỏ hàng</p>
                        </a>



                    </div>

                </nav>
            </div>


            <hr />
            
            {/* MENU - Còn chỉnh sửa  */}
            {/* Trang chu/San pham/Ve [name]/Lien he */}
            <div className="hidden sm:grid place-items-center py-1 lg:text-lg top_third">

                <ul className="menus flex text-lg font-inter gap-10  font-semibold">
                    {menuData.map((menu, index) => {
                        const depthLevel = 0;
                        return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
                    })}
                </ul>
            </div>

            {/* mobile menu */}
            <div className="mobile-menu block w-1/2 sm:hidden place-items-center text-sm lg:text-lg top_third">
                <ul className={`rounded bg-red-500 min-h-screen text-white ${isMenuOpen ? "" : "hidden"}`}>
                    {menuData.map((menu, index) => {
                        const depthLevel = 0;
                        return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
                    })}
                </ul>

            </div>
        </header>
    )
}

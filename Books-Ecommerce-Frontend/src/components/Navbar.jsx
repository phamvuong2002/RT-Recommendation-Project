import React from 'react';

import { FaUser, FaBars, FaTimes } from "react-icons/fa";


import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useState } from 'react';
import Search from './Search';
import MenuItems from './MenuItems';
import SearchResultsList from './SearchResultList';


export const Navbar = () => {
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
    const [results, setResults] = useState([]);

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
                                isMenuOpen ? <FaTimes className="w-4 h-4 text-[red] "/> : <FaBars className="w-4 h-4 text-[red] " />
                            }
                        </button>
                    </div>

                    <div className="search-bar-container relative inline-block w-1/2 sm:w-1/3 z-50">
                        <Search setResults={setResults} />
                        
                        {results && results.length > 0 && <SearchResultsList  results={results} />}
                     
                        
                    </div>

                    <div className="text-xl lg:text-lg sm:flex inline-flex sm: gap-4 lg:gap-6 ml-2 text-black font-inter font-medium">

                        <a href="/" className="flex items-center sm:gap-2 ">
                            
                            <FaUser className="text-[red]" />
                            <p className='hidden lg:block'>Nguyễn A </p></a>

                        <a href="/" className="flex items-center sm:gap-2">
                            <div className='flex'>
                                <IoCartOutline className="text-[red] text-2xl" />
                                <span className='cart-quantity text-center text-sm min-w-[20px] h-[20px] rounded-[50%] ml-[-10px] mt-[-5px] bg-[red] text-white'> 0  </span>
                            </div>
                            <p className='hidden lg:block '>Giỏ hàng</p>
                        </a>

                        <a href="/" className="flex items-center mr-2 sm:gap-2">
                            <IoMdHeartEmpty className="text-[red] font-bold" />
                            <p className='hidden lg:block'>Mục yêu thích</p></a>

                    </div>

                </nav>
            </div>


            <hr />

            {/* Trang chu/San pham/Ve [name]/Lien he */}    
            <div className="hidden sm:grid place-items-center py-1 lg:text-lg top_third">

                <ul className="menus flex text-lg  gap-10 z-40 font-inter">
                    {menuData.map((menu, index) => {
                        const depthLevel = 0;
                        return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
                    })}
                </ul>
            </div>

            {/* mobile menu */}
            <div className="mobile-menu block w-1/2 sm:hidden place-items-center text-sm lg:text-lg top_third">
                <ul className={`bg-gray-100 min-h-screen text-black font-inter font-medium text-left  ${isMenuOpen ? "" : "hidden"}`}>
                    {menuData.map((menu, index) => {
                        const depthLevel = 0;
                        return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
                    })}
                </ul>

            </div>
        </header>
    )
}

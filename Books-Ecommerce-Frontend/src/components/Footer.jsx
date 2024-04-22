import { React, useContext, useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { HiOutlineHome } from 'react-icons/hi2';
import { IoCartOutline } from 'react-icons/io5';
import { LuClipboardList } from 'react-icons/lu';
import { PopupCenterPanel } from './popup/PopupCenterPanel';
import { LuUser2 } from 'react-icons/lu';
import Login_SignUp from './Login_SignUp';
import { AppContext } from '../contexts/main';

export const Footer = () => {
  const mobileNavOption = [
    {
      name: 'Home',
      icon: <HiOutlineHome className="w-5 h-5 stroke-1" />,
      text: 'Bookada',
      path: '/',
    },
    {
      name: 'ShoppingCart',
      icon: <IoCartOutline className="w-5 h-5 stroke-1" />,
      text: 'Giỏ hàng',
      path: '/shoppingcarts',
    },
  ];
  const mobileNavOption_02 = [
    {
      name: 'Order',
      icon: <LuClipboardList className="w-5 h-5 stroke-1" />,
      text: 'Đơn hàng',
      path: '../account/orders-infomation',
    },
    {
      name: 'Account',
      icon: <LuUser2 className="w-5 h-5 stroke-1" />,
      text: 'Tài khoản',
      path: '../account/general-infomation',
    },
  ];
  const [user, setUser] = useState({
    id: '1',
    Name: '',
    shoppingCart: 0,
  });
  const [reloadLoginSignup, setReloadLoginSignup] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activePage, setActivePage, numCart } = useContext(AppContext);

  return (
    <div>
      <div
        id="footer"
        className=" w-full hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 place-content-start sm:jusitfy-items-center 
     bg-[red] text-white  text-left font-inter pb-4 "
      >
        <div className="">
          <address className=" lg:mx-auto pt-4 flex flex-col">
            <h2 className="ml-3 text-sm md:text-base  font-bold ">
              [NAME+LOGO], Inc.
            </h2>
            <br />

            <div className="ml-3 text-xs sm:text-[0.8rem] address inline-flex pb-2 gap-0.5 items-center">
              <FaMapMarkerAlt className="w-5 h-5" />
              227 Nguyễn Văn Cừ, Phường 4, Quận 5, TPHCM
            </div>

            <div className=" ml-3 text-xs sm:text-[0.8rem] email inline-flex pb-2 gap-0.5 items-center">
              <MdEmail className="w-5 h-5" />
              <a href="mailto:123@gmail.com">123@gmail.com</a>
            </div>

            <div className="ml-3 text-xs sm:text-[0.8rem] phone inline-flex pb-2 gap-0.5 items-center">
              <FaPhoneAlt className="w-5 h-5" />
              <a href="tel:1900 0000">1900 0000</a>
            </div>
          </address>

          <nav
            className=" ml-3 text-xs sm:text-[0.8rem] flex flex-col gap-2 pt-4"
            aria-label="footer"
          >
            <h2 className="font-bold">DỊCH VỤ</h2>
            <Link to="/" className="hover:opacity-90">
              {' '}
              Điều khoản sử dụng
            </Link>
            <Link to="/" className="hover:opacity-90">
              {' '}
              Chính sách bảo mật thông tin cá nhân{' '}
            </Link>
            <Link to="/" className="hover:opacity-90">
              {' '}
              Chính sách bảo mật thanh toán{' '}
            </Link>
            <Link to="/" className="hover:opacity-90">
              {' '}
              Giới thiệu [Name]
            </Link>
          </nav>

          <nav
            className="ml-3 text-xs sm:text-[0.8rem] flex flex-col gap-2 pt-4"
            aria-label="footer"
          >
            <h2 className="font-bold">HỖ TRỢ</h2>
            <Link to="/" className="hover:opacity-90">
              {' '}
              Về Chính sách đổi trả - Hoàn tiền
            </Link>
            <Link to="/" className="hover:opacity-90">
              {' '}
              Chính sách vận chuyển
            </Link>
          </nav>

          <nav
            className="ml-3 text-xs sm:text-[0.8rem] flex flex-col gap-2 pt-4"
            aria-label="footer"
          >
            <h2 className="font-bold">TÀI KHOẢN CỦA TÔI</h2>
            <Link to="/" className="hover:opacity-90">
              {' '}
              Đăng nhập/Đăng ký
            </Link>
            <Link to="/" className="hover:opacity-90">
              {' '}
              Thay đổi địa chỉ
            </Link>
            <Link to="/" className="hover:opacity-90">
              {' '}
              Trang cá nhân
            </Link>
            <Link to="/" className="hover:opacity-90">
              {' '}
              Lịch sử mua hàng
            </Link>
          </nav>
        </div>
      </div>

      {/* mobile */}
      <nav className="mobile h-[50px] fixed rounded-t-[20px] pb-4  bottom-0 left-0 z-[2] w-full  bg-white  shadow-2xl   sm:hidden">
        <ul className="grid grid-cols-4 relative ">
          {mobileNavOption.map((menu) => (
            <li key={menu.name}>
              <Link
                to={menu.path}
                className={` flex flex-col text-center pt-3 items-center  duration-500  px-auto py-2 `}
                onClick={() => setActivePage(menu.name)}
              >
                {/* Home - Shopping Cart  */}
                <div
                  className={`flex flex-col gap-[0.2rem] justify-center duration-100 ${
                    menu.name === activePage ? 'text-red-500' : 'text-gray-500'
                  }`}
                  // // ? '-mt-1 bg-gradient-to-r from-pink-500 to-red-500 text-white px-1 py-1 rounded-full  '
                  // : 'text-gray-500'
                >
                  <span className={`flex justify-center items-center`}>
                    {menu.icon}
                  </span>
                  <div className="text-xs">{menu.text}</div>
                </div>

                {/* update cart num*/}
                {menu.name == 'ShoppingCart' ? (
                  <span
                    className={`cart-quantity text-center text-sm min-w-[20px] h-[20px] rounded-[50%] mr-[-30px] mt-[-38px] bg-red-100 text-red-500 font-semibold ${menu.name === activePage ? 'mt-[-44px]' : ''}`}
                  >
                    {' '}
                    {numCart >= 100 ? '99+' : numCart}{' '}
                  </span>
                ) : (
                  ''
                )}
              </Link>
            </li>
          ))}

          {/* Đơn hàng - Tài khoản: Nếu chưa đăng nhập thì hiển thị popup Đăng nhập/Đăng ký */}
          {mobileNavOption_02.map((menu) => (
            <li key={menu.name}>
              {
                user.id.length > 0 ? (
                  <Link
                    to={menu.path}
                    className={` flex flex-col text-center pt-3 items-center  duration-500  px-auto py-2`}
                    onClick={() => setActivePage(menu.name)}
                  >
                    {/* Order - Account  */}
                    <div
                      className={`flex flex-col gap-[0.2rem] justify-center duration-100 ${
                        menu.name === activePage
                          ? 'text-red-500'
                          : 'text-gray-500'
                      }`}
                    >
                      <span className={`flex justify-center items-center`}>
                        {menu.icon}
                      </span>
                      <div className="text-xs">{menu.text}</div>
                    </div>
                  </Link>
                ) : (
                  <div
                    onClick={() => setActivePage(menu.name)}
                    className={`flex flex-col text-center pt-3 items-center duration-500  px-auto py-2 ${user.id.length <= 0 ? 'block' : 'hidden'}`}
                  >
                    <span
                      onClick={() => setOpen(true)}
                      className={`items-center  text-gray-700 duration-500  ${
                        menu.name === activePage
                          ? '-mt-4 bg-gradient-to-r from-pink-500 to-red-500 d px-2 py-2 rounded-full text-white'
                          : 'text-gray-400'
                      }`}
                    >
                      {menu.icon}
                    </span>
                    <PopupCenterPanel
                      open={open}
                      setOpen={setOpen}
                      // icon={
                      //   <span onClick={() => setActivePage(i)}
                      //     className={`items-center  text-gray-700 duration-500   ${menu.name === activePage ? "text-red-500 bg-red-300" : "text-gray-400"
                      //       }`}
                      //   >
                      //     {menu.icon}
                      //   </span>

                      // }
                      title={''}
                      titleClassName="p-2 hidden"
                      content={
                        <>
                          {reloadLoginSignup ? (
                            <div></div>
                          ) : (
                            <Login_SignUp
                              reload={reloadLoginSignup}
                              setReload={setReloadLoginSignup}
                              setUser={setUser}
                              setOpen={setOpen}
                            />
                          )}
                        </>
                      }
                    />
                    <div></div>
                  </div>
                )

                // </div>

                // </div>
              }
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

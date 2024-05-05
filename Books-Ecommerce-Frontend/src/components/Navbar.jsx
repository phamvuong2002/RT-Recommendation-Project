import {
  React,
  Fragment,
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import { FaUser, FaBars, FaTimes, FaHeart } from 'react-icons/fa';
import { Menu, Transition } from '@headlessui/react';
import { IoCartOutline } from 'react-icons/io5';
import Search from './Search';
import { ShoppingCartsPopup } from './ShoppingCartsPopup';
import { PopupCenterPanel } from './popup/PopupCenterPanel';
import Login_SignUp from './Login_SignUp';
import Category_dropdown from './Category_Dropdown';
import { HiMiniSquares2X2, HiChevronDown } from 'react-icons/hi2';
import { LuClipboardList, LuLogOut } from 'react-icons/lu';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../contexts/main';

import { getUserInfo } from '../apis/user';
import { fetchAPI } from '../helpers/fetch';
import { logout } from '../apis/access';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
// Navbar chính
export const Navbar = () => {
  const {
    numCart,
    requestAuth,
    userId,
    token,
    setrequestAuthm,
    setToken,
    username,
    setUserId,
  } = useContext(AppContext);

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.search;
  const [isOpenShoppingCarts, setIsOpenShoppingCarts] = useState(false);
  const [user, setUser] = useState('');
  //   {
  //   id: '',
  //   name: '',
  //   // shoppingCart: 0,
  // });
  const [reloadLoginSignup, setReloadLoginSignup] = useState(false);

  // Mở Drop down của Tài khoản
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(dropdownRef, false);
  const [mouseOverButton, setMouseOverButton] = useState(false);
  const [mouseOverMenu, setMouseOverMenu] = useState(false);

  const timeoutDuration = 100;
  let timeoutButton;
  let timeoutMenu;

  /************************CHECK AUTHENTICATION***********************************/
  //Router thủ công cho những trang yêu cầu Xác Thực Tài Khoản
  //Sử dung các biến token, userId, requestAuth (và một số biến liên quan)
  //Để xác định có cần xác thực
  //*** Lưu Ý: cần phải reset các biến yêu cầu xác thực khi xác thực thành công
  //**** SET TOKEN CHO USER ĐÃ XÁC THỰC THÀNH CÔNG
  useEffect(() => {
    if (requestAuth && (!token || token === 'unkown') && !open) {
      //Về home nếu user thoát xác thực (vấn bậc popup yêu cầu xác thực ở trang home)
      // navigate('/');
      setOpen(true);
    }
    if (token && token !== 'unkown') {
      setOpen(false);
    }
  }, [requestAuth, userId, token, open]);
  /***********************************************************/

  const onMouseEnterButton = () => {
    clearTimeout(timeoutButton);
    setOpenDropdown(true);
    setMouseOverButton(true);
  };
  const onMouseLeaveButton = () => {
    timeoutButton = setTimeout(
      () => setMouseOverButton(false),
      timeoutDuration,
    );
  };

  const onMouseEnterMenu = () => {
    clearTimeout(timeoutMenu);
    setMouseOverMenu(true);
  };
  const onMouseLeaveMenu = () => {
    timeoutMenu = setTimeout(() => setMouseOverMenu(false), timeoutDuration);
  };

  const show = openDropdown && (mouseOverMenu || mouseOverButton);

  const accountOption = [
    {
      name: 'Tài khoản',
      icon: <FaUser className="mr-2" />,
      path: '../account/general-infomation',
    },
    {
      name: 'Đơn hàng của tôi',
      icon: <LuClipboardList className="mr-2" />,
      path: '../account/orders-infomation',
    },
    {
      name: 'Mục yêu thích',
      icon: <FaHeart className="mr-2" />,
      path: '../account/following-infomation',
    },
    // { name: 'Đăng xuất', icon: <LuLogOut className="mr-2" />, path: '/' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickShoppingCarts = () => {
    setIsOpenShoppingCarts(!isOpenShoppingCarts);
  };

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
      navigate('/');
      console.log('in logout success');
    }
    console.log('in logout');

    //nhận lại kết quả, xem Logout có thành công
  };

  useEffect(() => {
    //console.log('reloadLoginSignup::', reloadLoginSignup);
    if (reloadLoginSignup) {
      setOpen(true);
      setReloadLoginSignup(false);
    }
  }, [reloadLoginSignup]);

  useEffect(() => {
    //console.log('in set false   ')
    setIsMenuOpen(false);
  }, [path]);

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId || !token) return;
      const userData = await fetchAPI(`../${getUserInfo}`, 'POST', {
        userId: userId,
      });
      console.log(userData);
      //   console.log(userData)
      setUser(userData.metadata.user_data);
    };

    loadUserData();
    // console.log(userId)
    // console.log('user ', user)
  }, [userId, token]);

  return (
    <nav className="max-w-screen-2xl font-inter flex flex-col ">
      <div className=" mx-auto my-1  sm:max-w-screen-md md:max-w-screen-2xl flex justify-between items-center md:justify-around lg:grid lg:grid-cols-6 lg:gap-4 lg:justify-items-start container  relative ">
        <Link
          to="/"
          className="hidden lg:block text-xs sm:text-lg lg:text-xl lg:pl-6 lg:col-span-1"
        >
          <img src="/logo/logo_bookada_800x400.png" alt="Bookada-logo" />
        </Link>

        <div className="block lg:hidden w-4 h-4 ml-2 mb-1 md:absolute md:left-0  ">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              ''
            ) : (
              <FaBars className="w-5 h-5 sm:w-5 sm:h-5 text-red-500 " />
            )}
          </button>
        </div>


        <div className="hidden lg:block cate_drop_down group relative mx-auto lg:col-span-1 ">
          <button
            className=" p-2 text-gray-400 hover:text-gray-500 flex items-center "
            onClick={toggleMenu}
          >
            <HiMiniSquares2X2 className="h-7 w-7 " aria-hidden="true" />
            <HiChevronDown
              className="mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Vị trí thanh Search*/}
        <div className="search-bar-container relative inline-block w-[75%] mx-auto md:w-[55%] lg:col-span-2 lg:w-[120%] lg:ml-[-4.5rem] rounded-[5px] my-3 ">
          <Search />
        </div>  

        {/* ACCOUNT: Guest/User*/}
        <div className="hidden text-xl lg:text-lg ml-1  sm:inline-flex justify-between gap-1 mr-1 md:absolute  md:right-4 md:mr-0 lg:relative lg:mr-3 sm:my-auto sm:gap-4   text-black lg:col-span-2 lg:justify-self-center lg:gap-10 ">
          <div className="flex items-center">
            {/* Chưa đăng nhập sẽ hiển thị popup Đăng ký/Đăng nhập */}
            <div
              className={`group flex items-center text-lg font-medium text-black  ${!token ? 'block' : 'hidden'}`}
            >
              <PopupCenterPanel
                open={open}
                setOpen={setOpen}
                icon={
                  <div className=" flex items-center text-lg font-medium text-black ">
                    <FaUser className="h-4 w-4 ml-1 sm:h-5 sm:w-5 text-red-500 text-xs " />
                    <p className="hidden font-inter lg:block ml-2">
                      Đăng nhập/ Đăng ký{' '}
                    </p>
                  </div>
                }
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
                        // setUser={setUser}
                        setOpen={setOpen}
                        open={open}
                      />
                    )}
                  </>
                }
              />
            </div>

            {/* Đã đăng nhập thì cho khi người dùng hover vào--> Hiển thị:
                            + Tài khoản: Trang cá nhân
                            + Đơn hàng của tôi
                            + Mục yêu thích
                            + Đăng xuất */}
            <Menu
              as="div"
              className={`${token ? 'block' : 'hidden'} relative inline-block text-left`}
            >
              {({}) => (
                <div>
                  <div
                    onClick={() => setOpenDropdown(!openDropdown)}
                    onMouseEnter={onMouseEnterButton}
                    onMouseLeave={onMouseLeaveButton}
                  >
                    <Menu.Button
                      className={`group flex items-center  text-lg font-medium text-gray-700 hover:text-gray-90`}
                    >
                      <FaUser className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                      <p className="hidden lg:block truncate max-w-[10rem] ml-2">
                        {' '}
                        {token ? username : 'Đăng nhập/ Đăng ký'}
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
                      className={
                        'absolute right-0 z-10 mt-2 w-[11rem] rounded-md bg-white shadow-2xl focus:outline-none'
                      }
                    >
                      <div className="py-1">
                        {accountOption.map((option) => (
                          <Menu.Item
                            key={option.name}
                            onClick={() => setOpenDropdown(false)}
                          >
                            {(active) => (
                              <Link
                                to={option.path}
                                name={option.name}
                                className={classNames(
                                  'flex flex-row items-center text-[1rem] px-3 py-2  hover:text-red-500',
                                  option.current
                                    ? 'font-medium text-gray-900'
                                    : 'text-gray-500',
                                  active ? '' : '',
                                )}
                              >
                                {option.icon}
                                {option.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                      <div
                        name="logout-option"
                        className={`flex flex-row items-center text-gray-500 text-[1rem] px-3 py-2 hover:cursor-pointer hover:text-red-500`}
                        onClick={handleLogout}
                      >
                        <LuLogOut className="mr-2" />
                        Đăng xuất
                      </div>
                    </Menu.Items>
                  </Transition>
                </div>
              )}
            </Menu>
          </div>

          <button
            className="flex items-center sm:gap-2"
            onClick={handleClickShoppingCarts}
          >
            <div className="flex">
              <IoCartOutline className="text-red-500 h-5 w-5 ml-2 sm:h-6 sm:w-6 " />
              <span className="cart-quantity text-center text-sm min-w-[1.25rem] h-[1.25rem] rounded-[50%] ml-[-0.625rem] mt-[-0.315rem] bg-[red] text-white">
                {' '}
                {numCart >= 100 ? '99+' : numCart >= 0 ? numCart : 0}{' '}
              </span>
            </div>
            <p className="hidden lg:block ">Giỏ hàng</p>
            <ShoppingCartsPopup
              open={isOpenShoppingCarts}
              setOpen={setIsOpenShoppingCarts}
            />
          </button>
        </div>
      </div>

      <div
        className={`hidden desktop_menu absolute lg:mt-[4rem] lg:mx-[7rem]  z-10  ${isMenuOpen ? 'lg:block' : 'hidden'}`}
      >
        <Category_dropdown />
      </div>

      <div
        className={`block lg:hidden absolute inset-y-0 left-0 lg:mx-auto lg:mt-1 z-10  w-full ease-in-out duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full '}`}
      >
        <div className=" w-full  flex lg:hidden text-center  bg-red-500 py-5 text-white font-bold">
          <button
            className=" ml-2 md:ml-5 text-white text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTimes className="h-5 w-6  md:h-7 md:w-7 mx-auto" />
          </button>
          <h1 className=" mx-auto text-sm md:text-lg"> DANH MỤC SẢN PHẨM</h1>
        </div>
        <Category_dropdown />
      </div>
    </nav>
  );
};

import { React, useState } from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';

import { HiOutlineHome } from "react-icons/hi2";
import { IoCartOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { PopupCenterPanel } from './popup/PopupCenterPanel';
import { LuUser2 } from "react-icons/lu";
import Login_SignUp from './Login_SignUp';

export const Footer = () => {
  const mobileNavOption = [
    {
      name: 'Home', icon: <HiOutlineHome className='w-8 h-8 stroke-1' />
      , path: '/'
    },
    { name: 'ShoppingCart', icon: <IoCartOutline className='w-8 h-8 stroke-1' />, path: '/shoppingcarts' },
  ]
  const mobileNavOption_02 = [
    { name: 'Order', icon: <LuClipboardList className='w-8 h-8 stroke-1' />, path: '../account/orders-infomation' },
    { name: 'Account', icon: <LuUser2 className='w-7 h-7 stroke-1' />, path: '../account/general-infomation' },

  ]
  const [user, setUser] = useState({
    id: '1',
    Name: "",
    shoppingCart: 0
  })
  const [reloadLoginSignup, setReloadLoginSignup] = useState(false)
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <div>
      <div id='footer' className=" w-full grid grid-cols-2 lg:grid-cols-4 place-content-start sm:jusitfy-items-center 
     bg-[red] text-white  text-left font-inter pb-4 ">
        <div className='hidden sm:block'>
          <address className=" lg:mx-auto pt-4 flex flex-col">

            <h2 className='ml-3 text-sm md:text-base  font-bold '>[NAME+LOGO], Inc.</h2>
            <br />

            <div className='ml-3 text-xs sm:text-[0.8rem] address inline-flex pb-2 gap-0.5 items-center'>
              <FaMapMarkerAlt className='w-5 h-5' />
              227 Nguyễn Văn Cừ, Phường 4, Quận 5, TPHCM

            </div>

            <div className=" ml-3 text-xs sm:text-[0.8rem] email inline-flex pb-2 gap-0.5 items-center">
              <MdEmail className='w-5 h-5' />
              <a href="mailto:123@gmail.com">123@gmail.com</a>
            </div>

            <div className="ml-3 text-xs sm:text-[0.8rem] phone inline-flex pb-2 gap-0.5 items-center">
              <FaPhoneAlt className='w-5 h-5' />
              <a href="tel:1900 0000">1900 0000</a>
            </div>
          </address>

          <nav className=" ml-3 text-xs sm:text-[0.8rem] flex flex-col gap-2 pt-4" aria-label="footer">
            <h2 className='font-bold'>DỊCH VỤ</h2>
            <Link to="/" className="hover:opacity-90"> Điều khoản sử dụng</Link>
            <Link to="/" className="hover:opacity-90"> Chính sách bảo mật thông tin cá nhân </Link>
            <Link to="/" className="hover:opacity-90"> Chính sách bảo mật thanh toán </Link>
            <Link to="/" className="hover:opacity-90"> Giới thiệu [Name]</Link>
          </nav>

          <nav className="ml-3 text-xs sm:text-[0.8rem] flex flex-col gap-2 pt-4" aria-label="footer">
            <h2 className='font-bold'>HỖ TRỢ</h2>
            <Link to="/" className="hover:opacity-90"> Về Chính sách đổi trả - Hoàn tiền</Link>
            <Link to="/" className="hover:opacity-90"> Chính sách vận chuyển</Link>

          </nav>

          <nav className="ml-3 text-xs sm:text-[0.8rem] flex flex-col gap-2 pt-4" aria-label="footer">
            <h2 className='font-bold'>TÀI KHOẢN CỦA TÔI</h2>
            <Link to="/" className="hover:opacity-90"> Đăng nhập/Đăng ký</Link>
            <Link to="/" className="hover:opacity-90"> Thay đổi địa chỉ</Link>
            <Link to="/" className="hover:opacity-90"> Trang cá nhân</Link>
            <Link to="/" className="hover:opacity-90"> Lịch sử mua hàng</Link>

          </nav>
        </div>


      </div>

      <nav className="mobile h-[50px] fixed rounded-t-[20px]   bottom-0 left-0 z-[2] w-full  bg-white  shadow-2xl   sm:hidden">
        {/* mobile */}
        <ul className="grid grid-cols-4 relative ">
          {mobileNavOption.map((menu) => (
            <li key={menu.name} >
              <Link to={menu.path}
                className={
                  ` flex flex-col text-center pt-3 items-center  duration-500  px-auto py-2 `
                }
                onClick={() => setActive(menu.name)}
              >
                <span
                  className={`items-center  duration-500   ${menu.name === active ? "-mt-4 bg-gradient-to-r from-pink-500 to-red-500 text-white px-2 py-2 rounded-full  " : 'text-gray-500'
                    }`}
                >
                  {menu.icon}

                </ span>
                {menu.name == 'ShoppingCart' ?
                  <span className={`cart-quantity text-center text-sm min-w-[20px] h-[20px] rounded-[50%] mr-[-30px] mt-[-38px] bg-red-100 text-red-500 font-semibold ${menu.name === active ? "mt-[-44px]" : ""}`}> {user.shoppingCart >= 100 ? '99+' : user.shoppingCart}  </span> :
                  ""}
              </Link>
            </li>
          ))}

          {/* Đơn hàng - Tài khoản: Nếu chưa đăng nhập thì hiển thị popup Đăng nhập/Đăng ký */}
          {mobileNavOption_02.map((menu) => (
            <li key={menu.name} >
              {user.id.length > 0 ?
                <Link to={menu.path}
                  className={
                    ` flex flex-col text-center pt-3 items-center  duration-500  px-auto py-2`
                  }
                  onClick={() => setActive(menu.name)}
                >
                  <span
                    className={`items-center text-gray-700 duration-500   ${menu.name === active ? "-mt-4 bg-gradient-to-r from-pink-500 to-red-500 d px-2 py-2 rounded-full text-white" : "text-gray-400"
                      }`}
                  >
                    {menu.icon}
                  </span>
                </Link>
                :
                <div onClick={() => setActive(menu.name)}
                  className={`flex flex-col text-center pt-3 items-center duration-500  px-auto py-2 ${user.id.length <= 0 ? 'block' : 'hidden'}`} >
                  <span onClick={()=>setOpen(true)}
                    className={`items-center  text-gray-700 duration-500  ${menu.name === active ? "-mt-4 bg-gradient-to-r from-pink-500 to-red-500 d px-2 py-2 rounded-full text-white" : "text-gray-400"
                      }`}
                  >
                    {menu.icon}
                  </span>
                  <PopupCenterPanel open={open} setOpen={setOpen}
                    // icon={
                    //   <span onClick={() => setActive(i)}
                    //     className={`items-center  text-gray-700 duration-500   ${menu.name === active ? "text-red-500 bg-red-300" : "text-gray-400"
                    //       }`}
                    //   >
                    //     {menu.icon}
                    //   </span>

                    // }
                    title={''}
                    titleClassName='p-2 hidden' content={<>
                      {
                        reloadLoginSignup ? <div></div> :
                          <Login_SignUp reload={reloadLoginSignup} setReload={setReloadLoginSignup} setUser={setUser} setOpen={setOpen} />
                      }
                    </>
                    }
                  />
                  <div>
                  </div>
                </div>


                // </div>

                // </div>
              }


            </li>


          ))}

        </ul>

      </nav>
    </div >

  )
}


import React from 'react'
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const Footer = () => {
  return (
    <div id='footer' className=" w-full grid grid-cols-2 lg:grid-cols-4 place-content-start sm:jusitfy-items-center 
     bg-[red] text-white text-sm  text-left pb-4">
      <address className=" lg:mx-auto pt-4 flex flex-col">

        <h2 className='ml-3 text-base  font-bold '>[NAME+LOGO], Inc.</h2>
        <br />

        <div className='ml-3 text-[0.8rem] address inline-flex pb-2 gap-0.5 items-center'>
          <FaMapMarkerAlt />
          227 Nguyễn Văn Cừ, Phường 4, Quận 5, TPHCM

        </div>

        <div className=" ml-3 text-[0.8rem] email inline-flex pb-2 gap-0.5 items-center">
          <MdEmail />
          <a href="mailto:123@gmail.com">123@gmail.com</a>
        </div>

        <div className="ml-3 text-[0.8rem] phone inline-flex pb-2 gap-0.5 items-center">
          <FaPhoneAlt />
          <a href="tel:1900 0000">1900 0000</a>
        </div>
      </address>

      <nav className=" ml-3 text-[0.8rem] flex flex-col gap-2 pt-4" aria-label="footer">
        <h2 className='font-bold'>DỊCH VỤ</h2>
        <a href="/" className="hover:opacity-90"> Điều khoản sử dụng</a>
        <a href="/" className="hover:opacity-90"> Chính sách bảo mật thông tin cá nhân </a>
        <a href="/" className="hover:opacity-90"> Chính sách bảo mật thanh toán </a>
        <a href="/" className="hover:opacity-90"> Giới thiệu [Name]</a>
      </nav>

      <nav className="ml-3 text-[0.8rem] flex flex-col gap-2 pt-4" aria-label="footer">
        <h2 className='font-bold'>HỖ TRỢ</h2>
        <a href="/" className="hover:opacity-90"> Về Chính sách đổi trả - Hoàn tiền</a>
        <a href="/" className="hover:opacity-90"> Chính sách vận chuyển</a>

      </nav>


      <nav className="ml-3 text-[0.8rem] flex flex-col gap-2 pt-4" aria-label="footer">
        <h2 className='font-bold'>TÀI KHOẢN CỦA TÔI</h2>
        <a href="/" className="hover:opacity-90"> Đăng nhập/Đăng ký</a>
        <a href="/" className="hover:opacity-90"> Thay đổi địa chỉ</a>
        <a href="/" className="hover:opacity-90"> Trang cá nhân</a>
        <a href="/" className="hover:opacity-90"> Lịch sử mua hàng</a>

      </nav>

    </div>
  
  )
}


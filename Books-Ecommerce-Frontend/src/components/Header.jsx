import React from 'react'
import { GiSpellBook } from "react-icons/gi";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className='sm:justify-between  bg-red  text-xs lg:text-base text-white font-popi'>

      <div className='hidden lg:flex flex-row justify-between  bg-[red]  text-xs lg:text-base'>
        <div id="logo_name" className='flex items-center gap-5 lg:gap-10 px-5'>
          <GiSpellBook className="w-5 h-5 lg:w-10 lg:h-10 pb-1" />
          <div className='py-2 text-center sm:block'> BOOK FOR YOU</div>
        </div>

        <div className=' flex flex-row items-center gap-5 px-5 sm:px-10'>
          <a href="https://www.facebook.com/"><FaFacebookF className='w-4 h-4 sm:w-5 lg:h-5' /> </a>
          <a href=""><FaInstagram className='w-4 h-4 sm:w-5 lg:h-5' /> </a>
          <a href=""><FaLinkedin className='w-4 h-4 sm:w-5 lg:h-5' /> </a>
        </div>
      </div>

      <Link to="/" className='block lg:hidden text-base sm:text-lg lg:text-xl text-center text-white bg-red-500'> [NAME+LOGO] </Link>

    </header>

  )
}


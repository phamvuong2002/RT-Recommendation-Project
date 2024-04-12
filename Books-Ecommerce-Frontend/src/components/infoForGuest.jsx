import React, { useEffect, useState, useRef } from 'react';
import { fetchData } from '../helpers/fetch'
import { motion } from 'framer-motion'
import { FadeInYDirection, FadeInXDirection } from '../helpers/animationFramerMotion'

export const InfoForGuest = () => {
    const { ref: leftRef, animate: leftAnimate, initial: leftInitial } = FadeInXDirection("left", 0.5);
    const { ref: rightRef, animate: rightAnimate, initial: rightInitial } = FadeInXDirection("right", 0.5);

    return (
        <div className="my-5">
            <div className="w-full md:h-full flex bg-gradient-to-r from-rose-100 to-slate-100 rounded-md">
                <div
                    className="w-full hidden sm:block">
                    <motion.img
                        ref={leftRef} animate={leftAnimate} initial={leftInitial}
                        className="h-full w-full object-cover" src='https://i.pinimg.com/564x/25/b1/d7/25b1d7db376464566b5189a7ca7271da.jpg'></motion.img>
                </div>
                <motion.div
                    ref={rightRef} animate={rightAnimate} initial={rightInitial}

                    className="w-full font-['Inter'] p-4 md:p-8">
                    <div className='flex flex-col'>
                        <div className='mb-3'>
                            <h3 className='text-red-500 text-[0.65rem] md:text-sm font-bold tracking-wider'>tên web</h3>
                        </div>
                        <div>
                            <h1 className='text-[#1a2055] text-xs d:text-lg font-medium tracking-wide'>Hãy cùng chúng tôi tích lũy</h1>
                        </div>
                        <div className='my-4 md:my-0'>
                            <h1 className='text-[#3440a5] text-2xl md:text-2xl font-bold md:font-extrabold md:leading-10 tracking-wide'>Kiến Thức - Kinh Nghiệm - Trải Nghiệm</h1>
                        </div>
                        <div >
                            <h3 className='md:my-3 text-[#1a2055] text-opacity-70 text-xs md:text-lg font-medium'>Để có thể tìm thấy và theo dõi những quyển sách hữu ích, hãy đăng ký tài khoản ngay bạn nhé!</h3>
                        </div>
                        <div className='bg-red-500 lg:hover:bg-[#47d873] rounded-lg text-center mx-auto mt-3 md:mt-5 px-6 py-2'>
                            <button className=' text-white text-lg font-bold tracking-tight'>Đăng ký ngay</button>
                        </div>
                    </div>
                </motion.div>

                {/*<div className="w-96 h-96 justify-end items-center inline-flex">
                <div className="w-96 h-96 relative">
                    <div className="w-96 h-96 left-0 top-0 absolute bg-gradient-to-r from-rose-50 to-slate-50" />
                    <img className="w-96 h-96 left-[765px] top-0 absolute" src="https://via.placeholder.com/674x552" />
                    <div className="w-96 h-80 left-[62px] top-[96px] absolute">
                        <div className="w-48 h-14 left-[176px] top-[292px] absolute">
                            <div className="w-48 h-14 left-0 top-0 absolute bg-red-500 rounded-lg" />
                            <div className="w-36 left-[24px] top-[18px] absolute text-center text-white text-xl font-bold font-['Inter'] tracking-tight">Đăng ký ngay</div>
                        </div>
                        <div className="w-96 h-24 left-0 top-[23px] absolute text-slate-700 text-3xl font-extrabold font-['Inter'] leading-10 tracking-wide">Trao dồi “ Kiến thức - Kinh nghiệm - Trải nghiệm”</div>
                        <div className="w-96 h-32 left-0 top-[151px] absolute text-indigo-900 text-opacity-70 text-lg font-medium font-['Inter'] leading-loose">Để tích lũy kiến thức phong phú ở những quyển sách đa dạng thể loại chỉ có ở “tên web” của chúng tôi, hãy đăng ký tài khoản để có những trải nghiệm tuyệt vời và tìm thấy những quyển sách thú vị bạn nhé!</div>
                        <div className="w-64 h-5 left-0 top-0 absolute">
                            <div className="w-8 h-0.5 left-0 top-[9px] absolute bg-red-500" ></div>
                            <div className="w-52 h-5 left-[45px] top-0 absolute text-red-500 text-sm font-bold font-['Inter'] tracking-wider">tên web</div>
                        </div>
                    </div>
                </div>
            </div>*/}
            </div >
        </div >
    );
}
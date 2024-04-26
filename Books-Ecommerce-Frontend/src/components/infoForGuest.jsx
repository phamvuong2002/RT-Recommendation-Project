import React, { useEffect, useState, useRef } from 'react';
import { fetchData } from '../helpers/fetch'
import { motion } from 'framer-motion'
import { FadeInXDirection } from '../helpers/animationFramerMotion'

export const InfoForGuest = () => {
    const { ref: leftRef, animate: leftAnimate, initial: leftInitial } = FadeInXDirection("left", 0.5);
    const { ref: rightRef, animate: rightAnimate, initial: rightInitial } = FadeInXDirection("right", 0.5);

    return (
        <div className="my-5">
            <div className="w-full overflow-hidden md:h-full flex bg-gradient-to-r from-rose-100 to-slate-100 rounded-md">
                <div
                    className="w-full hidden sm:block">
                    <motion.img
                        ref={leftRef} animate={leftAnimate} initial={leftInitial}
                        className="h-full w-full object-cover" src='https://i.pinimg.com/564x/25/b1/d7/25b1d7db376464566b5189a7ca7271da.jpg'>
                    </motion.img>
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
            </div>
        </div>
    );
}
import React, { useEffect, useState, useRef } from 'react';
import { fetchData } from '../helpers/fetch';


export const InfoForGuest = () => {

    return (
        <div className="mx-10 ">
            <div className="w-full md:h-96 flex bg-gradient-to-r from-slate-50 to-rose-50 rounded-md">
                <div className="w-full block">
                    <img className="h-full object-cover" src='https://i.pinimg.com/564x/25/b1/d7/25b1d7db376464566b5189a7ca7271da.jpg'></img>
                </div>
                <div className="w-full flex flex-col">
                    <div className="">
                        <h3>tên web</h3>
                    </div>
                    <div>
                        <h1>Hãy cùng chúng tôi tích lũy</h1>
                    </div>
                    <div>
                        <h1>Kiến thức Kinh Nghiệm Trải Nghiệm</h1>
                    </div>
                    <div>
                        <h3>Để tích lũy kiến thức phong phú ở những quyển sách đa dạng thể loại chỉ có ở “tên web” của chúng tôi, hãy đăng ký tài khoản để có những trải nghiệm tuyệt vời và tìm thấy những quyển sách thú vị bạn nhé!</h3>
                    </div>
                    <div>
                        <button>Đăng ký ngay</button>
                    </div>
                </div>

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
            </div>
        </div>
    );
}
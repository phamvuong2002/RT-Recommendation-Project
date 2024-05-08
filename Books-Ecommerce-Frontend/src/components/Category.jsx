import React, { useEffect, useState, useRef } from 'react';
import { fetchData } from '../helpers/fetch';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import Category_dropdown from './Category_Dropdown';
import { FadeInYDirection } from '../helpers/animationFramerMotion'
import { motion } from 'framer-motion'
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

export const Category = () => {
    const { ref: topRef, animate: topAnimate, initial: topInitial } = FadeInYDirection("top", 0.3);
    const [category, setCategory] = useState([])
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    //Fetch Category Data
    useEffect(() => {
        const url = '../data/test/topcategory.json';
        const loadTopCategory = async () => {
            try {
                const categoriesTop5 = await fetchData(url);
                setCategory(categoriesTop5[0])


            } catch (error) {
                // throw error;
            }
        }
        //
        loadTopCategory()

    }, [])


    return (
        <div className="md:grid md:justify-items-stretch">
            <div className="flex items-center md:mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-[#ffbe98] w-[5%] md:w-[2%]">
                    <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
                </svg>
                <div className="text-[90%] md:text-[150%] font-semibold font-['Inter'] tracking-wider">Thể loại ưa chuộng</div>
            </div>

            <div className='w-full px-4 py-2 md:justify-self-center md:p-0 md:rounded-none md:bg-transparent md:grid md:grid-cols-[1fr,1.5fr,1fr] md:gap-6'>
                <Link className="md:relative md:text-white font-semibold">
                    <span className="hidden md:block md:absolute md:top-[4%] md:left-[8%] md:text-5xl">1</span>
                    <p className="hidden md:block text-[18px] font-bold md:absolute md:bottom-12 md:w-full md:text-center md:text-[20px] lg:text-[28px] md:font-bold">{category.top1}</p>
                    <img className="hidden md:block w-full h-full rounded-md" src="https://i.pinimg.com/564x/9f/11/78/9f11789aeadd48203dd2d3af10d9a57d.jpg"></img>
                </Link>

                <div className='hidden md:flex md:flex-col w-full border-2 bg-white rounded-md shadow-lg md:px-[12%] lg:px-[20%] md:py-[20%] lg:py-[25%] '>
                    <h1 className="sm:mb-5 md:text-2xl lg:text-3xl text-center font-semibold text-indigo-900 capitalize">
                        Top 5 thể loại được ưa chuộng
                    </h1>
                    <button onClick={toggleMenu} className='m-auto '>
                        <p className='bg-red-500 text-white px-8 rounded-sm text-[1.2rem]'>Xem thêm</p>
                    </button>
                </div>

                <Link className="md:relative md:text-white font-semibold">
                    <span className="hidden md:block md:absolute md:top-[4%] md:left-[8%] md:text-5xl">2</span>
                    <p className="hidden md:block text-[18px] font-bold md:absolute md:bottom-12 md:w-full md:text-center md:text-[20px] lg:text-[28px] md:font-bold">{category.top2}</p>
                    <img className="hidden md:block w-full h-full rounded-md" src="https://i.pinimg.com/564x/90/af/2f/90af2f0ffb3dcbee2fbc87b10d2d98f0.jpg"></img>
                </Link>

                <Link className="md:relative md:text-white font-semibold">
                    <span className="hidden md:block md:absolute md:top-[4%] md:left-[8%] md:text-5xl">3</span>
                    <p className="hidden md:block text-[18px] font-bold md:absolute md:bottom-12 md:w-full md:text-center md:text-[20px] lg:text-[28px] md:font-bold">{category.top3}</p>
                    <img className="hidden md:block h-full rounded-md" src="https://i.pinimg.com/564x/89/ad/1f/89ad1f413de58358e757b6da8444709f.jpg"></img>
                </Link>

                <Link className="md:relative md:text-white font-semibold">
                    <span className="hidden md:block md:absolute md:top-[4%] md:left-[8%] md:text-5xl">4</span>
                    <p className=" hidden md:block md:absolute md:bottom-12 md:w-full md:text-center md:text-[20px] lg:text-[28px] md:font-bold">{category.top4}</p>
                    <img className="hidden md:block w-full h-full rounded-md" src="https://i.pinimg.com/564x/63/24/97/6324977f3f0c1c0f7ecdb1072e7ded00.jpg"></img>
                </Link>

                <Link className="md:relative md:text-white font-semibold">
                    <span className="hidden md:block md:absolute md:top-[4%] md:left-[8%] md:text-5xl">5</span>
                    <p className="hidden md:block md:absolute md:bottom-12 md:w-full md:text-center md:text-[20px] lg:text-[28px] md:font-bold">{category.top5}</p>
                    <img className="hidden md:block w-full h-full rounded-md" src="https://i.pinimg.com/564x/47/2d/42/472d4278bc724404d8f3ce18f301af0b.jpg"></img>
                </Link>


            </div>

            <div
                className={`bg-black/30 flex fixed top-0 bottom-0 left-0 right-0 justify-center items-center z-10 ${isMenuOpen ? '' : 'hidden'}`}
            >
                <motion.div ref={topRef} animate={topAnimate} initial={topInitial}>

                    <Category_dropdown isShowCloseIcon={true}
                        isMenuOpen={isMenuOpen}
                        toggleMenu={toggleMenu}
                    />
                </motion.div>

            </div>

            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                modules={[Pagination]}
                className="mySwiper block md:hidden"
            >

                {/* Duyệt qua các thuộc tính của đối tượng category và hiển thị chúng */}
                {Object.keys(category).map((index) => (
                    <SwiperSlide key={index}>
                        {/* If screen is mobile, </svg> will be hidden. Just show </p> and </div> */}
                        <div className="flex justify-center items-center rounded-lg h-[100px] bg-[#fda1a194] p-2">
                            <p className="text-[15px] text-center">{category[index]}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
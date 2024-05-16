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
                setCategory(categoriesTop5)
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        }
        loadTopCategory()
    }, [])
    if (category.length === 0) {
        return <div>Loading...</div>;
    }

    const combinedElements = [];
    combinedElements.push(
        <Link className="md:text-black font-semibold bg-white rounded-md shadow-lg">
            <p className="hidden md:block text-[18px] font-bold p-2">{category[0].cate_top1}</p>
            <img className="hidden md:block w-full  rounded-b-md" src={category[0].cate_img}></img>
        </Link>
    );

    combinedElements.push(
        <div className='hidden md:flex bg-white rounded-md shadow-lg flex-col items-center justify-center'>
            <h1 className="sm:mb-5 md:text-xl lg:text-2xl text-center font-semibold text-indigo-900 capitalize">
                Top 5 thể loại được ưa chuộng
            </h1>
            <button onClick={toggleMenu}>
                <p className='bg-red-500 text-white px-8 rounded-sm text-[1.2rem]'>Xem thêm</p>
            </button>
        </div>

    );

    for (let i = 1; i < category.length; i++) {
        combinedElements.push(
            <Link className="md:text-black font-semibold bg-white rounded-md shadow-lg">
                <p className="hidden md:block text-[18px] font-bold p-2">{category[i][`cate_top${i + 1}`]}</p>
                <img className="hidden md:block w-full rounded-b-md" src={category[i].cate_img}></img>
            </Link>
        );
    }

    return (
        <div className="md:grid md:justify-items-stretch">
            <div className="flex items-center md:mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-[#ffbe98] w-[5%] md:w-[2%]">
                    <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
                </svg>
                <div className="text-[90%] md:text-[150%] font-semibold font-['Inter'] tracking-wider">Thể loại ưa chuộng</div>
            </div>
            <div className='hiden md:grid md:grid-cols-3 md:gap-7'>
                {combinedElements}
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
                slidesPerView={2}
                spaceBetween={10}
                modules={[Pagination]}
                className="mySwiper block md:hidden"
            >
                {category.map((cate, index) => (
                    <SwiperSlide key={index}>
                        <div className="mt-2">
                            <img className="w-full" src={cate.cate_img} alt={cate[`cate_top${index + 1}`]} />
                            <p className="text-base font-semibold">{cate[`cate_top${index + 1}`]}</p>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
}
import React, { useEffect, useState } from 'react';
import { fetchData } from '../helpers/fetch';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useNavigate } from 'react-router-dom';
import Category_dropdown from './Category_Dropdown';
import { FadeInYDirection } from '../helpers/animationFramerMotion';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { shortenString } from '../utils/shortenString';

export const Category = () => {
  const {
    ref: topRef,
    animate: topAnimate,
    initial: topInitial,
  } = FadeInYDirection('top', 0.3);
  const [category, setCategory] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fetch Category Data
  useEffect(() => {
    const url = '../data/test/topcategory.json';
    const loadTopCategory = async () => {
      try {
        const categoriesTop5 = await fetchData(url);
        setCategory(categoriesTop5);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    loadTopCategory();
  }, []);

  if (category.length === 0) {
    return <div>Loading...</div>;
  }

  const createCategoryElement = (cate) => (
    <div
      key={cate.cate_id}
      className="md:text-black font-semibold bg-white rounded-md shadow-lg cursor-pointer"
      onClick={() =>
        navigate(
          'search_v2?categories=sach-tieng-viet%2Cmanga-comic&sort=create_time_desc&limit=24&page=1&search_type=normal',
        )
      }
    >
      <div className="flex justify-between">
        <div className="hidden md:block text-[18px] font-bold p-2">
          {cate.cate_name}
        </div>
        <div
          className="flex gap-2 font-inter items-center px-4 cursor-pointer hover:text-red-500"
          onClick={() =>
            navigate(
              `search_v2?search=&sort=create_time_desc&page=1&limit=24&search_type=best_seller_suggest`,
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 xl:size-5 hidden xl:block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
      <img
        className="hidden md:block w-full rounded-b-md"
        src={cate.cate_img}
        alt={cate.cate_name}
      />
    </div>
  );

  const combinedElements = [
    <div
      key={category[0].cate_id}
      className="md:text-black font-semibold bg-white rounded-md shadow-lg cursor-pointer"
    >
      <div className="flex justify-between">
        <div className="hidden md:block text-[18px] font-bold p-2">
          {category[0].cate_name}
        </div>
        <div
          className="flex gap-2 font-inter items-center px-4 cursor-pointer hover:text-red-500"
          onClick={() =>
            navigate(
              `search_v2?search=&sort=create_time_desc&page=1&limit=24&search_type=best_seller_suggest`,
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 xl:size-5 hidden xl:block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
      <img
        className="hidden md:block w-full rounded-b-md"
        src={category[0].cate_img}
        alt={category[0].cate_name}
      />
    </div>,
    <div
      key="top-category-button"
      className="hidden md:flex bg-white rounded-md shadow-lg flex-col items-center justify-center"
    >
      <h1 className="sm:mb-5 md:text-xl lg:text-2xl text-center font-semibold text-indigo-900 capitalize">
        Top 5 thể loại nổi bật trong tuần
      </h1>
      <button onClick={toggleMenu}>
        <p className="bg-red-500 text-white px-8 rounded-sm text-[1.2rem]">
          Xem thêm
        </p>
      </button>
    </div>,
    ...category.slice(1).map((cate) => createCategoryElement(cate)),
  ];

  return (
    <div className="md:grid md:justify-items-stretch">
      <div className="hiden md:grid md:grid-cols-3 md:gap-7">
        {combinedElements}
      </div>

      <div
        className={`bg-black/30 flex fixed top-0 bottom-0 left-0 right-0 justify-center items-center z-10 ${
          isMenuOpen ? '' : 'hidden'
        }`}
      >
        <motion.div ref={topRef} animate={topAnimate} initial={topInitial}>
          <Category_dropdown
            isShowCloseIcon={true}
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
        {category.map((cate) => (
          <SwiperSlide key={cate?.cate_id}>
            <div className="mt-2">
              <img
                className="w-full"
                src={cate.cate_img}
                alt={cate.cate_name}
              />
              <div className="bg-white w-full p-1">
                <p className="text-base font-semibold">
                  {shortenString(cate.cate_name, 18)}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

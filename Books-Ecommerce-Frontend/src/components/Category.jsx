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
import { TemplateC_4 } from './category/TemplateC_4';
import { TemplateC_5 } from './category/TemplateC_5';
import { TemplateC_3 } from './category/TemplateC_3';
import { TemplateC_2 } from './category/TemplateC_2';
import { TemplateC_1 } from './category/TemplateC_1';

export const Category = ({ categoryData }) => {
  const templates = [
    TemplateC_1,
    TemplateC_2,
    TemplateC_3,
    TemplateC_4,
    TemplateC_5,
  ];
  const {
    ref: topRef,
    animate: topAnimate,
    initial: topInitial,
  } = FadeInYDirection('top', 0.3);
  const [category, setCategory] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //set Categories
  useEffect(() => {
    setCategory(categoryData);
  }, [categoryData]);

  if (category.length === 0) {
    return <div>Loading...</div>;
  }

  const createCategoryElement = (cate, index) => {
    const templates = [TemplateC_1, TemplateC_2, TemplateC_3, TemplateC_4];

    const TemplateComponent = templates[index % templates.length];

    return (
      <div key={index + Math.random()} className="relative w-full h-full">
        <TemplateComponent categoryData={cate} />
      </div>
    );
  };

  const combinedElements = [
    <div key={'template-1'} className="relative w-full h-full">
      <TemplateC_5 categoryData={category[0]} />
    </div>,

    // Templates Main
    <div
      key="top-category-button"
      className="hidden xl:flex bg-category-main rounded-md shadow-lg flex-col items-center justify-center"
    >
      <h1 className="text-2xl text-center font-semibold text-indigo-800 capitalize">
        Top 5 thể loại nổi bật trong tuần
      </h1>
      <div onClick={toggleMenu} className="pt-8 items-center">
        <button className="bg-red-500 text-white px-8 h-10 text-center items-center rounded-sm text-[1.2rem]">
          Xem thêm
        </button>
      </div>
    </div>,

    // Cate3-6
    ...category
      .slice(1)
      .map((cate, index) => createCategoryElement(cate, index)),
  ];

  return (
    <div className="md:grid md:justify-items-stretch">
      {/* Desktop */}
      <div className="hidden xl:grid grid-cols-3 gap-7">
        {combinedElements}
        <Category_dropdown
          isShowCloseIcon={true}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
      </div>

      {/* mobile */}
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        modules={[Pagination]}
        className="mySwiper block md:hidden"
      >
        {category.map((cate, index) => {
          const TemplateComponent = templates[index % templates.length];
          return (
            <SwiperSlide key={cate.id || index}>
              <div className="h-full">
                <TemplateComponent categoryData={cate} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

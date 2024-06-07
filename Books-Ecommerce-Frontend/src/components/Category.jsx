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
import { CircleLoader } from './loaders/CircleLoader';

export const Category = ({ categoryData, _cateType }) => {
  const templates = [
    TemplateC_1,
    TemplateC_2,
    TemplateC_3,
    TemplateC_4,
    TemplateC_5,
  ];

  const [category, setCategory] = useState([]);
  const [cateType, setCateType] = useState(_cateType);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //set Categories
  useEffect(() => {
    setCategory(categoryData);
    setCateType(_cateType);
  }, [categoryData, _cateType]);

  if (category.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <CircleLoader height={'h-20'} width={'w-20'} />
      </div>
    );
  }

  return (
    <div className="md:grid md:justify-items-stretch">
      {/* Desktop */}
      <div className="hidden xl:flex gap-4">
        {category.map((cate, index) => (
          <div key={index} className="relative w-full h-full">
            <TemplateC_1
              categoryData={cate}
              cateType={cateType}
              template_img={index}
            />
          </div>
        ))}
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

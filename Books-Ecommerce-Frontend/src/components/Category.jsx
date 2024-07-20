import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
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
import { ChooseCate } from './childComponents/ChooseCate';

export const Category = ({ categoryData, _cateType, isloading, setIsLoading}) => {
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

  if (isloading) {
    return (
      <div className="flex justify-center items-center">
        <CircleLoader height={'h-20'} width={'w-20'} />
      </div>
    );
  }

  if (!isloading && categoryData.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-1 items-center justify-center xl:h-full ">
          {/* <img src="/img/empty-box.png" /> */}
          <ChooseCate/>
          <div className="flex justify-center items-center text-red-600 font-popi font-medium">
            <div>
              Hãy Cho Chúng Tôi Biết Thêm Sở Thích Của Bạn
            </div>
            
            {/* <img width="50" height="50" src="https://img.icons8.com/hands/100/choose.png" alt="choose"/> */}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="lg:grid lg:justify-items-stretch">
      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-5 gap-4">
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
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper block xl:hidden lg:hidden md:hidden pb-10"
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

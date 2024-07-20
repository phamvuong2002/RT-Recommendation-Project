import React from 'react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { SaleBanner } from './banners/SaleBanner';
import { isMobileDevice } from '../utils/isMobileDevice';
import { Link } from 'react-router-dom';

export const Slider = () => {
  const imageLink = [
    {
      id: 1,
      imgLink:
        'https://res.cloudinary.com/datpm13gx/image/upload/v1721401124/1_1_w8x2zk.png',
      contentPage:
        'search_v2?categories=sach-tieng-viet%2Cmanga-comic%2Cmanga&sort=create_time_desc&limit=24&page=1&search_type=normal',
    },

    {
      id: 2,
      imgLink:
        'https://res.cloudinary.com/datpm13gx/image/upload/v1721401560/3_1_lnd0nm.png',
      contentPage: 'search_v2?categories=sach-tieng-viet%2Cvan-hoc%2Clight-novel&sort=create_time_desc&limit=24&page=1&search_type=normal',
    },

    {
      id: 3,
      imgLink:
        'https://res.cloudinary.com/datpm13gx/image/upload/v1721401530/2_1_i6xwhx.png',
      contentPage:
        'search_v2?categories=sach-tieng-viet%2Ckhoa-hoc-ky-thuat%2Cy-hoc&sort=create_time_desc&limit=24&page=1&search_type=normal',
    },

    
  ];
  return (
    <div className="hero-section slider w-full rounded-lg">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        // spaceBetween={50}
        loop={true}
        slidesPerView={1}
        navigation={false}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
      >
        <SwiperSlide className={'h-auto bg-welcome-gilf'}>
          <div className="flex sm:mt-3">
            <SaleBanner/>
          </div>
        </SwiperSlide>

        {!isMobileDevice() && imageLink.map((item) => (
          <SwiperSlide key={item.id} className={'h-auto bg-red-300'}>
            <Link
              to={`../${item.contentPage}`}
              className="relative group cursor-pointer">
              <img
                className=" object-cover w-full  h-full max-h-[584px]"
                src={`${item.imgLink}`}
                alt={item.id}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </SwiperSlide>
        ))}
        
      </Swiper>

      {/* For mobile */}
      {
        !isMobileDevice()? "" :
          <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Autoplay]}
          // spaceBetween={50}
          loop={true}
          slidesPerView={1}
          navigation={false}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          className="mt-1"
        >
          { imageLink.map((item) => (
            <SwiperSlide key={item.id} className={'h-auto bg-red-300'}>
              <Link
                to={`../${item.contentPage}`}
                className="relative group cursor-pointer">
                <img
                  className=" object-cover w-full  h-full max-h-[584px]"
                  src={`${item.imgLink}`}
                  alt={item.id}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </SwiperSlide>
          ))}
          
        </Swiper>
      }
      
    </div>
  );
};

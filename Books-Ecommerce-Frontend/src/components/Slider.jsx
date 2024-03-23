import React from "react"
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';


const Slider = () => {
  const imageLink = [
    { id: 1, imgLink: "https://theme.hstatic.net/200000287623/1000948667/14/slideshow_1.jpg?v=416", contentPage:"https://ipm.vn/collections/sach-moi" },
  
    { id: 2, imgLink: "https://cdn0.fahasa.com/media/magentothem/banner7/Chuyenketuonglai_SocialPost_840x320.jpg",contentPage:"https://www.fahasa.com/chuyen-ke-cho-tuong-lai-sach-moi?fhs_campaign=homepageslider2" },
    
];
  return (
    <div className="hero-section slider w-full ">
      <Swiper 
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        
        // spaceBetween={50}
        loop={true}
        slidesPerView={1}
        navigation={false}
      
        autoplay={true}
        pagination={{ clickable: true }}
        
      >        
          {imageLink.map((item) => (
            <SwiperSlide key={item.id} className={'h-auto bg-red-300'}>
              <a href={item.contentPage}>
              <img className=' object-cover w-full  h-full max-h-[584px]'
                src={`${item.imgLink}`}
                alt={item.id}
                loading="lazy"
              />
              </a>
             
            </SwiperSlide>
          ))}


      </Swiper>
      </div>
  )
}
export default Slider;
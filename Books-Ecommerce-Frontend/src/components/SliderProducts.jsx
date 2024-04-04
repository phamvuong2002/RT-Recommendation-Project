import { ProductForSlider } from "./ProductForSlider";
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';


import { Autoplay, Pagination, Navigation } from 'swiper/modules';


export const SliderProducts = ({ productData }) => {
    console.log(productData);
    return (
        <div className="w-full">
            <Swiper
                slidesPerView={1}
                breakpoints={{
                    680: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20
                    },

                }}
                spaceBetween={0}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                // pagination={{
                //     dynamicBullets: true,
                // }}// cho ẩn hoặc hiện mấy chấm tròn ở dưới
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-full"

            >
                {productData.map((product, index) => (
                    <SwiperSlide key={index} className="w-1/5 h-full">
                        <ProductForSlider productData={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

// Xác định PropTypes cho Product
SliderProducts.propTypes = {
    productData: PropTypes.shape().isRequired,
};

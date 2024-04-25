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


export const SliderProducts = ({ userId, productData }) => {
    return (
        <div className="">
            <Swiper
                slidesPerView={2}
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
                spaceBetween={20}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                // pagination={{
                //     dynamicBullets: true,
                // }}// cho ẩn hoặc hiện mấy chấm tròn ở dưới
                //navigation={false} mũi tên 2 bên
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-full "

            >
                {productData.map((product, index) => (
                    <SwiperSlide key={index} className="w-1/5 h-full ">
                        <ProductForSlider
                            userId={userId}
                            productData={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

// Xác định PropTypes cho Product
SliderProducts.propTypes = {
    userId: PropTypes.string.isRequired,
    productData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

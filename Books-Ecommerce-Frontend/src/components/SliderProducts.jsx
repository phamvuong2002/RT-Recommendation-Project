import { ProductForSlider } from './ProductForSlider';
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

export const SliderProducts = ({
  userId,
  productData,
  isShowProgress = false,
}) => {
  return (
    <div className="">
      <Swiper
        slidesPerView={2}
        breakpoints={{
          680: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
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
            <ProductForSlider userId={userId} productData={product.book} />
            {isShowProgress ? (
              <div className="w-full h-4 bg-gray-300 rounded-full dark:bg-gray-700 relative">
                <div className="absolute z-10 inset-0 flex justify-center items-center">
                  <span className="text-xs font-medium text-white">
                    {product.sold} sản phẩm đã bán
                  </span>
                </div>
                {/* Thanh tiến độ */}
                <div
                  className="h-4 bg-red-500 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full relative"
                  style={{
                    width: `${product.sold < 10 ? 5 : Math.min(product.sold, 100)}%`,
                  }}
                ></div>
              </div>
            ) : (
              ''
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// Xác định PropTypes cho Product
SliderProducts.propTypes = {
  userId: PropTypes.string.isRequired,
  productData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

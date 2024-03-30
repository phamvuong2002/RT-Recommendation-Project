import { ProductForSlider } from "./ProductForSlider";
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const productData = [
    {
        imgUrl: "https://product.hstatic.net/200000287623/product/86-9_bia_1_b43d7264e4ca4e48a5342ba95ce2a036_large.jpg",
        title: "86 - Eightysix - Tập 9",
        price: "145,000",
        salePrice: "125,000",
        currency: "đ",
    },

    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 4",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/100_bd275c22338e4df3a7b01a0b8553e338_large.jpg",
        title: "Conan - Thám tử lừng danh - Tập 100",
        price: "25,000",
        salePrice: "23,500",
        currency: "đ",
    },

    {
        imgUrl: "https://product.hstatic.net/200000343865/product/6.5---lmt_6614aed999634a95b52a584fc76d52ff_large.jpg",
        title: "Nhân vật hạ cấp Tomozaki - Tập 6.5",
        price: "99,900",
        salePrice: "111,000",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 4",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 4",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 4",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
];
export const SliderProducts = () => {
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

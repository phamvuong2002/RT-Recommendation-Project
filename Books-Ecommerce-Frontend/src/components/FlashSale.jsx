import React, { useRef, useState } from 'react';
import { SliderProducts } from "./SliderProducts";
import { CountDownTimer } from './CountdownTimer';
import PropTypes from 'prop-types';


export const FlashSale = ({ userId, productData }) => {
    const flashSaleDay = new Date("May 5, 2024").getTime()
    return (
        <div className="mt-4 h-full">
            <div className="relative md:mb-2">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-[#ffbe98] w-[5%] md:w-[2%]">
                        <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
                    </svg>
                    <div className="text-[90%] md:text-[150%] font-semibold font-['Inter'] tracking-wider">Flash Sales</div>
                </div>
                <div className="absolute top-[0] left-[50%] -translate-x-1/2">
                    <CountDownTimer flashSaleDay={flashSaleDay} />
                </div>
            </div>
            <SliderProducts
                userId={userId}
                productData={productData} />

        </div>
    );
}

FlashSale.propTypes = {
    userId: PropTypes.string.isRequired,
    productData: PropTypes.arrayOf(PropTypes.object).isRequired,
};



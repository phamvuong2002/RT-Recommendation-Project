import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

export const ProductForSlider = ({ productData }) => {
    return (
        <div className="w-full h-full ">
            <Link to={productData.href} className="w-[160px] md:w-[220px] bg-white flex flex-col items-center border border-y-red-50 md:hover:shadow-2xl md:rounded-md md:shadow-md px-3 py-2">
                {/* Image */}
                <div className="relative overflow-hidden group">
                    <img
                        className='h-36 md:h-44 object-cover'
                        src={productData.imgUrl}
                    />
                    {/*Image Hover*/}
                    <div className="flex items-center justify-center absolute w-full h-full bg-black/20 bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button className="w-full text-[100%] bg-red-500 text-white  hover:bg-red-300 ">Add to Cart</button>
                    </div>
                </div>

                {/* Title */}
                <h2 className=
                    "w-full h-8 leading-4 md:leading-5 md:h-10 mt-3 text-[13px] text-left md:text-[95%] text-indigo-900  font-semibold font-['Inter'] capitalize line-clamp-2 ">
                    {productData.title}
                </h2>

                {/*Price
                <h1 className="text-left text-red-500 text-[15px] md:text-[130%] font-bold tracking-wide">
                    {productData.price}
                </h1>*/}


                {/* Sale Price */}
                <div className="flex w-full gap-1 md:gap-0 justify-between">
                    <h1 className="text-[12px] leading-6 md:leading-8 line-through text-red-400 md:text-[15px] font-bold tracking-wide">
                        {productData.price}
                        <span>{productData.currency}</span>
                    </h1>
                    <h1 className="text-[15px] text-red-500  md:text-[21px] font-bold tracking-wide">
                        {productData.salePrice}
                        <span className='text-[13px] md:text-[19px]'>{productData.currency}</span>
                    </h1>
                </div>
            </Link>

        </div>
    );
}

// Xác định PropTypes cho Product
ProductForSlider.propTypes = {
    productData: PropTypes.shape({
        imgUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        salePrice: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
    }).isRequired,
};

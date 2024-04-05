import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

export const ProductForSlider = ({ productData }) => {
    return (
        <div className="w-full h-full ">
            <div className="w-full h-full bg-white flex flex-col items-center md:hover:shadow-2xl md:rounded-[4px] md:shadow-md md:p-5">
                {/* Image */}
                <div className="relative overflow-hidden group">
                    <img
                        className='h-40 md:h-44 object-cover'
                        src={productData.imgUrl}
                    />
                    {/*Image Hover*/}
                    <div className="flex items-center justify-center absolute w-full h-full bg-black/20 bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button className="w-full text-[100%] bg-red-500 text-white  hover:bg-red-300 ">Add to Cart</button>
                    </div>
                </div>

                {/* Title */}
                <h2 className=
                    "h-10 md:h-12 mt-4 text-center md:text-[90%] text-indigo-900  font-semibold font-['Inter'] capitalize line-clamp-2 ">
                    {productData.title}
                </h2>

                {/*Price
                <h1 className="text-center text-red-500 text-[130%] font-bold font-['Inter'] capitalize tracking-wide">
                    {productData.price}
                </h1>*/}


                {/* Sale Price */}
                <div className="flex justify-between gap-4 mt-2 px-2">
                    <div className="flex items-end text-[90%] line-through text-red-400 font-bold font-['Inter'] tracking-wide">
                        <span className="">
                            {productData.price}
                        </span>
                        <span className="underline">
                            {productData.currency}
                        </span>
                    </div>

                    <div className="text-[130%] leading-5 text-red-500 font-bold font-['Inter'] tracking-wide">
                        <span>
                            {productData.salePrice}
                        </span>
                        <span className="underline">
                            {productData.currency}
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
}

// Xác định PropTypes cho Product
ProductForSlider.propTypes = {
    productData: PropTypes.shape({
        imgUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        salePrice: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired,
    }).isRequired,
};

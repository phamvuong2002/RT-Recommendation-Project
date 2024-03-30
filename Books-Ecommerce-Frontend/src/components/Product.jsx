import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

export const Product = ({ productData }) => {
    return (
        <div className="w-full h-full p-1">
            <div className="w-full h-full flex flex-col items-center border border-y-red-50 md:hover:shadow-2xl md:rounded-md md:shadow-md px-5 py-2">
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
                    "h-9 md:h-12 mt-3 text-[75%] md:text-center md:text-[95%] text-indigo-900  font-semibold font-['Inter'] capitalize line-clamp-2 ">
                    {productData.title}
                </h2>

                {/*Price
                <h1 className="text-center text-red-500 text-[130%] font-bold font-['Inter'] capitalize tracking-wide">
                    {productData.price}
                </h1>*/}


                {/* Sale Price */}
                <div className="flex justify-center md:mt-2 gap-4 px-2">
                    <div className="flex items-end text-[70%] md:text-[90%] line-through text-red-400 font-bold font-['Inter'] tracking-wide">
                        <span className="">
                            {productData.price}
                        </span>
                        <span className="underline">
                            {productData.currency}
                        </span>
                    </div>

                    <div className="text-[85%] md:text-[130%] leading-5 text-red-500 font-bold font-['Inter'] tracking-wide">
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
Product.propTypes = {
    productData: PropTypes.shape({
        imgUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        salePrice: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired,
    }).isRequired,
};

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { fetchData } from '../helpers/fetch';

export const Product = ({ productData }) => {


    //Hàm xử lý khi thêm sản phẩm vào giỏ hàng
    // const handleAddProductsToShoppingCart = async (productId) => {
    //     const url = `localhost.../shoppingcart/:${productId}`;
    //     try {
    //         const addshoppingCartsData = await fetchData(url);
    //         const updatedShoppingCartProducts = [...addshoppingCartsData];
    //         return 'success';
    //     } catch (error) {
    //         console.error('Error:', error);
    //         return 'failed';
    //     }
    // };
    //min-w-[40%] overflow-hidden md:w-52 bg-white flex flex-col items-center border border-y-red-50 md:hover:shadow-2xl md:rounded-md md:shadow-md px-3 py-2

    return (
        <div className="block bg-white min-h-full md:hover:shadow-2xl md:rounded-md md:shadow-md overflow-hidden">
            <Link to={productData.href} scroll={false} className="h-full block">
                <div className=''>
                    {/**Product Image */}
                    <div className="relative group object-cover flex justify-center items-center ">
                        <div className="">
                            <img
                                className=" max-h-48 "
                                src={productData.imgUrl}
                                alt="Product Image"
                            />
                        </div>

                        {/*Image Hover*/}
                        <div className="flex items-center justify-center absolute w-full h-full bg-black/20 opacity-0 transition-all duration-300 sm:group-hover:opacity-100 sm:rounded-t-md">
                            <button
                                /*onClick={() => handleAddProductsToShoppingCart(productData.id)}*/
                                className="bg-red-500 text-white  hover:bg-red-300 px-5 ">Add to Cart
                            </button>
                        </div>
                    </div>


                    {/**Product Detail */}
                    <div className="flex flex-col px-[0.3rem] mt-1 md:px-3 md:py-2 justify-end">
                        {/**Title */}
                        <h3 className="font-medium text-sm sm:text-base font-['Inter'] min-h-10 md:min-h-12 md:max-h-12 capitalize line-clamp-2 ">
                            {productData.title}
                        </h3>

                        <div className="text-left mt-[0.1rem] md:mt-1 flex gap-2 md:justify-between md:flex-row flex-row-reverse justify-end">
                            <p className="line-through leading-[1.6rem] sm:leading-7 text-[0.6rem] text-gray-400 sm:text-sm font-bold tracking-wide font-['Inter']">
                                {productData.price}
                                <span>{productData.currency}</span>
                            </p>
                            <p className="text-[0.9rem] text-red-500 sm:text-[1.15rem] font-semibold tracking-wide font-['Inter']">
                                {productData.salePrice}
                                <span className="text-[0.8rem] md:text-[1rem]">{productData.currency}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Link>

        </div>
    );
}

// Xác định PropTypes cho Product
Product.propTypes = {
    productData: PropTypes.shape({
        imgUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        salePrice: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
    }).isRequired,
};

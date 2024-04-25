import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { addtocart } from '../apis/cart';
import { fetchAPI } from '../helpers/fetch';
import { PopupOpen } from './popup/PopupOpen';
import { popupContent } from '../helpers/popupContent'


export const Product = ({ userId, productData }) => {
    const [openAddToCartsPopup, setOpenAddToCartsPopup] = useState(false);

    const AddToCart = async (e) => {
        e.preventDefault();

        await fetchAPI(`../${addtocart}`, 'POST', {
            "userId": userId,
            "book": {
                "book_id": productData.book_id,
                "quantity": 1,
                "old_quantity": 0
            }
        })
        setOpenAddToCartsPopup(true);

    }


    return (
        <div className="block border rounded-md p-2 sm:p-0 bg-white min-h-full md:hover:shadow-2xl md:rounded-md md:shadow-md overflow-hidden">
            <Link to={`../books/${productData.book_id}`} className="h-full block">
                {/* to={productData.href} */}
                <div className=''>
                    {/**Product Image */}
                    <div className="relative group object-cover flex justify-center items-center ">
                        <div className="">
                            <img
                                className=" max-h-48 "
                                src={productData.book_img}
                                alt="Product Image"
                            />
                        </div>

                        {/*Image Hover*/}
                        <div className="flex items-center justify-center absolute w-full h-full bg-black/20 opacity-0 transition-all duration-300 sm:group-hover:opacity-100 sm:rounded-t-md">
                            <PopupOpen
                                open={openAddToCartsPopup}
                                setOpen={setOpenAddToCartsPopup}
                                autoClose={800}
                                Content={popupContent('text-gray-800 text-base text-center',
                                    <div className="flex flex-col gap-2 justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="120" height="120" viewBox="0 0 48 48">
                                            <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
                                        </svg>
                                        <div>
                                            {`Bạn đã thêm sản phẩm vào Giỏ Hàng!`}
                                        </div>
                                    </div>

                                )}
                                onNoClick={() => setOpenAddToCartsPopup(false)}
                            />
                            <button
                                onClick={AddToCart}
                                className="bg-red-500 text-white  hover:bg-red-300 px-5 ">Add to Cart
                            </button>
                        </div>
                    </div>


                    {/**Product Detail */}
                    <div className="flex flex-col px-[0.3rem] mt-1 md:px-3 md:py-2 justify-end">
                        {/**Title */}
                        <h3 className="font-medium text-sm sm:text-base font-['Inter'] min-h-10 md:min-h-12 md:max-h-12 capitalize line-clamp-2 ">
                            {productData.book_title}
                        </h3>

                        <div className="pr-[0.3rem] sm:pr-0 text-left mt-[0.3rem] md:mt-1 flex gap-2 md:justify-between md:flex-row flex-row-reverse justify-end">
                            {
                                productData.book_old_price === "0.00" ?
                                    (<p className='hidden'> </p>)
                                    :
                                    (<p className="line-through leading-[1.6rem] sm:leading-8 text-[0.6rem] text-gray-400 sm:text-xs tracking-wide font-['Inter']">
                                        {productData.book_old_price}đ {/*Giá bỏ/ giá cũ */}
                                    </p>)
                            }

                            <p className="text-[0.9rem] text-red-500 sm:text-[1.15rem] font-semibold tracking-wide font-['Inter']">
                                {productData.book_spe_price}đ {/*giá mới*/}
                                {/* <span className="text-[0.8rem] md:text-[1rem]">đ</span> */}
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
    userId: PropTypes.string.isRequired,
    productData: PropTypes.shape({
        book_img: PropTypes.string.isRequired,
        book_title: PropTypes.string.isRequired,
        book_old_price: PropTypes.string.isRequired,
        book_spe_price: PropTypes.string.isRequired,
    }).isRequired,
};

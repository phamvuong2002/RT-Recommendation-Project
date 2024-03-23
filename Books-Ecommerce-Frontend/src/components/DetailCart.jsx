import React, { useState } from 'react'
import { StarRating } from './StarRating';
export const DetailCart = (/*{ product }*/) => {

    const [numCarts, setNumCarts] = useState(1);

    const [showBubble, setShowBubble] = useState(false);

    const product = {
        imgUrl: "https://picsum.photos/300/300",
        title: "86 -Eightysix - Tập 9",
        author: "By Asato asato",
        averageRating: 3.5,
        numReviews: 10,
        shortDescription: 'Ngoài 85 khu hành chính chính thức, Cộng hòa còn lập ra Khu 86 trên phần lãnh thổ “phi nhân” từng bị Legion càn quét, gán cho những con người bị đày ra đó cái mác “Tám Sáu” và bắt họ bán mạng chiến đấu trong những cỗ “vũ khí tự hành có người lái”.',
        publishDate: "2023",
        publisher: "Hồng Đức",
        dimension: "Bìa mềm",
        price: "145,000",
        salePrice: "145,000",
        currency: "đ",
    }

    const handleAddToCart = () => {
        if (!numCarts) {
            return
        }
        setShowBubble(true);
        setTimeout(() => {
            setShowBubble(false);
        }, 800);
    };

    const handleAddToInterestList = () => {
        //Xử lý khách hàng yêu thích sản phẩm

    }

    return (
        <div className="mt-2 max-w-screen-2xl container mx-auto xl:px-28 font-inter ">
            <div className=" m-auto">
                {/* Navigate */}
                <div className="h-8 flex items-center gap-2 pl-2 text-red-400 text-sm font-normal capitalize tracking-widest bg-gray-100">
                    <a href="/" className="hover:text-zinc-600">Trang Chủ</a>
                    <span className="text-zinc-400"> {'>'} </span>
                    <a href={`/`} className="xl:hover:text-zinc-600"> Tiểu Thuyết</a>
                    <span className="text-zinc-400"> {'>'} </span>
                    <a href={`/`} className="text-zinc-500"> 86 - Eightysix</a>
                </div>
                <hr />
                <div className="xl:mt-1 sm:mt-10 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 xl:gap-14 gap-2 h-max">
                        {/* Images */}
                        <div className="flex items-center justify-center">
                            <img
                                src={product.imgUrl}
                                alt="title"
                                className="mx-auto w-full xl:hover:scale-105 trasition-all duration-300 aspect-auto xl:h-[34rem]"
                            />
                        </div>
                        {/* Details - Main information*/}
                        <div>
                            {/* Title */}
                            <h1 className="mt-2 text-2xl font-bold text-[#393280]">{product.title}</h1>
                            <div className="w-[8rem] mt-6 border-t-2 border-[#ED553B]"></div>

                            {/* Additional Information */}
                            <div className="flex items-center gap-16">
                                {/* Author name */}
                                <div className="text-zinc-600">{product.author}</div>
                                {/* Rating */}
                                <StarRating averageRating={product.averageRating} numReviews={product.numReviews} />
                            </div>

                            {/* Short Description */}
                            <div className="mt-4 ">
                                <div className="text-base font-bold text-[#393280]">Nội dung chính</div>
                                <p className="mt-2 text-sm">
                                    {product.shortDescription}
                                </p>
                            </div>
                            {/* Prices */}
                            <div title="price" className=" flex gap-2 mt-8 sm:text-2xl pr-8 ">
                                <div className="text-red-500 text-3xl font-bold capitalize tracking-wide">
                                    <span>
                                        {product.salePrice}
                                    </span>
                                    <span className="underline">
                                        {product.currency}
                                    </span>
                                </div>
                                <div className="flex items-end text-sm line-through text-red-400 font-bold tracking-wide">
                                    <span className="">
                                        {product.price}
                                    </span>
                                    <span className="underline">{product.currency}</span>
                                </div>
                            </div>
                            {/* Order Space */}
                            <div className="mt-10">
                                <div className="flex mt-6 justify-start items-center gap-10 text-base ">
                                    <div className="font-inter font-medium leading-tight tracking-wide">Phiên bản:</div>
                                    <select className="w-32 h-9 relative font-inter rounded border border-black border-opacity-50">
                                        <option className="text-center text-sm leading-tight">Thường</option>
                                        <option className="text-center text-sm leading-tight">Đặc biệt</option>
                                    </select>
                                </div>

                                <div className="mt-6 flex gap-6">
                                    <div>
                                        <div className=" flex items-center">
                                            <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-red-500  xl:hover:bg-red-300 p-3 rounded-sm h-9 w-9" onClick={() => setNumCarts(numCarts === 1 ? 1 : numCarts - 1)}>
                                                <svg className="w-3 h-3 text-center text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                </svg>
                                            </button>
                                            <input className="h-9 max-w-24 text-center border border-y-red-500" type="text" value={numCarts} id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" placeholder="Chọn số lượng cần mua" required readOnly />
                                            <button type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-red-500  xl:hover:bg-red-300 p-3 rounded-sm h-9 w-9" onClick={() => setNumCarts(numCarts + 1)}>
                                                <svg className="w-3 h-3 text-center text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        <span id="helper-text-explanation" className="mt-1 text-sm text-gray-500 dark:text-gray-400">Chọn số lượng cần mua</span>
                                    </div>
                                    {/* Adding to cart button */}
                                    <div className="flex gap-8">
                                        {/* interes button */}
                                        <button title="Thêm vào giỏ" className="w-9 flex h-9 rounded border border-black border-opacity-50 items-center justify-center cursor-pointer" onClick={handleAddToInterestList}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>
                                        </button>

                                        {/* adding to cart button */}
                                        <button title="Thêm vào giỏ" className="w-9 flex h-9 rounded border border-black border-opacity-50 items-center justify-center cursor-pointer" onClick={handleAddToCart}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                            </svg>

                                            {
                                                showBubble ?
                                                    <div className="animate-ping absolute transform -translate-x-1/2 bg-red-500 text-white rounded-full p-2 animate-fadeInOut">
                                                        +{numCarts}
                                                    </div>
                                                    :
                                                    <></>
                                            }
                                        </button>
                                    </div>
                                </div>


                                {/* Order Button */}
                                <div className="w-full text-left my-4">
                                    <button className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-red-500
                                    text-white font-bold border border-red-500 ease-in-out duration-150
                                    shadow-slate-600 xl:hover:bg-white xl:hover:text-red-500 lg:m-0 md:px-6">
                                        <span>Mua Ngay</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Details - Sub information*/}
                        <div>
                            <div className="flex flex-col xl:mt-12 xl:p-4 gap-6">
                                <div className="flex gap-20 ">
                                    <strong>Tác giả:</strong>
                                    <div>{product.author}</div>
                                </div>
                                <div className="flex gap-[1.8rem]">
                                    <strong>Năm xuất bản:</strong>
                                    <div>{product.publishDate}</div>
                                </div>
                                <div className="flex gap-[2.1rem]">
                                    <strong>Nhà xuất bản:</strong>
                                    <div>{product.publisher}</div>
                                </div>
                                <div className="flex gap-[3.9rem]">
                                    <strong>Hình thức:</strong>
                                    <div>{product.dimension}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
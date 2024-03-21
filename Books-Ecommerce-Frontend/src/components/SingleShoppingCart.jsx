import React from 'react'
import { formatNumberToText } from '../utils/formatNumberToText'

export const SingleShoppingCart = ({ product, handleDeleteProduct, handleIncreaseQuantity, handleDecreaseQuantity }) => {
    return (
        <div className="border border-red-200 justify-between mb-6 rounded-lg bg-white p-6 shadow-md shadow-red-100 sm:flex sm:justify-start font-inter">
            {/* Product Image */}
            <img src={product.imageSrc} alt={product.imageAlt} className="w-full rounded-lg sm:w-40" />

            {/* Product Info  */}
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                {/* base info */}
                <div className="flex flex-col xl:gap-14 mt-5 sm:mt-0">
                    <a href={product.href} className="w-full xl:h-20 max-h-20 text-lg font-bold text-gray-900 overflow-y-auto no-scrollbar">{product.name}</a>
                    <p className="mt-1 text-xs text-gray-700">Phiên Bản: {product.format}</p>
                </div>

                {/* Price infor */}
                <div className="flex mt-4 justify-between im xl:space-y-24 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center justify-end border-red-100">
                        <span
                            className="cursor-pointer rounded-l bg-red-300 py-1 px-3.5 duration-100 xl:hover:bg-red-400 xl:hover:text-red-200"
                            onClick={() => handleDecreaseQuantity(product.id, product.quantity)}> - </span>
                        <input
                            className="h-8 w-12 border border-y-red-300 bg-white text-xs outline-none text-center xl:pl-4"
                            type="number"
                            value={product.quantity}
                            min="1"
                            id="quantity-input"
                            data-input-counter
                            aria-describedby="helper-text-explanation"
                            placeholder="Chọn số lượng cần mua"
                            required
                            readOnly
                        />
                        <span
                            className="cursor-pointer rounded-r bg-red-300 py-1 px-3 duration-100 xl:hover:bg-red-400 xl:hover:text-red-200"
                            onClick={() => handleIncreaseQuantity(product.id, product.quantity)}> + </span>
                    </div>
                    <div className="flex mt-2 items-center space-x-4 ">
                        <div className="flex flex-col gap-2 justify-end items-end">
                            <div className="flex items-end text-sm line-through text-red-400 font-medium tracking-wide">
                                <span className="">
                                    {formatNumberToText(product.price)}
                                </span>
                                <span className="underline">{product.currency}</span>
                            </div>
                            <div className="ml-4 text-red-500 text-lg capitalize tracking-wide font-semibold">
                                <span>
                                    {formatNumberToText(product.price)}
                                </span>
                                <span className="underline">
                                    {product.currency}
                                </span>
                            </div>
                        </div>
                        {/* Delete button */}
                        <button className="h-8 w-8 p-2 xl:hover:bg-red-200 xl:hover:text-red-500" onClick={() => handleDeleteProduct(product.id)}>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="cursor-pointer duration-150">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

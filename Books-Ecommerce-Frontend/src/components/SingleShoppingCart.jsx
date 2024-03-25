import React, { useEffect, useState } from 'react'
import { formatNumberToText } from '../utils/formatNumberToText'
import { Popup } from './Popup'
import { popupContent } from '../helpers/popupContent';

export const SingleShoppingCart = ({ product, handleDeleteProduct, handleIncreaseQuantity, handleDecreaseQuantity, handleAddInterestingProduct }) => {
    const [openLovePopup, setOpenLovePopup] = useState(false);
    const [statusLovePopup, setStatusLovePopup] = useState('fail');


    //Remove Icon
    const removeIcon = (className) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        );
    }

    const handleClickAddLoveProduct = async (productID) => {
        let result = await handleAddInterestingProduct(productID);
        if (result === 'success') {
            setOpenLovePopup(true);
            setStatusLovePopup('success')
        }
        else {
            setOpenLovePopup(true);
        }
    }

    const PopupLoveProductSuccess = () => {
        return <Popup
            autoShow={true}
            Content={popupContent('text-gray-800 text-base text-center',
                <div className="flex flex-col gap-2 justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="120" height="120" viewBox="0 0 48 48">
                        <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
                    </svg>
                    <div>
                        Bạn đã thêm sản phẩm này vào danh sách yêu thích!
                    </div>
                </div>

            )}
            onNoClick={() => setOpenLovePopup(false)}
        />
    }

    const PopupLoveProductFail = () => {
        return <Popup
            autoShow={true}
            Content={popupContent('text-gray-800 text-base text-center',
                <div className="flex flex-col gap-2 justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="120" height="120" viewBox="0 0 48 48">
                        <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
                    </svg>
                    <div>
                        Đã có một vài sự cố khi thêm sản phẩm vào danh sách yêu thích. Vui long thử lại!
                    </div>
                </div>
            )}
            onNoClick={() => setOpenLovePopup(false)}
        />
    }


    return (
        <div className="p-2">
            {/* Cart Content*/}
            {/* border border-red-200*/}
            <div className="justify-between bg-white px-2 py-1 shadow-md shadow-red-100 sm:flex sm:justify-start font-inter">
                {/* Product Image */}
                <img src={product.imageSrc} alt={product.imageAlt} className="w-full rounded-lg sm:w-40" />

                {/* Product Info  */}
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between xl:flex xl:gap-8">
                    {/* base info */}
                    <div className="flex flex-col xl:gap-8 mt-2 sm:mt-0">
                        <a href={product.href} className="w-full xl:h-20 max-h-20 text-md font-bold text-gray-900 overflow-y-auto no-scrollbar">
                            {product.name}
                        </a>
                        <p className="mt-1 text-xs text-gray-700">Phiên Bản: {product.format}</p>
                    </div>

                    {/* Price infor */}
                    <div className="flex justify-between im xl:space-y-4 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex flex-col gap-4 xl:gap-1">
                            <div className="flex items-center justify-end border-red-100 pt-7 xl:pt-0">
                                <span
                                    className="cursor-pointer rounded-l bg-red-500 py-1 px-3.5 duration-100 xl:hover:bg-red-400 xl:hover:text-red-200"
                                    onClick={() => handleDecreaseQuantity(product.id, product.quantity)}> - </span>
                                <input
                                    className="h-8 w-12 border border-y-red-500 bg-white text-xs outline-none text-center xl:pl-4"
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
                                    className="cursor-pointer rounded-r bg-red-500 py-1 px-3 duration-100 xl:hover:bg-red-400 xl:hover:text-red-200"
                                    onClick={() => handleIncreaseQuantity(product.id, product.quantity)}> +
                                </span>
                            </div>
                            {/* Desktop - Love - Remove button */}
                            <div className="xl:flex xl:gap-2 items-end justify-center hidden">
                                <div className='flex'>
                                    <button className="xl:h-8 xl:w-8 p-2" onClick={() => handleClickAddLoveProduct(product.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500 cursor-pointer duration-150 xl:hover:fill-current xl:hover:text-red-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
                                    </button>
                                    {openLovePopup && statusLovePopup === 'success' && (
                                        PopupLoveProductSuccess()
                                    )}
                                    {openLovePopup && statusLovePopup === 'fail' && (
                                        PopupLoveProductFail()
                                    )}
                                </div>

                                <Popup
                                    icon={removeIcon("w-6 h-6 text-gray-500 xl:hover:text-red-500")}
                                    onYesClick={() =>
                                        handleDeleteProduct(product.id)}
                                    onNoClick={() => { console.log("End") }}
                                    Option={{ yes: "Xoá", no: "Thoát" }}
                                    Title={"Xóa khỏi giỏ hàng"}
                                    Content={popupContent(null, "Bạn có đồng ý loại bỏ tất cả sản phẩm của Nhà Xuất Bản này khỏi giỏ hàng?")}
                                    ErrorHandling={{ title: "Lỗi xoá giỏ hàng", message: "Không thể xoá tất cả sản phẩm của Nhà Xuất Bản này khỏi giỏ hàng!" }}
                                />
                            </div>
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
                        </div>
                    </div>
                    {/* Mobile - Love - Remove button */}
                    <div className="flex gap-6 items-center justify-center mt-4 xl:hidden">
                        <div >
                            <button className="xl:h-8 xl:w-8 p-2" onClick={() => handleClickAddLoveProduct(product.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500 cursor-pointer duration-150 xl:hover:fill-current xl:hover:text-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </button>
                        </div>

                        <Popup
                            icon={removeIcon("w-6 h-6 text-gray-500 xl:hover:text-red-500")}
                            onYesClick={() =>
                                handleDeleteProduct(product.id)}
                            onNoClick={() => console.log("End")}
                            Option={{ yes: "Xoá", no: "Thoát" }}
                            Title={"Xóa khỏi giỏ hàng"}
                            Content={popupContent(null, "Bạn có đồng ý loại bỏ tất cả sản phẩm của Nhà Xuất Bản này khỏi giỏ hàng?")}
                            ErrorHandling={{ title: "Lỗi xoá giỏ hàng", message: "Không thể xoá tất cả sản phẩm của Nhà Xuất Bản này khỏi giỏ hàng!" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

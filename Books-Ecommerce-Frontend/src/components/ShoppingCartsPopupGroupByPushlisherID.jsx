import React from 'react';
import { SinglePopupCart } from './SinglePopupCart';
import { Popup } from './Popup';
import { popupContent } from '../helpers/popupContent';

const ShoppingCartsPopupGroupedByPublisherID = ({ products, handleDeleteProduct, handleDeletePublisherProducts }) => {
    // Tạo một đối tượng từ điển để nhóm các sản phẩm theo publisherID
    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.publisherID]) {
            acc[product.publisherID] = [];
        }
        acc[product.publisherID].push(product);
        return acc;
    }, {});

    //Remove Icon
    const removeIcon = (className) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-2">
            {/* Lặp qua từng nhóm sản phẩm */}
            {
                Object.entries(groupedProducts).map(([publisherID, products]) => (
                    <div key={publisherID} className="flex flex-col gap-1">
                        {/* Nhà xuất bản */}
                        <div className="w-full h-12 max-h-12 flex items-center p-2 bg-gray-100 font-inter justify-between">
                            <div className='flex gap-3 w-60 max-w-xs xl:w-full xl:max-w-full'>
                                <img className='w-8 h-8 rounded-lg bg-white border' src={products[0].publisherImgUrl} alt={products[0].publisher} />
                                <button className="font-inter font-semibold text-sm text-red-500 xl:hover:text-red-800">
                                    {products[0].publisher || 'Nobrand'}
                                </button>
                            </div>
                            {/* Remove button */}
                            <Popup
                                icon={removeIcon("w-6 h-6 text-gray-500 xl:hover:text-red-500")}
                                onYesClick={() =>
                                    handleDeletePublisherProducts(publisherID)}
                                onNoClick={() => console.log("End")}
                                Title={"Xóa khỏi giỏ hàng"}
                                Content={popupContent(null, "Bạn có đồng ý loại bỏ tất cả sản phẩm của Nhà Xuất Bản này khỏi giỏ hàng!")}
                                ErrorHandling={{ title: "Lỗi xoá giỏ hàng", message: "Không thể xoá tất cả sản phẩm của Nhà Xuất Bản này khỏi giỏ hàng!" }}
                            />
                        </div>

                        {/* Sản phẩm của nhà xuất bản */}
                        <div className="bg-white p-1">
                            {/* Lặp qua từng sản phẩm trong nhóm */}
                            {
                                products.map((product) => (
                                    <SinglePopupCart
                                        key={product.id}
                                        product={product}
                                        handleDeleteProduct={handleDeleteProduct}
                                    />
                                ))
                            }

                        </div>
                    </div>
                ))
            }
        </div >
    );
};

export default ShoppingCartsPopupGroupedByPublisherID;

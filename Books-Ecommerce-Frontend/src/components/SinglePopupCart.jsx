import React from 'react'
import { formatNumberToText } from '../utils/formatNumberToText'
import { Popup } from './popup/Popup'
import { popupContent } from '../helpers/popupContent'
import { Link } from 'react-router-dom'

export const SinglePopupCart = ({ product, handleDeleteProduct }) => {

    return (
        <div key={product.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-sm font-medium text-gray-900">
                        <h3>
                            <Link to={product.href}>{product.name}</Link>
                        </h3>
                        <div className="ml-4 text-red-500 capitalize tracking-wide">
                            <span>
                                {formatNumberToText(product.price)}
                            </span>
                            <span className="underline">
                                {product.currency}
                            </span>
                        </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{product.format}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {product.quantity}</p>

                    <div className="flex">
                        <Popup
                            icon={"Xoá"}
                            onYesClick={() => handleDeleteProduct(product.id)}
                            Option={{ yes: "Xoá", no: "Thoát" }}
                            Title={"Xóa khỏi giỏ hàng"}
                            Content={popupContent(null, "Bạn có đồng ý loại bỏ sản phẩm này khỏi giỏ hàng?")}
                            ErrorHandling={{ title: "Lỗi xoá giỏ hàng", message: "Không thể xoá sản phẩm này khỏi giỏ hàng!" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

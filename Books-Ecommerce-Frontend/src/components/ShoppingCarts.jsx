import React, { useEffect, useState } from 'react'
import { SingleShoppingCart } from './SingleShoppingCart'
import { ShoppingCartLoader } from './loaders/ShoppingCartLoader';
import { formatNumberToText } from '../utils/formatNumberToText';
import { calculateTotalPrice } from '../utils/calculateTotalPrice';

const sampleProducts = [
    {
        id: 1,
        name: 'Thám tử lừng danh Conan - Tập 1',
        href: `/book/${1}`,
        format: 'Thường',
        price: 90000,
        quantity: 1,
        imageSrc: 'https://picsum.photos/300/300',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
        currency: 'đ',
    },
    {
        id: 2,
        name: '86 - Eightysix - Tập 8',
        href: `/book/${2}`,
        format: 'Thường',
        price: 32000,
        quantity: 1,
        imageSrc: 'https://picsum.photos/300/300',
        imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        currency: 'đ',
    },
    {
        id: 3,
        name: 'Thám tử lừng danh Conan - Tập 1',
        href: `/book/${3}`,
        format: 'Thường',
        price: 32000,
        quantity: 1,
        imageSrc: 'https://picsum.photos/300/300',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        currency: 'đ',
    },
    {
        id: 4,
        name: '86 - Eightysix - Tập 8',
        href: `/book/${4}`,
        format: 'Thường',
        price: 32000,
        quantity: 1,
        imageSrc: 'https://picsum.photos/300/300',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        currency: 'đ',
    },
    {
        id: 5,
        name: 'Thám tử lừng danh Conan - Tập 1',
        href: `/book/${5}`,
        format: 'Thường',
        price: 32000,
        quantity: 1,
        imageSrc: 'https://picsum.photos/300/300',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        currency: 'đ',
    },
    // More products...
]

export const ShoppingCarts = (/*items*/) => {

    const [products, setProducts] = useState([]);
    const NUMLOADER = 2;

    // Xử lý phí shipping
    const calculateShippingFee = () => {
        //Tính phí shipping
        return 20000
    }

    // Xử lý sự kiện khi nhấn nút "Xoá"
    const handleDeleteProduct = (productId) => {
        //ví dụ gửi yêu cầu xoá sản phẩm xuống backend
        //sau đó update products
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
    }

    // Xử lý sự kiện khi nhấn nút "Tăng Giảm số lượng"
    const handleQuantityChange = (productId, newQuantity) => {
        const updatedProducts = products.map(product => {
            if (product.id === productId) {
                return { ...product, quantity: newQuantity };
            }
            return product;
        });
        setProducts(updatedProducts);
    };

    const handleDecreaseQuantity = (productId, currentQuantity) => {
        const newQuantity = Math.max(1, currentQuantity - 1); // Đảm bảo số lượng không nhỏ hơn 1
        handleQuantityChange(productId, newQuantity);
    };

    const handleIncreaseQuantity = (productId, currentQuantity) => {
        const newQuantity = currentQuantity + 1;
        handleQuantityChange(productId, newQuantity);
    };

    useEffect(() => {
        //ví dụ tải các sản phẩm trong giỏ hàng của khách
        setTimeout(() => {
            if (open) {
                setProducts(sampleProducts);
            }
        }, 1000)
    }, [])

    return (
        <div className="flex flex-col">
            {/* Navigate */}
            <div className="px-8 xl:px-28">
                <div className="flex gap-2 text-zinc-400 text-sm font-normal capitalize tracking-widest ">
                    <a href="/" className="hover:text-zinc-600">Trang Chủ</a>
                    <a href={`/home/shoppingcart`} className="text-zinc-500">/ Giỏ Hàng</a>
                </div>
                <hr />
            </div>
            {/* Shopping Carts */}
            <div className="h-screen">
                {/* <h1 className="m-2 text-center items-center text-2xl font-semibold text-light font-inter">Giỏ Hàng Của Tôi</h1> */}
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 xl:mt-6">
                    <div className="rounded-lg md:w-2/3 xl:max-h-[35rem] xl:pr-2 overflow-y-auto scrollbar-thin scrollbar-webkit">
                        {products.length === 0 ?
                            <ShoppingCartLoader items={NUMLOADER} />
                            :
                            products.map((product) => (
                                <SingleShoppingCart
                                    key={product.id}
                                    product={product}
                                    handleDeleteProduct={handleDeleteProduct}
                                    handleDecreaseQuantity={handleDecreaseQuantity}
                                    handleIncreaseQuantity={handleIncreaseQuantity}
                                />
                            ))
                        }
                    </div>
                    {/* <!-- Sub total --> */}
                    <div className={` mt-6 h-full font-inter rounded-lg border border-red-200 bg-white p-6 shadow-md shadow-red-200 md:mt-0 md:w-1/3 ${products.length ? '' : 'animate-pulse'}`}>
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Số Sản Phẩm</p>
                            <div className="text-gray-700 text-base font-bold capitalize tracking-wide">
                                <span>
                                    {products.length}
                                </span>
                            </div>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Tổng giá</p>
                            <div className="text-gray-700 text-base font-bold capitalize tracking-wide">
                                <span>
                                    {formatNumberToText(calculateTotalPrice(products))}
                                </span>
                                <span className="underline">
                                    {products[0]?.currency}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Shipping</p>
                            <div className="text-gray-700 text-base font-bold capitalize tracking-wide">
                                <span>
                                    {formatNumberToText(calculateShippingFee())}
                                </span>
                                <span className="underline">
                                    {products[0]?.currency}
                                </span>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="flex gap-8 justify-between text-red-500 text-xl">
                            <p className="text-md font-bold">Tạm Tính</p>
                            <div className="flex flex-col items-end justify-end">
                                <div className=" font-bold capitalize tracking-wide">
                                    <span>
                                        {formatNumberToText(calculateTotalPrice(products) + calculateShippingFee())}
                                    </span>
                                    <span className="underline">
                                        {products[0]?.currency}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700">Đã bao gồm thuế VAT</p>
                            </div>
                        </div>
                        <button className={`mt-6 w-full bg-red-500 py-1.5 font-bold text-blue-50 xl:hover:bg-red-600 ${products.length ? '' : 'hidden'}`}>ĐẶT HÀNG</button>
                        <div className="flex justify-center mt-4 text-xs font-inter">
                            <button
                                type="button"
                                className="flex gap-2 font-medium text-red-600 xl:hover:text-red-500"

                            >
                                <span aria-hidden="true"> &rarr;</span>
                                Tiếp Tục Mua Hàng
                            </button>
                        </div>
                    </div>

                </div>
                {products.length === 0 ?
                    <div className="flex justify-center mt-2">
                        <button
                            type="button"
                            className="flex gap-2 font-medium text-red-600 hover:text-red-500"
                        >
                            <span aria-hidden="true"> &rarr;</span>
                            Tiếp Tục Mua Hàng
                        </button>
                    </div> : ''
                }
            </div>

        </div >
    )
}

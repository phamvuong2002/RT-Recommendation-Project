import React, { useEffect, useState } from 'react'
import { SingleShoppingCart } from './SingleShoppingCart'
import { ShoppingCartLoader } from './loaders/ShoppingCartLoader';
import { formatNumberToText } from '../utils/formatNumberToText';
import { calculateTotalPrice } from '../utils/calculateTotalPrice';
import ShoppingCartsGroupedByPublisherID from './ShoppingCartsGroupedByPublisherID';

const sampleUserInfo = {
    userId: '123456',
    fullName: 'Vuong Pham',
    username: 'vuongpham',
    email: 'vuongpham@gmail.com',
}

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
        publisherID: '123451',
        publisher: 'Nhà xuất bản Trẻ',
        publisherImgUrl: 'https://i.ibb.co/pRbvxj9/logo-nxb-tre.png'
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
        publisherID: '123451',
        publisher: 'Nhà xuất bản Trẻ',
        publisherImgUrl: 'https://i.ibb.co/pRbvxj9/logo-nxb-tre.png'
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
        publisherID: '123452',
        publisher: 'Nhà xuất bản Kim Đồng',
        publisherImgUrl: 'https://i.gyazo.com/7d1bab302c86880f9eb91cd04388edc2.png'
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
        publisherID: '123452',
        publisher: 'Nhà xuất bản Kim Đồng',
        publisherImgUrl: 'https://i.gyazo.com/7d1bab302c86880f9eb91cd04388edc2.png'
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
        publisherID: '123451',
        publisher: 'Nhà xuất bản Trẻ',
        publisherImgUrl: 'https://i.ibb.co/pRbvxj9/logo-nxb-tre.png'
    },
    {
        id: 6,
        name: 'Thám tử lừng danh Conan - Tập 1',
        href: `/book/${5}`,
        format: 'Thường',
        price: 32000,
        quantity: 1,
        imageSrc: 'https://picsum.photos/300/300',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        currency: 'đ',
        publisherID: '123453',
        publisher: 'Nhà xuất bản Tổng hợp thành phố Hồ Chí Minh',
        publisherImgUrl: 'https://i.ibb.co/Jnt6nzw/logo-nxb-tong-hop-tp-hcm-removebg-preview.png'
    },
    {
        id: 7,
        name: 'Thám tử lừng danh Conan - Tập 1',
        href: `/book/${5}`,
        format: 'Thường',
        price: 32000,
        quantity: 1,
        imageSrc: 'https://picsum.photos/300/300',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        currency: 'đ',
        publisherID: '123453',
        publisher: 'Nhà xuất bản Tổng hợp thành phố Hồ Chí Minh',
        publisherImgUrl: 'https://i.ibb.co/Jnt6nzw/logo-nxb-tong-hop-tp-hcm-removebg-preview.png'
    },
    {
        id: 8,
        name: 'Thám tử lừng danh Conan - Tập 1',
        href: `/book/${5}`,
        format: 'Thường',
        price: 32000,
        quantity: 1,
        imageSrc: 'https://picsum.photos/300/300',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        currency: 'đ',
        publisherID: '',
        publisher: '',
        publisherImgUrl: ''
    },
    // More products...
]

export const ShoppingCarts = (/*items*/) => {

    const [products, setProducts] = useState([]);
    const [shippingFee, setShippingFee] = useState(0);
    const [address, setAddress] = useState('');
    const [user, setUser] = useState(sampleUserInfo);
    const NUMLOADER = 2;

    // Xử lý phí shipping
    const calculateShippingFee = async () => {
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

    //Xử lý sự kiện xoá tất cả sản phẩm của một nhà xuất bản
    const handleDeletePublisherProducts = (publisherID) => {
        const updatedProducts = [...products];
        const filteredProducts = updatedProducts.filter(product => product.publisherID !== publisherID);
        setProducts(filteredProducts);
    };

    // Xử lý lấy địa chỉ của user
    const getAddresses = async (user) => {
        //Xử lý lấy thông tin địa chỉ
        return "Phường Tân Hưng, Quận 7,Hồ Chí Minh"
    }

    useEffect(() => {
        //ví dụ tải các sản phẩm trong giỏ hàng của khách
        setTimeout(() => {
            if (open) {
                setProducts(sampleProducts);
            }
        }, 1000)
    }, [])

    //Tính  phí ship
    useEffect(() => {
        const fetchShippingFee = async () => {
            const fee = await calculateShippingFee();
            setShippingFee(fee);
        };

        fetchShippingFee();
    }, [address]);

    //Lấy thông tin Address
    useEffect(() => {
        const getUserAddresses = async () => {
            const fee = await getAddresses(user);
            setAddress(fee);
        };

        getUserAddresses();
    }, [user])

    return (
        <div className="flex flex-col xl:px-28">
            {/* Navigate */}
            <div className="px-8">
                <div className="flex gap-2 text-zinc-400 text-sm font-normal capitalize tracking-widest ">
                    <a href="/" className="hover:text-zinc-600">Trang Chủ</a>
                    <a href={`/home/shoppingcart`} className="text-zinc-500">/ Giỏ Hàng</a>
                </div>
                <hr />
            </div>
            {/* Shopping Carts */}
            <div className="bg-gray-50 mt-2">
                {/* <h1 className="m-2 text-center items-center text-2xl font-semibold text-light font-inter">Giỏ Hàng Của Tôi</h1> */}
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 xl:mt-6">
                    <div className="rounded-lg md:w-2/3 xl:max-h-[35rem] xl:pr-2 overflow-y-auto no-scrollbar">
                        {products.length === 0 ?
                            <ShoppingCartLoader items={NUMLOADER} />
                            :
                            <ShoppingCartsGroupedByPublisherID
                                products={products}
                                handleDeleteProduct={handleDeleteProduct}
                                handleDecreaseQuantity={handleDecreaseQuantity}
                                handleIncreaseQuantity={handleIncreaseQuantity}
                                handleDeletePublisherProducts={handleDeletePublisherProducts}
                            />
                        }
                    </div>


                    {/* <!-- Sub total --> */}
                    <div className={`h-full font-inter rounded-lg xl:mt-2 xl:rounded-none border border-red-200 bg-white p-6 shadow-md shadow-red-200 md:mt-0 md:w-1/3 ${products.length ? '' : 'animate-pulse'}`}>
                        <div className="mb-2 flex gap-2 flex-col justify-between">
                            <p className="text-gray-700">Địa Chỉ</p>
                            <div className="flex gap-2 text-gray-700 text-base font-bold capitalize tracking-wide">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <div className='text-sm font-light'>{address}</div>
                            </div>
                            <button className="flex flex-col items-end text-sm text-red-500">Chỉnh Sửa</button>
                        </div>
                        <hr className="my-4" />
                        <div className="mb-2 flex justify-between">
                            <p className="text-lg font-bold">Thông Tin Đơn Hàng</p>
                            <div className="text-gray-700 text-base font-bold capitalize tracking-wide">
                                {/* <span>
                                    {products.length}
                                </span> */}
                            </div>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Tạm Tính ({products.length} sản phẩm) </p>
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
                            <p className="text-gray-700">Phí Vận Chuyển</p>
                            <div className="text-gray-700 text-base font-bold capitalize tracking-wide">
                                <span>
                                    {formatNumberToText(shippingFee)}
                                </span>
                                <span className="underline">
                                    {products[0]?.currency}
                                </span>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="flex gap-8 justify-between text-red-500 text-xl">
                            <p className="text-md font-bold">Tổng Cộng</p>
                            <div className="flex flex-col items-end justify-end">
                                <div className=" font-bold capitalize tracking-wide">
                                    <span>
                                        {formatNumberToText(calculateTotalPrice(products) + shippingFee)}
                                    </span>
                                    <span className="underline">
                                        {products[0]?.currency}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700">Đã bao gồm thuế VAT</p>
                            </div>
                        </div>
                        <button className={`mt-6 w-full bg-red-500 py-1.5 font-bold text-blue-50 xl:hover:bg-red-600 ${products.length ? '' : 'hidden'}`}>
                            ĐẶT HÀNG ({products.length})
                        </button>
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

import React, { useEffect, useState } from 'react'
import { ShoppingCartLoader } from './loaders/ShoppingCartLoader';
import { formatNumberToText } from '../utils/formatNumberToText';
import { calculateTotalPrice } from '../utils/calculateTotalPrice';
import ShoppingCartsGroupedByPublisherID from './ShoppingCartsGroupedByPublisherID';
import { fetchData } from '../helpers/fetch';

const sampleUserInfo = {
    userId: '123456',
    fullName: 'Vuong Pham',
    username: 'vuongpham',
    email: 'vuongpham@gmail.com',
}

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
    const handleDeleteProduct = async (productId) => {
        //ví dụ gửi yêu cầu xoá sản phẩm xuống backend
        //sau đó update products
        const url = '../data/test/shoppingcarts.json';
        try {
            const shoppingCartsData = await fetchData(url);
            const updatedProducts = [...shoppingCartsData];
            const filteredProducts = updatedProducts.filter(product => product.id !== productId);
            setProducts(filteredProducts);
            return 'success';
        } catch (error) {
            console.error('Error:', error);
            return 'failed';
        }
    }



    //Xử lý sự kiện xoá tất cả sản phẩm của một nhà xuất bản
    const handleDeletePublisherProducts = async (publisherID) => {
        const url = '../data/test/shoppingcarts.json';
        try {
            const shoppingCartsData = await fetchData(url);
            const updatedProducts = [...shoppingCartsData];
            const filteredProducts = updatedProducts.filter(product => product.publisherID !== publisherID);
            setProducts(filteredProducts);
            return 'success';
        } catch (error) {
            console.error('Error:', error);
            return 'failed';
        }
    };

    //Xử lý sự kiện thêm sản phẩm quan tâm
    const handleAddInterestingProduct = async (productID) => {
        const url = ''
        //Xử lý thêm vào danh sách sản phẩm yêu thích
        //ví dụ:
        console.log(`Bạn đã thêm sản phẩm ${productID} vào danh sách yêu thích`)
        return 'success'
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

    // Xử lý lấy địa chỉ của user
    const getAddresses = async (user) => {
        //Xử lý lấy thông tin địa chỉ
        return "Phường Tân Hưng, Quận 7,Hồ Chí Minh"
    }

    //Fetch Shopping Carts
    useEffect(() => {
        const url = '../data/test/shoppingcarts.json';
        const loadShoppingCartsData = async () => {
            try {
                const shoppingCartsData = await fetchData(url);
                setProducts(shoppingCartsData)
            } catch (error) {
                // throw error;
            }
        }
        //ví dụ tải các sản phẩm trong giỏ hàng của khách
        setTimeout(() => {
            loadShoppingCartsData()
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
            {/* Shopping Carts */}
            <div className="flex flex-col items-center bg-gray-50 ">
                {/* <h1 className="m-2 text-center items-center text-2xl font-semibold text-light font-inter">Giỏ Hàng Của Tôi</h1> */}
                <div className="w-full px-1">
                    <div className=" xl:mx-0 mb-1 xl:w-full max-w-[80rem] h-[3rem] flex items-center text-red-500 text-lg font-bold bg-red-50 border border-red-100 rounded-tl-lg rounded-tr-lg">
                        <div className="p-2 xl:p-4  w-full">
                            {`Giỏ Hàng (${products.length} sản phẩm)`}
                        </div>
                    </div>
                </div>
                <div className="w-full xl:px-1">
                    <div className="max-w-7xl justify-center px-1 md:flex md:space-x-1 xl:px-0">
                        <div className="md:w-2/3 xl:max-h-[50rem] xl:pr-2 overflow-y-auto no-scrollbar border border-red-100 ">
                            {products.length === 0 ?
                                <ShoppingCartLoader items={NUMLOADER} />
                                :
                                <ShoppingCartsGroupedByPublisherID
                                    products={products}
                                    handleDeleteProduct={handleDeleteProduct}
                                    handleDecreaseQuantity={handleDecreaseQuantity}
                                    handleIncreaseQuantity={handleIncreaseQuantity}
                                    handleDeletePublisherProducts={handleDeletePublisherProducts}
                                    handleAddInterestingProduct={handleAddInterestingProduct}
                                />
                            }
                        </div>


                        {/* <!-- Sub total --> */}
                        <div className={`${products.length === 0 ? 'relative' : 'fixed'}  bottom-0 left-0 w-full xl:relative md:relative xl:h-full font-inter rounded-bl-lg rounded-br-lg xl:rounded-none border border-red-100 bg-white xl:p-6 md:p-6 p-3  md:mt-0 md:w-1/3 ${products.length ? '' : 'animate-pulse'}`}>
                            <div className="mb-2 xl:flex gap-2 flex-col justify-between hidden">
                                <p className="text-gray-700">Địa Chỉ</p>
                                <div className="flex gap-2 text-gray-700 text-base font-bold capitalize tracking-wide">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    <div className='text-sm font-light'>{address || "Bạn chưa có địa chỉ giao hàng. Vui lòng cập nhật"}</div>
                                </div>
                                {
                                    address ?
                                        <button className="flex flex-col items-end text-sm text-red-500">Chỉnh Sửa</button>
                                        :
                                        <button className="flex flex-col items-end text-sm text-red-500">Cập Nhật Địa Chỉ</button>
                                }
                            </div>
                            <hr className="xl:flex my-4 hidden" />
                            <div className="mb-2 flex justify-between">
                                <p className="text-base font-bold">Thông Tin Đơn Hàng</p>
                                <div className="text-gray-700 text-base font-bold capitalize tracking-wide">
                                    {/* <span>
                                    {products.length}
                                </span> */}
                                </div>
                            </div>
                            <div className="mb-2 flex justify-between text-sm">
                                <p className="text-gray-700">Tạm Tính ({products.length} sản phẩm) </p>
                                <div className="text-gray-700  font-bold capitalize tracking-wide">
                                    <span>
                                        {formatNumberToText(calculateTotalPrice(products))}
                                    </span>
                                    <span className="underline">
                                        {products[0]?.currency}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <p className="text-gray-700">Phí Vận Chuyển</p>
                                <div className="text-gray-700 font-bold capitalize tracking-wide">
                                    <span>
                                        {formatNumberToText(shippingFee)}
                                    </span>
                                    <span className="underline">
                                        {products[0]?.currency}
                                    </span>
                                </div>
                            </div>
                            <hr className="my-2 xl:my-4 md:my-4" />
                            <div className="flex justify-between text-red-500 text-xl">
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
                                    <p className="text-xs text-gray-700">Đã bao gồm thuế VAT</p>
                                </div>
                            </div>
                            <button className={`mt-2 xl:mt-6 md:mt-6 w-full bg-red-500 py-1.5 font-bold text-blue-50 xl:hover:bg-red-600 ${products.length ? '' : 'hidden'}`}>
                                XÁC NHẬN GIỎ HÀNG ({products.length})
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

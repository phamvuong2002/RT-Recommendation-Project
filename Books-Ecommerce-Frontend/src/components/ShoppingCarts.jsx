import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { ShoppingCartLoader } from './loaders/ShoppingCartLoader';
import { formatNumberToText } from '../utils/formatNumberToText';
import { calculateTotalPrice } from '../utils/calculateTotalPrice';
import ShoppingCartsGroupedByPublisherID from './ShoppingCartsGroupedByPublisherID';
import { SelectAddressPopup } from '../helpers/SelectAddressPopup';
import { calculateShippingFeeDefault } from '../utils/calculateShippingFeeDefault';
import { fetchAPI, fetchData } from '../helpers/fetch';

import { TextLoader } from './loaders/TextLoader';
import { AppContext } from '../contexts/main';
import { addtocart, deletecartsbypub, getcarts } from '../apis/cart';

export const ShoppingCarts = (/*items*/) => {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);

  const { userId, session, setIsLoading, setNumCart } = useContext(AppContext);

  const [products, setProducts] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [address, setAddress] = useState('');
  const [isAddrPopupOpen, setIsAddrPopupOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState('');
  const NUMLOADER = 2;

  // Xử lý sự kiện khi nhấn nút "Xoá"
  const handleDeleteProduct = async (productId) => {
    //ví dụ gửi yêu cầu xoá sản phẩm xuống backend
    //sau đó update products
    setIsLoading(true);
    const update = await fetchAPI(`../${addtocart}`, 'POST', {
      userId: userId,
      book: {
        book_id: productId,
        quantity: 0,
        old_quantity: 1,
      },
    });
    if (update.status !== 200) return;
    const updatedProducts = update.metadata.cart_data;
    setProducts(updatedProducts);
    setNumCart(update.metadata.cart_count_products);
    setIsLoading(false);
  };

  // Xử lý sự kiện click chỉnh sửa địa chỉ
  //Load địa chỉ khi mở popup
  const handleAddressChange = async (e) => {
    e.preventDefault();
    const url = '../data/test/useraddresses.json';
    try {
      const addressData = await fetchData(url);
      setUserAddresses(addressData);
    } catch (error) {
      // throw error;
    }
  };

  //Xử lý sự kiện xoá tất cả sản phẩm của một nhà xuất bản
  const handleDeletePublisherProducts = async (publisherID) => {
    setIsLoading(true);
    const update = await fetchAPI(`../${deletecartsbypub}`, 'POST', {
      userId,
      publisherId: publisherID,
    });
    if (update.status !== 200) return;
    const updatedProducts = update.metadata.cart_data;
    setProducts(updatedProducts);
    setNumCart(update.metadata.cart_count_products);

    setIsLoading(false);
  };

  // Xử lý sự kiện khi nhấn nút "Tăng Giảm số lượng"
  const handleQuantityChange = async (
    productId,
    newQuantity,
    currentQuantity,
  ) => {
    setIsLoading(true);
    const update = await fetchAPI(`../${addtocart}`, 'POST', {
      userId: userId,
      book: {
        book_id: productId,
        quantity: newQuantity,
        old_quantity: currentQuantity,
      },
    });
    if (update.status !== 200) return;
    if (newQuantity === 0) {
      await handleDeleteProduct(productId);
    }
    const updatedProducts = products.map((product) => {
      if (product.cb_book_id === update.metadata.cb_book_id) {
        return { ...product, cb_book_num: update.metadata.cb_book_num };
      }
      return product;
    });
    // console.log('updatedProducts::', updatedProducts);
    setProducts(updatedProducts);
    setIsLoading(false);
  };

  const handleDecreaseQuantity = (productId, currentQuantity) => {
    const newQuantity = Math.max(1, currentQuantity - 1); // Đảm bảo số lượng không nhỏ hơn 1
    handleQuantityChange(productId, newQuantity, currentQuantity);
  };

  const handleIncreaseQuantity = (productId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    handleQuantityChange(productId, newQuantity, currentQuantity);
  };

  // Xử lý xác nhận giỏ hàng
  const handleConfirmCarts = () => {
    navigate('/payment');
  };

  //Fetch Shopping Carts
  useEffect(() => {
    setPageLoading(true);
    const loadShoppingCartsData = async () => {
      if (!userId || userId === '') return;
      const shoppingCartsData = await fetchAPI(`../${getcarts}`, 'POST', {
        userId: userId,
      });
      if (shoppingCartsData.status === 200) {
        setProducts(shoppingCartsData.metadata.cart_data);
        setNumCart(shoppingCartsData.metadata.cart_count_products);
      } else {
        setProducts([]);
        setNumCart(0);
      }
      setPageLoading(false);
    };
    //ví dụ tải các sản phẩm trong giỏ hàng của khách
    loadShoppingCartsData();
  }, [userId]);

  //test cart data
  // useEffect(() => {
  //   console.log('SHOPPINGCARRTTTTTTTT::', products);
  // }, [products]);

  //Tính  phí ship
  useEffect(() => {
    const fetchShippingFee = async () => {
      const dataShipping = await calculateShippingFeeDefault(address);
      setShippingFee(dataShipping[0].fee);
    };

    fetchShippingFee();
  }, [address]);

  //Lấy thông tin Address
  useEffect(() => {
    const getAddresses = async () => {
      const url = '../data/test/useraddresses.json';
      try {
        const addressData = await fetchData(url);
        setAddress(addressData[0]);
      } catch (error) {
        return;
        // throw error;
      }
    };
    getAddresses();
  }, [userId]);

  //For test
  //   useEffect(() => {
  //     console.log('user data:', {
  //       userId,
  //       session,
  //     });
  //   }, [userId, session]);

  return (
    <div className="flex flex-col" id="shopping-cart">
      {/* Shopping Carts */}

      <div className="flex flex-col items-center">
        <div className="w-full px-1">
          <div className=" xl:mx-0 mb-1 xl:w-full max-w-[82rem] h-[3rem] flex items-center text-red-500 text-lg font-bold bg-white border border-red-50 rounded-tl-lg rounded-tr-lg">
            <div className="p-2 xl:p-4  w-full">
              {`Giỏ Hàng (${products.length} sản phẩm)`}
            </div>
          </div>
        </div>
        <div className="w-full xl:px-1 ">
          <div className="max-w-8xl justify-center px-1 md:flex md:space-x-1 xl:px-0 ">
            <div className="md:w-2/3 xl:max-h-[49rem] xl:pr-2 overflow-y-auto no-scrollbar">
              {pageLoading ? (
                <ShoppingCartLoader items={NUMLOADER} />
              ) : products.length === 0 ? (
                <div className="flex flex-col gap-1 items-center justify-center border border-red-50 text-gray-300 bg-white xl:h-full">
                  <img src="/img/empty-box.png" />
                  Không Có sản phẩm nào trong giỏ hàng
                </div>
              ) : (
                <ShoppingCartsGroupedByPublisherID
                  products={products}
                  handleDeleteProduct={handleDeleteProduct}
                  handleDecreaseQuantity={handleDecreaseQuantity}
                  handleIncreaseQuantity={handleIncreaseQuantity}
                  handleDeletePublisherProducts={handleDeletePublisherProducts}
                />
              )}
            </div>

            {/* <!-- Sub total --> */}
            <div
              className={`${pageLoading ? 'xl:fixed' : 'fixed z-[2] xl:relative xl:z-0'} bottom-0 left-0 w-full xl:relative md:relative xl:h-fixed font-inter rounded-bl-lg rounded-br-lg xl:rounded-none border border-red-50 bg-white xl:p-6 md:p-6 p-3 mb-5 xl:mb-0 md:mt-0 md:w-1/3 ${pageLoading ? 'animate-pulse' : ''}`}
            >
              <div className="h-80 hidden"></div>
              <div className="xl:mb-2 xl:flex gap-2 flex-col justify-between">
                <p className="text-gray-700 hidden xl:block">Địa Chỉ</p>
                <div
                  className={`flex gap-1 xl:gap-2 text-gray-700 text-base font-bold capitalize tracking-wide ${address ? '' : 'hidden xl:flex'}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 xl:w-6 xl:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <div
                    className={`flex text-xs xl:text-sm xl:font-light font-normal items-end`}
                  >
                    {address ? (
                      !address.addressid ? (
                        <div className="h-2 bg-slate-200 rounded w-[15rem]"></div>
                      ) : (
                        `${address?.proviceName} - ${address?.distristName} - ${address?.wardName}`
                      )
                    ) : (
                      <div>
                        Bạn chưa có địa chỉ giao hàng. Vui lòng cập nhật
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end">
                  <SelectAddressPopup
                    isAddrPopupOpen={isAddrPopupOpen}
                    setIsAddrPopupOpen={setIsAddrPopupOpen}
                    defaultAddress={address}
                    userAddresses={userAddresses}
                    setDefaultAddress={setAddress}
                    setUserAddresses={setUserAddresses}
                    icon={
                      address ? (
                        <button
                          className="text-xs xl:text-sm text-red-500"
                          onClick={handleAddressChange}
                        >
                          Chỉnh Sửa
                        </button>
                      ) : (
                        <button className="text-xs xl:text-sm text-red-500">
                          Cập Nhật Địa Chỉ
                        </button>
                      )
                    }
                  />
                </div>
              </div>
              <hr className="xl:flex my-4 hidden" />
              <div className="mb-1 xl:mb-2 flex justify-between">
                <p className="text-sm xl:text-base font-bold">
                  Thông Tin Đơn Hàng
                </p>
              </div>
              <div className="xl:mb-2 flex justify-between xl:text-sm text-xs">
                <p className="text-gray-700">
                  Tạm Tính ({products.length} sản phẩm){' '}
                </p>
                <div className="text-gray-700  font-bold capitalize tracking-wide">
                  <span>
                    {formatNumberToText(calculateTotalPrice(products))}
                  </span>
                  <span className="underline">{products[0]?.currency}</span>
                </div>
              </div>
              <div className="flex justify-between xl:text-sm text-xs">
                <p className="text-gray-700">Phí Vận Chuyển</p>
                <div className="text-gray-700 font-bold capitalize tracking-wide">
                  <span>{formatNumberToText(shippingFee)}</span>
                  <span className="underline">{'đ'}</span>
                </div>
              </div>
              <hr className="my-1 xl:my-4 md:my-4" />
              <div className="flex justify-between text-red-500 xl:text-xl">
                <p className="text-md font-bold">Tổng Cộng</p>
                <div className="flex flex-col items-end justify-end">
                  <div className=" font-bold capitalize tracking-wide">
                    <span>
                      {formatNumberToText(
                        calculateTotalPrice(products) + shippingFee,
                      )}
                    </span>
                    <span className="underline">{'đ'}</span>
                  </div>
                  <p className="text-xs text-gray-700">Đã bao gồm thuế VAT</p>
                </div>
              </div>
              <button
                className={`mt-2 xl:mt-6 md:mt-6 w-full text-sm xl:text-base bg-red-500 py-1.5 font-bold text-blue-50 xl:hover:bg-red-600 ${products.length ? '' : 'hidden'}`}
                onClick={handleConfirmCarts}
              >
                XÁC NHẬN GIỎ HÀNG ({products.length})
              </button>
              <div className="flex justify-center mt-4 text-xs font-inter">
                <Link
                  to="../"
                  className="flex gap-2 font-medium text-red-500 xl:hover:text-red-500"
                >
                  <span aria-hidden="true"> &rarr;</span>
                  Tiếp Tục Mua Hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
        {products.length === 0 ? (
          <div className="flex justify-center mt-2">
            <Link
              to="../"
              className="flex gap-2 font-medium text-red-500 hover:text-red-500"
            >
              <span aria-hidden="true"> &rarr;</span>
              Tiếp Tục Mua Hàng
            </Link>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

import React, { useContext, useEffect, useState } from 'react';
import NavigationPath from '../components/NavigationPath';
import { ShoppingCarts } from '../components/ShoppingCarts';
import { AllProducts } from '../components/AllProducts';
import { Slider } from '../components/Slider';
import { SliderProducts } from '../components/SliderProducts';
import { fetchData } from '../helpers/fetch';
import { FectchPaging } from '../helpers/fectchPaging';
import { DetailOrder } from '../components/DetailOrder';
import { shortenString } from '../utils/shortenString';
import { vnpay } from '../utils/getPaymentReturn';
import { AppContext } from '../contexts/main';

export const OrderDetailPage = () => {
  const { userId, setIsShowFooter } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [paymentInfo, setPaymentInfo] = useState(null);
  const paths = [
    { path: '/', label: 'Trang Chủ' },
    { path: `/${'shoppingcarts'}`, label: `${shortenString('Giỏ Hàng', 5)}` },
    { path: `/${'payment'}`, label: `${shortenString('Thanh Toán', 5)}` },
    {
      path: `/${'order-detail'}`,
      label: `${shortenString('Chi Tiết Đơn Hàng', 1)}`,
    },
    {
      path: `/${'order-detail/'} ${orderId}`,
      label: `#${shortenString(JSON.stringify(orderId), 11)}`,
    },
  ];

  //This call for AllProduct
  const url = '../data/test/product';
  const { pages, totalPages, currentPage, setCurrentPage } = FectchPaging({
    url,
  });

  //set footer
  useEffect(() => {
    setIsShowFooter(true);
  }, []);

  //Fetch Product Data
  useEffect(() => {
    const url = '../data/test/product.json';
    const loadProductData = async () => {
      try {
        const productData = await fetchData(url);
        setProducts(productData);
      } catch (error) {
        // throw error;
      }
    };
    //
    setTimeout(() => {
      loadProductData();
    }, 1000);
  }, []);

  //Get Order
  useEffect(() => {
    //get payment information
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentInfo(vnpay(urlParams));
  }, []);

  useEffect(() => {
    console.log('payment infor:: ', paymentInfo);
  }, [paymentInfo]);

  return (
    <div>
      <NavigationPath components={paths} />
      <div className="bg-gray-100 xl:px-28 flex flex-col gap-[0.2rem]">
        <DetailOrder />
        {/*Gợi ý cho bạn*/}
        <div className="flex flex-col mt-1 px-1 xl:px-0">
          <div className="flex items-center mb-[0.1rem] xl:mb-1 pl-2 h-14 bg-white rounded-t-lg border border-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-[#ffbe98] w-[5%] md:w-[2%]"
            >
              <path
                fillRule="evenodd"
                d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex px-4 text-sm items-center">
              <div className="text-sm md:text-[150%] font-semibold font-['Inter'] tracking-wider">
                Dành Cho Bạn
              </div>
            </div>
          </div>
          <div className="bg-white border-x border-b xl:border border-red-100">
            <SliderProducts productData={products}></SliderProducts>
          </div>
        </div>

        {/*Sản phẩm bán chạy*/}
        <div className="flex flex-col mt-1 px-1 xl:px-0">
          <div className="flex items-center mb-[0.1rem] xl:mb-1 pl-2 h-14 bg-white rounded-t-lg border border-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-[#ffbe98] w-[5%] md:w-[2%]"
            >
              <path
                fillRule="evenodd"
                d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex px-4 text-sm items-center">
              <div className="text-sm md:text-[150%] font-semibold font-['Inter'] tracking-wider">
                Sản phẩm bán chạy
              </div>
            </div>
          </div>
          <div className="bg-white border-x border-b xl:border border-red-100">
            <AllProducts
              pages={pages}
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            ></AllProducts>
          </div>
        </div>
      </div>
    </div>
  );
};

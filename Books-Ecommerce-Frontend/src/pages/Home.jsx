import React, { useEffect, useState, useContext } from 'react';
import { Slider } from '../components/Slider';
import { FlashSale } from '../components/FlashSale';
import { Category } from '../components/Category';
import { SliderProducts } from '../components/SliderProducts';
import { AllProducts } from '../components/AllProducts';
import { InfoForGuest } from '../components/infoForGuest';
import { fetchAPI } from '../helpers/fetch';
import { getAllBook } from '../apis/book';
import { AppContext } from '../contexts/main';
import { isMobileDevice } from '../utils/isMobileDevice';

export const Home = () => {
  const { userId, numCart, setNumCart } = useContext(AppContext);
  const [user, setUser] = useState(userId);
  const [products, setProducts] = useState([]);
  const { setActivePage, setIsShowFooter } = useContext(AppContext);

  //set active page
  useEffect(() => {
    setActivePage('Home');
    setIsShowFooter(true);
  }, []);

  useEffect(() => {
    const loadProductData = async () => {
      const productData = await fetchAPI(`../${getAllBook}`, 'POST');
      setProducts(productData.metadata);
    };
    setTimeout(() => {
      loadProductData();
    }, 1000);

  }, []);


  return (
    <div className="pb-10 sm:pb-0">
      <Slider></Slider>
      <div className="mx-2 md:mx-16">
        <FlashSale userId={userId} productData={products}></FlashSale>
        <InfoForGuest></InfoForGuest>

        {/*Sản phẩm bán chạy*/}
        <div className="h-full">
          <AllProducts
            isShowHeader={true}
            numOfProductsInRow={5}
            _limit={isMobileDevice() ? 2 : 8}
            _choose={"all"}
          ></AllProducts>
        </div>

        {/* Top 5 thể loại ưa chuộng */}
        <Category></Category>

        {/* Xu hướng mua sắm */}
        <div className="my-5">
          <div className="flex items-center">
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
            <div className="text-[90%] md:text-[150%] font-semibold font-['Inter'] tracking-wider">
              Xu hướng mua sắm
            </div>
          </div>
          <SliderProducts
            userId={userId}
            productData={products}
          ></SliderProducts>
        </div>
      </div>
    </div>
  );
};

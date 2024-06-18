import React, { useContext, useEffect, useState } from 'react';
import NavigationPath from '../components/NavigationPath';
import { ShoppingCarts } from '../components/ShoppingCarts';
import { AllProducts } from '../components/AllProducts';
import { Slider } from '../components/Slider';
import { SliderProducts } from '../components/SliderProducts';
import { fetchAPI, fetchData } from '../helpers/fetch';
import { FectchPaging } from '../helpers/fectchPaging';
import { AppContext } from '../contexts/main';
import {  recRandomBook, getbestselling, recLatestBook } from '../apis/recommendation';

export const ShoppingCartsPage = () => {
  const { userId, setActivePage, setIsShowFooter, setIsLoading, setIsProgressLoading } = useContext(AppContext);

  const [collabProducts, setCollabProducts] = useState([]);
  const [bestSellerData, setBestSellerData] = useState([]);

  //set active page
  useEffect(() => {
    setActivePage('ShoppingCart');
    setIsShowFooter(false);
  }, []);

  const paths = [
    { path: '/', label: 'Trang Chủ' },
    { path: `/${'shoppingcarts'}`, label: `${'Giỏ hàng'}` },
  ];

  //Fetch Product Data
  // useEffect(() => {
  //   const url = 'api/v1/api/book/all';

  //   const loadProductData = async () => {
  //     const dataFetch = await fetchAPI(url, 'POST');
  //     console.log('dataFetch::', dataFetch);
  //     setProducts(dataFetch.metadata);
  //   };

  //   loadProductData();
  // }, []);

  // COLLABORATIVE FILTERING 
  // Có thể bạn sẽ thích: Random 15 cuốn từ các đề xuất có trong ngày 
  useEffect(() => {
    const collabBook = async () => {
      if(!userId) return; 
      const rec_book = await fetchAPI(`../${recLatestBook}`, 'POST', {
        userId: userId,
        quantity: 15,
        model_type: "online"
      });

      if (rec_book.status == 200) {
        //console.log(rec_book.metadata)
        setCollabProducts(rec_book.metadata)
      }
    }
    // console.log('in rec svd')
    collabBook();
  }, [userId])

  //BEST SELLER
  //load best seller books
  useEffect(() => {
    const loadBestSellerData = async () => {
      setIsProgressLoading(true);
      const data = await fetchAPI(`../${getbestselling}`, 'POST', {
        pageNumber: 1,
        pageSize: 12,
      });
      if (data.status != 200) {
        setBestSellerData([]);
        setIsProgressLoading(false);
        return;
      }
      setBestSellerData(data?.metadata?.books);
      setIsProgressLoading(false);
    };
    //get best seller data
    loadBestSellerData();
  }, [userId]);

  return (
    <div className="">
      <NavigationPath components={paths} />
      <div className="xl:px-28 mb-[16.5rem] flex flex-col gap-[0.2rem] xl:mb-4 xl:bg-[#efefef]">
        <div className="w-full">
          <ShoppingCarts />
        </div>
        {/*Gợi ý cho bạn*/}
        <div className={`flex flex-col mt-1 px-1 xl:px-0 ${collabProducts.length===0?'hidden':''}`}>
          <div className="flex items-center mb-[0.1rem] xl:mb-1 pl-2 h-14 bg-white rounded-t-lg border border-red-50">
            <img src="/img/for_you.png" alt="for_you" className="w-[3rem]"/>
            <div className="flex px-4 text-sm items-center">
              <div className="text-lg md:text-[150%] font-semibold font-['Inter'] tracking-wider">
                Dành Cho Bạn
              </div>
            </div>
          </div>
          <div className="py-8 bg-white border-x border-b xl:border border-red-50">
            <SliderProducts userId={userId} productData={collabProducts} />
          </div>
        </div>

        {/* Sản phẩm bán chạy*/}
        <div className="flex flex-col mt-1 px-1 xl:px-0">
          <div className="flex items-center mb-[0.1rem] xl:mb-1 pl-2 h-14 bg-white rounded-t-lg border border-red-50">
            <img src="/img/best_seller.png" alt="best_seller" className="w-[3rem]"/>
            <div className="flex px-4 text-sm items-center">
              <div className="text-lg md:text-[150%] font-semibold font-['Inter'] tracking-wider">
                Sản phẩm bán chạy
              </div>
            </div>
          </div>
          <div className="bg-white border-x p-1 border-b xl:border border-red-50">
          <SliderProducts
              userId={userId?.toString()}
              productData={bestSellerData}>
            </SliderProducts>
          </div>
        </div>
      </div>
    </div>
  );
};

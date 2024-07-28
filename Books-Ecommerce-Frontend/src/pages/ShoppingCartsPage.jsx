import React, { useContext, useEffect, useRef, useState } from 'react';
import NavigationPath from '../components/NavigationPath';
import { ShoppingCarts } from '../components/ShoppingCarts';
import { AllProducts } from '../components/AllProducts_v2';
import { Slider } from '../components/Slider';
import { SliderProducts } from '../components/SliderProducts';
import { fetchAPI, fetchData } from '../helpers/fetch';
import { FectchPaging } from '../helpers/fectchPaging';
import { AppContext } from '../contexts/main';
import {  recRandomBook, getbestselling, recLatestBook, searchrecbook, getconbasedrecentbook } from '../apis/recommendation';
import { useNavigate } from 'react-router-dom';
import { compareBookIds } from '../utils/arraysEqual';

export const ShoppingCartsPage = () => {
  const { userId, setActivePage, setIsShowFooter, setIsProgressLoading } = useContext(AppContext);
  const [collabProducts, setCollabProducts] = useState([]);
  const [bestSellerData, setBestSellerData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadingRecBooks, setIsLoadingRecBooks] = useState(false);
  const [loadRecentBook, setLoadRecentBook] = useState(false);
  const prevBooksRef = useRef([]);

  //set active page
  useEffect(() => {
    setActivePage('ShoppingCart');
    setIsShowFooter(false);
  }, []);

  const paths = [
    { path: '/', label: 'Trang Chủ' },
    { path: `/${'shoppingcarts'}`, label: `${'Giỏ hàng'}` },
  ];

  // COLLABORATIVE FILTERING
  useEffect(() => {
    const collabBook = async () => {
      if(!userId) return;
      setIsLoadingRecBooks(true);
      const rec_book = await fetchAPI(`../${searchrecbook}`, 'POST', {
        page: parseInt(page),
        limit: 24,
        categories: 'sach-tieng-viet',
        userId,
      });
      if (rec_book.status == 200) {
        // console.log(rec_book.metadata)
        if(rec_book?.metadata?.books.length > 0) {
          const currentBooks = rec_book?.metadata?.books;
          if (!compareBookIds(currentBooks, prevBooksRef.current)) {
            setCollabProducts(currentBooks);
            prevBooksRef.current = currentBooks;
          }
          // setCollabProducts(rec_book?.metadata?.books);
        }
        else{
          setLoadRecentBook(true);
          setPage(1);
        }
        setIsLoadingRecBooks(false);
      }
    };
    // console.log('in rec svd')
    if(!loadRecentBook){
      collabBook();
    }
  }, [userId, page]);

  //Recent Books
  useEffect(() => {
    //load content based recent books
    const loadRecRecentBooks = async() => {
      if(!userId) return
      setIsLoadingRecBooks(true);
      const dataRec = await fetchAPI(`../${getconbasedrecentbook}`, 'POST', {
        userId,
        days: 3,
        page,
        page_size: 2,
        num_rec: 6,
        model_type: "online"
      });

      if (dataRec.status != 200) {
        setIsLoadingRecBooks(false);
        return;
      } else {
        if(dataRec?.metadata?.books.length === 0){
          setIsLoadingRecBooks(false);
          setLoadRecentBook(false);
        }else{
          const currentBooks = dataRec?.metadata?.books;
          if (!compareBookIds(currentBooks, prevBooksRef.current)) {
            setCollabProducts(currentBooks);
            prevBooksRef.current = currentBooks;
          }
          // setCollabProducts(dataRec?.metadata?.books);
        }
      }
      setIsLoadingRecBooks(false);
      return;
    };
    if(loadRecentBook) {
      loadRecRecentBooks();
    }
  }, [loadRecentBook, page, userId])

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
  }, []);

  return (
    <div className="">
      <NavigationPath components={paths} />
      <div className="xl:px-28 mb-[16.5rem] flex flex-col gap-[0.2rem] xl:mb-4 xl:bg-[#efefef]">
        <div className="w-full">
          <ShoppingCarts />
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
            {/* <SliderProducts userId={userId} productData={collabProducts} /> */}
            <AllProducts
              productsData={collabProducts}
              numOfProductsInRow={5}
              // _totalPages={totalPages}
              setPage={setPage}
              page={page}
              isLoading={isLoadingRecBooks}
            ></AllProducts>
          </div>
        </div>

        
      </div>
    </div>
  );
};

import React, { useState, useRef, useMemo, useEffect, useContext } from 'react';
import { Product } from './Product';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { AppContext } from '../contexts/main';
import { DotLoader } from './loaders/DotLoader';

export const AllProducts = ({
  isShowHeader,
  productsData,
  numOfProductsInRow,
  page = 1,
  setPage,
  _totalPages = 0,
  _loadmore = true,
  isLoading = false
  //   totalPages = 0,
}) => {
  const { userId } = useContext(AppContext);

  const topRef = useRef(null);
  // const [numPage, setNumPage] = useState(page);
  const [totalPages, setTotalPages] = useState(_totalPages);

  const [products, setProducts] = useState(productsData);

  // Reset personal book
  useEffect(() => {
    setProducts([]);
  }, [userId])

  const showHeader = useMemo(() => {
    if (isShowHeader) {
      return (
        <div className="flex items-center">
          <img src="/img/best_seller.png" alt="best_seller" className="w-[3rem]"/>

          <div className="text-[90%] md:text-[150%] font-semibold font-['Inter'] tracking-wider">
            Sản phẩm bán chạy
          </div>
        </div>
      );
    }
  }, [isShowHeader]);


  useEffect(() => {
    // console.log(_loadmore);
    if (_loadmore) {
      setProducts(prevProducts => [...prevProducts, ...productsData]);
    } else {
      setProducts(productsData);
    }
    // setProducts(productsData);
    setTotalPages(_totalPages);
  }, [productsData, _totalPages, _loadmore]);

  return (
    <div ref={topRef} className="w-full bg-white">
      {showHeader}
      <div className={`grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-${numOfProductsInRow} lg:gap-x-6 lg:gap-y-4`}>
        {/* Hiển thị các sản phẩm của trang hiện tại*/}
        {products.map((product, index) => (
          <div key={index} title={product?.book?.book_title}>
            <Product
              userId={userId}
              productData={product?.book}
              optionData={product?.sold || product?.isPersonal || product?.rec_type}
              optionType={product?.sold? 'sold': product?.isPersonal? 'personal': product?.rec_type? product?.rec_type : 'unknown'}
            />
          </div>
        ))}
      </div>

        {
          _loadmore? 
          <div className="w-full flex items-center justify-center my-10">
            {
              isLoading? <DotLoader/> :
              <button className="h-12 w-[25rem] border text-[1.1rem] font-semibold capitalize text-red-500 border-red-500"
                onClick={() => setPage(page + 1)}
              >
                Load more
              </button>
            }
          </div> : 
      <div className="bg-white">
        <ReactPaginate
          breakLabel={<span className="mr-4">...</span>}
          nextLabel={
            //   showNextButton ? null : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-[#ff4e4e]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            //   )
          }
          forcePage={page - 1}
          // onPageChange={handlePageChange}
          onPageChange={(event) => {
            setPage(
              event.selected === 0
                ? 1
                : event.selected === totalPages
                  ? totalPages
                  : event.selected + 1,
            );
            topRef.current.scrollIntoView({
              behavior: 'smooth',
              scroll: 'auto',
            });
          }}
          pageRangeDisplayed={2}
          pageCount={Math.ceil(totalPages)}
          previousLabel={
            //   showPrevButton ? null : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-[#ff4e4e]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            //   )
          }
          containerClassName="flex items-center justify-center mt-2 pb-9 sm:mt-8 "
          pageClassName="w-8 h-8 flex items-center justify-center sm:mr-4 "
          activeClassName="rounded-[50%] w-8 h-8 leading-8 text-center font-bold cursor-pointer bg-red-500 text-white"
        />
      </div>
        }
    </div>
  );
};

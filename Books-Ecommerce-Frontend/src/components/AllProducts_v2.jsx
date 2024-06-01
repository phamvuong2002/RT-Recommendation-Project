import React, { useState, useRef, useMemo, useEffect, useContext } from 'react';
import { Product } from './Product';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { AppContext } from '../contexts/main';

export const AllProducts = ({
  isShowHeader,
  productsData,
  numOfProductsInRow,
  page = 1,
  setPage,
  _totalPages = 0,
  //   totalPages = 0,
}) => {
  const { userId } = useContext(AppContext);

  const topRef = useRef(null);
  // const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(_totalPages);

  const [products, setProducts] = useState(productsData);

  const showHeader = useMemo(() => {
    if (isShowHeader) {
      return (
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
            Sản phẩm bán chạy
          </div>
        </div>
      );
    }
  }, [isShowHeader]);

  useEffect(() => {
    setProducts(productsData);
    setTotalPages(_totalPages);
  }, [productsData]);

  return (
    <div ref={topRef} className="w-full bg-white">
      {showHeader}
      <div className={`grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-${numOfProductsInRow} lg:gap-x-6 lg:gap-y-4`}>
        {/* Hiển thị các sản phẩm của trang hiện tại*/}
        {products.map((product, index) => (
          <div key={index} className="">
            <Product
              userId={userId}
              productData={product?.book}
              optionData={product?.sold}
            />
          </div>
        ))}
      </div>

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
          // forcePage={currentPage - 1}
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
    </div>
  );
};

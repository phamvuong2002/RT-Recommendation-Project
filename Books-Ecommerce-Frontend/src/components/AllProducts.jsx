import React, { useState, useRef, useMemo } from 'react';
import { Product } from "./Product";
import { useFectchPaging } from '../helpers/fectchPaging';
import { PaginationButtons } from "./PaginationButtons";





export const AllProducts = ({ pages, totalPages, currentPage, setCurrentPage, isShowHeader, numOfProductsInRow }) => {

    const topRef = useRef(null);
    const handlePageChange = () => {
        // Di chuyển màn hình đến phần tử đầu tiên của component
        topRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const showHeader = useMemo(() => {
        if (isShowHeader) {
            return (
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-[#ffbe98] w-[5%] md:w-[2%]">
                        <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
                    </svg>
                    <div className="text-[90%] md:text-[150%] font-semibold font-['Inter'] tracking-wider">Sản phẩm bán chạy</div>
                </div>
            )
        }
    }, [isShowHeader])

    return (
        <div ref={topRef} className="w-full">
            {showHeader}
            {/**flex flex-wrap gap-y-3 gap-x-5 */}
            <div className={`grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-${numOfProductsInRow} lg:gap-x-6 lg:gap-y-4`}>
                {/* Hiển thị các sản phẩm của trang hiện tại w-[45%] sm:w-1/3 lg:w-1/6*/}
                {pages.map((product, index) => (
                    <div key={index} className="">
                        <Product productData={product} />
                    </div>
                ))}
            </div>

            <PaginationButtons
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />

        </div>
    );
};

AllProducts.propTypes = {
    pages: PropTypes.array.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    isShowHeader: PropTypes.boolean,
    numOfProductsInRow: PropTypes.number.isRequired,
};
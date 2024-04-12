
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Product } from "./Product";
import { PaginationButtons } from "./PaginationButtons";
import PropTypes from 'prop-types';
import { fetchData } from '../helpers/fetch';
import queryString from 'query-string';


//{/* pages, totalPages, currentPage, setCurrentPage, isShowHeader, numOfProductsInRow */}
export const AllProducts = ({ isShowHeader, limitProduct, numOfProductsInRow }) => {

    const topRef = useRef(null);


    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({
        _page: 1,
        _limit: limitProduct,
        _totalRows: 120,
    })

    const [filters, setFilters] = useState({
        _limit: 48,
        _page: 1
    })

    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            _page: newPage
        })
        topRef.current.scrollIntoView({ behavior: 'smooth' })
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


    useEffect(() => {
        const loadProductData = async () => {
            try {
                const paramsString = queryString.stringify(filters);//_limit=48&_page=1

                const requestUrl = `../data/test/product&${paramsString}.json`;
                //requestUrl = ../data/test/product&_limit=48&_page=1.json //mốt api bỏ .json ra

                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                const { productData, pagination } = responseJSON;

                setProducts(productData);
                setPagination(pagination);
            } catch (error) {
                console.log('Fail to fetch productData', error.message)
            }
        }
        //
        setTimeout(() => {
            loadProductData()
        }, 500)
    }, [filters])

    return (
        <div ref={topRef} className="w-full p-5 sm:p-0">
            {showHeader}
            {/**flex flex-wrap gap-y-3 gap-x-5 */}
            <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-${numOfProductsInRow} lg:gap-x-6 lg:gap-y-4`}>
                {/* Hiển thị các sản phẩm của trang hiện tại w-[45%] sm:w-1/3 lg:w-1/6*/}
                {products.map((product, index) => (
                    <div key={index} className="">
                        <Product productData={product} />
                    </div>
                ))}
            </div>

            {/**
            <PaginationButtons
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            /> */}
            <PaginationButtons
                pagination={pagination}
                onPageChange={handlePageChange}
            />

        </div>
    );
};

AllProducts.propTypes = {
    // pages: PropTypes.array.isRequired,
    // setCurrentPage: PropTypes.func.isRequired,
    // currentPage: PropTypes.number.isRequired,
    // totalPages: PropTypes.number.isRequired,
    isShowHeader: PropTypes.bool,
    limitProduct: PropTypes.number.isRequired,
    numOfProductsInRow: PropTypes.number.isRequired,
};
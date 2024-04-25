
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Product } from "./Product";
import { PaginationButtons } from "./PaginationButtons";
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchAPI } from '../helpers/fetch';
import { getSearchFilterSort } from '../apis/book';



//{/* pages, totalPages, currentPage, setCurrentPage, isShowHeader, numOfProductsInRow */}
export const AllProducts = ({ userId, isShowHeader, limitProduct, numOfProductsInRow, _sort, _limit, _query }) => {

    const location = useLocation()
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    let pageUpdated = searchParams.get('page');

    const topRef = useRef(null);
    const prevQueryRef = useRef(null);
    const prevSortRef = useRef(null);

    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        limit: _limit,
        _totalRows: 10,
    })

    const [filters, setFilters] = useState({
        search: "",
        page: 1,
        limit: _limit,
        sort: _sort,
    })

    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            page: newPage
        });
        pageUpdated = newPage
        searchParams.set('page', pageUpdated);
        navigate(`?${searchParams.toString()}`);
        topRef.current.scrollIntoView({ behavior: 'smooth', scroll: 'auto' });
    };

    useEffect(() => {
        // Check if _query is updated
        if (_query !== prevQueryRef.current) {
            setFilters(prevFilters => ({
                ...prevFilters,
                search: _query,
                page: 1,
            }));
            prevQueryRef.current = _query;
        } else if (_sort !== prevSortRef.current) {
            setFilters(prevFilters => ({
                ...prevFilters,
                sort: _sort,
                page: 1,
            }));
            prevSortRef.current = _sort;
        }
    }, [_query, _sort]);


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
            const paramsString = queryString.stringify(filters);//limit=1&page=1&search=ho
            // console.log('filters', filters)
            const res = await fetchAPI(`../${getSearchFilterSort}?${paramsString}`, 'POST')
            console.log("productData", res.metadata)
            setProducts(res.metadata.productData);
            setPagination(res.metadata.pagination);

        }
        //
        setTimeout(() => {
            loadProductData()
        }, 100)
    }, [filters])



    return (
        <div ref={topRef} className="w-full">
            {showHeader}
            <div className={`grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-${numOfProductsInRow} lg:gap-x-6 lg:gap-y-4`}>
                {/* Hiển thị các sản phẩm của trang hiện tại*/}
                {products.map((product, index) => (
                    <div key={index} className="">
                        <Product
                            userId={userId}
                            productData={product}
                        />
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
                query={_query}
                sort={_sort}
            />

        </div>
    );
};

AllProducts.propTypes = {
    userId: PropTypes.string.isRequired,
    // setCurrentPage: PropTypes.func.isRequired,
    // currentPage: PropTypes.number.isRequired,
    // totalPages: PropTypes.number.isRequired,
    isShowHeader: PropTypes.bool,
    limitProduct: PropTypes.number.isRequired,
    numOfProductsInRow: PropTypes.number.isRequired,
    _sort: PropTypes.string,
    _limit: PropTypes.number,
    _query: PropTypes.string,
};
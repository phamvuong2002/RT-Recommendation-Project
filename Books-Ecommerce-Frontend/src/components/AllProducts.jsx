
import React, { useState, useRef, useMemo, useEffect, useContext } from 'react';
import { Product } from "./Product";
import { PaginationButtons } from "./PaginationButtons";
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchAPI } from '../helpers/fetch';
import { getSearchFilterSort, getListFavoriteBook } from '../apis/book';
import { AppContext } from '../contexts/main';



//{/* pages, totalPages, currentPage, setCurrentPage, isShowHeader, numOfProductsInRow */}
export const AllProducts = ({ isShowHeader, numOfProductsInRow, _sort, _cate, _limit, _query, _price, _publisher, _choose }) => {
    const location = useLocation()
    const navigate = useNavigate();
    const { userId } = useContext(AppContext);
    console.log("UID", userId)
    const searchParams = new URLSearchParams(location.search);
    let pageUpdated = searchParams.get('page');

    const topRef = useRef(null);
    const prevQueryRef = useRef(null);
    const prevSortRef = useRef(null);
    const prevCateRef = useRef(null);
    const prevPriceRef = useRef(null);
    const prevPublisherRef = useRef(null);

    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        limit: _limit,
        _totalRows: 10,
    })

    const [filters, setFilters] = useState({
        search: "",
        categories: _cate,
        page: 1,
        limit: _limit,
        sort: _sort,
        price: _price,
        publisher: _publisher
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
        else if (_cate !== prevCateRef.current) {
            setFilters(prevFilters => ({
                ...prevFilters,
                categories: _cate,
                page: 1,
            }));
            prevCateRef.current = _cate;
        }
        else if (_price !== prevPriceRef.current) {
            setFilters(prevFilters => ({
                ...prevFilters,
                price: _price,
                page: 1,
            }));
            prevPriceRef.current = _price;
        }
        else if (_publisher !== prevPublisherRef.current) {
            setFilters(prevFilters => ({
                ...prevFilters,
                publisher: _publisher,
                page: 1,
            }));
            prevPublisherRef.current = _publisher;
        }
    }, [_query, _sort, _cate, _price, _publisher]);


    useEffect(() => {
        if (_choose === "all") {
            const loadProductData = async () => {
                const paramsString = queryString.stringify(filters);//limit=1&page=1&search=ho
                const res = await fetchAPI(`../${getSearchFilterSort}?${paramsString}`, 'POST')
                setProducts(res.metadata.productData);
                setPagination(res.metadata.pagination);
            }
            setTimeout(() => {
                loadProductData()
            }, 100)
        } else if (_choose === "favorite") {
            const loadFavBook = async (user) => {
                let productData = await fetchAPI(`../${getListFavoriteBook}`, 'POST', {
                    "userId": user,
                });
                console.log("USE", user)
                setProducts(productData.metadata);

            };
            if (userId) {
                loadFavBook(userId);
            } else {
                console.log("User ID null!!!")
            }


        }

    }, [filters, userId])



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
                cate={_cate}
                price={_price}
                publisher={_publisher}
            />

        </div>
    );
};

AllProducts.propTypes = {
    isShowHeader: PropTypes.bool,
    numOfProductsInRow: PropTypes.number.isRequired,
    _sort: PropTypes.string,
    _limit: PropTypes.number,
    _query: PropTypes.string,
    _cate: PropTypes.string,
    _price: PropTypes.string,
    _publisher: PropTypes.string,
    _choose: PropTypes.string
};
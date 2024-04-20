import React, { useState, useRef, useEffect } from 'react';
import { useParams, useLocation, useSearchParams } from 'react-router-dom'
import { FectchPaging } from '../helpers/fectchPaging'
import FilterProduct from '../components/FilterProduct';



export const SearchPage = () => {
    const location = useLocation()
    //console.log('search page', location.search)
    const searchParams = new URLSearchParams(location.search)
    const query = searchParams.get('search')

    // lấy Param: Page & Limit
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')
    const sortBy = searchParams.get('sort')


    return (
        <div>
            {/*Truyền thêm đống pages, totalPages, currentPage, setCurrentPag để gọi AllProduct trong cái FilterProduct luôn*/}
            <FilterProduct
                _sort={sortBy}
                _limit={parseInt(limit)}
                _query={query}
            />

        </div>
    )
}

import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom'
import FilterProduct from '../components/FilterProduct';
import { AppContext } from '../contexts/main';



export const SearchPage = () => {
    const { userId, numCart, setNumCart } = useContext(AppContext);
    const location = useLocation()
    //console.log('search page', location.search)
    const searchParams = new URLSearchParams(location.search)
    const query = searchParams.get('search')

    // lấy Param: Page & Limit
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')
    const sortBy = searchParams.get('sort')
    const categories = searchParams.get('categories')
    const price = searchParams.get('price')
    const publisher = searchParams.get('publisher')

    return (
        <div className='pb-5 sm:pb-0'>
            {/*Truyền thêm đống pages, totalPages, currentPage, setCurrentPag để gọi AllProduct trong cái FilterProduct luôn*/}
            <FilterProduct
                _userId={userId}
                _cate={categories}
                _limit={parseInt(limit)}
                _query={query}
                _price={price}
                _publisher={publisher}
            />

        </div>
    )
}

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useLocation, useSearchParams } from 'react-router-dom'
import { FectchPaging } from '../helpers/fectchPaging'
import FilterProduct from '../components/FilterProduct';



export const SearchPage = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const query = searchParams.get('q')
    console.log(query)
    
    // lấy Param: Page & Limit
    const page= searchParams.get('page')
    const limit=searchParams.get('limit')

   
    console.log('search page')


    //Updated by NganVo - handle search- --9/4/2024--
    //Đáng lẽ là useEffect thì có xài biến thứ hai là [query, category, subcategory, subsubcategory]
    //mà hàm fetch của tui thì nó có [url] ở useEffect luôn rồi, chắc là được mà ha :))
    //mốt có api test thử rồi có gì tui fix lại
    //const API_URL = "https://localhost/search/q=?/category=?/per_page=6"; 
    const url = "../data/test/product";
    const { pages, totalPages, currentPage, setCurrentPage } = FectchPaging({ url });

    return (
        <div>
            {/*Truyền thêm đống pages, totalPages, currentPage, setCurrentPag để gọi AllProduct trong cái FilterProduct luôn*/}
            <FilterProduct
                
            />

        </div>
    )
}

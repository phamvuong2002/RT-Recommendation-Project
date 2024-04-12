import React, { useState, useRef, useEffect } from 'react';
import { useParams, useLocation, useSearchParams } from 'react-router-dom'
import { FectchPaging } from '../helpers/fectchPaging'
import FilterProduct from '../components/FilterProduct';



export const SearchPage = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const query = searchParams.get('q')
    console.log(query)
    const { category, subcategory, subsubcategory, subsubsubcategory } = useParams()
    // console.log( 'params '+category,subcategory, subsubcategory)

    const [selectedCategory, setCategory] = useState({ category: '', sub_category: '', sub_sub_category: '', sub_sub_sub_category: '' })

    console.log('search page')
    console.log(category, subcategory, subsubcategory, subsubsubcategory)

    useEffect(() => {
        if (query) {
            setCategory({
                category: 'all-category',
                sub_category: '',
                sub_sub_category: ''
            })
        }
        else {
            if (category && subcategory && subsubcategory && subsubsubcategory) {
                console.log('in cate')
                setCategory({
                    category: category,
                    sub_category: subcategory,
                    sub_sub_category: subsubcategory,
                    sub_sub_sub_category: subsubsubcategory
                })
            }
            else if (category && subcategory && subsubcategory) {
                console.log('in subcate ' + subcategory)
                setCategory({
                    category: category,
                    sub_category: subcategory,
                    sub_sub_category: subsubcategory,
                    sub_sub_sub_category: ''
                })
            } else if (category && subcategory) {
                setCategory({
                    category: category,
                    sub_category: ' ',
                    sub_sub_category: ''
                })
            } else if (category) {
                setCategory({
                    category: category,
                    sub_category: '',
                    sub_sub_category: '',
                    sub_sub_sub_category: ''
                })
            }
            else {
                setCategory({
                    category: 'all-category',
                    sub_category: ' ',
                    sub_sub_category: ''
                })
            }

        }

    }, [query, category, subcategory, subsubcategory])


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
                selectCategory={selectedCategory}
            />

        </div>
    )
}

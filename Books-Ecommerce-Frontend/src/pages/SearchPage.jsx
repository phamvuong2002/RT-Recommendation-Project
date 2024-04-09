import React, { useState, useRef, useEffect } from 'react';
import { useParams, useLocation, useSearchParams } from 'react-router-dom'
import { FectchPaging } from '../helpers/fectchPaging'
import FilterProduct from '../components/FilterProduct';
import { AllProducts } from '../components/AllProducts'



export const SearchPage = () => {
    const location = useLocation(); // <-- unpack route state
    const params = location.search
    let path = location.pathname
    let { query, category, subcategory, subsubcategory } = useParams()
    // console.log( 'params '+category,subcategory, subsubcategory)

    const [selectedCategory, setCategory] = useState({ category: '', sub_category: '', sub_sub_cate: '' })

    useEffect(() => {

        if (params) {
            setCategory({
                category: '',
                sub_category: '',
                sub_sub_cate: ''
            })
        }
        else {
            let category_path = path.slice(path.indexOf('/search/') + '/search/'.length)
            // console.log('in ' + category_path)
            setCategory(category_path)
            let splited_category_path = category_path.split('/')
            if (splited_category_path.length == 3) {
                setCategory({
                    category: splited_category_path[0],
                    sub_category: splited_category_path[1],
                    sub_sub_cate: splited_category_path[2]
                })
            } else if (splited_category_path.length == 2) {
                setCategory({
                    category: splited_category_path[0],
                    sub_category: splited_category_path[1],
                    sub_sub_cate: ''
                })
            } else if (splited_category_path.length == 1) {
                setCategory({
                    category: splited_category_path[0],
                    sub_category: '',
                    sub_sub_cate: ''
                })
            }
        }

    }, [path, params])


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

                pages={pages}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

        </div>
    )
}

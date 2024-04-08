import { React, useEffect, useState } from 'react'
import FilterProduct from '../components/FilterProduct';
import { useParams, useLocation, useSearchParams } from 'react-router-dom'


export const SearchPage = () => {


    const location = useLocation(); // <-- unpack route state
    const params = location.search
    let path = location.pathname
    let { category, subcategory, subsubcategory } = useParams()
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


    return (
        <div>
            <FilterProduct selectCategory={selectedCategory} />

        </div>
    )
}

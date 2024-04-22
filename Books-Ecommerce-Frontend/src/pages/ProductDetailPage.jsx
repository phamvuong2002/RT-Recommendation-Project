import React, { useEffect, useState } from 'react'
import { DetailCart } from '../components/DetailCart'
import { DescriptionFeedback } from '../components/DescriptionFeedback'
import NavigationPath from '../components/NavigationPath'
import { SliderProducts } from '../components/SliderProducts'
import { useParams } from 'react-router-dom';
import { fetchAPI } from '../helpers/fetch';
import { getAllBook } from '../apis/book';

export const ProductDetailPage = () => {
    const { bookid } = useParams();
    const [id, setId] = useState('');
    const [paths, setPaths] = useState([]);
    const [products, setProducts] = useState([]);

    //Get bookid from url
    useEffect(() => {
        setId(bookid);
    }, [bookid])

    //Xử ký sau khi lấy được bookid
    useEffect(() => {
        //get book ..
        //set navpath
        setPaths([
            { path: '/', label: 'Trang Chủ' },
            { path: `/${'books'}`, label: `${'Tiểu thuyết'}` },
            { path: `/books/${id}`, label: `${'86 - Eightysix - Tập 9'}` },
        ])
    }, [id])

    //Fetch Product Data
    useEffect(() => {
        const loadProductData = async () => {
            const productData = await fetchAPI(`../${getAllBook}`, 'POST')
            console.log("url", `../${getAllBook}`)
            setProducts(productData.metadata)
        }
        setTimeout(() => {
            loadProductData()
        }, 1000)
    }, [])


    return (
        <div className='flex flex-col'>
            <NavigationPath components={paths} />
            <div className="flex flex-col gap-[0.2rem]">
                <DetailCart />
                <DescriptionFeedback bookId={id} />

                {/*Gợi ý cho bạn*/}
                <div className="flex flex-col mt-2 px-1 xl:px-28">
                    <div className="flex items-center mb-[0.1rem] xl:mb-1 pl-2 h-14 bg-gradient-to-t from-red-50 to-gray-50 rounded-t-lg border border-red-100">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-[#ffbe98] w-[5%] md:w-[2%]">
                            <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
                        </svg>
                        <div className="flex px-4 text-sm items-center">
                            <div className="text-sm md:text-[150%] font-bold text-red-500  font-['Inter'] tracking-wider">Dành Cho Bạn</div>
                        </div>

                    </div>
                    <div className="bg-white border-x border-b xl:border border-red-100">
                        <SliderProducts productData={products}></SliderProducts>
                    </div>
                </div>

                {/*Sản phẩm bán chạy*/}
                <div className="flex flex-col mt-1 px-1 xl:px-28">
                    <div className="flex items-center mb-[0.1rem] xl:mb-1 pl-2 h-14 bg-gradient-to-t from-red-50 to-gray-50 rounded-t-lg border border-red-100">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-[#ffbe98] w-[5%] md:w-[2%]">
                            <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
                        </svg>
                        <div className="flex px-4 text-sm items-center ">
                            <div className="text-sm md:text-[150%] font-bold text-red-500 font-['Inter'] tracking-wider">Sản phẩm bán chạy</div>
                        </div>

                    </div>
                    <div className="bg-white border-x border-b xl:border border-red-50">
                        <SliderProducts productData={products}></SliderProducts>
                    </div>
                </div>
            </div>
        </div>
    )
}

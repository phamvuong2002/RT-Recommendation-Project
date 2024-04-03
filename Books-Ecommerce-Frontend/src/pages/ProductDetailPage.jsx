import React, { useEffect, useState } from 'react'
import { DetailCart } from '../components/DetailCart'
import { DescriptionFeedback } from '../components/DescriptionFeedback'
import NavigationPath from '../components/NavigationPath'
import { SliderProducts } from '../components/SliderProducts'
import { useParams } from 'react-router-dom';

export const ProductDetailPage = () => {
    const { bookid } = useParams();
    const [id, setId] = useState('')
    const [paths, setPaths] = useState([])

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

    return (
        <div className='flex flex-col'>
            <NavigationPath components={paths} />
            <div className="flex flex-col gap-[0.2rem]">
                <DetailCart />
                <DescriptionFeedback bookId={id} />
                <div className="xl:px-28 ">
                    <div className="bg-white">
                        <div className="xl:px-4  px-1 xl:py-1 pt-2 pb-4 text-lg font-semibold">
                            <div className="text-red-500 text-base font-bold font-inter capitalize tracking-widest">
                                Sản Phẩm Liên Quan
                            </div>
                        </div>
                        <SliderProducts />
                    </div>
                </div>
            </div>
        </div>
    )
}

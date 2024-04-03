import React from 'react'
import { DetailCart } from '../components/DetailCart'
import { DescriptionFeedback } from '../components/DescriptionFeedback'
import NavigationPath from '../components/NavigationPath'
import { SliderProducts } from '../components/SliderProducts'

export const ProductDetailPage = () => {
    const paths = [
        { path: '/', label: 'Trang Chủ' },
        { path: `/${'novel'}`, label: `${'Tiểu thuyết'}` },
        { path: `/${'novel'}/${'bookid'}`, label: `${'86 - Eightysix - Tập 9'}` },
    ]
    return (
        <div className='flex flex-col'>
            <NavigationPath components={paths} />
            <div className="flex flex-col gap-[0.2rem]">
                <DetailCart />
                <DescriptionFeedback />
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

import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { convertTextToHtml } from '../utils/convertTextToHtml'
import { FeedBack } from './FeedBack';
import { ShoppingCartLoader } from '../components/loaders/ShoppingCartLoader';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

import { Keyboard, Scrollbar } from 'swiper/modules';
import { fetchData } from '../helpers/fetch';

const product = {
    imgUrl: "https://picsum.photos/300/300",
    title: "86 -Eightysix - Tập 9",
    author: "By Asato asato",
    averageRating: 3.5,
    numReviews: 10,
    shortDescription: 'Ngoài 85 khu hành chính chính thức, Cộng hòa còn lập ra Khu 86 trên phần lãnh thổ “phi nhân” từng bị Legion càn quét, gán cho những con người bị đày ra đó cái mác “Tám Sáu” và bắt họ bán mạng chiến đấu trong những cỗ “vũ khí tự hành có người lái”.',
    publishDate: "2023",
    publisher: "Hồng Đức",
    dimension: "Bìa mềm",
    price: "145,000",
    salePrice: "145,000",
    currency: "đ",
    description: `Nội dung:

Thương vong sau trận đối đầu Noctiluca là rất lớn. Theo mất nửa cánh tay. Nhiều đồng đội ngã xuống chiến trường ngoài khơi. Đội phó Brísingamen, Shana là một trong số đó. Shiden lập lời thề báo thù cho chiến hữu lâu năm. Trong khi đó, Crena rơi vào khủng hoảng vì mình chính là người nao núng khi hay tin Shin mất tích, không làm tiếp nhiệm vụ bắn tỉa được nữa, gián tiếp gây ra cái chết của Shana.

Trong bối cảnh ấy, tình hình chiến sự vẫn không cho phép các Tám Sáu ngơi nghỉ. Noctiluca đã lẩn trốn vào lãnh thổ Thánh quốc Noiryanarsch. Shin và đồng đội phải dấn thân vào chiến trường tại nước này, một quốc gia vừa là đồng minh tương tự Vương quốc Liên hiệp trong công cuộc chống Legion, vừa là thế lực bí ẩn mà ngay cả các lãnh đạo cấp cao của Liên bang cũng cho là cần cảnh giác.

“Không bắn nổi quân thù thì sao có thể làm quân nhân.”
Thương vong sau trận đối đầu Noctiluca là rất lớn. Theo mất nửa cánh tay. Nhiều đồng đội ngã xuống chiến trường ngoài khơi. Đội phó Brísingamen, Shana là một trong số đó. Shiden lập lời thề báo thù cho chiến hữu lâu năm. Trong khi đó, Crena rơi vào khủng hoảng vì mình chính là người nao núng khi hay tin Shin mất tích, không làm tiếp nhiệm vụ bắn tỉa được nữa, gián tiếp gây ra cái chết của Shana.

Trong bối cảnh ấy, tình hình chiến sự vẫn không cho phép các Tám Sáu ngơi nghỉ. Noctiluca đã lẩn trốn vào lãnh thổ Thánh quốc Noiryanarsch. Shin và đồng đội phải dấn thân vào chiến trường tại nước này, một quốc gia vừa là đồng minh tương tự Vương quốc Liên hiệp trong công cuộc chống Legion, vừa là thế lực bí ẩn mà ngay cả các lãnh đạo cấp cao của Liên bang cũng cho là cần cảnh giác.

`
}

const productAttributes = {
    "Thương hiệu": "Saigon Books",
    "SKU": "2250097582_VNAMZ-10823675321",
    "Thông tin cảnh báo": "Chất dễ cháy",
    "Xuất xứ": "Việt Nam",
    "Ngôn Ngữ": "Tiếng Việt",
    "Tác Giả": "Suối Thông",
    "Tên tổ chức chịu trách nhiệm hàng hóa": "Saigon Books",
    "Thông số kỹ thuật": "Bìa cứng",
    "ISBN ISSN": "8935278608110",
    "Gói Bảo Hành": "Bằng Hóa đơn mua hàng",
    "Thời gian bảo hành": "1 tháng"
};
export const DescriptionFeedback = (/*description */) => {
    const NUMBERLOADERS = 4;

    const [activeTab, setActiveTab] = useState('description');
    const swiperRef = useRef();
    const [adsProducts, setAdsProduct] = useState([])

    // Hàm xử lý sự kiện khi thay đổi trang của Swiper
    const handleSlideChange = () => {
        setActiveTab(prevTab => prevTab === 'description' ? 'comment' : 'description');
    };

    //Hàm Chuyển Slide Mô tả
    const handleDescriptionClick = () => {
        swiperRef.current.slidePrev();
        setActiveTab('description');
    };

    //Hàm Chuyển Slide Feedback
    const handleCommentClick = () => {
        swiperRef.current.slideNext();
        setActiveTab('comment');

    };


    //Render Mô Tả Chi Tiết Sản Phẩm
    const renderProductAttributes = (col) => {
        const attributes = [];
        const keys = Object.keys(productAttributes);
        const halfLength = Math.ceil(keys.length / 2);

        if (col === 1) {
            for (let i = 0; i < halfLength; i++) {
                const key = keys[i];
                const value = productAttributes[key];

                attributes.push(
                    <div className="flex flex-col gap-8" key={key}>
                        <div>
                            <div>{key}</div>
                            <div className="font-semibold">{value}</div>
                        </div>
                    </div>
                );
            }

            return attributes
        }

        for (let i = halfLength; i < keys.length; i++) {
            const key = keys[i];
            const value = productAttributes[key];

            attributes.push(
                <div className="flex flex-col gap-8" key={key}>
                    <div>
                        <div>{key}</div>
                        <div className="font-semibold">{value}</div>
                    </div>
                </div>
            );
        }

        return attributes;
    };

    //Fetch Shopping Carts
    useEffect(() => {
        const url = '../data/test/shoppingcarts.json';
        const loadShoppingCartsData = async () => {
            try {
                const shoppingCartsData = await fetchData(url);
                setAdsProduct(shoppingCartsData)
            } catch (error) {
                // throw error;
            }
        }
        //ví dụ tải các sản phẩm trong giỏ hàng của khách
        setTimeout(() => {
            loadShoppingCartsData()
        }, 1000)
    }, [])

    return (
        <div className=" w-full xl:px-28">
            {/* Navigation buttons */}
            <div className="flex gap-[0.1rem]">
                <div className="flex items-center justify-center gap-8 w-full xl:w-[79.75%] h-10 bg-gradient-to-r from-rose-100 to-slate-50">
                    <button
                        className={`text-red-500 text-base font-bold font-inter capitalize tracking-widest ${activeTab === 'description' ? 'border-b-2 border-red-500' : ''
                            }`}
                        onClick={handleDescriptionClick}
                    >
                        MÔ TẢ
                    </button>
                    <button
                        className={`text-red-500 text-base font-bold font-inter capitalize tracking-widest ${activeTab === 'comment' ? 'border-b-2 border-red-500' : ''
                            }`}
                        onClick={handleCommentClick}
                    >
                        ĐÁNH GIÁ
                    </button>
                </div>

                <div className="w-[20.25%] hidden xl:block">
                    <div className="flex items-center justify-center gap-8 w-full h-10 bg-gradient-to-r from-slate-50 to-rose-100">
                        <div className={`text-red-500 text-base font-bold font-inter capitalize tracking-widest`}>
                            {`Quảng Cáo Sản Phẩm (${adsProducts.length})`}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="xl:flex xl:gap-[0.1rem]">
                <div className="xl:w-[79.75%] bg-white">
                    <Swiper
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        slidesPerView={1}
                        centeredSlides={false}
                        slidesPerGroupSkip={1}
                        grabCursor={true}
                        keyboard={{
                            enabled: true,
                        }}
                        breakpoints={{
                            769: {
                                slidesPerView: 1,
                                slidesPerGroup: 1,
                            },
                        }}
                        scrollbar={true}
                        modules={[Keyboard, Scrollbar]}
                        className="mySwiper h-[70rem] xl:h-[80rem]" /*h-[52rem] xl:h-[32rem]*/
                        onSlideChange={handleSlideChange}
                    >
                        <SwiperSlide className="xl:p-6 overflow-y-auto scrollbar-thin p-6">
                            <div className="flex flex-col">
                                <div className="h-12 text-lg font-semibold">{`Mô Tả Sách ${product.title}`}</div>
                                <div className="flex gap-2 items-center text-sm font-normal text-gray-400 p-2 border border-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                                        <path fill="#2196f3" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M22 22h4v11h-4V22zM26.5 16.5c0 1.379-1.121 2.5-2.5 2.5s-2.5-1.121-2.5-2.5S22.621 14 24 14 26.5 15.121 26.5 16.5z"></path>
                                    </svg>
                                    <div>
                                        Đây là sản phẩm được bán bởi Nhà Bán Hàng bên thứ ba và việc xuất hóa đơn VAT (nếu áp dụng) sẽ được thực hiện bởi Nhà Bán Hàng theo quy định của pháp luật
                                    </div>
                                </div>
                                <div className="mt-2 overflow-y-auto max-h-full xl:scrollbar-thin xl:scrollbar-webkit  no-scrollbar" dangerouslySetInnerHTML={{ __html: convertTextToHtml(product.description) }} />
                                <hr />

                                <div className="flex flex-col">
                                    <div className="h-12 text-lg font-semibold">{`Đặt tính sách ${product.title}`}</div>
                                    <div className="flex">
                                        <div className="w-1/2 flex flex-col gap-8">
                                            {renderProductAttributes(1)}

                                        </div>
                                        <div className="w-1/2 flex flex-col gap-8">
                                            {renderProductAttributes(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="">
                            <div className="xl:p-6">
                                <div className="h-12 text-lg font-semibold m-4">{`Đánh Giá Và Nhận Xét Của Sách ${product.title}`}</div>
                                <FeedBack />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div> {/*bg-gray-50 */}
                <div className="xl:flex items-center hidden w-[20.25%] max-h-[80rem] overflow-y-auto bg-red-100 font-inter no-scrollbar">
                    <div className="w-full h-full bg-white">
                        {adsProducts.length === 0 ?
                            <ShoppingCartLoader items={NUMBERLOADERS * 3} />
                            :
                            adsProducts.map((product) => (
                                <div key={product.id} className="flex flex-col gap-2 items-center py-2 bg-gradient-to-t from-rose-100 to-white">
                                    <div className="flex flex-col">
                                        <img className="w-48 h-48 rounded-lg" src="https://picsum.photos/300/300" alt="" />
                                        <div className="flex flex-col justify-between">
                                            <div className="text-sm text-gray-600 font-semibold m-1 max-w-[10rem]">
                                                {product.name}
                                            </div>
                                            <div className="flex flex-col justify-end">
                                                <div className="flex justify-end items-end text-xs line-through text-red-400 font-bold tracking-wide">
                                                    <span className="">
                                                        {product.price}
                                                    </span>
                                                    <span className="underline">{product.currency}</span>
                                                </div>
                                                <div className="flex justify-end text-red-500 text-sm font-bold capitalize tracking-wide">
                                                    <span>
                                                        {product.price}
                                                    </span>
                                                    <span className="underline">
                                                        {product.currency}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>


        </div>
    );
}




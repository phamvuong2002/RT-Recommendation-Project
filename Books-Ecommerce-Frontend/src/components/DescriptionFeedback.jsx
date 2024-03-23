import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { convertTextToHtml } from '../utils/convertTextToHtml'
import { FeedBack } from './FeedBack';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

import { Keyboard, Scrollbar } from 'swiper/modules';

export const DescriptionFeedback = (/*description */) => {
    const description = `Nội dung:

    Thương vong sau trận đối đầu Noctiluca là rất lớn. Theo mất nửa cánh tay. Nhiều đồng đội ngã xuống chiến trường ngoài khơi. Đội phó Brísingamen, Shana là một trong số đó. Shiden lập lời thề báo thù cho chiến hữu lâu năm. Trong khi đó, Crena rơi vào khủng hoảng vì mình chính là người nao núng khi hay tin Shin mất tích, không làm tiếp nhiệm vụ bắn tỉa được nữa, gián tiếp gây ra cái chết của Shana.

    Trong bối cảnh ấy, tình hình chiến sự vẫn không cho phép các Tám Sáu ngơi nghỉ. Noctiluca đã lẩn trốn vào lãnh thổ Thánh quốc Noiryanarsch. Shin và đồng đội phải dấn thân vào chiến trường tại nước này, một quốc gia vừa là đồng minh tương tự Vương quốc Liên hiệp trong công cuộc chống Legion, vừa là thế lực bí ẩn mà ngay cả các lãnh đạo cấp cao của Liên bang cũng cho là cần cảnh giác.

    “Không bắn nổi quân thù thì sao có thể làm quân nhân.”`


    const [activeTab, setActiveTab] = useState('description');
    const swiperRef = useRef();

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

    return (
        <div className="w-full xl:px-28">
            {/* Navigation buttons */}
            <div className="flex items-center justify-center gap-8 w-full h-10 bg-gradient-to-r from-rose-100 to-slate-50">
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

            {/* Content */}
            <div className="px-8 bg-gray-50">  {/*bg-gray-50 */}

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
                    className="mySwiper h-[52rem] xl:h-[80rem]" /*h-[52rem] xl:h-[32rem]*/
                    onSlideChange={handleSlideChange}
                >
                    <SwiperSlide className="xl:p-14 ">
                        <div className="overflow-y-auto max-h-full xl:scrollbar-thin xl:scrollbar-webkit  no-scrollbar" dangerouslySetInnerHTML={{ __html: convertTextToHtml(description) }} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <FeedBack />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}




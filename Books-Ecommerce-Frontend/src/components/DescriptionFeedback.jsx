import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { convertTextToHtml } from '../utils/convertTextToHtml';
import { FeedBack } from './FeedBack';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

import { Keyboard, Scrollbar } from 'swiper/modules';
import { shortenString } from '../utils/shortenString';
import { cleanString } from '../utils/cleanString';

export const DescriptionFeedback = ({ book }) => {
  const NUMBERLOADERS = 4;
  const swiperRef = useRef();
  const scrollRef = useRef(null);

  const [product, setProduct] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [expanded, setExpanded] = useState(false);
  const [productAttributes, setProductAttributes] = useState('');

  // Hàm xử lý sự kiện khi thay đổi trang của Swiper
  const handleSlideChange = () => {
    setActiveTab((prevTab) =>
      prevTab === 'description' ? 'comment' : 'description',
    );
    scrollToTop();
  };

  //Hàm Chuyển Slide Mô tả
  const handleDescriptionClick = () => {
    swiperRef.current.slidePrev();
    setActiveTab('description');
    scrollToTop();
  };

  //Hàm Chuyển Slide Feedback
  const handleCommentClick = () => {
    swiperRef.current.slideNext();
    setActiveTab('comment');
    scrollToTop();
  };

  // Hàm xử lý sự kiện khi nhấn nút "Xem thêm"
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  //scroll về đầu
  const scrollToTop = () => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  //Render Mô Tả Chi Tiết Sản Phẩm
  const renderProductAttributes = (productAttributes, col) => {
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
          </div>,
        );
      }

      return attributes;
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
        </div>,
      );
    }

    return attributes;
  };

  //set product
  useEffect(() => {
    if (book) {
      setProduct(book);
      setProductAttributes({
        'Thương hiệu': cleanString(book.book_detail.book_pulisherName),
        'Thông tin cảnh báo': 'Chất dễ cháy',
        'Xuất xứ': 'Việt Nam',
        'Ngôn Ngữ': 'Tiếng Việt',
        'Thể Loại': cleanString(book.book_detail.book_categories_name),
        'Tác Giả': cleanString(book.book_detail.book_authors_name),
        'Nhà Cung Cấp': cleanString(book.book_detail.book_supplier),
        'Chất liệu': cleanString(book.book_detail.book_layout),
        'Thông số kỹ thuật': cleanString(book.book_detail.book_size),
        'Số Trang': cleanString(book.book_detail.book_num_pages),
        'Gói Bảo Hành': 'Bằng Hóa đơn mua hàng',
        'Thời gian bảo hành': '1 tháng',
      });
    }
  }, [book]);

  return (
    <div className="scroll-smooth" ref={scrollRef}>
      <div
        className={`w-full xl:px-28 ${expanded ? 'h-auto' : 'h-[22rem] xl:h-[36rem] overflow-hidden'} scroll-smooth`}
      >
        {/* Navigation buttons */}
        <div className="flex gap-[0.1rem] scroll-smooth">
          <div className="flex items-center justify-center gap-8 w-full  h-10 bg-gradient-to-r from-rose-100 to-slate-50">
            {' '}
            {/*xl:w-[79.75%] */}
            <button
              className={`text-red-500 text-base font-bold font-inter capitalize tracking-widest ${
                activeTab === 'description' ? 'border-b-2 border-red-500' : ''
              }`}
              onClick={handleDescriptionClick}
            >
              MÔ TẢ
            </button>
            <button
              className={`text-red-500 text-base font-bold font-inter capitalize tracking-widest ${
                activeTab === 'comment' ? 'border-b-2 border-red-500' : ''
              }`}
              onClick={handleCommentClick}
            >
              ĐÁNH GIÁ
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="xl:gap-[0.1rem]">
          {' '}
          {/*xl:flex */}
          <div className=" bg-white">
            {' '}
            {/*xl:w-[79.75%] */}
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
              <SwiperSlide className="xl:p-6 overflow-y-auto scrollbar-thin p-6 scroll-smooth">
                <div className="flex flex-col">
                  <div className="text-lg font-semibold mb-4">{`Mô Tả Sách ${shortenString(product?.book?.book_title, 55)}`}</div>
                  <div className="flex gap-2 xl:mt-4 items-start text-xs xl:text-sm font-normal text-gray-400 p-2 border border-gray-200">
                    <div className="w-16 xl:w-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100%"
                        height="100%"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#2196f3"
                          d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M22 22h4v11h-4V22zM26.5 16.5c0 1.379-1.121 2.5-2.5 2.5s-2.5-1.121-2.5-2.5S22.621 14 24 14 26.5 15.121 26.5 16.5z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      Đây là sản phẩm được bán bởi Nhà Bán Hàng bên thứ ba và
                      việc xuất hóa đơn VAT (nếu áp dụng) sẽ được thực hiện bởi
                      Nhà Bán Hàng theo quy định của pháp luật
                    </div>
                  </div>
                  <div
                    className="mt-4 mb-4 px-4 overflow-y-auto max-h-full xl:scrollbar-thin xl:scrollbar-webkit  no-scrollbar"
                    dangerouslySetInnerHTML={{
                      __html: convertTextToHtml(
                        product?.book_detail?.book_des || '',
                      ),
                    }}
                  />
                  {/* {product?.book_detail?.book_des} */}
                  <hr className="mb-4" />

                  <div className="flex flex-col gap-4">
                    <div className="h-12 text-lg font-semibold">{`Đặt tính sách ${product?.book?.book_title}`}</div>
                    <div className="flex gap-2 mt-6 xl:mt-4 ">
                      <div className="w-1/2 flex flex-col gap-4 xl:gap-8 ">
                        {renderProductAttributes(productAttributes, 1)}
                      </div>
                      <div className="w-1/2 flex flex-col gap-4 xl:gap-8">
                        {renderProductAttributes(productAttributes, 2)}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="">
                <div className="xl:p-6">
                  <div className="text-lg font-semibold m-4 mb-6 xl:mb-12">{`Đánh Giá Và Nhận Xét Của Sách ${shortenString(product?.book?.book_title, 55)}`}</div>
                  <FeedBack bookId={book?.book?.book_id} />
                </div>
              </SwiperSlide>
              {!expanded && (
                <div className="mt-[15rem] xl:mt-[29rem] flex items-end absolute z-10 inset-0 bg-gray-50 bg-opacity-50 h-[23] xl:h-[36rem]">
                  <div className="absolute inset-0 flex items-end bg-inherit h-[4.5rem]">
                    <button
                      onClick={handleExpand}
                      className="text-red-500 font-semibold bg-gradient-to-t from-red-100 to-gray-50 w-full shadow-lg bg-opacity-50 h-8 xl:hover:text-red-700"
                    >
                      Mở rộng
                    </button>
                  </div>
                </div>
              )}
            </Swiper>
            {expanded && (
              <button
                onClick={() => {handleExpand(); scrollToTop()}}
                className="text-red-500 font-semibold bg-gradient-to-t from-red-100 to-white w-full shadow-lg bg-opacity-50 h-8 xl:hover:text-red-700"
              >
                Thu gọn
              </button>
            )}
          </div>{' '}
        </div>
      </div>
    </div>
  );
};

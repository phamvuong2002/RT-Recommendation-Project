import React, { useContext, useEffect, useState } from 'react';
import { TextLoader } from './loaders/TextLoader';
import { calculateShippingFeeDefault } from '../utils/calculateShippingFeeDefault';
import { Popup } from './popup/Popup';
import { popupContent } from '../helpers/popupContent';
import { formatNumberToText } from '../utils/formatNumberToText';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../styles/star.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import { PopupCenterPanel } from './popup/PopupCenterPanel';
import { StarRating } from './StarRating';
import { fetchAPI } from '../helpers/fetch';
import { checkstatus, submitfeedback } from '../apis/feedback';
import { AppContext } from '../contexts/main';

export const SingleBill = ({ bill, billId, setReload }) => {
  const { userId, setIsLoading } = useContext(AppContext);
  const navigator = useNavigate();
  const [isOpenRatingPopup, setIsOpenRatingPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isFeedback, setIsFeedback] = useState(false);
  const [message, setMessage] = useState('');

  const BILLSTATUS = {
    PendingConfirmation: {
      name: 'Chờ xác nhận',
      bgColor: 'bg-blue-200',
      textColor: 'text-blue-500',
    },
    PendingDelivery: {
      name: 'Chờ giao hàng',
      bgColor: 'bg-blue-200',
      textColor: 'text-blue-500',
    },
    Delivered: {
      name: 'Đã giao',
      bgColor: 'bg-green-200',
      textColor: 'text-green-500',
    },
    Cancelled: {
      name: 'Đã huỷ',
      bgColor: 'bg-gray-200',
      textColor: 'text-gray-500',
    },
    Refunded: {
      name: 'Hoàn trả',
      bgColor: 'bg-red-200',
      textColor: 'text-red-500',
    },
  };

  //Remove Icon
  const removeIcon = (className) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    );
  };

  const handleDeleteBill = () => {
    //Xử lý xoá
    setReload(true);
    return 'success';
  };

  const handleSubmitFeedback = async () => {
    setMessage('');
    if (!userId) return;
    setIsLoading(true);
    const submit = await fetchAPI(`../${submitfeedback}`, 'POST', {
      userId,
      bookId: bill.bookId,
      rating,
      orderId: parseInt(billId),
      comment,
    });
    if (submit.status !== 200) {
      setIsLoading(false);
      setMessage(submit.message);
      return;
    } else {
      setIsLoading(false);
      setIsFeedback(true);
      setIsOpenRatingPopup(false);
    }
  };

  //Get feedback status
  useEffect(() => {
    const getStatus = async () => {
      if (!userId) return;
      const statusFeedback = await fetchAPI(`../${checkstatus}`, 'POST', {
        userId,
        bookId: bill.bookId,
        orderId: parseInt(billId),
      });

      if (statusFeedback.status !== 200) {
        return;
      } else {
        setIsFeedback(statusFeedback.metadata.isFeedback);
      }
    };
    getStatus();
  }, [bill, userId, billId]);

  return (
    <div>
      <PopupCenterPanel
        open={isOpenRatingPopup}
        setOpen={setIsOpenRatingPopup}
        titleClassName="text-base"
        title={`Đánh giá sản phẩm ${bill.name}`}
        content={
          <div className="mt-4 font-inter">
            {/* product */}
            <div>
              <Link
                to={`../books/${bill.bookId}`}
                className="flex border border-gray-200 py-2 rounded-lg cursor-pointer"
              >
                <div className="flex justify-center items-center w-1/3">
                  <img
                    className="h-[6rem]"
                    src={bill.imageSrc}
                    alt={bill.name}
                  />
                </div>
                <div className="flex items-start w-2/3 text-gray-500 text-sm">
                  <div className="flex flex-col justify-between">
                    <div>{bill.name}</div>
                    <div> Số lượng: {bill.quantity} </div>
                  </div>
                </div>
              </Link>
            </div>
            {/* rating */}
            <div className="flex flex-col items-center justify-center h-10 max-h-20 py-8 mt-6 mb-4">
              <div>Đáng giá của bạn về sản phẩm này? {}</div>
              <div className="star">
                <input
                  type="radio"
                  name="star"
                  id="r1"
                  onClick={() => setRating(5)}
                />
                <label htmlFor="r1"></label>
                <input
                  type="radio"
                  name="star"
                  id="r2"
                  onClick={() => setRating(4)}
                />
                <label htmlFor="r2"></label>
                <input
                  type="radio"
                  name="star"
                  id="r3"
                  onClick={() => setRating(3)}
                />
                <label htmlFor="r3"></label>
                <input
                  type="radio"
                  name="star"
                  id="r4"
                  onClick={() => setRating(2)}
                />
                <label htmlFor="r4"></label>
                <input
                  type="radio"
                  name="star"
                  id="r5"
                  onClick={() => setRating(1)}
                />
                <label htmlFor="r5"></label>
              </div>
            </div>
            {/* comment */}
            <div className="mb-4">
              <textarea
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="appearance-none border rounded w-full text-[0.9rem] font-popi py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
                id="comment"
                placeholder="Cho chúng tôi biết thêm về trải nghiệm của bạn?"
              ></textarea>
            </div>
            {/* message */}
            <div className="items-center px-4 text-sm text-red-500">
              {message}
            </div>
            <div className="flex items-center justify-end">
              <button
                className="h-10 px-4 rounded-lg text-sm text-white font-semibold font-inter bg-indigo-500 hover:bg-red-500"
                onClick={handleSubmitFeedback}
              >
                Gửi đánh giá
              </button>
            </div>
          </div>
        }
      />
      <Swiper
        key={bill.detailBillId}
        slidesPerView={'auto'}
        className="mySwiper swiper-backface-hidden"
      >
        <SwiperSlide>
          <div
            key={bill.billId}
            className="flex gap-2 xl:gap-4 border-b border-b-gray-200 py-4"
          >
            <Link to={`../books/${bill.bookId}`} className="flex">
              <div className="w-[6rem] flex items-start mt-1 ">
                <img
                  className="rounded-lg"
                  src={bill.imageSrc}
                  alt={bill.name}
                />
              </div>
            </Link>
            <div className="flex flex-col w-full gap-2 md:flex-row md:gap-9 md:w-full xl:flex-row xl:gap-8 xl:w-full">
              <div className="flex flex-col md:w-2/5 xl:w-[40%] gap-1">
                <Link
                  to={`../books/${bill.bookId}`}
                  className="text-base font-semibold"
                >
                  {bill.name}
                </Link>
                <div className="flex flex-col text-gray-500">
                  {/* <div>{`Phiên bản: ${bill.format}`}</div> */}
                  <div>{`Số lượng: ${bill.quantity}`}</div>
                </div>
                {/* <div className="text-xs text-gray-500 font-bold">
                                    <div className="w-fit bg-gray-300 px-1">
                                        {`Chỉ còn ${5} sản phẩm`}
                                    </div>
                                </div> */}
              </div>
              <div className="flex flex-col md:justify-between md:py-2 xl:w-[20%] xl:justify-between xl:py-2">
                <div className="flex flex-col gap-1 xl:gap-4 text-[0.6rem] xl:text-xs capitalize font-bold">
                  <div className="w-fit px-1 bg-blue-200 text-blue-600">
                    Ngày đặt {formatDate(bill.date)}
                  </div>
                  <div
                    className={`${BILLSTATUS[bill.status].bgColor + ' ' + BILLSTATUS[bill.status].textColor} w-fit px-1  text-blue-600`}
                  >
                    Trạng thái {BILLSTATUS[bill.status].name}
                  </div>
                </div>
              </div>
              <div className="flex font-semibold justify-between xl:flex-col xl:w-[20%] md:flex-col md:ml-4">
                <div className="flex items-center text-red-500 text-base xl:w-[8rem] xl:justify-end">
                  <div>{formatNumberToText(bill.price)}</div>
                  <div className="underline">đ</div>
                </div>
                <div
                  className="flex xl:justify-end items-center"
                  onClick={() =>
                    navigator(
                      `/payment?type=book&data=${bill.bookId}&quantity=${bill.quantity}`,
                    )
                  }
                >
                  <button className="w-20 h-10 bg-red-500 text-sm text-white">
                    Mua Lại
                  </button>
                </div>
              </div>
              <div
                className="flex justify-between xl:flex-col xl:justify-center xl:w-[20%] md:flex-col md:ml-4 cursor-pointer"
                onClick={() => setIsOpenRatingPopup(isFeedback ? false : true)}
              >
                <button
                  className={` ${isFeedback ? 'text-red-500' : 'text-blue-500'}  text-sm font-semibold xl:text-base xl:font-normal`}
                >
                  {isFeedback ? 'Đã Đánh giá' : 'Đánh giá'}
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="w-[20%] flex gap-2 py-4 h-full">
          <div className="flex flex-col items-center w-full h-full">
            <Popup
              icon={removeIcon('w-5 h-5 text-gray-500 xl:hover:text-red-500')}
              onYesClick={() => handleDeleteBill(bill.billId)}
              onNoClick={() => console.log('End')}
              Option={{ yes: 'Xoá', no: 'Thoát' }}
              Title={'Xóa khỏi giỏ hàng'}
              Content={popupContent(
                null,
                'Bạn có đồng ý loại bỏ đơn hàng này?',
              )}
              ErrorHandling={{
                title: 'Lỗi xoá Hoá Đơn',
                message: 'Không thể xoá hoá đơn này. Vui lòng thử lại sau!',
              }}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

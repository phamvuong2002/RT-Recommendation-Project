import React, { useContext, useEffect, useState } from 'react';
import { formatNumberToText } from '../utils/formatNumberToText';
import { AppContext } from '../contexts/main';
import { fetchAPI } from '../helpers/fetch';
import { checkstatus, submitfeedback } from '../apis/feedback';
import { Link } from 'react-router-dom';
import { PopupCenterPanel } from './popup/PopupCenterPanel';

export const SingleOrder = ({ order, orderId }) => {
  const { userId, setIsLoading } = useContext(AppContext);
  const [isOpenRatingPopup, setIsOpenRatingPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isFeedback, setIsFeedback] = useState(false);
  const [message, setMessage] = useState('');
  const [chooseBill, setChooseBill] = useState('');

  const handleSubmitFeedback = async () => {
    setMessage('');
    if (!userId) return;
    setIsLoading(true);
    const submit = await fetchAPI(`../${submitfeedback}`, 'POST', {
      userId,
      bookId: order.bookId,
      rating,
      orderId: parseInt(orderId),
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
        bookId: order.bookId,
        orderId: parseInt(orderId),
      });

      if (statusFeedback.status !== 200) {
        return;
      } else {
        setIsFeedback(statusFeedback.metadata.isFeedback);
      }
    };
    getStatus();
  }, [order, userId, orderId]);
  return (
    <div>
      <PopupCenterPanel
        open={isOpenRatingPopup}
        setOpen={setIsOpenRatingPopup}
        titleClassName="text-base"
        title={`Đánh giá sản phẩm ${chooseBill?.bookTitle}`}
        content={
          <div className="mt-4 font-inter">
            {/* product */}
            <div>
              <Link
                to={`../books/${chooseBill?.bookId}`}
                className="flex border border-gray-200 py-2 rounded-lg cursor-pointer"
              >
                <div className="flex justify-center items-center w-1/3">
                  <img
                    className="h-[6rem]"
                    src={chooseBill?.bookImg}
                    alt={chooseBill?.bookTitle}
                  />
                </div>
                <div className="flex items-start w-2/3 text-gray-500 text-sm">
                  <div className="flex flex-col justify-between">
                    <div>{chooseBill?.bookTitle}</div>
                    <div> Số lượng: {chooseBill.bookQuantity} </div>
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
      <div
        key={order?.bookId}
        className="flex flex-col xl:flex-row items-center py-6 border-b border-red-100 gap-6 w-full"
      >
        <div className="img-box max-lg:w-full">
          <img
            src={order?.bookImg}
            alt="Premium Watch image"
            className="aspect-square w-full xl:max-w-[140px]"
          />
        </div>
        <div className="flex flex-row items-center w-full ">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
            <div className="flex items-center">
              <div className="">
                <Link
                  to={`../books/${order?.bookId}`}
                  className="font-semibold text-lg leading-8 text-black mb-3"
                >
                  {order?.bookTitle}
                </Link>
                <p className="font-normal text-md leading-8 text-gray-500 mb-3 ">
                  Tác Giả: {order?.bookAuthor}
                </p>
                <div className="flex items-center ">
                  <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-red-100">
                    Phiên bản{' '}
                    <span className="text-gray-500">{order?.bookLayout}</span>
                  </p>
                  <p className="font-medium text-base leading-7 text-black ">
                    Số Lượng:{' '}
                    <span className="text-gray-500">{order?.bookQuantity}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 xl:pr-4">
              <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                <div className="flex gap-3 lg:block">
                  <p className="font-medium xl:text-base text-sm leading-7 text-black">
                    Giá
                  </p>
                  <p className="lg:mt-4 font-medium text-sm leading-7 text-red-500">
                    {formatNumberToText(order?.bookPrice)} đ
                  </p>
                </div>
              </div>
              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                <div className="flex gap-3 lg:block">
                  <p className="font-medium xl:text-base text-sm leading-7 text-black">
                    Trạng Thái
                  </p>
                  <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                    {order?.bookStatus}
                  </p>
                </div>
              </div>
              <div className="xl:col-span-1 flex items-center xl:justify-end max-lg:mt-3">
                <div className="flex xl:flex-col xl:justify-end justify-between gap-[11rem] xl:gap-2">
                  <div
                    onClick={() => {
                      setChooseBill(order);
                      setIsOpenRatingPopup(isFeedback ? false : true);
                    }}
                    className="flex items-end font-medium text-sm whitespace-nowrap leading-6 text-blue-500 hover:text-blue-800 cursor-pointer"
                  >
                    {isFeedback ? 'Đã Đánh giá' : 'Viết Đánh giá'}
                  </div>
                  <Link
                    to={`../payment?type=book&data=${order.bookId}&quantity=${order.bookQuantity}`}
                    className="flex justify-center items-center font-medium h-10 w-20 text-sm whitespace-nowrap leading-6 text-white hover:text-red-600 hover:bg-red-400 bg-red-500"
                  >
                    Mua Lại
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

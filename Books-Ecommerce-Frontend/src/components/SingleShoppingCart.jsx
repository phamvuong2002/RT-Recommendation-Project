import React, { useContext, useEffect, useState } from 'react';
import { formatNumberToText } from '../utils/formatNumberToText';
import { Popup } from './popup/Popup';
import { popupContent } from '../helpers/popupContent';
import { Link, useNavigate } from 'react-router-dom';
import { PopupCenterPanel } from './popup/PopupCenterPanel';
import { AppContext } from '../contexts/main';
import { fetchAPI } from '../helpers/fetch';
import { collectBehaviour } from '../apis/collectBehaviour';
import { handleFavoriteBook, getStatusFavoriteBook } from '../apis/book';

export const SingleShoppingCart = ({
  product,
  handleDeleteProduct,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}) => {
  const { userId } = useContext(AppContext);
  const navigate = useNavigate();
  const [openLovePopup, setOpenLovePopup] = useState(false);
  const [statusLovePopup, setStatusLovePopup] = useState('fail');
  const CLOSE_LOVE_POPUP = 1000;
  const [isClicked, setIsClicked] = useState(null);
  const [message, setMessage] = useState('');

  //Xử lý khách hàng yêu thích sản phẩm
  const handleAddToInterestList = async (e, bookId) => {
    e.preventDefault();
    if (!userId) return;

    const result = await fetchAPI(`../${handleFavoriteBook}`, 'POST', {
      userId: userId,
      book: {
        book_id: bookId,
      },
    });

    if (result.status !== 200) {
      setMessage('Có một số vấn đề. Vui lòng thử lại sau');
      return;
    }
    const isLoved = result.metadata.favoriteBookStatus;
    setIsClicked(isLoved);
    setStatusLovePopup('success');

    if (isLoved) {
      setMessage('Đã thêm vào danh sách yêu thích');
    } else {
      setMessage('Đã loại bỏ sách khỏi danh sách yêu thích');
    }
    setOpenLovePopup(true);

    if (isLoved) {
      //collect behavior add to cart
      const dataCollect = {
        topic: 'love',
        message: {
          userId,
          behaviour: 'love',
          productId: product.book.book_id,
        },
      };
      await fetchAPI(`../${collectBehaviour}`, 'POST', dataCollect);
    }
  };

  //Set status favorite book (from db) at 1st render
  useEffect(() => {
    const getStatusFavBook = async () => {
      if (!userId || !product) return;
      const result = await fetchAPI(`../${getStatusFavoriteBook}`, 'POST', {
        userId: userId,
        book: {
          book_id: product.book.book_id,
        },
      });
      if (result.status !== 200) return;

      setIsClicked(result.metadata.favoriteBookStatus);
    };

    getStatusFavBook();
  }, [product, userId]);

  const handleClickAddLoveProduct = async (productID) => {
    const result = 'success';
    if (result === 'success') {
      setOpenLovePopup(true);
      setStatusLovePopup('success');
    } else {
      setOpenLovePopup(true);
    }
  };

  const handleClickBook = async () => {
    const dataCollect = {
      topic: 'click',
      message: {
        userId,
        behaviour: 'click',
        productId: product.cb_book_id,
      },
    };
    const result = await fetchAPI(
      `../${collectBehaviour}`,
      'POST',
      dataCollect,
    );
    navigate(`../books/${product.cb_book_id}`);
  };

  return (
    <div className="p-2">
      {/* Cart Content*/}
      {/* border border-red-200*/}
      <div className="justify-between bg-white px-2 py-1 shadow-md shadow-red-100 sm:flex sm:justify-start font-inter">
        {/* Product Image */}
        <img
          loading="lazy"
          src={product.book.book_img}
          alt={product.book.book_title}
          className="w-full rounded-lg sm:w-40"
        />

        {/* Product Info  */}
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between xl:flex xl:gap-8">
          {/* base info */}
          <div className="flex flex-col xl:gap-2 mt-2 sm:mt-0">
            <div className="flex flex-col">
              <div
                // to={`../books/${product.cb_book_id}`}
                onClick={handleClickBook}
                className="w-full xl:h-12 max-h-20 text-base font-semibold text-gray-800 overflow-y-auto no-scrollbar xl:hover:text-red-500 cursor-pointer"
              >
                {product.book.book_title}
              </div>
              <div className="flex flex-col gap-1 mt-1 text-xs text-gray-600">
                <span>Tác giả: {product.book_detail.book_authors_name}</span>
                <span>
                  Nhà xuất bản: {product.book_detail.book_pulisherName}
                </span>
              </div>
            </div>
            <div>
              <p className="mt-1 text-xs text-gray-700">
                Phiên Bản: {product.book_detail.book_layout}
              </p>
              <p className="mt-1 xl:mt-0 text-[0.6rem] xl:text-[0.7rem] text-red-500">
                {product.book.inven_stock < 10
                  ? `Còn lại: ${product.book.inven_stock} sản phẩm`
                  : ''}
              </p>
            </div>
          </div>

          {/* Price infor */}
          <div className="flex justify-between im xl:space-y-4 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex flex-col gap-4 xl:gap-1">
              <div className="flex items-center justify-end border-red-100 pt-7 md:pt-0 xl:pt-0">
                <span
                  className="cursor-pointer rounded-l bg-red-500 py-1 px-3.5 duration-100 xl:hover:bg-red-400 xl:hover:text-red-200"
                  onClick={() =>
                    handleDecreaseQuantity(
                      product.cb_book_id,
                      product.cb_book_num,
                    )
                  }
                >
                  {' '}
                  -{' '}
                </span>
                <input
                  className="h-8 w-12 border border-y-red-500 bg-white text-xs outline-none text-center font-semibold"
                  type="number"
                  value={product.cb_book_num}
                  min="1"
                  id="quantity-input"
                  data-input-counter
                  aria-describedby="helper-text-explanation"
                  placeholder="Chọn số lượng cần mua"
                  required
                  readOnly
                />
                <span
                  className="cursor-pointer rounded-r bg-red-500 py-1 px-3 duration-100 xl:hover:bg-red-400 xl:hover:text-red-200"
                  onClick={() =>
                    handleIncreaseQuantity(
                      product.cb_book_id,
                      product.cb_book_num,
                    )
                  }
                >
                  {' '}
                  +
                </span>
              </div>
              {/* Desktop - Love - Remove button */}
              <div className="xl:flex md:flex md:gap-4 xl:gap-2 items-end justify-center hidden">
                <div className="flex">
                  <PopupCenterPanel
                    open={openLovePopup}
                    setOpen={setOpenLovePopup}
                    autoClose={CLOSE_LOVE_POPUP}
                    titleClassName={'hidden'}
                    icon={
                      <button
                        className="xl:h-8 xl:w-8 xl:flex xl:items-end"
                        onClick={(e) =>
                          handleAddToInterestList(e, product.cb_book_id)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-gray-500 cursor-pointer duration-150 xl:hover:fill-current xl:hover:text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      </button>
                    }
                    content={popupContent(
                      'text-gray-800 text-base text-center',
                      <div>
                        {statusLovePopup === 'success' ? (
                          <div className="flex flex-col gap-2 justify-center items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="120"
                              height="120"
                              viewBox="0 0 48 48"
                            >
                              <path
                                fill="#4caf50"
                                d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                              ></path>
                              <path
                                fill="#ccff90"
                                d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"
                              ></path>
                            </svg>
                            <div>
                              {message}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2 justify-center items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="120"
                              height="120"
                              viewBox="0 0 48 48"
                            >
                              <path
                                fill="#f44336"
                                d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                              ></path>
                              <path
                                fill="#fff"
                                d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
                              ></path>
                              <path
                                fill="#fff"
                                d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
                              ></path>
                            </svg>
                            <div>
                              Đã có một vài sự cố khi thêm sản phẩm vào danh
                              sách yêu thích. Vui long thử lại!
                            </div>
                          </div>
                        )}
                      </div>,
                    )}
                  />
                </div>

                <Popup
                  icon={
                    <div className="w-6 h-6 text-gray-500 xl:hover:text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                  }
                  onYesClick={() => handleDeleteProduct(product.cb_book_id)}
                  onNoClick={() => {
                    console.log('End');
                  }}
                  Option={{ yes: 'Xoá', no: 'Thoát' }}
                  Title={'Xóa khỏi giỏ hàng'}
                  Content={popupContent(
                    null,
                    'Bạn có đồng ý loại bỏ này khỏi giỏ hàng?',
                  )}
                  ErrorHandling={{
                    title: 'Lỗi xoá giỏ hàng',
                    message:
                      'Không thể xoá tất cả sản phẩm của Nhà Xuất Bản này khỏi giỏ hàng!',
                  }}
                />
              </div>
            </div>

            <div className="flex mt-2 items-center space-x-4 ">
              <div className="flex flex-col gap-2 justify-end items-end">
                <div className="flex items-end text-sm line-through text-red-400 font-medium tracking-wide">
                  <span className="">
                    {formatNumberToText(product.book.book_old_price)}
                  </span>
                  <span className="underline">{'đ'}</span>
                </div>
                <div className="ml-4 text-red-500 text-lg capitalize tracking-wide font-semibold">
                  <span>{formatNumberToText(product.book.book_spe_price)}</span>
                  <span className="underline">{'đ'}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile - Love - Remove button */}
          <div className="flex gap-6 items-center justify-center mt-4 xl:hidden md:hidden">
            <div>
              <button
                className="xl:h-8 xl:w-8 p-2"
                onClick={() => handleClickAddLoveProduct(product.cb_book_id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-500 cursor-pointer duration-150 xl:hover:fill-current xl:hover:text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
            </div>

            <Popup
              icon={
                <div className="w-6 h-6 text-gray-500 xl:hover:text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              }
              onYesClick={() => handleDeleteProduct(product.cb_book_id)}
              onNoClick={() => console.log('End')}
              Option={{ yes: 'Xoá', no: 'Thoát' }}
              Title={'Xóa khỏi giỏ hàng'}
              Content={popupContent(
                null,
                'Bạn có đồng ý loại bỏ sản phẩm này khỏi giỏ hàng?',
              )}
              ErrorHandling={{
                title: 'Lỗi xoá giỏ hàng',
                message:
                  'Không thể xoá tất cả sản phẩm của Nhà Xuất Bản này khỏi giỏ hàng!',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

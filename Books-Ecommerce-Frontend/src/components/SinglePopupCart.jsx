import React, { useContext } from 'react';
import { formatNumberToText } from '../utils/formatNumberToText';
import { Popup } from './popup/Popup';
import { popupContent } from '../helpers/popupContent';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/main';
import { collectBehaviour } from '../apis/collectBehaviour';
import { fetchAPI } from '../helpers/fetch';

export const SinglePopupCart = ({ product, handleDeleteProduct }) => {
  const { userId } = useContext(AppContext);
  const navigate = useNavigate();
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
    // navigate(`../books/${product.cb_book_id}`);
    // return;
  };

  return (
    <div key={product.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          loading="lazy"
          src={product.book.book_img}
          alt={product.book.book_title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-sm font-medium text-gray-900">
            <h3>
              <Link
                to={`../books/${product.cb_book_id}`}
                onClick={handleClickBook}
                className="hover:text-red-300 cursor-pointer"
              >
                {product.book.book_title}
              </Link>
            </h3>
            <div className="ml-4 text-red-500 capitalize tracking-wide">
              <span>{formatNumberToText(product.book.book_spe_price)}</span>
              <span className="underline">{'đ'}</span>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {product.book_detail.book_layout}
          </p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Số Lượng: {product.cb_book_num}</p>

          <div className="flex">
            <Popup
              icon={'Xoá'}
              onYesClick={() => handleDeleteProduct(product.cb_book_id)}
              Option={{ yes: 'Xoá', no: 'Thoát' }}
              Title={'Xóa khỏi giỏ hàng'}
              Content={popupContent(
                null,
                'Bạn có đồng ý loại bỏ sản phẩm này khỏi giỏ hàng?',
              )}
              ErrorHandling={{
                title: 'Lỗi xoá giỏ hàng',
                message: 'Không thể xoá sản phẩm này khỏi giỏ hàng!',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

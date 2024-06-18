import React, { useContext, useEffect, useState } from 'react';
import { formatNumberToText } from '../utils/formatNumberToText';
import { formatDate } from '../utils/formatDate';
import { Link } from 'react-router-dom';
import { SingleOrder } from './SingleOrder';
import { AppContext } from '../contexts/main';
import { updateorderstatus } from '../apis/checkout';
import { fetchAPI } from '../helpers/fetch';
import { collectBehaviour } from '../apis/collectBehaviour';

export const DetailOrder = ({ dataOrder, dataDetail, status, setReload}) => {
  const {
    userId,
    token,
    setIsLoading
  } = useContext(AppContext);

  const collectBehaviourFunction = async () => {
    // Collect behavior cancel-order
    if (dataDetail.length > 0 && userId) {
      dataDetail.map(async(order) => {
        const dataCollect = {
          topic: 'cancel-order',
          message: {
            userId,
            behaviour: 'cancel-order',
            productId: order?.bookId
          },
        }
        await fetchAPI(`../${collectBehaviour}`, 'POST', dataCollect);
      })
    }
  };

  //update order status
  const updateOrderStatus = async (status) => {
    if (!dataOrder?.order_id || !userId || !token) {
      return;
    }
    setIsLoading(true);
    const result = await fetchAPI(`../${updateorderstatus}`, 'POST', {
      orderId: parseInt(dataOrder?.order_id),
      status,
    });
    if (result.status !== 200) {
      // navigate('/notfound');
      // console.log('ERROR UPDATE ORDER :::::', result);
      setIsLoading(false);
      setReload(false);

    } else {
      setIsLoading(false);
      setReload(true);
      //collect behavior
      await collectBehaviourFunction()
      return;
    }
  };


  return (
    <div className="bg-white border border-red-100 font-inter">
      <section className="py-16 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          {!status ? (
            ''
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center">
              <div>
                {status === 'success' || status === 'pending' ? (
                  <img
                    className="w-[7rem] h-[7rem]"
                    src="data:image/png;base64,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"
                  ></img>
                ) : (
                  <img
                    className="w-[10rem] h-[8rem]"
                    src="/img/miss_payment.png"
                  ></img>
                )}
              </div>
              <h2 className="font-manrope font-bold text-4xl leading-10 text-red-500 text-center">
                {status === 'success' || status === 'pending'
                  ? `Đã ${dataOrder?.order_payment === 'cod'? 'Đặt hàng' : 'Thanh toán'} Thành Công`
                  : 'Thanh toán Thất bại. Vui lòng thử lại!'}
              </h2>
              <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
                Cảm ơn bạn đã mua hàng, bạn có thể kiểm tra chi tiết đơn hàng
                của bạn bên dưới
              </p>
            </div>
          )}
          <div className="main-box border border-red-100 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-red-100">
              <div className="data">
                <p className="font-semibold text-base leading-7 text-black">
                  Mã Đơn:{' '}
                  <span className="text-red-500 font-medium">
                    #{dataOrder?.order_id}
                  </span>
                </p>
                <p className="font-semibold text-base leading-7 text-black mt-4">
                  Ngày Đặt Hàng :{' '}
                  <span className="text-red-500 font-medium">
                    {' '}
                    {formatDate(dataOrder?.create_time, true)}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {status === 'success' ? (
                  <Link
                    to="../account/general-infomation"
                    className="flex justify-center rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-red-500 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-red-700 hover:shadow-red-400"
                  >
                    Theo Dõi Đơn Hàng
                  </Link>
                ) : (
                  ''
                )}
                <div className="flex items-center justify-center mt-4 xl:mt-0">
                  <p
                    className={`font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full ${dataOrder?.order_status === 'Cancelled' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'} `}
                  >
                    Trạng thái: {dataOrder?.order_status}
                  </p>
                </div>
              </div>
            </div>

            {/* Chi tiết Đơn Hàng */}
            <div className="w-full px-3 min-[400px]:px-6">
              {!dataDetail
                ? ''
                : dataDetail.map((order) => (
                    <SingleOrder
                      key={order?.bookId}
                      order={order}
                      orderId={dataOrder?.order_id}
                      status={status}
                    />
                  ))}
            </div>

            <div className="w-full border-t border-red-100 px-6 flex flex-col lg:flex-row items-center justify-between ">
              <div className={`flex flex-col sm:flex-row items-center max-lg:border-b border-red-100`}>
                <button onClick={() => updateOrderStatus('Cancelled')} className={`flex outline-0 py-6 sm:pr-6  sm:border-r border-red-100 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-red-200 bg-white transition-all duration-500 hover:text-red-500 ${dataOrder?.order_status === 'Cancelled'? 'hidden': ''}`}>
                  <svg
                    className="stroke-red-200 transition-all duration-500 group-hover:stroke-red-500 hidden xl:block"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                      stroke=""
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  Huỷ Đơn Hàng
                </button>
                <div>
                  {dataOrder?.order_payment === 'cod' ? (
                    <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                      Thanh Toán Khi Nhận Hàng{' '}
                      <span className="text-gray-500">(COD)</span>
                    </p>
                  ) : (
                    <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                      Đã thanh toán trực tuyến tới ví{' '}
                      <span className="text-red-500">
                        {dataOrder?.order_payment ? 'Paypal' : 'VNPay'}
                      </span>
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-6 py-6 text-end w-[20rem]">
                  <div className="flex flex-col gap-1">
                    {dataOrder?.order_discount_amount ? (
                      <div className="flex justify-between ">
                        <p>Giảm giá</p>
                        <p className="font-semibold text-md text-gray-500">
                          -{' '}
                          <span>
                            {formatNumberToText(
                              dataOrder?.order_discount_amount,
                            )}
                          </span>
                        </p>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className="flex justify-between ">
                      <p>Phí vận chuyển</p>
                      <p className="font-semibold text-md text-gray-500">
                        <span>
                          {formatNumberToText(dataOrder?.order_fee_shiping)}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-between ">
                      <p>Phí dịch vụ</p>
                      <p className="font-semibold text-md text-gray-500">
                        <span>
                          {formatNumberToText(dataOrder?.order_fee_service)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center xl:gap-2">
                    <p className="font-semibold text-lg text-black">
                      Tổng Giá:
                    </p>
                    <p className=" font-semibold text-xl text-gray-500">
                      <span className="text-red-500">
                        {formatNumberToText(dataOrder?.order_spe_total)} đ
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

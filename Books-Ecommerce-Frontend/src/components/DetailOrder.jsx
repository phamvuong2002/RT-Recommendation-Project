import React from 'react';
import { formatNumberToText } from '../utils/formatNumberToText';

export const DetailOrder = ({
  orderId,
  userId,
  orderDate,
  paymentStatus = '0',
  paymentMethod = 'cod',
  discountAmount = 0,
  feeShiping = 0,
  feeService = 0,
}) => {
  return (
    <div className="bg-white border border-red-100 font-inter">
      <section className="py-16 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <div className="flex flex-col gap-2 items-center justify-center">
            <div>
              <img
                className="w-[7rem] h-[7rem]"
                src="data:image/png;base64,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"
              ></img>
              {/* <img
                className="w-[7rem] h-[7rem]"
                src="data:image/png;base64,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"
              ></img> */}
            </div>
            <h2 className="font-manrope font-bold text-4xl leading-10 text-red-500 text-center">
              Payment Successful
            </h2>
            <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
              Cảm ơn bạn đã mua hàng, bạn có thể kiểm tra chi tiết đơn hàng của
              bạn bên dưới
            </p>
          </div>
          <div className="main-box border border-red-100 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-red-100">
              <div className="data">
                <p className="font-semibold text-base leading-7 text-black">
                  Mã Đơn:{' '}
                  <span className="text-red-500 font-medium">#10234987</span>
                </p>
                <p className="font-semibold text-base leading-7 text-black mt-4">
                  Ngày Đặt Hàng :{' '}
                  <span className="text-red-400 font-medium"> {orderDate}</span>
                </p>
              </div>
              <button className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-red-500 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-red-700 hover:shadow-red-400">
                Theo Dõi Đơn Hàng
              </button>
            </div>

            {/* Chi tiết Đơn Hàng */}

            {/* <div className="w-full px-3 min-[400px]:px-6">
              <div className="flex flex-col lg:flex-row items-center py-6 border-b border-red-100 gap-6 w-full">
                <div className="img-box max-lg:w-full">
                  <img
                    src="https://pagedone.io/asset/uploads/1701167607.png"
                    alt="Premium Watch image"
                    className="aspect-square w-full lg:max-w-[140px]"
                  />
                </div>
                <div className="flex flex-row items-center w-full ">
                  <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                    <div className="flex items-center">
                      <div className="">
                        <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                          Premium Quality Dust Watch
                        </h2>
                        <p className="font-normal text-md leading-8 text-gray-500 mb-3 ">
                          Tác Giả: Dust Studios
                        </p>
                        <div className="flex items-center ">
                          <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-red-100">
                            Phiên bản{' '}
                            <span className="text-gray-500">Bìa Cứng</span>
                          </p>
                          <p className="font-medium text-base leading-7 text-black ">
                            Số Lượng: <span className="text-gray-500">2</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-5">
                      <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                        <div className="flex gap-3 lg:block">
                          <p className="font-medium text-sm leading-7 text-black">
                            Giá
                          </p>
                          <p className="lg:mt-4 font-medium text-sm leading-7 text-red-500">
                            $100
                          </p>
                        </div>
                      </div>
                      <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                        <div className="flex gap-3 lg:block">
                          <p className="font-medium text-sm leading-7 text-black">
                            Trạng Thái
                          </p>
                          <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                            Ready for Delivery
                          </p>
                        </div>
                      </div>
                      <div className="xl:col-span-5 flex items-center xl:justify-end max-lg:mt-3">
                        <div className="flex xl:flex-col xl:justify-end justify-between gap-[11rem]">
                          <p className="flex items-end font-medium text-sm whitespace-nowrap leading-6 text-blue-500 hover:text-blue-800 cursor-pointer">
                            Viết Đánh Giá
                          </p>
                          <button className="font-medium h-10 w-20 text-sm whitespace-nowrap leading-6 text-white hover:text-red-600 hover:bg-red-400 bg-red-500">
                            Mua Lại
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="w-full border-t border-red-100 px-6 flex flex-col lg:flex-row items-center justify-between ">
              <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-red-100">
                <button className="flex outline-0 py-6 sm:pr-6  sm:border-r border-red-100 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-red-200 bg-white transition-all duration-500 hover:text-red-500">
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
                  {paymentMethod === 'cod' ? (
                    <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                      Thanh Toán Khi Nhận Hàng{' '}
                      <span className="text-gray-500">(COD)</span>
                    </p>
                  ) : (
                    <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                      Đã thanh toán trực tuyến tới ví{' '}
                      <span className="text-red-500">
                        {paymentMethod ? 'Paypal' : 'VNPay'}
                      </span>
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-6 py-6 text-end w-[20rem]">
                  <div className="flex flex-col gap-1">
                    {discountAmount ? (
                      <div className="flex justify-between ">
                        <p>Giảm giá</p>
                        <p className="font-semibold text-md text-gray-500">
                          - <span>{formatNumberToText(discountAmount)}</span>
                        </p>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className="flex justify-between ">
                      <p>Phí vận chuyển</p>
                      <p className="font-semibold text-md text-gray-500">
                        <span>{formatNumberToText(feeShiping)}</span>
                      </p>
                    </div>
                    <div className="flex justify-between ">
                      <p>Phí dịch vụ</p>
                      <p className="font-semibold text-md text-gray-500">
                        <span>{formatNumberToText(feeService)}</span>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center xl:gap-2">
                    <p className="font-semibold text-lg text-black">
                      Tổng Giá:
                    </p>
                    <p className=" font-semibold text-xl text-gray-500">
                      <span className="text-red-500">200.00</span>
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

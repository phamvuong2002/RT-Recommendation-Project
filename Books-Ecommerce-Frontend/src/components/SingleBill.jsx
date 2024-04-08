import React from 'react'
import { TextLoader } from './loaders/TextLoader';
import { calculateShippingFeeDefault } from '../utils/calculateShippingFeeDefault';
import { Popup } from './popup/Popup';
import { popupContent } from '../helpers/popupContent';
import { formatNumberToText } from '../utils/formatNumberToText';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';

export const SingleBill = ({ bill, setReload }) => {

    const BILLSTATUS = {
        "PendingConfirmation": { name: "Chờ xác nhận", bgColor: "bg-blue-200", textColor: "text-blue-500" },
        "PendingDelivery": { name: "Chờ giao hàng", bgColor: "bg-blue-200", textColor: "text-blue-500" },
        "Delivered": { name: "Đã giao", bgColor: "bg-green-200", textColor: "text-green-500" },
        "Cancelled": { name: "Đã huỷ", bgColor: "bg-gray-200", textColor: "text-gray-500" },
        "Refunded": { name: "Hoàn trả", bgColor: "bg-red-200", textColor: "text-red-500" }
    }

    //Remove Icon
    const removeIcon = (className) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        );
    }
    const handleDeleteBill = () => {
        //Xử lý xoá
        setReload(true);
        return "success"
    }

    return (
        <div>
            <Swiper
                key={bill.detailBillId}
                slidesPerView={'auto'}
                className="mySwiper swiper-backface-hidden"
            >
                <SwiperSlide>
                    <div key={bill.billId} className="flex gap-2 xl:gap-4 border-b border-b-gray-200 py-4">
                        <div className="flex">
                            <div className="w-[6rem] flex items-start mt-1 ">
                                <img className="rounded-lg" src={bill.imageSrc} alt={bill.name} />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2 md:flex-row md:gap-9 md:w-full xl:flex-row xl:gap-8 xl:w-full">
                            <div className="flex flex-col md:w-2/5 xl:w-[40%] gap-1">
                                <div className="text-base font-semibold">
                                    {bill.name}
                                </div>
                                <div className="flex flex-col text-gray-500">
                                    <div>{`Phiên bản: ${bill.format}`}</div>
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
                                        Ngày đặt {bill.date}
                                    </div>
                                    <div className={`${BILLSTATUS[bill.status].bgColor + ' ' + BILLSTATUS[bill.status].textColor} w-fit px-1  text-blue-600`}>
                                        Trạng thái {BILLSTATUS[bill.status].name}
                                    </div>
                                </div>
                            </div>
                            <div className="flex font-semibold justify-between xl:flex-col xl:w-[20%] md:flex-col md:ml-4">
                                <div className="flex items-center text-red-500 text-base xl:w-[8rem] xl:justify-end">
                                    <div>{formatNumberToText(bill.price)}</div>
                                    <div className="underline">đ</div>
                                </div>
                                <Link to={`../books/${bill.bookId}`} className="flex xl:justify-end">
                                    <button className="w-20 h-10 bg-red-500 text-sm text-white">Mua Lại</button>
                                </Link>
                            </div>
                            <div className="flex justify-between xl:flex-col xl:justify-center xl:w-[20%] md:flex-col md:ml-4">
                                <button className="text-blue-500 text-sm font-semibold xl:text-base xl:font-normal">Quản Lý</button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="w-[20%] flex gap-2 py-4 h-full">
                    <div className="flex flex-col items-center w-full h-full">
                        <Popup
                            icon={removeIcon("w-5 h-5 text-gray-500 xl:hover:text-red-500")}
                            onYesClick={() =>
                                handleDeleteBill(bill.billId)}
                            onNoClick={() => console.log("End")}
                            Option={{ yes: "Xoá", no: "Thoát" }}
                            Title={"Xóa khỏi giỏ hàng"}
                            Content={popupContent(null, "Bạn có đồng ý loại bỏ đơn hàng này?")}
                            ErrorHandling={{ title: "Lỗi xoá Hoá Đơn", message: "Không thể xoá hoá đơn này. Vui lòng thử lại sau!" }}
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div >
    )
}

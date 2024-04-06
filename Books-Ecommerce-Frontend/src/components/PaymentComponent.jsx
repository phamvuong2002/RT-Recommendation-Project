import React, { useEffect, useRef, useState } from 'react'
import { formatNumberToText } from '../utils/formatNumberToText'
import { fetchData } from '../helpers/fetch';
import { ShoppingCartLoader } from './loaders/ShoppingCartLoader';
import { Popup } from './popup/Popup';
import { popupContent } from '../helpers/popupContent';
import { calculateTotalPrice } from '../utils/calculateTotalPrice';
import { maskPhone } from '../utils/hideSensitiveInfo';
import { isMobileDevice } from '../utils/isMobileDevice';
import { checkCouponCode } from '../utils/checkCouponCode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SelectAddressPopup } from '../helpers/SelectAddressPopup';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import { TextLoader } from './loaders/TextLoader';
import { calculateShippingFeeDefault } from '../utils/calculateShippingFeeDefault';


const SAMPLEPAYMENTMETHODS = [
    {
        paymentMethodId: '1',
        paymentMethodName: 'VNPay',
        paymentMethodImage: 'https://i.gyazo.com/cd4ad37ac9f9ae75473542526f69e79e.png',
        paymentMethodDescription: 'Ví VNpay',
        paymentAccount: "0948908485"
    },
    {
        paymentMethodId: '2',
        paymentMethodName: 'Paypal',
        paymentMethodImage: 'https://i.ibb.co/r68ZFGK/Paypal-2014-logo.png',
        paymentMethodDescription: 'Liên kết tài khoản Paypal',
        paymentAccount: "0948908485"
    },
    {
        paymentMethodId: '3',
        paymentMethodName: 'Momo',
        paymentMethodImage: 'https://i.ibb.co/KsmVJ5T/Mo-Mo-Logo.png',
        paymentMethodDescription: 'Ví MoMo',
        paymentAccount: "0948908485"
    },
]

const SAMPLECOUPONCODE = [
    {
        couponCodeId: '1',
        couponCode: 'A123',
        discount_percent: 0.3,
        discount_price: 50000,
        max_discount: 100000,
        min_condition: 200000,
        expiredDate: '10/10/2024',
        isAvailable: true,
        currency: 'đ',
    },
    {
        couponCodeId: '2',
        couponCode: 'A456',
        discount_percent: 0.3,
        discount_price: 50000,
        max_discount: 100000,
        min_condition: 200000,
        expiredDate: '10/10/2024',
        isAvailable: false,
        currency: 'đ',
    },
]

export const Payment = () => {
    // const swiperRef = useRef();
    const paymentMethodsContainerRef = useRef(null);
    const shippingMethodsContainerRef = useRef(null);

    const [isAddrPopupOpen, setIsAddrPopupOpen] = useState(false)

    const NUMLOADER = 4;
    const [paymentID, setPaymentID] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);

    const [products, setProducts] = useState([]);

    const [serviceID, setServiceID] = useState('');
    const [shippingFee, setShippingFee] = useState(0);
    const [shippingMethods, setShippingMethods] = useState([]);

    const [couponCode, setCouponCode] = useState('');
    const [couponCodeStatus, setCouponCodeStatus] = useState('');
    const [couponDiscount, setCouponDiscount] = useState({ final_discount: 0, currency: 'đ' });

    const [userAddresses, setUserAddresses] = useState([]);
    const [defaultAddress, setDefaultAddress] = useState({ addressid: 0 });


    //Remove Icon
    const removeIcon = (className) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        );
    }

    // Xử lý sự kiện chọn dịch vụ vận chuyển
    const choiceService = (serviceID) => {

        if (isMobileDevice()) {
            const updatedShippingMethods = shippingMethods.map(service => {
                if (service.serviceid === serviceID) {
                    return { ...service, selected: true }; // Đánh dấu phương thức được chọn
                } else {
                    return { ...service, selected: false }; // Đánh dấu các phương thức không được chọn
                }
            }).sort((a, b) => {
                if (a.selected) return -1; // Phương thức được chọn đưa lên đầu mảng
                if (b.selected) return 1;
                return 0;
            });

            // Cập nhật lại danh sách phương thức vận chuyển
            setShippingMethods(updatedShippingMethods);
            shippingMethodsContainerRef.current.scrollLeft = 0;
        }

        setServiceID(serviceID);
        setShippingFee(getFeeByServiceId(serviceID));
    }

    const getFeeByServiceId = (serviceId) => {
        const service = shippingMethods.find(s => s.serviceid === serviceId);
        return service ? service.fee : 0;
    }

    //Xử lý sự kiện chọn phương thức thanh toán
    const choicePayment = (paymentMethodId, isMobile = false) => {
        // Xử lý lưu trữ phương thức thanh toán được chọn ở đây
        // Sau đó, cập nhật lại danh sách phương thức thanh toán để đưa phương thức được chọn lên đầu mảng
        if (isMobile) {
            const updatedPaymentMethods = SAMPLEPAYMENTMETHODS.map(payment => {
                if (payment.paymentMethodId === paymentMethodId) {
                    return { ...payment, selected: true }; // Đánh dấu phương thức được chọn
                } else {
                    return { ...payment, selected: false }; // Đánh dấu các phương thức không được chọn
                }
            }).sort((a, b) => {
                if (a.selected) return -1; // Phương thức được chọn đưa lên đầu mảng
                if (b.selected) return 1;
                return 0;
            });
            // Cập nhật lại danh sách phương thức thanh toán
            setPaymentMethods(updatedPaymentMethods);
            paymentMethodsContainerRef.current.scrollLeft = 0;
        }
        setPaymentID(paymentMethodId);
    }

    // const choicePayment = async (paymentID) => {
    //     setPaymentID(paymentID);
    // }


    // Xử lý sự kiện khi nhấn nút "Xoá"
    const handleDeleteProduct = async (productId) => {
        //ví dụ gửi yêu cầu xoá sản phẩm xuống backend
        //sau đó update products
        const url = '../data/test/shoppingcarts.json';
        try {
            const shoppingCartsData = await fetchData(url);
            const updatedProducts = [...shoppingCartsData];
            const filteredProducts = updatedProducts.filter(product => product.id !== productId);
            setProducts(filteredProducts);
            return 'success';
        } catch (error) {
            console.error('Error:', error);
            return 'failed';
        }
    }

    //Xử lý sự kiện nhập Coupon
    // Xử lý sự kiện khi thay đổi nội dung của input
    const handleCouponChange = (event) => {
        setCouponCode(event.target.value);
        setCouponCodeStatus(null);
        setCouponDiscount({ final_discount: 0 });
    };

    // Xử lý sự kiện khi nhấn vào apply coupon code button
    const handleApplyCouponCode = async (event) => {
        event.preventDefault();
        const result = checkCouponCode(couponCode, SAMPLECOUPONCODE, calculateTotalPrice(products));
        if (result.valid) {
            setCouponDiscount({ final_discount: result.final_discount, currency: result.currency })
            setCouponCodeStatus('')
        }
        else {
            setCouponCodeStatus(result.message);
            setCouponDiscount({ final_discount: 0, currency: 'đ' })
        }
    };

    // Xử lý sự kiện click chỉnh sửa địa chỉ
    //Load địa chỉ khi mở popup
    const handleAddressChange = async (e) => {
        e.preventDefault();

        const url = '../data/test/useraddresses.json';
        try {
            const addressData = await fetchData(url);
            setUserAddresses(addressData)
        } catch (error) {
            // throw error;
        }
    }

    //Fetch Shopping Carts
    useEffect(() => {
        const url = '../data/test/shoppingcarts.json';
        const loadShoppingCartsData = async () => {
            try {
                const shoppingCartsData = await fetchData(url);
                setProducts(shoppingCartsData)
            } catch (error) {
                // throw error;
            }
        }
        //ví dụ tải các sản phẩm trong giỏ hàng của khách
        setTimeout(() => {
            loadShoppingCartsData()
        }, 1000)
    }, [])

    //Fetch Payment medthods
    useEffect(() => {
        setTimeout(() => {
            setPaymentMethods(SAMPLEPAYMENTMETHODS);
        }, 1000)
    }, [])

    //Fetch Shipping methods
    useEffect(() => {
        setShippingMethods([])
        const loadServices = async () => {
            try {
                const services = await calculateShippingFeeDefault(defaultAddress, products[0])
                setShippingMethods(services);
            } catch (error) {
                // throw error;
            }
        }

        if (defaultAddress.addressid !== 0) {
            loadServices()
        }
    }, [defaultAddress])

    //Set service default
    useEffect(() => {
        if (shippingMethods.length > 0) {
            setServiceID(shippingMethods[0].serviceid);
            setShippingFee(getFeeByServiceId(serviceID));
        }
    }, [shippingMethods])

    //Fetch User Address Default
    useEffect(() => {
        const url = '../data/test/useraddresses.json';
        const loadShoppingAddress = async () => {
            try {
                const addressData = await fetchData(url);
                setDefaultAddress(addressData[0])
            } catch (error) {
                // throw error;
            }
        }
        //ví dụ tải các sản phẩm trong giỏ hàng của khách
        setTimeout(() => {
            loadShoppingAddress()
        }, 1000)
    }, [])

    //Xử lý sau khi thêm Địa chỉ mới
    useEffect(() => {
        console.log("userAddresses::", userAddresses)
    }, [userAddresses])

    return (
        <div className="xl:flex xl:gap-2">
            {/* Preview*/}
            <div className="xl:w-2/3 flex flex-col gap-1 xl:gap-2">
                {/* Address preview*/}
                <div className={`w-full flex flex-col item-center text-sm font-inter border-red-100 bg-white shadow-md shadow-red-200 ${defaultAddress.addressid === 0 ? 'animate-pulse' : ''}`}>
                    {/* header */}
                    <div className="flex justify-between items-center px-2 h-10 bg-red-100">
                        <div className="font-semibold">Địa chỉ giao hàng</div>
                        <SelectAddressPopup
                            isAddrPopupOpen={isAddrPopupOpen}
                            setIsAddrPopupOpen={setIsAddrPopupOpen}
                            defaultAddress={defaultAddress}
                            setDefaultAddress={setDefaultAddress}
                            userAddresses={userAddresses}
                            setUserAddresses={setUserAddresses}
                            icon={
                                <button className="text-red-400 xl:hover:text-red-600" onClick={handleAddressChange}>
                                    Chỉnh sửa
                                </button>
                            }
                        />


                    </div>
                    {/* details */}
                    <div className="flex flex-col p-2 bg-white gap-2">
                        <div className="flex items-center">
                            <div className={`w-2/5 xl:w-1/5 ${defaultAddress.addressid === 0 ? 'h-2 bg-slate-200 rounded col-span-2' : ''}`}>
                                {defaultAddress.userFullName}

                            </div>
                            <div className={`w-full ${defaultAddress.addressid === 0 ? 'h-2 bg-slate-200 rounded col-span-2' : ''}`}>
                                {defaultAddress.userPhone}
                            </div>
                        </div>
                        <div className={`flex items-center ${defaultAddress.addressid === 0 ? 'h-2 bg-slate-200 rounded col-span-2' : ''}`}>
                            <div className={`flex w-2/5 xl:w-1/5 items-center`}>
                                {
                                    defaultAddress.addressid === 0 ? '' : (defaultAddress.isHome ?
                                        <div className="px-2 xl:px-3 py-[0.1rem] xl:pt-[0.2rem] text-[0.5rem] xl:text-[0.6rem] xl:text-xs text-white uppercase font-semibold bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl">
                                            Nhà riêng
                                        </div>
                                        :
                                        <div className="px-2 xl:px-3 py-[0.1rem] xl:pt-[0.2rem] text-[0.5rem] xl:text-[0.6rem] xl:text-xs text-white uppercase font-semibold bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl">
                                            Văn phòng
                                        </div>)
                                }
                            </div>
                            <div className={`w-full ${defaultAddress.addressid === 0 ? 'h-2 bg-slate-200 rounded col-span-2 hidden' : ''}`}>
                                {`${defaultAddress?.addressDetail}, ${defaultAddress?.wardName}, ${defaultAddress?.distristName}, ${defaultAddress?.proviceName}`}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products preview*/}
                <div className="w-full flex flex-col font-inter text-sm border-red-100 bg-white shadow-md shadow-red-200">
                    {/* header */}
                    <div className="flex justify-between items-center px-2 h-10 bg-red-100">
                        <div className="font-semibold">{`Xem lại gói hàng (${products.length} sản phẩm)`}</div>
                        <div className="flex gap-1 text-xs ">
                            <span className="text-gray-500">
                                Được giao bởi
                            </span>
                            <button className="font-semibold xl:hover:text-red-500 transition-all">
                                GHN
                            </button>
                        </div>
                    </div>
                    {/* details */}
                    <div className="flex flex-col px-2">

                        {/* shipping method */}
                        <div className="flex flex-col gap-2">
                            <div className="text-xs xl:p-2 py-1"> Hình thức giao hàng </div>
                            {shippingMethods.length === 0 ? <TextLoader items={1} /> :
                                <div ref={shippingMethodsContainerRef} className="flex gap-1 overflow-x-auto xl:grid xl:grid-cols-3 xl:gap-2 pb-1 scroll-smooth no-scrollbar">
                                    {
                                        shippingMethods.map(service => (
                                            <div
                                                key={service.serviceid}
                                                className={`flex-shrink-0 w-[14rem] xl:w-[17rem] flex gap-2 border rounded-lg p-2 xl:cursor-pointer ${serviceID === service.serviceid ? 'border-red-500' : 'border-gray-300'}`}
                                                onClick={() => choiceService(service.serviceid)} >
                                                <div className="w-8 flex mb-12">
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 accent-red-500"
                                                        checked={service.serviceid === serviceID}
                                                        readOnly />
                                                </div>
                                                <div className="w-full">
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex font-medium">
                                                            <div>{formatNumberToText(service.fee)}</div>
                                                            <span className="underline">đ</span>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs whitespace-nowrap overflow-x-auto max-w-[10.5rem] xl:max-w-[12rem] no-scrollbar">{service.type}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs">Nhận vào: {service.date}</div>
                                                </div>
                                            </div>
                                        ))}
                                </div>}
                        </div>

                        {/* product */}
                        {
                            products.length === 0 ?
                                <ShoppingCartLoader items={NUMLOADER} />
                                :

                                <div className="flex flex-col xl:block gap-4 p-2 mt-1 xl:max-h-[40rem] xl:overflow-y-auto scrollbar-thin">
                                    {products.map((product) => (
                                        <div key={product.id}>
                                            <Swiper
                                                // onSwiper={(swiper) => {
                                                //     swiperRef.current = swiper;
                                                // }}
                                                key={product.id}
                                                slidesPerView={'auto'}
                                                className="mySwiper swiper-backface-hidden"
                                            >
                                                <SwiperSlide>
                                                    <div key={product.id} className="flex gap-2 border-b border-b-gray-200 py-4">
                                                        <div className="flex">
                                                            <div className="w-[6rem] flex items-start mt-1 ">
                                                                <img className="rounded-lg" src={product.imageSrc} alt={product.name} />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col w-full gap-2 md:flex-row md:gap-9 md:w-full xl:flex-row xl:gap-4 xl:w-full">
                                                            <div className="flex flex-col md:w-2/5 xl:w-2/5 gap-1">
                                                                <div className="text-base font-semibold">
                                                                    {product.name}
                                                                </div>
                                                                <div className="flex flex-col text-gray-500">
                                                                    <div>{`Phiên bản: ${product.format}`}</div>
                                                                    <div>{`Nhà xuất bản: ${product.publisher}`}</div>
                                                                    <div>{`Tác giả: ${product.author}`}</div>
                                                                </div>
                                                                <div className="text-xs text-gray-500 font-bold">
                                                                    <div className="w-fit bg-gray-300 px-1">
                                                                        {`Chỉ còn ${5} sản phẩm`}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col md:justify-between md:py-2 xl:justify-between xl:py-2">
                                                                <div className="flex flex-col gap-1 text-[0.6rem] capitalize font-bold">
                                                                    <div className="w-fit px-1 bg-blue-200 text-blue-600">
                                                                        {`30 ngày trả hàng miễn phí`}
                                                                    </div>
                                                                    <div className="w-fit px-1 bg-blue-200 text-blue-600">
                                                                        {`12 tháng bằng phiếu bảo hành và hoá đơn`}
                                                                    </div>
                                                                </div>
                                                                {/* Remove product Desktop */}
                                                                {/* <div className="hidden md:flex xl:flex items-center justify-center">
                                                                <Popup
                                                                    icon={removeIcon("w-5 h-5 text-gray-500 xl:hover:text-red-500")}
                                                                    onYesClick={() =>
                                                                        handleDeleteProduct(product.id)}
                                                                    onNoClick={() => console.log("End")}
                                                                    Option={{ yes: "Xoá", no: "Thoát" }}
                                                                    Title={"Xóa khỏi giỏ hàng"}
                                                                    Content={popupContent(null, "Bạn có đồng ý loại bỏ sản phẩm này khỏi Hoá Đơn?")}
                                                                    ErrorHandling={{ title: "Lỗi xoá Hoá Đơn", message: "Không thể xoá tất cả sản phẩm này khỏi Hoá Đơn!" }}
                                                                />
                                                            </div> */}
                                                            </div>
                                                            <div className="flex font-semibold justify-between xl:flex-col md:flex-col md:ml-4">
                                                                <div className="flex text-red-500 text-base xl:w-[8rem] xl:justify-end">
                                                                    <div>{formatNumberToText(product.price)}</div>
                                                                    <div className="underline">đ</div>
                                                                </div>
                                                                <div className="flex xl:w-[8rem] xl:justify-end">{`Số lượng: ${product.quantity}`}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide className="w-[20%] flex gap-2 py-4 h-full">
                                                    {/* Remove product Mobile */}
                                                    <div className="flex flex-col items-center w-full h-full">
                                                        <Popup
                                                            icon={removeIcon("w-5 h-5 text-gray-500 xl:hover:text-red-500")}
                                                            onYesClick={() =>
                                                                handleDeleteProduct(product.id)}
                                                            onNoClick={() => console.log("End")}
                                                            Option={{ yes: "Xoá", no: "Thoát" }}
                                                            Title={"Xóa khỏi giỏ hàng"}
                                                            Content={popupContent(null, "Bạn có đồng ý loại bỏ sản phẩm này khỏi Hoá Đơn?")}
                                                            ErrorHandling={{ title: "Lỗi xoá Hoá Đơn", message: "Không thể xoá tất cả sản phẩm này khỏi Hoá Đơn!" }}
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            </Swiper>
                                        </div>

                                    ))}
                                </div>
                        }
                    </div>
                </div>

                {/* payment methods mobile*/}
                <div className="w-full flex flex-col gap-1 font-inter text-sm border-red-100 bg-white shadow-sm shadow-red-200 xl:hidden">
                    {/* header */}
                    <div className="flex justify-between items-center px-2 h-10 bg-red-100">
                        <div className="font-semibold">{`Chọn phương thức thanh toán`}</div>
                    </div>
                    {/* detail */}
                    <div ref={paymentMethodsContainerRef} className="flex gap-1 bg-white overflow-x-auto md:gap-2 pb-1 px-[0.1rem] scroll-smooth no-scrollbar">
                        {
                            paymentMethods.length === 0 ?
                                <ShoppingCartLoader items={NUMLOADER - 2} />
                                :
                                paymentMethods.map(payment => (
                                    <div key={payment.paymentMethodId} className={`flex-shrink-0 w-[14rem] md:w-[18.5rem] flex gap-2 md:gap-4 border  ${paymentID === payment.paymentMethodId ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 xl:cursor-pointer`} onClick={() => choicePayment(payment.paymentMethodId, true)} >
                                        <div className="w-8 h-8 flex mb-8">
                                            <img src={payment.paymentMethodImage} alt={payment.paymentMethodName} />
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="">
                                                {maskPhone(payment.paymentAccount)}
                                            </div>
                                            <div className="flex flex-col font-medium">
                                                <div>{payment.paymentMethodName}</div>
                                                <div className="text-xs font-normal">{payment.paymentMethodDescription}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                    </div>
                </div>

                {/* coupon code  mobile*/}
                <div className="bg-white py-4 px-2 h-15 xl:hidden">
                    <input
                        type="text"
                        className="w-full rounded-md h-12 bg-gray-50 text-sm pl-2 pr-16 outline-none"
                        placeholder="Nhập mã giảm giá (mã chỉ áp dụng một lần)"
                        value={couponCode}
                        onChange={handleCouponChange}
                    />
                    <button
                        className={`${couponCode ? '' : 'hidden'} text-sm font-semibold absolute right-0 pt-[0.9rem] pr-[0.7rem] font-inter text-blue-600`}
                        onClick={handleApplyCouponCode}
                    >
                        Áp dụng
                    </button>
                    <div className={`${couponCodeStatus ? '' : 'hidden'} text-xs text-red-600`}>{couponCodeStatus}</div>
                </div>
            </div >



            {/* Preview bill */}
            <div className="w-full xl:w-1/3" >
                <div className={`xl:mt-0 xl:flex xl:flex-col xl:gap-8 h-full w-full font-inter border border-red-100 bg-white p-4 xl:p-2 shadow-md shadow-red-200 ${products.length ? '' : 'animate-pulse'}`}>
                    {/* payment methods desktop */}
                    <div className="hidden xl:flex xl:flex-col">
                        <div className="pb-2">
                            <p className="text-base font-bold">Chọn Phương Thức Thanh Toán</p>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            {
                                paymentMethods.length === 0 ?
                                    <ShoppingCartLoader items={NUMLOADER - 2} />
                                    :
                                    paymentMethods.map(payment => (
                                        <div key={payment.paymentMethodId} className={`flex-shrink-0 w-full flex gap-5 border ${paymentID === payment.paymentMethodId ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 xl:cursor-pointer`} onClick={() => choicePayment(payment.paymentMethodId)} >
                                            <div className="w-8 h-8 flex mb-8">
                                                <img src={payment.paymentMethodImage} alt={payment.paymentMethodName} />
                                            </div>

                                            <div className="flex flex-col gap-4 w-full">
                                                <div className="flex justify-between">
                                                    <div className="">
                                                        {maskPhone(payment.paymentAccount)}
                                                    </div>
                                                    <div className="w-6 flex">
                                                        <input
                                                            type="checkbox"
                                                            className="w-5 accent-red-500 cursor-pointer"
                                                            checked={payment.paymentMethodId === paymentID}
                                                            readOnly />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col font-medium">
                                                    <div>{payment.paymentMethodName}</div>
                                                    <div className="text-xs font-normal">{payment.paymentMethodDescription}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                        </div>
                    </div>

                    {/* coupon code desktop*/}
                    <div className="ml-2 w-full hidden xl:block">
                        <div className="flex gap-2 pr-3">
                            <input
                                type="text"
                                className="h-12 w-full bg-gray-100 text-sm outline outline-1 outline-red-300 px-3"
                                placeholder="Nhập mã giảm giá (mã chỉ áp dụng một lần)"
                                value={couponCode}
                                onChange={handleCouponChange}
                            />
                            <button
                                className="text-sm bg-red-600 text-white w-[6rem] font-semibold hover:bg-red-500"
                                onClick={handleApplyCouponCode}
                            >
                                Áp Dụng
                            </button>
                        </div>
                        <div className={`${couponCodeStatus ? '' : 'hidden'} text-xs text-red-600 mt-1`}>{couponCodeStatus}</div>

                    </div>

                    {/* detail bill */}
                    <div className="flex flex-col">
                        <div className="mb-2 flex justify-between">
                            <p className="text-base font-bold">Thông Tin Đơn Hàng</p>
                            <div className="text-gray-700 text-base font-bold capitalize tracking-wide">
                                {/* <span>
                                    {products.length}
                                </span> */}
                            </div>
                        </div>
                        <div className="mb-2 flex justify-between text-sm">
                            <p className="text-gray-700">Tạm Tính ({products.length} sản phẩm) </p>
                            <div className="text-gray-700  font-bold capitalize tracking-wide">
                                <span>
                                    {formatNumberToText(calculateTotalPrice(products))}
                                </span>
                                <span className="underline">
                                    {products[0]?.currency}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-700">Phí Vận Chuyển</p>
                            <div className="text-gray-700 font-bold capitalize tracking-wide">
                                <span>
                                    {formatNumberToText(shippingFee)}
                                </span>
                                <span className="underline">
                                    {products[0]?.currency}
                                </span>
                            </div>
                        </div>
                        {/* Coupon discount */}
                        <div className={`flex justify-between text-sm mt-2 ${couponDiscount.final_discount ? '' : 'hidden'}`}>
                            <div className="flex flex-col gap-1">
                                <p className="text-red-400">Mã giảm giá</p>
                                <p className="text-xs text-red-400">#{couponCode}</p>
                            </div>
                            <div className=" text-red-400 font-bold capitalize tracking-wide">
                                <span>
                                    {"-" + formatNumberToText(couponDiscount?.final_discount)}
                                </span>
                                <span className="underline">
                                    {couponDiscount?.currency}
                                </span>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="flex gap-8 justify-between text-red-500 text-xl">
                            <p className="text-md font-bold">Tổng Cộng</p>
                            <div className="flex flex-col items-end justify-end">
                                <div className=" font-bold capitalize tracking-wide">
                                    <span>
                                        {formatNumberToText(calculateTotalPrice(products) + shippingFee - couponDiscount.final_discount)}
                                    </span>
                                    <span className="underline">
                                        {products[0]?.currency}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-700">Đã bao gồm thuế VAT</p>
                            </div>
                        </div>
                        <button className={`mt-6 w-full bg-red-500 py-1.5 font-bold text-blue-50 xl:hover:bg-red-600 ${products.length ? '' : 'hidden'}`}>
                            ĐẶT HÀNG ({products.length})
                        </button>
                    </div>

                </div>

            </div>

            {/* Summary Total bill */}
        </div >
    )
}
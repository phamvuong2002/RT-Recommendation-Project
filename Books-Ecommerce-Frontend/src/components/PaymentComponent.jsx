import React, { useContext, useEffect, useRef, useState } from 'react';
import { formatNumberToText } from '../utils/formatNumberToText';
import { fetchAPI, fetchData } from '../helpers/fetch';
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
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/main';
import { addtocart, getcarts } from '../apis/cart';
import { getaddresses } from '../apis/address';
import { getdiscountwallet } from '../apis/discount';
import StaggeredDropDown from './childComponents/StaggeredDropDown';
import StaggeredDropDownDiscount from './childComponents/StaggeredDropDown';
import {
  checkoutcartreview,
  checkoutproductreview,
  placeorder,
} from '../apis/checkout';
import { PopupCenterPanel } from './popup/PopupCenterPanel';
import { getonebook } from '../apis/book';

const SAMPLEPAYMENTMETHODS = [
  {
    paymentMethodId: 'vnpay',
    paymentMethodName: 'VNPay',
    paymentMethodImage:
      'https://i.gyazo.com/cd4ad37ac9f9ae75473542526f69e79e.png',
    paymentMethodDescription: 'Ví VNpay',
    paymentAccount: 'Thanh toán trực tuyến với',
  },
  {
    paymentMethodId: 'paypal',
    paymentMethodName: 'Paypal',
    paymentMethodImage: 'https://i.ibb.co/r68ZFGK/Paypal-2014-logo.png',
    paymentMethodDescription: 'Liên kết tài khoản Paypal',
    paymentAccount: 'Thanh toán trực tuyến với',
  },
  {
    paymentMethodId: 'cod',
    paymentMethodName: 'COD',
    paymentMethodImage:
      'https://img.icons8.com/external-beshi-line-kerismaker/48/external-Cash-on-delivery-online-shopping-beshi-line-kerismaker.png',
    paymentMethodDescription: 'Cho phép thanh toán sau khi nhận hàng',
    paymentAccount: 'Thanh Toán Khi Nhận Hàng',
  },
];

export const Payment = () => {
  // Generall setup
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const data = queryParams.get('data');
  const quantity = queryParams.get('quantity');

  const { userId, session, token, setIsLoading, numCart, setNumCart } =
    useContext(AppContext);

  // Vailables for checkout
  const paymentMethodsContainerRef = useRef(null);
  const shippingMethodsContainerRef = useRef(null);

  const [isAddrPopupOpen, setIsAddrPopupOpen] = useState(false);
  const [isAddrLoading, setIsAddrLoading] = useState(false);

  const NUMLOADER = 4;
  const [paymentID, setPaymentID] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [products, setProducts] = useState([]);

  const [serviceID, setServiceID] = useState('');
  const [chosenService, setChosenService] = useState('');
  const [shippingFee, setShippingFee] = useState(0);
  const [shippingMethods, setShippingMethods] = useState([]);

  const [couponCode, setCouponCode] = useState('');
  const [couponCodeStatus, setCouponCodeStatus] = useState('');
  const [couponDiscount, setCouponDiscount] = useState();

  const [userAddresses, setUserAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState('');

  //Checkout Data
  const [oldPrice, setOldPrice] = useState(0);
  const [reviewPrice, setReviewPrice] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [discountReview, setDiscountReview] = useState('');

  //Popup Alert
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [messageAlert, setMessageAlert] = useState(false);

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

  // Xử lý sự kiện chọn dịch vụ vận chuyển
  const choiceService = (serviceID) => {
    if (isMobileDevice()) {
      const updatedShippingMethods = shippingMethods
        .map((service) => {
          if (service.serviceid === serviceID) {
            return { ...service, selected: true }; // Đánh dấu phương thức được chọn
          } else {
            return { ...service, selected: false }; // Đánh dấu các phương thức không được chọn
          }
        })
        .sort((a, b) => {
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
    setChosenService(getServiceByServiceId(serviceID));
  };

  const getFeeByServiceId = (serviceId) => {
    const service = shippingMethods.find((s) => s.serviceid === serviceId);
    return service ? service.fee : 0;
  };

  const getServiceByServiceId = (serviceId) => {
    const service = shippingMethods.find((s) => s.serviceid === serviceId);
    return service || null;
  };

  //Xử lý sự kiện chọn phương thức thanh toán
  const choicePayment = (paymentMethodId, isMobile = false) => {
    // Xử lý lưu trữ phương thức thanh toán được chọn ở đây
    // Sau đó, cập nhật lại danh sách phương thức thanh toán để đưa phương thức được chọn lên đầu mảng
    if (isMobile) {
      const updatedPaymentMethods = SAMPLEPAYMENTMETHODS.map((payment) => {
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
  };

  // Xử lý sự kiện khi nhấn nút "Xoá"
  const handleDeleteProduct = async (productId) => {
    console.log('productId::', productId);
    //ví dụ gửi yêu cầu xoá sản phẩm xuống backend
    setIsLoading(true);
    const update = await fetchAPI(`../${addtocart}`, 'POST', {
      userId: userId,
      book: {
        book_id: productId,
        quantity: 0,
        old_quantity: 1,
      },
    });
    if (update.status !== 200) return;
    const updatedProducts = update.metadata.cart_data;
    setProducts(updatedProducts);
    setNumCart(update.metadata.cart_count_products);
    setIsLoading(false);
  };

  //Xử lý sự kiện nhập Coupon
  // Xử lý sự kiện khi thay đổi nội dung của input
  const handleCouponChange = (event) => {
    setCouponCode(event?.target?.value);
    setCouponCodeStatus(null);
    setCouponDiscount();
  };

  // Xử lý sự kiện khi nhấn vào apply coupon code button
  const handleApplyCouponCode = async (event) => {
    event.preventDefault();
  };

  // Xử lý sự kiện click chỉnh sửa địa chỉ
  //Load địa chỉ khi mở popup
  const handleAddressChange = async (e) => {
    e.preventDefault();

    const address = await fetchAPI(`../${getaddresses}`, 'POST', {
      userId,
    });
    if (address.status !== 200) {
      setUserAddresses([]);
    } else {
      setUserAddresses(address.metadata);
    }
  };

  //Fetch Shopping Carts
  useEffect(() => {
    //load shopping cart
    const loadShoppingCartsData = async () => {
      setPageLoading(true);
      if (!userId) return;
      const shoppingCartsData = await fetchAPI(`../${getcarts}`, 'POST', {
        userId: userId,
      });
      if (shoppingCartsData.status === 200) {
        setProducts(shoppingCartsData.metadata.cart_data);
      } else {
        setProducts([]);
      }
      setPageLoading(false);
    };

    //Load books
    const loadBookData = async () => {
      setPageLoading(true);
      //Get book
      const book = await fetchAPI(`../${getonebook}`, 'POST', {
        bookId: data,
      });
      if (book.status !== 200) {
        navigate('/');
        return;
      }

      const data_book = [
        {
          cb_book_id: book.metadata.book.book_id,
          cb_book_num: quantity,
          book: {
            book_title: book.metadata.book.book_title,
            book_img: book.metadata.book.book_img,
            book_spe_price: book.metadata.book.book_spe_price,
            book_old_price: book.metadata.book.book_old_price,
            book_publisherId: book.metadata.book.book_publisherId,
          },
          book_detail: {
            book_authors_name:
              book.metadata.book_detail.book_authors_name === 'null'
                ? book.metadata.book_detail.book_pulisherName
                : book.metadata.book_detail.book_authors_name,
            book_pulisherName: book.metadata.book_detail.book_pulisherName,
            book_layout: book.metadata.book_detail.book_layout,
          },
        },
      ];

      setProducts(data_book);
      setPageLoading(false);
    };

    //ví dụ tải các sản phẩm trong giỏ hàng của khách
    if (type === 'cart') {
      loadShoppingCartsData();
    } else if (type === 'book') {
      if (!data || !quantity) {
        return;
      } else {
        loadBookData();
      }
    } else {
      navigate('/notfound-page');
    }
  }, [type, userId, numCart, data, quantity]);

  //Fetch Payment medthods
  useEffect(() => {
    setTimeout(() => {
      setPaymentMethods(SAMPLEPAYMENTMETHODS);
    }, 1000);
  }, []);

  //Fetch Shipping methods
  useEffect(() => {
    const loadServices = async () => {
      setIsAddrLoading(true);
      if (defaultAddress === undefined) {
        setShippingMethods([]);
        setIsAddrLoading(false);
        return;
      }
      try {
        const services = await calculateShippingFeeDefault(
          defaultAddress,
          products[0],
        );
        setShippingMethods(services);
        setChosenService(services[0]);
      } catch (error) {
        setIsAddrLoading(false);
        return;
      }
      setIsAddrLoading(false);
    };

    if (defaultAddress) {
      loadServices();
    } else {
      setShippingMethods([]);
      return;
    }
  }, [defaultAddress]);

  //Set service default
  useEffect(() => {
    if (shippingMethods.length > 0) {
      if (!serviceID) {
        setServiceID(shippingMethods[0].serviceid);
      }
      setShippingFee(getFeeByServiceId(serviceID));
    } else {
      setServiceID('');
      setShippingFee(0);
    }
  }, [shippingMethods, userAddresses, serviceID, defaultAddress]);

  //Lấy thông tin Address
  useEffect(() => {
    const getAddresses = async () => {
      if (!userId) return;
      setIsAddrLoading(true);
      const address = await fetchAPI(`../${getaddresses}`, 'POST', {
        userId,
      });
      if (address.status !== 200) {
        setDefaultAddress('');
        setIsAddrLoading(false);
      } else {
        setDefaultAddress(address.metadata?.[0]);
      }
      setIsAddrLoading(false);
    };
    getAddresses();
  }, [userId]);

  //Lấy Discount
  useEffect(() => {
    if (couponDiscount === undefined) {
      setCouponCode('');
    } else {
      setCouponCode(couponDiscount?.discount?.discount_code);
    }
  }, [couponDiscount]);

  //Review Checkout
  useEffect(() => {
    const dataCheckout = {
      userId,
      ...((couponDiscount || couponCode) && {
        discount: {
          discountId: couponDiscount?.dw_discount_id,
          discountCode: couponCode,
        },
      }),
      ...((data || quantity) && {
        book: {
          bookId: products?.[0]?.cb_book_id,
          quantity: parseInt(quantity),
          price: products?.[0]?.book?.book_spe_price,
        },
      }),
      feeShip: shippingFee,
      feeService: serviceFee,
    };

    console.log('dataCheckout::', dataCheckout);

    const reviewCheckout = async () => {
      if (!userId) return;
      setIsLoading(true);
      const result = await fetchAPI(
        `../${data && quantity ? checkoutproductreview : checkoutcartreview}`,
        'POST',
        dataCheckout,
      );
      if (result.status !== 200) {
        setCouponCodeStatus('Coupon không hợp lệ');
        setDiscountReview(null);
      } else {
        setOldPrice(result.metadata.data_review.oldTotal);
        setReviewPrice(result.metadata.data_review.reviewTotal);
        setDiscountReview(result.metadata.data_amount);
        setCouponCodeStatus('');
      }
      setIsLoading(false);
    };

    reviewCheckout();
  }, [couponDiscount, shippingFee, serviceFee, userId, couponCode, products]);

  //Place Order
  const placeOrder = async () => {
    // if (!userId || !token) return;
    if (!paymentID) {
      setIsAlertOpen(true);
      setMessageAlert('Vui lòng chọn một Phương Thức Thanh Toán!');
      return;
    }
    if (!chosenService || !serviceID) {
      setIsAlertOpen(true);
      setMessageAlert('Vui lòng chọn một Phương Thức Vận Chuyển!');
      return;
    }

    const dataCheckout = {
      userId,
      ...((couponDiscount || couponCode) && {
        discount: {
          discountId: couponDiscount?.dw_discount_id,
          discountCode: couponCode,
        },
      }),
      ...((data || quantity) && {
        book: {
          bookId: products?.[0]?.cb_book_id,
          quantity: parseInt(quantity),
          price: products?.[0]?.book?.book_spe_price,
        },
      }),
      shipping: {
        feeShip: shippingFee,
        shippingCode: chosenService.code,
      },
      feeService: serviceFee,
      payment: {
        method: paymentID,
      },
    };

    const createOrder = async () => {
      setIsLoading(true);
      const result = await fetchAPI(`../${placeorder}`, 'POST', dataCheckout);
      if (result.status !== 200) {
        setIsLoading(false);
        setIsAlertOpen(true);
        setMessageAlert('Đặt hàng thất bại! Vui lòng thử lại sau.');
        return;
      } else {
        setIsLoading(false);
        console.log('result:::', result);
        window.location.href = result.metadata.payment_data.paymentUrl;
      }
    };

    if (!userId) {
      setIsAlertOpen(true);
      setMessageAlert('Vui lòng đăng nhập để đặt hàng!');
    } else {
      createOrder();
    }
  };

  return (
    <div className="xl:flex xl:gap-2">
      <PopupCenterPanel
        open={isAlertOpen}
        setOpen={setIsAlertOpen}
        title="Đặt Hàng"
        // titleClassName="hidden"
        content={
          <div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <img src="/img/miss_payment.png" alt="miss_payment" />
              <div className="mt-2 font-semibold text-lg text-red-500">
                {messageAlert}
              </div>
            </div>
          </div>
        }
        autoClose={2500}
      />

      {/* Preview*/}
      <div className="xl:w-2/3 flex flex-col gap-1 xl:gap-2">
        {/* Address preview*/}
        <div
          className={`w-full flex flex-col item-center text-sm font-inter border-red-100 bg-white shadow-md shadow-red-200 ${isAddrLoading ? 'animate-pulse' : ''}`}
        >
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
                <button
                  className="text-red-400 xl:hover:text-red-600"
                  onClick={handleAddressChange}
                >
                  Chỉnh sửa
                </button>
              }
            />
          </div>
          {/* details */}
          {defaultAddress ? (
            <div className="flex flex-col p-2 bg-white gap-2">
              <div className="flex items-center">
                <div
                  className={`w-2/5 xl:w-1/5 ${isAddrLoading ? 'h-2 bg-slate-200 rounded col-span-2' : ''}`}
                >
                  {defaultAddress.userFullName}
                </div>
                <div
                  className={`w-full ${isAddrLoading ? 'h-2 bg-slate-200 rounded col-span-2' : ''}`}
                >
                  {defaultAddress.userPhone}
                </div>
              </div>
              <div
                className={`flex items-center ${isAddrLoading ? 'h-2 bg-slate-200 rounded col-span-2' : ''}`}
              >
                <div className={`flex w-2/5 xl:w-1/5 items-center`}>
                  {isAddrLoading ? (
                    ''
                  ) : !defaultAddress ? (
                    <div></div>
                  ) : defaultAddress.address_is_home ? (
                    <div className="px-2 xl:px-3 py-[0.1rem] xl:pt-[0.2rem] text-[0.5rem] xl:text-[0.6rem] xl:text-xs text-white uppercase font-semibold bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl">
                      Nhà riêng
                    </div>
                  ) : (
                    <div className="px-2 xl:px-3 py-[0.1rem] xl:pt-[0.2rem] text-[0.5rem] xl:text-[0.6rem] xl:text-xs text-white uppercase font-semibold bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl">
                      Văn phòng
                    </div>
                  )}
                </div>
                <div
                  className={`w-full ${isAddrLoading ? 'h-2 bg-slate-200 rounded col-span-2 hidden' : ''}`}
                >
                  {`${defaultAddress?.address_detail}, ${defaultAddress?.address_ward_name}, ${defaultAddress?.address_district_name}, ${defaultAddress?.address_province_name}`}
                </div>
              </div>
            </div>
          ) : (
            <div className="gap-1 flex text-sm h-8 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="w-5 h-5 xl:w-6 xl:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <div>Bạn chưa có địa chỉ giao hàng. Vui lòng cập nhật</div>
            </div>
          )}
        </div>

        {/* Products preview*/}
        <div className="w-full flex flex-col font-inter text-sm border-red-100 bg-white shadow-md shadow-red-200">
          {/* header */}
          <div className="flex justify-between items-center px-2 h-10 bg-red-100">
            <div className="font-semibold">{`Xem lại gói hàng (${products.length} sản phẩm)`}</div>
            <div className="flex gap-1 text-xs ">
              <span className="text-gray-500">Được giao bởi</span>
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
              {isAddrLoading ? (
                <TextLoader items={1} />
              ) : shippingMethods.length === 0 ? (
                <div className="flex items-center justify-center px-2">
                  <img src="data:image/png;base64,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"></img>
                </div>
              ) : (
                <div
                  ref={shippingMethodsContainerRef}
                  className="flex gap-1 overflow-x-auto xl:grid xl:grid-cols-3 xl:gap-2 pb-1 scroll-smooth no-scrollbar"
                >
                  {shippingMethods.map((service) => (
                    <div
                      key={service.serviceid}
                      className={`flex-shrink-0 w-[14rem] xl:w-[17rem] flex gap-2 border rounded-lg p-2 xl:cursor-pointer ${serviceID === service.serviceid ? 'border-red-500' : 'border-gray-300'}`}
                      onClick={() => choiceService(service.serviceid)}
                    >
                      <div className="w-8 flex mb-12">
                        <input
                          type="checkbox"
                          className="w-5 accent-red-500"
                          checked={service.serviceid === serviceID}
                          readOnly
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex flex-col gap-4">
                          <div className="flex font-medium">
                            <div>{formatNumberToText(service.fee)}</div>
                            <span className="underline">đ</span>
                          </div>
                          <div>
                            <div className="text-xs whitespace-nowrap overflow-x-auto max-w-[10.5rem] xl:max-w-[12rem] no-scrollbar">
                              {service.type}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs">Nhận vào: {service.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* product */}
            {products.length === 0 ? (
              <ShoppingCartLoader items={NUMLOADER} />
            ) : (
              <div className="flex flex-col xl:block gap-4 p-2 mt-1 xl:max-h-[40rem] xl:overflow-y-auto scrollbar-thin">
                {products.map((product) => (
                  <div key={product.cb_book_id}>
                    <Swiper
                      // onSwiper={(swiper) => {
                      //     swiperRef.current = swiper;
                      // }}
                      key={product.cb_book_id}
                      slidesPerView={'auto'}
                      className="mySwiper swiper-backface-hidden"
                    >
                      <SwiperSlide>
                        <div
                          key={product.cb_book_id}
                          className="flex gap-2 border-b border-b-gray-200 py-4"
                        >
                          <div className="flex">
                            <div className="w-[6rem] flex items-start mt-1 ">
                              <img
                                className="rounded-lg"
                                src={product.book.book_img}
                                alt={product.book.book_title}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col w-full gap-2 md:flex-row md:gap-9 md:w-full xl:flex-row xl:gap-4 xl:w-full">
                            <div className="flex flex-col md:w-2/5 xl:w-2/5 gap-1">
                              <div className="text-base font-semibold">
                                {product.book.book_title}
                              </div>
                              <div className="flex flex-col text-gray-500">
                                <div>{`Phiên bản: ${product.book_detail.book_layout}`}</div>
                                <div>{`Nhà xuất bản: ${product.book_detail.book_pulisherName}`}</div>
                                <div>{`Tác giả: ${product.book_detail.book_authors_name}`}</div>
                              </div>
                              <div className="text-xs text-gray-500 font-bold">
                                <div className="w-fit bg-gray-300 px-1">
                                  {`Chỉ còn ${product.book.inven_stock} sản phẩm`}
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
                            </div>
                            <div className="flex font-semibold justify-between xl:flex-col md:flex-col md:ml-4">
                              <div className="flex text-red-500 text-base xl:w-[8rem] xl:justify-end">
                                <div>
                                  {formatNumberToText(
                                    product.book.book_spe_price,
                                  )}
                                </div>
                                <div className="underline">đ</div>
                              </div>
                              <div className="flex xl:w-[8rem] xl:justify-end">{`Số lượng: ${product.cb_book_num}`}</div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="w-[20%] flex gap-2 py-4 h-full">
                        {/* Remove product Mobile */}
                        <div className="flex flex-col items-center w-full h-full">
                          <Popup
                            icon={removeIcon(
                              'w-5 h-5 text-gray-500 xl:hover:text-red-500',
                            )}
                            onYesClick={() =>
                              handleDeleteProduct(product.cb_book_id)
                            }
                            onNoClick={() => console.log('End')}
                            Option={{ yes: 'Xoá', no: 'Thoát' }}
                            Title={'Xóa khỏi giỏ hàng'}
                            Content={popupContent(
                              null,
                              'Bạn có đồng ý loại bỏ sản phẩm này khỏi Hoá Đơn?',
                            )}
                            ErrorHandling={{
                              title: 'Lỗi xoá Hoá Đơn',
                              message:
                                'Không thể xoá tất cả sản phẩm này khỏi Hoá Đơn!',
                            }}
                          />
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* payment mobile*/}
        <div className="w-full flex flex-col gap-1 font-inter text-sm border-red-100 bg-white shadow-sm shadow-red-200 xl:hidden">
          {/* header */}
          <div className="flex justify-between items-center px-2 h-10 bg-red-100">
            <div className="font-semibold">{`Chọn phương thức thanh toán`}</div>
          </div>
          {/* detail */}
          <div
            ref={paymentMethodsContainerRef}
            className="flex gap-1 bg-white overflow-x-auto md:gap-2 pb-1 px-[0.1rem] scroll-smooth no-scrollbar"
          >
            {paymentMethods.length === 0 ? (
              <ShoppingCartLoader items={NUMLOADER - 2} />
            ) : (
              paymentMethods.map((payment) => (
                <div
                  key={payment.paymentMethodId}
                  className={`bg-white flex-shrink-0 w-[16rem] md:w-[18.5rem] flex gap-2 md:gap-4 border  ${paymentID === payment.paymentMethodId ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 xl:cursor-pointer`}
                  onClick={() => choicePayment(payment.paymentMethodId, true)}
                >
                  <div className="w-8 h-8 flex mb-8">
                    <img
                      src={payment.paymentMethodImage}
                      alt={payment.paymentMethodName}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="">{maskPhone(payment.paymentAccount)}</div>
                    <div className="flex flex-col font-medium">
                      <div>{payment.paymentMethodName}</div>
                      <div className="text-xs font-normal">
                        {payment.paymentMethodDescription}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* coupon code  mobile*/}
        <div className="flex flex-col gap-1 bg-white py-4 px-2 h-15 xl:hidden">
          <div className="flex gap-2">
            <StaggeredDropDownDiscount
              icon={
                <input
                  type="text"
                  className="w-[21.5rem] rounded-md h-12 bg-gray-50 text-sm pl-2 pr-20 outline-none"
                  placeholder="Nhập mã giảm giá (ví coupons)"
                  value={couponCode}
                  onChange={handleCouponChange}
                />
              }
              className={'outline-none'}
              setChosenDiscount={setCouponDiscount}
            />
            <div>
              <button
                className={`${couponCode ? '' : 'hidden'} text-sm font-semibold absolute right-0 pt-4 pr-4 font-inter text-blue-600`}
                onClick={handleApplyCouponCode}
              >
                Áp dụng
              </button>
            </div>
          </div>
          {/* Message */}
          <div
            className={`${couponCodeStatus ? '' : 'hidden'} bg-white px-2 text-xs text-red-600`}
          >
            {couponCodeStatus}
          </div>
        </div>
      </div>

      {/* Preview bill */}
      <div className="w-full xl:w-1/3">
        <div
          className={`xl:mt-0 xl:flex xl:flex-col xl:gap-8 h-full w-full font-inter border border-red-100 bg-white p-4 xl:p-2 shadow-md shadow-red-200 ${products.length ? '' : 'animate-pulse'}`}
        >
          {/* payment methods desktop */}
          <div className="hidden xl:flex xl:flex-col">
            <div className="pb-2">
              <p className="text-base font-bold">Chọn Phương Thức Thanh Toán</p>
            </div>
            <div className="w-full flex flex-col gap-2">
              {paymentMethods.length === 0 ? (
                <ShoppingCartLoader items={NUMLOADER - 2} />
              ) : (
                paymentMethods.map((payment) => (
                  <div
                    key={payment.paymentMethodId}
                    className={`flex-shrink-0 w-full flex gap-5 border ${paymentID === payment.paymentMethodId ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 xl:cursor-pointer`}
                    onClick={() => choicePayment(payment.paymentMethodId)}
                  >
                    <div className="w-8 h-8 flex mb-8">
                      <img
                        src={payment.paymentMethodImage}
                        alt={payment.paymentMethodName}
                      />
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
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="flex flex-col font-medium">
                        <div>{payment.paymentMethodName}</div>
                        <div className="text-xs font-normal">
                          {payment.paymentMethodDescription}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* coupon code desktop*/}
          <div className="ml-2 w-full hidden xl:block">
            <div className="flex gap-2 pr-3">
              <StaggeredDropDownDiscount
                icon={
                  <input
                    type="text"
                    className="h-12 w-[20rem] bg-gray-100 text-sm outline outline-1 outline-red-300 px-3"
                    placeholder="Nhập mã giảm giá (mã chỉ áp dụng một lần)"
                    value={couponCode}
                    onChange={handleCouponChange}
                  />
                }
                setChosenDiscount={setCouponDiscount}
              />

              <button
                className="text-sm bg-red-600 text-white w-[6rem] font-semibold hover:bg-red-500"
                onClick={handleApplyCouponCode}
              >
                Áp Dụng
              </button>
            </div>
            <div
              className={`${couponCodeStatus ? '' : 'hidden'} text-xs text-red-600 mt-1`}
            >
              {couponCodeStatus}
            </div>
          </div>

          {/* detail bill */}
          <div className="flex flex-col">
            <div className="mb-2 flex justify-between">
              <p className="text-base font-bold">Thông Tin Đơn Hàng</p>
              {/* <div className="text-gray-700 text-base font-bold capitalize tracking-wide">
                <span>{products.length}</span>
              </div> */}
            </div>
            <div className="mb-2 flex justify-between text-sm">
              <p className="text-gray-700">
                Tạm Tính ({products.length} sản phẩm){' '}
              </p>
              <div className="text-gray-700  font-bold capitalize tracking-wide">
                <span>{formatNumberToText(calculateTotalPrice(products))}</span>
                <span className="underline">{'đ'}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-700">Phí Vận Chuyển</p>
              <div className="text-gray-700 font-bold capitalize tracking-wide">
                <span>{formatNumberToText(shippingFee)}</span>
                <span className="underline">{'đ'}</span>
              </div>
            </div>
            {/* Coupon discount */}
            {discountReview ? (
              <div className="flex justify-between text-sm mt-2">
                <p className="text-gray-700">Giảm Giá</p>
                <div className="text-gray-700 font-bold capitalize tracking-wide">
                  <span> - {formatNumberToText(discountReview.amount)}</span>
                  <span className="underline">{'đ'}</span>
                </div>
              </div>
            ) : (
              ''
            )}
            <hr className="my-4" />
            <div className="flex gap-8 justify-between text-red-500 text-xl">
              <p className="text-md font-bold">Tổng Cộng</p>
              <div className="flex flex-col items-end justify-end">
                <div className=" font-bold capitalize tracking-wide">
                  <span>{formatNumberToText(reviewPrice)}</span>
                  <span className="underline">{'đ'}</span>
                </div>
                <p className="text-xs text-gray-700">Đã bao gồm thuế VAT</p>
              </div>
            </div>
            <button
              onClick={placeOrder}
              className={`mt-6 w-full bg-red-500 py-1.5 font-bold text-blue-50 xl:hover:bg-red-600 ${products.length ? '' : 'hidden'}`}
            >
              ĐẶT HÀNG ({products.length})
            </button>
          </div>
        </div>
      </div>

      {/* Summary Total bill */}
    </div>
  );
};

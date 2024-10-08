import React, { useContext, useEffect, useState } from 'react';
import NavigationPath from '../components/NavigationPath';
import { ShoppingCarts } from '../components/ShoppingCarts';
import { AllProducts } from '../components/AllProducts';
import { Slider } from '../components/Slider';
import { SliderProducts } from '../components/SliderProducts';
import { fetchAPI, fetchData } from '../helpers/fetch';
import { FectchPaging } from '../helpers/fectchPaging';
import { DetailOrder } from '../components/DetailOrder';
import { shortenString } from '../utils/shortenString';
import { vnpay } from '../utils/getPaymentReturn';
import { AppContext } from '../contexts/main';
import { useNavigate, useParams } from 'react-router-dom';
import {
  extractQueryString,
  getStringBeforeAmpersand,
} from '../utils/getUrlBase';
import {
  createtransaction,
  rollbackorder,
  updateorderstatus,
} from '../apis/checkout';
import { removeallcarts } from '../apis/cart';
import { getoneorder } from '../apis/order';

import { recRandomBook, getbestselling } from '../apis/recommendation';

export const OrderDetailPage = () => {
  const {
    userId,
    setIsShowFooter,
    token,
    requestAuth,
    setRequestAuth,
    setIsLoading,
    setNumCart,
    setIsProgressLoading
  } = useContext(AppContext);
  const { order } = useParams();
  const dataOrder = extractQueryString(order);
  const orderId = Object.keys(dataOrder)[0];
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentData, setPaymentData] = useState('');
  const [oneOrder, setOneOrder] = useState('');
  const [reloadOrder, setReloadOrder] = useState(false);

  const [collabProducts, setCollabProducts] = useState([]);
  const [bestSellerData, setBestSellerData] = useState([]);

  const navigate = useNavigate();
  const paths = [
    { path: '/', label: 'Trang Chủ' },
    { path: `/${'shoppingcarts'}`, label: `${shortenString('Giỏ Hàng', 5)}` },
    { path: `#`, label: `${shortenString('Thanh Toán', 5)}` },
    {
      path: `/${'account/orders-infomation'}`,
      label: `${shortenString('Chi Tiết Đơn Hàng', 10)}`,
    },
    {
      path: `/${'order-detail/'}${parseInt(orderId)}`,
      label: `${shortenString(`Đơn hàng #${orderId}`, 11)}`,
    },
  ];

  //Check Authen
  useEffect(() => {
    if (
      (!token || token === 'unknow' || token === null) &&
      requestAuth === false
    ) {
      setRequestAuth(true);
    }
  }, [userId, token, requestAuth]);

  //set footer
  useEffect(() => {
    setIsShowFooter(true);
  }, []);

  //Get payment status
  useEffect(() => {
    //get payment information
    const urlParams = new URLSearchParams(window.location.search);
    //vnpay
    if (dataOrder.paymentType === 'vnpay') {
      const dataVnpay = vnpay(urlParams);
      //check status payment
      if (dataVnpay.vnp_ResponseCode !== '00') {
        setPaymentStatus('failed');
        const dataTran = {
          userId,
          sId: `VNP${new Date().getTime()}`,
          orderId: parseInt(orderId),
          status: 'Failed',
          total: parseFloat(dataVnpay.vnp_Amount),
        };
        dataOrder.statusCode = dataVnpay.vnp_ResponseCode;
        setPaymentData(dataTran);
      } else {
        setPaymentStatus('success');
        const dataTran = {
          userId,
          sId: dataVnpay.vnp_BankTranNo,
          orderId: parseInt(orderId),
          status: 'Completed',
          total: parseFloat(dataVnpay.vnp_Amount),
        };
        setPaymentData(dataTran);
      }
    }
    //paypal
    else if (dataOrder.paymentType === 'paypal') {
      if (dataOrder.statusCode !== '00') {
        setPaymentStatus('failed');
        const dataTran = {
          userId,
          sId: `PAYID-${new Date().getTime()}`,
          orderId: parseInt(orderId),
          status: 'Failed',
          total: parseFloat(dataOrder.price),
        };
        setPaymentData(dataTran);
      } else {
        setPaymentStatus('success');
        const dataTran = {
          userId,
          sId: dataOrder.paymentId,
          orderId: parseInt(orderId),
          status: 'Completed',
          total: parseFloat(dataOrder.price),
        };
        setPaymentData(dataTran);
      }
    }
    //cod
    else if (dataOrder.paymentType === 'cod') {
      setPaymentStatus('success');
      setReloadOrder(true);
      const dataTran = {
        userId,
        sId: dataOrder.tranId,
        orderId: parseInt(orderId),
        status: 'Pending',
        total: parseFloat(dataOrder.price),
      };
      setPaymentData(dataTran);
    }
    //undeifine
    else {
      if (!dataOrder.type) {
        return;
      } else {
        navigate('../notfound');
      }
    }
  }, [userId]);

  //Update Payment
  useEffect(() => {
    //create transaction
    const createTran = async () => {
      if (!paymentData || paymentData.userId === '') {
        return;
      }
      setIsProgressLoading(true);
      const result = await fetchAPI(
        `../${createtransaction}`,
        'POST',
        paymentData,
      );
      if (result.status !== 200) {
        setPaymentStatus('');
        setIsProgressLoading(false);
        // console.log('ERROR:::::', result);
      } else {
        setIsProgressLoading(false);
        return;
      }
    };

    //remove cart
    const removeCart = async () => {
      if (!userId) {
        return;
      }
      const result = await fetchAPI(`../${removeallcarts}`, 'POST', {
        userId,
      });
      if (result.status !== 200) {
        // navigate('/notfound');
        // console.log('ERROR REMOVE CART :::::', result);
      } else {
        setNumCart(0);
        return;
      }
    };

    //rollback order
    const rollbackOrder = async () => {
      if (!orderId || !userId) {
        return;
      }
      const result = await fetchAPI(`../${rollbackorder}`, 'POST', {
        orderId: parseInt(orderId),
      });
      if (result.status !== 200) {
        // navigate('/notfound');
        // console.log('ERROR ROLLBACK ORDER :::::', result);
      } else {
        return;
      }
    };

    //update order status
    const updateOrderStatus = async (status) => {
      if (!orderId || !userId) {
        return;
      }
      setIsLoading(true);
      const result = await fetchAPI(`../${updateorderstatus}`, 'POST', {
        orderId: parseInt(orderId),
        status,
      });
      if (result.status !== 200) {
        // navigate('/notfound');
        // console.log('ERROR UPDATE ORDER :::::', result);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setReloadOrder(true);
        return;
      }
    };

    if (paymentStatus === 'success') {
      //create a new transaction
      createTran();
      if (dataOrder.type === 'cart') {
        //remove cart
        removeCart();
      }
    } else if (paymentStatus === 'failed') {
      //create a new transaction
      createTran();
      if (dataOrder?.statusCode === '24' || dataOrder?.statusCode === '404') {
        updateOrderStatus('Cancelled');
        // console.log("Tạo Thất bại");
      }
      // if()
      //rollback order
      // rollbackOrder();
    }
  }, [paymentStatus, paymentData, userId]);

  //load order details
  useEffect(() => {
    //get one order
    const getOneOrder = async () => {
      if (!userId && !reloadOrder) {
        return;
      }
      const data = await fetchAPI(`../${getoneorder}`, 'POST', {
        orderId: parseInt(orderId),
      });
      if (data.status !== 200) {
        // navigate('/notfound');
        // console.log('ERROR:::::', data);
        setReloadOrder(false);
        return;
      } else {
        setOneOrder(data.metadata);
        setReloadOrder(false);
        return;
      }
    };
    getOneOrder();
  }, [orderId, userId, reloadOrder]);


  //Collaborative filtering
  //15 cuốn random được train trong ngày
  useEffect(() => {
    const collabBook = async () => {
      if(!userId) return;
      const rec_book = await fetchAPI(`../${recRandomBook}`, 'POST', {
        userId: userId,
        quantity: 15,
        model_type: "online"
      });
      if (rec_book.status == 200) {
        //console.log(rec_book.metadata)
        setCollabProducts(rec_book.metadata)
      }
    }
    // console.log('in rec svd')
    collabBook();
  }, [userId])

  //Best seller
  //load best seller books
  useEffect(() => {
    const loadBestSellerData = async () => {
      setIsProgressLoading(true);
      const data = await fetchAPI(`../${getbestselling}`, 'POST', {
        pageNumber: 1,
        pageSize: 12,
      });
      if (data.status != 200) {
        setBestSellerData([]);
        setIsProgressLoading(false);
        return;
      }
      setBestSellerData(data?.metadata?.books);
      setIsProgressLoading(false);
    };
    //get best seller data
    loadBestSellerData();
  }, [userId]);

  return (
    <div>
      <NavigationPath components={paths} />
      <div className="bg-gray-100 xl:px-28 flex flex-col gap-[0.2rem]">
        <DetailOrder
          dataOrder={oneOrder?.order}
          dataDetail={oneOrder?.orderDetail}
          status={paymentStatus}
          setReload = {setReloadOrder}
        />
        {/*Gợi ý cho bạn*/}
        <div className={`flex flex-col mt-1 px-1 xl:px-0 ${collabProducts.length===0?'hidden':''}`}>
          <div className="flex items-center mb-[0.1rem] xl:mb-1 pl-2 h-14 bg-white rounded-t-lg border border-red-100">
            <img src="/img/for_you.png" alt="for_you" className="w-[3rem]"/>
            <div className="flex px-4 text-sm items-center">
              <div className="text-sm md:text-[150%] font-semibold font-['Inter'] tracking-wider">
                Dành Cho Bạn
              </div>
            </div>
          </div>
          <div className="bg-white border-x border-b xl:border border-red-100">
            <SliderProducts
              userId={userId?.toString()}
              productData={collabProducts}>
            </SliderProducts>
          </div>
        </div>

        {/*Sản phẩm bán chạy*/}
        <div className="flex flex-col mt-1 px-1 xl:px-0">
          <div className="flex items-center mb-[0.1rem] xl:mb-1 pl-2 h-14 bg-white rounded-t-lg border border-red-100">
            <img src="/img/best_seller.png" alt="best_seller" className="w-[3rem]"/>
            <div className="flex px-4 text-sm items-center">
              <div className="text-sm md:text-[150%] font-semibold font-['Inter'] tracking-wider">
                Sản phẩm bán chạy
              </div>
            </div>
          </div>
          <div className="bg-white border-x border-b xl:border border-red-100">
          <SliderProducts
              userId={userId?.toString()}
              productData={bestSellerData}>
            </SliderProducts>
          </div>
        </div>
      </div>
    </div>
  );
};

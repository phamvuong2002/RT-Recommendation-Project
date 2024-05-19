import React, { useEffect, useState, useContext } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Slider } from '../components/Slider';
import { FlashSale } from '../components/FlashSale';
import { Category } from '../components/Category';
import { SliderProducts } from '../components/SliderProducts';
import { AllProducts } from '../components/AllProducts';
import { InfoForGuest } from '../components/infoForGuest';
import { fetchAPI } from '../helpers/fetch';
import { getAllBook } from '../apis/book';
import { AppContext } from '../contexts/main';
import { isMobileDevice } from '../utils/isMobileDevice';
import { searchbestselling } from '../apis/recommendation';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const { userId, numCart, setNumCart, token, setIsLoading } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(userId);
  const [products, setProducts] = useState([]);
  const [bestSellerData, setBestSellerData] = useState([]);
  const { setActivePage, setIsShowFooter } = useContext(AppContext);

  //set active page
  useEffect(() => {
    setActivePage('Home');
    setIsShowFooter(true);
  }, []);

  //load best seller books
  useEffect(() => {
    const loadBestSellerData = async () => {
      setIsLoading(true);
      const data = await fetchAPI(`../${searchbestselling}`, 'POST', {
        pageNumber: 1,
        pageSize: 12,
      });
      if (data.status != 200) {
        setBestSellerData([]);
        setIsLoading(false);
        return;
      }
      setBestSellerData(data?.metadata?.books);
      setIsLoading(false);
    };
    loadBestSellerData();
  }, [userId]);

  //get message --- Để đây để làm update sản phẩm bestseller realtime
  useEffect(() => {
    const client = new W3CWebSocket('ws://localhost:3050');
    // Lắng nghe sự kiện mở kết nối
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    // Lắng nghe tin nhắn từ server
    client.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        alert('Received message::' + data?.key);
      } catch (error) {
        console.log('Received error::' + error.message);
        return;
      }
      // Xử lý tin nhắn ở đây
    };

    // Xử lý sự kiện đóng kết nối
    client.onclose = () => {
      console.log('WebSocket Client Disconnected');
    };
    // Clean up: đóng kết nối khi component bị unmount
    return () => {
      client.close();
    };
  }, []);

  useEffect(() => {
    const loadProductData = async () => {
      const productData = await fetchAPI(`../${getAllBook}`, 'POST');
      setProducts(productData.metadata);
    };
    setTimeout(() => {
      loadProductData();
    }, 1000);
  }, []);

  return (
    <div className="pb-10 sm:pb-0">
      <Slider></Slider>
      <div className="mx-2 md:mx-16">
        {/* <FlashSale userId={userId} productData={products}></FlashSale> */}
        {/* Sách bán chạy */}

        {!bestSellerData ? (
          ''
        ) : (
          <div className="bg-white flex flex-col gap-4 my-5 py-4 px-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-2 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-[#ffbe98] w-[5%] md:w-[2%]"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-[90%] md:text-[150%] font-semibold font-['Inter'] tracking-wider">
                  Xu hướng mua sắm
                </div>
              </div>
              <div className="font-inter w-[10rem] xl:[w-8rem] items-center px-4">
                <button
                  className="items-center text-sm xl:text-base font-normal hover:text-red-500"
                  onClick={() =>
                    navigate(
                      `search_v2?search=&sort=create_time_desc&page=1&limit=24&search_type=${'best_seller_suggest'}`,
                    )
                  }
                >
                  Xem Thêm
                </button>
              </div>
            </div>
            <SliderProducts
              userId={userId}
              productData={bestSellerData}
              isShowProgress={true}
            />
          </div>
        )}
        {token ? '' : <InfoForGuest></InfoForGuest>}

        {/*Sản phẩm bán chạy*/}
        <div className="h-full">
          <AllProducts
            isShowHeader={true}
            numOfProductsInRow={5}
            // _limit={isMobileDevice() ? 2 : 10}
            _limit={24}
            _choose={'all'}
          ></AllProducts>
        </div>

        {/* Top 5 thể loại ưa chuộng */}
        <Category></Category>

        {/* Xu hướng mua sắm */}
        <div className="my-5">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-[#ffbe98] w-[5%] md:w-[2%]"
            >
              <path
                fillRule="evenodd"
                d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-[90%] md:text-[150%] font-semibold font-['Inter'] tracking-wider">
              Xu hướng mua sắm
            </div>
          </div>
          {/* <SliderProducts
            userId={userId}
            productData={products}
          ></SliderProducts> */}
        </div>
      </div>
    </div>
  );
};

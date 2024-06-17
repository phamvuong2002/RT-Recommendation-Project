import React, { useEffect, useState, useContext } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Slider } from '../components/Slider';
import { FlashSale } from '../components/FlashSale';
import { Category } from '../components/Category';
import { SliderProducts } from '../components/SliderProducts';
import { AllProducts } from '../components/AllProducts_v2';
import { InfoForGuest } from '../components/infoForGuest';
import { fetchAPI } from '../helpers/fetch';
import { getAllBook } from '../apis/book';
import { AppContext } from '../contexts/main';
import {
  categorybestselling,
  categorypersonalrec,
  categorypopularrec,
  getbestselling,
  getconbasbook,
  searchbestselling,
  searchrecbook,
} from '../apis/recommendation';
import { useNavigate } from 'react-router-dom';
import { CircleLoader } from '../components/loaders/CircleLoader';
import { ShoppingCartLoader } from '../components/loaders/ShoppingCartLoader';
import { CartLoader } from '../components/loaders/CardLoader';
import { SaleBanner } from '../components/banners/SaleBanner';

const CATE_TYPE = {
  BEST_SELLER: {
    name: 'best_seller',
    url: categorybestselling,
    search: 'best_seller_suggest',
  },
  POPULAR_RECOMMENDATION: {
    name: 'popular_recommendation',
    url: categorypopularrec,
    search: 'normal',
  },
  PERSONAL_RECOMMENDATION: {
    name: 'personal_recommendation',
    url: categorypersonalrec,
    search: 'normal',
  },
};

export const Home = () => {
  const {
    userId,
    numCart,
    setNumCart,
    token,
    activePage,
    setIsLoading,
    setActivePage,
    setIsShowFooter,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [bestSellerData, setBestSellerData] = useState([]);
  const [bestSellerCates, setBestSellercates] = useState([]);
  const [typeCate, setTypeCate] = useState(CATE_TYPE.POPULAR_RECOMMENDATION);
  const [reloadBestSelling, setReloadBestSelling] = useState(true);
  const [personalRecBooks, setPersonalRecBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loadPersonalBook, setLoadPersonalBooks] = useState(false);
  const [isLoadingCate, setIsLoadingCate] = useState(false);


  //set active page
  useEffect(() => {
    setActivePage('Home');
    setIsShowFooter(true);
  }, []);

  //load best seller books
  useEffect(() => {
    const loadBestSellerData = async () => {
      if (!reloadBestSelling) return;
      if (!userId) setIsLoading(true);
      const data = await fetchAPI(`../${getbestselling}`, 'POST', {
        pageNumber: 1,
        pageSize: 12,
      });
      if (data.status != 200) {
        setBestSellerData([]);
        setIsLoading(false);
        setReloadBestSelling(false);
        return;
      }
      setBestSellerData(data?.metadata?.books);
      setIsLoading(false);
      setReloadBestSelling(false);
    };
    //get best seller data
    loadBestSellerData();
  }, [userId, reloadBestSelling]);

  //get Cate
  useEffect(() => {
    const loadCateData = async (type) => {
      setBestSellercates([]);
      setIsLoadingCate(true);
      const data = await fetchAPI(`../${type?.url}`, 'POST', {
        top: 5,
        userId,
      });
      if (data.status != 200) {
        setBestSellercates([]);
        setIsLoadingCate(false);
        return;
      }
      setIsLoadingCate(false);
      setBestSellercates(data?.metadata);
    };
    //Cate data
    if (userId) loadCateData(typeCate);
  }, [userId, typeCate]);

  //get message --- Để đây để làm update sản phẩm bestseller realtime
  useEffect(() => {
    const client = new W3CWebSocket(
      `ws://${import.meta.env.VITE_BACKEND_SERVER_URI}`,
    );
    // Lắng nghe sự kiện mở kết nối
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    // Lắng nghe tin nhắn từ server
    client.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        if (data.key === 'best-selling') {
          setReloadBestSelling(true);
        }
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

  //Lấy danh sách sản phẩm đề xuất
  useEffect(() => {
    const loadProductData = async () => {
      if (!userId) return;
      if (!loadPersonalBook) {
        console.log;
        const dataConbas = await fetchAPI(`../${getconbasbook}`, 'POST', {
          page: parseInt(page),
          limit: 24,
          userId,
        });

        if (dataConbas.status != 200 || dataConbas?.metadata == null) {
          setPersonalRecBooks([]);
          setTotalPages(0);
          setLoadPersonalBooks(true);
        } else {
          setPersonalRecBooks(dataConbas?.metadata?.books);
          setTotalPages(dataConbas.metadata?.totalPages);
        }
        return;
      }

      const data = await fetchAPI(`../${searchrecbook}`, 'POST', {
        page: parseInt(page),
        limit: 24,
        categories: 'sach-tieng-viet',
        userId,
      });
      if (data.status != 200) {
        setPersonalRecBooks([]);
        setTotalPages(0);
        return;
      }
      // console.log('metadata:::', data?.metadata);
      setPersonalRecBooks(data?.metadata?.books);
      setTotalPages(data.metadata?.totalPages);
    };

    loadProductData();
  }, [page, userId, loadPersonalBook]);

  return (
    <div className="pb-10 sm:pb-0">
      {/* TEst */}
      {/* <div className="">
        <SaleBanner />
      </div> */}

      <div className="">
        {/* Main banner */}
        <div className="flex flex-col py-2 xl:gap-4 rounded-lg md:mx-16">
          <Slider />
        </div>

        {/* Sách bán chạy */}
        {!bestSellerData ? (
          ''
        ) : (
          <div className="bg-flash-sale">
            <div className="flex flex-col gap-1 xl:my-2 py-3 px-2 rounded-lg md:mx-16">
              <div className="bg-white h-14 rounded-tl-lg rounded-tr-lg flex justify-between">
                <div className="flex items-center gap-2 w-full">
                  <div className="flex xl:gap-4 gap-1 items-center xl:px-2">
                    <img
                      src="/img/flash_sale_icon.png"
                      alt="flash-sale-icon"
                      className="xl:w-16 w-12"
                    />
                    <div className="flex gap-6">
                      <div className="hidden xl:block text-[90%] md:text-2xl font-medium font-['Inter'] tracking-wider">
                        Xu hướng mua sắm
                      </div>
                      <FlashSale />
                    </div>
                  </div>
                </div>
                <div
                  className="flex gap-2 font-inter w-[12rem] xl:[w-8rem] items-center xl:px-4 pl-6 cursor-pointer hover:text-red-500"
                  onClick={() =>
                    navigate(
                      `search_v2?search=&sort=create_time_desc&page=1&limit=24&search_type=${CATE_TYPE.BEST_SELLER.search}`,
                    )
                  }
                >
                  <div className="xl:ml-7 items-center text-sm xl:text-base font-normal ">
                    Xem Thêm
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4 xl:size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </div>
              {bestSellerData.length === 0 ? (
                <CartLoader items={5} />
              ) : (
                <SliderProducts
                  userId={userId}
                  productData={bestSellerData}
                  isShowProgress={true}
                />
              )}
            </div>
          </div>
        )}

        {/* Banner Đăng Ký cho GUEST*/}
        {token ? (
          ''
        ) : (
          <div className="md:px-16">
            <InfoForGuest />
          </div>
        )}

        {/* Thể loại ưa chuộng */}
        <div className="md:px-16">
          <div className="bg-gradient-to-r from-red-200 via-purple-100 to-pink-100 flex flex-col gap-4 xl:my-5 my-1 py-4 px-2 rounded-lg">
            <div className="flex justify-between">
              <div className="flex items-center gap-2 w-full">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color-glass/48/categorize.png"
                  alt="categorize"
                />
                <div className="text-[90%] text-red-600 md:text-2xl font-medium font-['Inter'] tracking-wider">
                  Thể loại ưa chuộng
                </div>
              </div>
              <div
                className="flex gap-2 font-inter text-red-400 w-[12rem] xl:[w-8rem] items-center px-4 cursor-pointer hover:text-red-500"
                onClick={() =>
                  navigate(
                    `search_v2?search=&sort=create_time_desc&page=1&limit=24&search_type=${typeCate?.search}`,
                  )
                }
              >
                <div className="xl:ml-7 items-center text-sm xl:text-base font-normal ">
                  Xem Thêm
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4 xl:size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>

            {/* Choose Type */}
            <div className="text-sm font-medium text-center text-gray-500 border-b border-white dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                <li className="me-2 cursor-pointer">
                  <div
                    className={`inline-block p-4 border-b-2 rounded-t-lg transition-all duration-200 ${typeCate?.name === CATE_TYPE.BEST_SELLER.name ? 'text-red-600  border-red-600 active dark:text-red-500 dark:border-red-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'} `}
                    onClick={() => setTypeCate(CATE_TYPE.BEST_SELLER)}
                  >
                    Nổi Bật
                  </div>
                </li>
                <li className="me-2 cursor-pointer">
                  <div
                    className={`inline-block p-4 border-b-2 rounded-t-lg transition-all duration-200 ${typeCate?.name === CATE_TYPE.POPULAR_RECOMMENDATION.name ? 'text-red-600  border-red-600 active dark:text-red-500 dark:border-red-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'} `}
                    onClick={() =>
                      setTypeCate(CATE_TYPE.POPULAR_RECOMMENDATION)
                    }
                  >
                    Đề Xuất Phổ Biến
                  </div>
                </li>
                <li className="me-2 hidden xl:block cursor-pointer">
                  <div
                    className={`inline-block p-4 border-b-2 rounded-t-lg transition-all duration-200 ${typeCate?.name === CATE_TYPE.PERSONAL_RECOMMENDATION.name ? 'text-red-600  border-red-600 active dark:text-red-500 dark:border-red-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'} `}
                    onClick={() =>
                      setTypeCate(CATE_TYPE.PERSONAL_RECOMMENDATION)
                    }
                  >
                    Đề Xuất Cho Bạn
                  </div>
                </li>
                {/* for mobile */}
                <li className="me-2 xl:hidden">
                  <div
                    className={`inline-block p-4 border-b-2 rounded-t-lg transition-all duration-200 ${typeCate?.name === CATE_TYPE.PERSONAL_RECOMMENDATION.name ? 'text-red-600  border-red-600 active dark:text-red-500 dark:border-red-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'} `}
                    onClick={() =>
                      setTypeCate(CATE_TYPE.PERSONAL_RECOMMENDATION)
                    }
                  >
                    Cho Bạn
                  </div>
                </li>
              </ul>
            </div>

            <Category
              categoryData={bestSellerCates}
              _cateType={typeCate?.search}
              isloading={isLoadingCate}
              setIsLoading={setIsLoadingCate}
            />
          </div>
        </div>

        {/*Sản phẩm bán chạy*/}
        <div className="md:px-16">
          <div className="bg-gradient-to-r from-red-200 via-purple-100 to-pink-100 flex flex-col gap-4 xl:my-0 my-1 xl:py-4 py-1 px-2 rounded-tl-lg rounded-tr-lg">
            <div className="flex justify-between">
              <div className="flex items-center gap-2 w-full">
                <img
                  width="48"
                  height="48"
                  src="/logo/logo_icon_happy.png"
                  alt="categorize"
                />
                <div className="text-[90%] text-gray-800 md:text-2xl font-medium font-['Inter'] tracking-wider">
                  Sách dành riêng cho bạn
                </div>
              </div>
            </div>
          </div>
          <div className=" bg-gradient-to-r from-red-50 via-purple-100 to-pink-50 xl:from-white xl:via-white xl:to-white p-2 xl:px-4 ">
            {/* <AllProducts
              isShowHeader={false}
              numOfProductsInRow={5}
              // _limit={isMobileDevice() ? 2 : 10}
              _limit={24}
              _choose={'all'}
            ></AllProducts> */}

            <AllProducts
              productsData={personalRecBooks}
              numOfProductsInRow={5}
              _totalPages={totalPages}
              setPage={setPage}
              page={page}
            ></AllProducts>
          </div>
        </div>
      </div>
    </div>
  );
};

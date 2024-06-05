import React, { useContext, useEffect, useState } from 'react';
import NavigationPath from '../components/NavigationPath';
import { Payment } from '../components/PaymentComponent';
import { AppContext } from '../contexts/main';
import { useNavigate } from 'react-router-dom';
import { recLatestBook,getbestselling } from '../apis/recommendation';
import { SliderProducts } from '../components/SliderProducts';
import { fetchAPI } from '../helpers/fetch';
export const PaymentPage = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [collabProducts, setCollabProducts] = useState([]);
  const [bestSellerData, setBestSellerData] = useState([]);

  const type = queryParams.get('type');
  const paths = [
    { path: '/', label: 'Trang Chủ' },
    { path: `/${'shoppingcarts'}`, label: `${'Giỏ hàng'}` },
    { path: `#`, label: `${'Thanh Toán'}` },
  ];
  const {
    userId,
    numCart,
    token,
    requestAuth,
    setRequestAuth,
    setIsShowFooter,
    setIsLoading,
  } = useContext(AppContext);

  //set footer
  useEffect(() => {
    setIsShowFooter(false);
  }, []);

  //Check Authen
  useEffect(() => {
    if (
      (!token || token === 'unknow' || token === null) &&
      requestAuth === false
    ) {
      setRequestAuth(true);
    }
  }, [userId, token, requestAuth]);

  //Get numCart
  useEffect(() => {
    if (numCart === 0 && type === 'cart') {
      navigate('/shoppingcarts');
    }
  }, [numCart]);

    //COLLABORATIVE FILTERING
    //15 cuốn được train mới nhất
    useEffect(() => {
      const collabBook = async () => {
        const rec_book = await fetchAPI(`../${recLatestBook}`, 'POST', {
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

  //BEST SELLER
  //load best seller books
  useEffect(() => {
    const loadBestSellerData = async () => {
      setIsLoading(true);
      const data = await fetchAPI(`../${getbestselling}`, 'POST', {
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
    //get best seller data
    loadBestSellerData();
  }, [userId]);

  return (
    <div className="flex flex-col mb-10">
      <NavigationPath components={paths} />
      <div className="bg-gray-100 flex flex-col xl:px-28 gap-[0.2rem]">
        <div className="pb-2">
          <Payment />
        </div>

        {/*Dành cho bạn*/}
        <div className={`flex flex-col mt-1 px-1 xl:px-0 ${collabProducts.length===0?'hidden':''}`}>
          <div className="flex items-center mb-[0.1rem] xl:mb-1 pl-2 h-14 bg-white rounded-t-lg border border-red-100">
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
            <div className="flex px-4 text-sm items-center">
              <div className="text-sm md:text-[150%] font-semibold font-['Inter'] tracking-wider">
                Sản phẩm bán chạy
              </div>
            </div>
          </div>
          <div className="bg-white border-x border-b xl:border border-red-100">
            {/* <AllProducts
              pages={pages}
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            ></AllProducts> */}
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

import React, { useContext, useEffect, useState } from 'react';
import NavigationPath from '../components/NavigationPath';
import { Payment } from '../components/PaymentComponent';
import { AppContext } from '../contexts/main';
import { useNavigate } from 'react-router-dom';
import { recLatestBook,getbestselling, usersvdrating } from '../apis/recommendation';
import { SliderProducts } from '../components/SliderProducts';
import { fetchAPI } from '../helpers/fetch';
export const PaymentPage = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [collabProducts, setCollabProducts] = useState([]);
  const [highRatingData, setHighRatingData] = useState([]);

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
    setIsProgressLoading
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
        if(!userId) return;
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
    const loadHighRatingData = async () => {
      if(!userId) return;
      setIsProgressLoading(true);
      const data = await fetchAPI(`../${usersvdrating}`, 'POST', {
        userId,
        quantity: 24,
        model_type : "online"
      });
      if (data.status != 200) {
        setHighRatingData([]);
        setIsProgressLoading(false);
        return;
      }
      setHighRatingData(data?.metadata);
      setIsProgressLoading(false);
    };
    //get best seller data
    loadHighRatingData();
  }, [userId]);

  return (
    <div className="flex flex-col mb-10">
      <NavigationPath components={paths} />
      <div className="bg-gray-100 flex flex-col xl:px-28 gap-[0.2rem]">
        <div className="pb-2">
          <Payment />
        </div>

        {/*best recommend*/}
        {
          highRatingData.length === 0 ? "":
          <div className="flex flex-col mt-1 px-1 xl:px-0 bg-">
            <div className="flex items-center mb-[0.1rem] xl:mb-1 pl-2 h-14 bg-pink-200 rounded-t-lg border border-pink-200">
              <div className="">
                <img src="/img/love_product.png" alt="love_product" className="w-[3rem]"/>
              </div>
              <div className="flex px-4 text-sm items-center">
                <div className="text-sm md:text-[150%] text-pink-500 font-semibold font-['Inter'] tracking-wider">
                  Có Thể Bạn Cũng Thích
                </div>
              </div>
            </div>
            <div className="bg-white border-x border-b xl:border border-pink-200">
              <SliderProducts
                userId={userId?.toString()}
                productData={highRatingData}>
              </SliderProducts>
            </div>
          </div>
        }
        

        {/*Dành cho bạn*/}
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
      </div>
    </div>
  );
};

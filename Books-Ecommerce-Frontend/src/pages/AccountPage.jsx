import { React, useContext, useEffect, useState } from 'react';
import NavigationPath from '../components/NavigationPath';
import SideBarNav from '../components/SideBarNav';
import { ProductListStatus } from '../components/ProductListStatus';
import { GeneralInfo } from '../components/GeneralInfo';
import { OrderInfo } from '../components/OrderInfo';

import { useParams } from 'react-router-dom';
import { ProfileAccount } from '../components/ProfileAccount';
import { AppContext } from '../contexts/main';

import { SliderProducts } from '../components/SliderProducts';
import { recRandomBook } from '../apis/recommendation';
import { fetchAPI } from '../helpers/fetch';
const TAB = {
  'general-infomation': 'Tổng Quan',
  'profile-infomation': 'Thông Tin Tài Khoản',
  'orders-infomation': 'Thông Tin Đơn Hàng',
  'following-infomation': 'Mục yêu thích',
};

export const AccountPage = () => {
  const {
    userId,
    setActivePage,
    setIsShowFooter,
    token,
    requestAuth,
    setRequestAuth,
  } = useContext(AppContext);
  const [selectedPage, setSelectedPage] = useState(TAB['general-infomation']);
  const [selectedPageId, setSelectedPageId] = useState('general-infomation');
  const [paths, setPaths] = useState([]);
  const [collabProducts, setCollabProducts] = useState([]);

  const { tab } = useParams();

  //Check Authen
  useEffect(() => {
    if (
      (!token || token === 'unknow' || token === null) &&
      requestAuth === false
    ) {
      setRequestAuth(true);
    }
  }, [userId, token, requestAuth]);

  useEffect(() => {
    if (!tab) {
      return;
    } else {
      setSelectedPageId(tab);
      setSelectedPage(TAB[tab]);
    }
  }, []);

  //set active page
  useEffect(() => {
    //console.log('selectedPageId::', selectedPageId);
    if (selectedPageId === 'orders-infomation') {
      setActivePage('Order');
    } else {
      setActivePage('Account');
    }

    setIsShowFooter(true);
  }, [selectedPageId]);

  useEffect(() => {
    setPaths([
      { path: '/', label: 'Trang Chủ' },
      { path: `#`, label: `${'Tài khoản'}` },
      {
        path: `/${'account'}/${selectedPageId}`,
        label: `${TAB[selectedPageId]}`,
      },
    ]);
    setSelectedPage(TAB[selectedPageId]);
  }, [selectedPageId]);

  useEffect(() => {
    //console.log(selectedPage, TAB[selectedPageId]);
  }, [selectedPageId]);

  //COLLABORATIVE FILTERING
  //15 cuốn random được train trong ngày
  useEffect(() => {
    const collabBook = async () => {
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


  return (
    <div className="mb-4 ">
      <NavigationPath components={paths} />
      <div className="xl:flex align-top xl:h-lvh w-full justify-around overflow-hidden py-4">
        <SideBarNav
          setSelectedPage={setSelectedPage}
          setSelectedPageId={setSelectedPageId}
        />
        {/* <div className='w-2/3'> */}
        {/* <div className='flex flex-col'> */}
        {selectedPageId === 'general-infomation' && <GeneralInfo />}
        {selectedPageId === 'profile-infomation' && <ProfileAccount />}
        {selectedPageId === 'orders-infomation' && <OrderInfo />}
        {selectedPageId === 'following-infomation' && (
          <ProductListStatus _userId={userId} />
        )}

      </div>
        {/*Gợi ý Có thể bạn sẽ thích*/}
        <div className={`flex flex-col mt-[-5rem] px-1 xl:px-[3rem] ${collabProducts.length===0 ||selectedPageId!=='following-infomation' ?'hidden':''}`}>
          <div className="flex items-center mb-[0.1rem] xl:mb-1 pl-2 h-14 bg-gradient-to-t from-red-50 to-gray-50 rounded-t-lg border border-red-100">
            <img src="/img/for_you.png" alt="for_you" className="w-[3rem]"/>
            <div className="flex px-4 text-sm items-center">
              <div className="text-sm md:text-[150%] font-bold text-red-500  font-['Inter'] tracking-wider">
                Dành cho bạn
              </div>
            </div>
          </div>
          <div className="bg-white border-x border-b xl:border border-red-100">
            <SliderProducts
              userId={userId?.toString()}
              productData={collabProducts}
            ></SliderProducts>
          </div>
        </div>
    </div>
    // </div>
    // </div>
  );
};

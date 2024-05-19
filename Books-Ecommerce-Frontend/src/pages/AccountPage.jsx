import { React, useContext, useEffect, useState } from 'react';
import NavigationPath from '../components/NavigationPath';
import SideBarNav from '../components/SideBarNav';
import { ProductListStatus } from '../components/ProductListStatus';
import { GeneralInfo } from '../components/GeneralInfo';
import { OrderInfo } from '../components/OrderInfo';

import { useParams } from 'react-router-dom';
import { ProfileAccount } from '../components/ProfileAccount';
import { AppContext } from '../contexts/main';

const TAB = {
  'general-infomation': 'Tổng Quan',
  'profile-infomation': 'Thông Tin Tài Khoản',
  'orders-infomation': 'Thông Tin Đơn Hàng',
  'following-infomation': 'Theo Dõi Sách',
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

  return (
    <div className="mb-4">
      <NavigationPath components={paths} />
      <div className="grid-cols-1 sm:flex sm:align-top h-lvh w-full justify-around overflow-hidden py-4">
        <SideBarNav
          setSelectedPage={setSelectedPage}
          setSelectedPageId={setSelectedPageId}
        />
        {selectedPageId === 'general-infomation' && <GeneralInfo />}
        {selectedPageId === 'profile-infomation' && <ProfileAccount />}
        {selectedPageId === 'orders-infomation' && <OrderInfo />}
        {selectedPageId === 'following-infomation' && (
          <ProductListStatus _userId={userId} />
        )}
      </div>
    </div>
  );
};

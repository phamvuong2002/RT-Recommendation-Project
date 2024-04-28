import React, { useContext, useEffect } from 'react';
import NavigationPath from '../components/NavigationPath';
import { Payment } from '../components/PaymentComponent';
import { AppContext } from '../contexts/main';
import { useNavigate } from 'react-router-dom';

export const PaymentPage = () => {
  const navigate = useNavigate();
  const paths = [
    { path: '/', label: 'Trang Chủ' },
    { path: `/${'shoppingcarts'}`, label: `${'Giỏ hàng'}` },
    { path: `/${'payment'}`, label: `${'Thanh Toán'}` },
  ];
  const { numCart, token, requestAuth, setRequestAuth, setIsShowFooter } =
    useContext(AppContext);

  //set footer
  useEffect(() => {
    setIsShowFooter(false);
  }, []);

  //Check Authen
  useEffect(() => {
    if (token === null && requestAuth === false) {
      // setRequestAuth(true);
    }
  }, [token, requestAuth]);

  //Get numCart
  useEffect(() => {
    if (numCart === 0) {
      navigate('/shoppingcarts');
    }
  }, [numCart]);

  return (
    <div className="flex flex-col mb-10">
      <NavigationPath components={paths} />
      <div className="bg-gray-100 flex flex-col xl:px-28 gap-[0.2rem]">
        <div className="pb-2">
          <Payment />
        </div>
      </div>
    </div>
  );
};

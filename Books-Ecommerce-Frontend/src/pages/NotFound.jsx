import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/main';

export const NotFound = () => {
  const { setIsShowFooter, setActivePage } = useContext(AppContext);
  useEffect(() => {
    setActivePage('');
    setIsShowFooter(true);
  }, []);
  return (
    <div className="mb-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p className="mb-4 text-lg text-gray-600">
          Oops! Chúng tôi không tìm thấy bất kỳ sản phẩm nào
        </p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-600">
          Trở về Trang Chủ{' '}
          <Link to="../" className="text-red-500 cursor-pointer">
            Trang Chủ
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

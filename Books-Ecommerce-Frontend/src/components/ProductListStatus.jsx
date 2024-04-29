import React from 'react'
import { AllProducts } from './AllProducts'
import PropTypes from 'prop-types';


export const ProductListStatus = () => {
  return (
    <div className="w-full sm:w-[60%] h-[85%] mr-10 bg-white px-5  shadow-xl rounded-[5px]  flex flex-col items-center ">
      <div className="w-full sticky top-0 text-lg font-semibold text-red-500 font-inter py-5">Theo dõi sách</div>
      <div className="w-full max-w-full h-full  gap-y-5 overflow-y-auto">
        <AllProducts
          _limit={1}
          numOfProductsInRow={3}
          _choose={"favorite"}>
        </AllProducts>
      </div>
    </div>
  )
}
import React from 'react'
import { AllProducts } from './AllProducts'
import PropTypes from 'prop-types';


export const ProductListStatus = () => {
  return (
    <div className="flex flex-col xl:w-2/3 overflow-y-auto sm:w-[60%] h-[85%]  bg-white px-5 shadow-xl rounded-[0.325rem]   items-center ">
      <div className="w-full sticky top-0 text-lg font-semibold text-red-500 font-inter py-5">Sách yêu thích</div>
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
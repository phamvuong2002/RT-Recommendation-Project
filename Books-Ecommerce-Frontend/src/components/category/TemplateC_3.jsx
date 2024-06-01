import React, { useEffect, useState } from 'react';
import './templateC.css';
import { useNavigate } from 'react-router-dom';
import { shortenString } from '../../utils/shortenString';

export const TemplateC_3 = ({ categoryData }) => {
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    const categories = category?.category || [];
    const cateSlugs = categories
      .map((c) => c.cateSlug)
      .filter(Boolean)
      .join(',');

    const link = `search_v2?search=&sort=create_time_desc&page=1&limit=24&search_type=best_seller_suggest&categories=${cateSlugs}`;
    navigate(link);
  };

  useEffect(() => {
    setCategory(categoryData);
  }, [categoryData]);

  return (
    <div
      className="font-inter text-[#8967AC] font-semibold bg-gradient-to-r from-red-200 via-purple-100 to-pink-100  hover:from-pink-200 hover:via-purple-100 hover:to-red-100 hover:text-red-400 rounded-md shadow-lg cursor-pointer w-full xl:h-[19rem]"
      onClick={handleNavigate}
    >
      {/* Desktop */}
      <div className="xl:flex justify-between hidden">
        <div className="hidden md:block text-[18px] font-bold p-2">
          {category?.category?.[category?.category.length - 1]?.cateName}
        </div>
        <div className="flex gap-2 font-inter items-center px-4 cursor-pointer hover:text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 xl:size-5 hidden xl:block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>

      {/* background */}
      <div className="relative xl:inline-block w-full h-full hidden">
        <img
          src="./img/category_template/template_1_2_temp.png"
          alt=""
          className="absolute inset-0 z-10 w-full h-[85.8%] rounded-bl-md rounded-br-md"
        />
        {/* Book Images */}
        <div className="relative z-10 flex top-[0.35rem] left-[1.8rem] gap-[1.8rem] w-[50%]">
          <div className="flex flex-col gap-[0.9rem] pt-1 pl-6">
            <img
              src={category?.images[0]}
              alt="image1"
              className="w-[4.5rem] h-28 rounded-sm "
            />
            <img
              src={category?.images[1]}
              alt="image2"
              className="w-[4.5rem] h-28 rounded-sm "
            />
          </div>
          <div className="flex mt-[3.6rem]">
            <img
              src={category?.images[2]}
              alt="image3"
              className="w-[4.5rem] h-28 rounded-sm "
            />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="xl:hidden flex flex-col ">
        <div>
          <img
            className="w-full h-full"
            src="./img/category_template/template_1_2_mb.png"
            alt={category?.category?.[category?.category.length - 1]?.cateName}
          />
          {/* Book Images */}
          <div className="fixed z-10 flex top-[1rem] left-1 w-full">
            <div className="flex gap-[0.2rem] items-center ">
              <img
                src={category?.images[0]}
                alt="image1"
                className="w-[2rem] h-[3rem] rounded-sm border border-green-600"
              />
              <img
                src={category?.images[1]}
                alt="image2"
                className="w-[2rem] h-[3rem] rounded-sm border border-green-600"
              />
              <img
                src={category?.images[2]}
                alt="image3"
                className="w-[2rem] h-[3rem] rounded-sm border border-green-600"
              />
            </div>
          </div>
        </div>
        <div className="bg-white w-full p-1">
          <div className="text-xs font-semibold text-indigo-800">
            {shortenString(
              category?.category?.[category?.category.length - 1]?.cateName,
              24,
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

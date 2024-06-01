import React, { useEffect, useState } from 'react';
import './templateC.css';
import { useNavigate } from 'react-router-dom';
import { shortenString } from '../../utils/shortenString';

export const TemplateC_1 = ({
  categoryData,
  cateType = null,
  template_img = 1,
}) => {
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();
  const [url, setUrl] = useState(cateType);

  useEffect(() => {
    setUrl(cateType);
  }, [cateType]);

  const handleNavigate = () => {
    const categories = category?.category || [];
    const cateSlugs = categories
      .map((c) => c.cateSlug)
      .filter(Boolean)
      .join(',');

    const link = `search_v2?search=&sort=create_time_desc&page=1&limit=24&search_type=${url || 'best_seller_suggest'}&categories=${cateSlugs}`;
    navigate(link);
  };

  useEffect(() => {
    setCategory(categoryData);
  }, [categoryData]);

  return (
    <div
      className="relative font-inter text-[#8967AC] font-semibold bg-gradient-to-r from-red-50 via-purple-50 to-pink-50  hover:from-pink-200 hover:via-purple-100 hover:to-red-100 hover:text-red-400 hover:shadow-2xl rounded-md shadow-lg cursor-pointer w-full "
      onClick={handleNavigate}
    >
      {/* Desktop */}
      <div className="xl:flex justify-between hidden">
        <div className="hidden md:block text-[16px] font-bold p-2 whitespace-nowrap overflow-x-auto no-scrollbar">
          {shortenString(
            category?.category?.[category?.category.length - 1]?.cateName,
            25,
            true,
          )}
        </div>
        <div className="flex gap-2 font-inter items-center pr-1 cursor-pointer">
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
      <div className="relative xl:inline-block w-full h-full hidden p-1">
        <div className="flex flex-col">
          <div className="h-[60%]">
            <img
              src={`./img/category_template/template_1_${template_img}_mb.png`}
              alt={`template_cate_${template_img}`}
              className="w-full max-h-[10rem] object-cover border border-white"
            />
          </div>
          <div className="flex py-1 h-[40%] bg-white items-center justify-center">
            {category?.images?.length === 0
              ? ''
              : category?.images
                  // .concat(category.images.slice(-1))
                  .map((book_img, index) => (
                    <div key={index} className="">
                      <img
                        src={book_img}
                        alt={`image${index + 1}`}
                        className="w-24"
                      />
                    </div>
                  ))}
          </div>
        </div>

        {/* Book Images */}
        {/* <div className="relative z-10 flex flex-col top-1 left-3 gap-[0.9rem] justify-center items-center w-[50%]">
          <div className="flex gap-1 pt-1 pl-6">
            <img
              src={category?.images[0]}
              alt="image1"
              className="w-[4.5rem] h-[7rem] rounded-sm"
            />
          </div>
          <div className="flex gap-7 ml-8">
            <img
              src={category?.images[1]}
              alt="image2"
              className="w-[4.5rem] h-[7rem] rounded-sm"
            />
            <img
              src={category?.images[2]}
              alt="image3"
              className="w-[4.5rem] h-[7rem] rounded-sm"
            />
          </div>
        </div> */}
      </div>

      {/* Mobile */}
      <div className="xl:hidden flex flex-col ">
        <div>
          <img
            className="w-full h-full"
            src="./img/category_template/template_1_4_mb.png"
            alt={category?.category?.[category?.category.length - 1]?.cateName}
          />
          {/* Book Images */}
          <div className="fixed z-10 flex flex-col top-1 gap-[0.1rem] left-3 justify-center items-center w-[50%]">
            <div className="flex">
              <img
                src={category?.images[0]}
                alt="image1"
                className="w-[2rem] h-[2.6rem] rounded-sm border border-pink-400"
              />
            </div>
            <div className="flex gap-[0.1rem]">
              <img
                src={category?.images[1]}
                alt="image2"
                className="w-[2rem] h-[2.6rem] rounded-sm border border-pink-400"
              />
              <img
                src={category?.images[2]}
                alt="image3"
                className="w-[2rem] h-[2.6rem] rounded-sm border border-pink-400"
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

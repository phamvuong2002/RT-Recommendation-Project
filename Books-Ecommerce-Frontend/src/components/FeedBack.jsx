import React, { useEffect, useRef, useState } from 'react';
import { StarRating } from './StarRating';
import { DropDownClick } from './DropDownClick';
import { fetchAPI } from '../helpers/fetch';
import { getfeedback, summary } from '../apis/feedback';
import { formatDate } from '../utils/formatDate';
import ReactPaginate from 'react-paginate';
import { ShoppingCartLoader } from './loaders/ShoppingCartLoader';
import { formatNumberToText } from '../utils/formatNumberToText';

const SAMPLESORT = {
  default: 'Gần Đây',
  a_z: 'Đánh giá: Từ cao tới thấp',
  z_a: 'Đánh giá: Từ thấp tới cao',
};

const SAMPLESTAR = {
  default: 'Tất Cả',
  1: '1 sao',
  2: '2 sao',
  3: '3 sao',
  4: '4 sao',
  5: '5 sao',
};

export const FeedBack = ({ bookId }) => {
  const LIMIT = 10;
  const [summaryBook, setSummaryBook] = useState('');
  const [comments, setComments] = useState([]);
  const [countComments, setCountComments] = useState(0);
  const [pageLoading, setPageLoading] = useState(false);
  const [sort, setSort] = useState('default');
  const [filter, setFilter] = useState('default');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const sortIcon = (className) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
        />
      </svg>
    );
  };

  const filterIcon = (className) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
        />
      </svg>
    );
  };

  //Xử lý đóng mở 2 Select
  const handleSortToggle = () => {
    setIsSortOpen(!isSortOpen);
    setIsFilterOpen(false); // Đóng dropdown filter khi mở dropdown sort
  };

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsSortOpen(false); // Đóng dropdown sort khi mở dropdown filter
  };

  //load total page
  useEffect(() => {
    const summaryFunction = async () => {
      const result = await fetchAPI(`../${summary}`, 'POST', {
        bookId,
      });
      if (result.status !== 200) {
        setSummaryBook('');
        return;
      } else {
        setSummaryBook(result.metadata);
      }
    };
    if (bookId) {
      summaryFunction();
    }
  }, [bookId]);

  //load comments
  useEffect(() => {
    const getFeedback = async () => {
      setPageLoading(true);
      const feedbacks = await fetchAPI(`../${getfeedback}`, 'POST', {
        bookId,
        page: page,
        limit: LIMIT,
        sort,
        filter,
      });
      if (feedbacks.status !== 200) {
        setComments([]);
        setTotalPages(0);
        setCountComments(0);
        setPageLoading(false);
        return;
      } else {
        setTotalPages(feedbacks.metadata.totalPages);
        setCountComments(feedbacks.metadata.totalCount);
        setComments(feedbacks.metadata.comments);
        setPageLoading(false);
      }
    };
    if (bookId) {
      getFeedback();
    }
  }, [bookId, page, sort, filter]);

  return (
    <div className="flex flex-col px-2 xl:gap-6 h-[69rem] xl:h-[75rem]">
      {/* Total Rating */}
      <div className="w-full">
        <div className="grid py-1 grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-11 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
          <div className="box flex flex-col gap-y-1 xl:gap-y-4 w-full px-8 xl:px-0">
            <div className="flex items-center w-full">
              <p className="font-medium text-lg text-black mr-0.5">5</p>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_12042_8589)">
                  <path
                    d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                    fill="#FBBF24"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_12042_8589">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="h-2 w-full sm:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                <span
                  className={`h-full ${summaryBook?.star_5 ? `w-[${(summaryBook?.star_5 * 100) / summaryBook?.totalCount}%]` : 'w-[0%]'} rounded-3xl bg-amber-400 flex`}
                ></span>
              </p>
              <p className="font-medium text-lg  text-black mr-0.5">
                {summaryBook.star_5}
              </p>
            </div>
            <div className="flex items-center w-full">
              <p className="font-medium text-lg text-black mr-0.5">4</p>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_12042_8589)">
                  <path
                    d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                    fill="#FBBF24"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_12042_8589">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="h-2 w-full xl:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                <span
                  className={`h-full ${summaryBook?.star_4 ? `w-[${(summaryBook?.star_4 * 100) / summaryBook?.totalCount}%]` : 'w-[0%]'} rounded-3xl bg-amber-400 flex`}
                ></span>
              </p>
              <p className="font-medium text-lg text-black mr-0.5">
                {summaryBook?.star_4}
              </p>
            </div>
            <div className="flex items-center">
              <p className="font-medium text-lg text-black mr-0.5">3</p>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_12042_8589)">
                  <path
                    d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                    fill="#FBBF24"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_12042_8589">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="h-2 w-full xl:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                <span
                  className={`h-full ${summaryBook?.star_3 ? `w-[${(summaryBook?.star_3 * 100) / summaryBook?.totalCount}%]` : 'w-[0%]'} rounded-3xl bg-amber-400 flex`}
                ></span>
              </p>
              <p className="font-medium text-lg text-black mr-0.5">
                {summaryBook?.star_3}
              </p>
            </div>
            <div className="flex items-center">
              <p className="font-medium text-lg text-black mr-0.5">2</p>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_12042_8589)">
                  <path
                    d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                    fill="#FBBF24"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_12042_8589">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="h-2 w-full xl:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                <span
                  className={`h-full ${summaryBook?.star_2 ? `w-[${(summaryBook?.star_2 * 100) / summaryBook?.totalCount}%]` : 'w-[0%]'} rounded-3xl bg-amber-400 flex`}
                ></span>
              </p>
              <p className="font-medium text-lg text-black mr-0.5">
                {summaryBook?.star_2}
              </p>
            </div>
            <div className="flex items-center">
              <p className="font-medium text-lg text-black mr-0.5">1</p>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_12042_8589)">
                  <path
                    d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                    fill="#FBBF24"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_12042_8589">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="h-2 w-full xl:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                <span
                  className={`h-full ${summaryBook?.star_1 ? `w-[${(summaryBook?.star_1 * 100) / summaryBook?.totalCount}%]` : 'w-[0%]'} rounded-3xl bg-amber-400 flex`}
                ></span>
              </p>
              <p className="font-medium text-lg py-[1px] text-black mr-0.5">
                {summaryBook?.star_1}
              </p>
            </div>
          </div>
          <div className="bg-amber-50 rounded-3xl flex items-center justify-center flex-col">
            <h2 className="font-manrope font-bold text-5xl text-amber-400 mb-6">
              {summaryBook?.avg_rating}
            </h2>
            <div className="flex items-center justify-center gap-2 sm:gap-6 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
              >
                <g clipPath="url(#clip0_13624_2608)">
                  <path
                    d="M21.1033 2.9166C21.4701 2.17335 22.5299 2.17335 22.8967 2.9166L28.233 13.729C28.3786 14.0241 28.6602 14.2287 28.9859 14.276L40.9181 16.0099C41.7383 16.1291 42.0658 17.137 41.4723 17.7156L32.8381 26.1318C32.6024 26.3616 32.4949 26.6926 32.5505 27.017L34.5888 38.9009C34.7289 39.7178 33.8714 40.3408 33.1378 39.9551L22.4653 34.3443C22.174 34.1911 21.826 34.1911 21.5347 34.3443L10.8622 39.9551C10.1286 40.3408 9.27114 39.7178 9.41125 38.9009L11.4495 27.017C11.5051 26.6926 11.3976 26.3616 11.1619 26.1318L2.52771 17.7156C1.93419 17.137 2.2617 16.1291 3.08192 16.0099L15.0141 14.276C15.3398 14.2287 15.6214 14.0241 15.767 13.729L21.1033 2.9166Z"
                    fill="#FBBF24"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_13624_2608">
                    <rect width="44" height="44" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
              >
                <g clipPath="url(#clip0_13624_2608)">
                  <path
                    d="M21.1033 2.9166C21.4701 2.17335 22.5299 2.17335 22.8967 2.9166L28.233 13.729C28.3786 14.0241 28.6602 14.2287 28.9859 14.276L40.9181 16.0099C41.7383 16.1291 42.0658 17.137 41.4723 17.7156L32.8381 26.1318C32.6024 26.3616 32.4949 26.6926 32.5505 27.017L34.5888 38.9009C34.7289 39.7178 33.8714 40.3408 33.1378 39.9551L22.4653 34.3443C22.174 34.1911 21.826 34.1911 21.5347 34.3443L10.8622 39.9551C10.1286 40.3408 9.27114 39.7178 9.41125 38.9009L11.4495 27.017C11.5051 26.6926 11.3976 26.3616 11.1619 26.1318L2.52771 17.7156C1.93419 17.137 2.2617 16.1291 3.08192 16.0099L15.0141 14.276C15.3398 14.2287 15.6214 14.0241 15.767 13.729L21.1033 2.9166Z"
                    fill="#FBBF24"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_13624_2608">
                    <rect width="44" height="44" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
              >
                <g clipPath="url(#clip0_13624_2608)">
                  <path
                    d="M21.1033 2.9166C21.4701 2.17335 22.5299 2.17335 22.8967 2.9166L28.233 13.729C28.3786 14.0241 28.6602 14.2287 28.9859 14.276L40.9181 16.0099C41.7383 16.1291 42.0658 17.137 41.4723 17.7156L32.8381 26.1318C32.6024 26.3616 32.4949 26.6926 32.5505 27.017L34.5888 38.9009C34.7289 39.7178 33.8714 40.3408 33.1378 39.9551L22.4653 34.3443C22.174 34.1911 21.826 34.1911 21.5347 34.3443L10.8622 39.9551C10.1286 40.3408 9.27114 39.7178 9.41125 38.9009L11.4495 27.017C11.5051 26.6926 11.3976 26.3616 11.1619 26.1318L2.52771 17.7156C1.93419 17.137 2.2617 16.1291 3.08192 16.0099L15.0141 14.276C15.3398 14.2287 15.6214 14.0241 15.767 13.729L21.1033 2.9166Z"
                    fill="#FBBF24"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_13624_2608">
                    <rect width="44" height="44" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
              >
                <g clipPath="url(#clip0_13624_2608)">
                  <path
                    d="M21.1033 2.9166C21.4701 2.17335 22.5299 2.17335 22.8967 2.9166L28.233 13.729C28.3786 14.0241 28.6602 14.2287 28.9859 14.276L40.9181 16.0099C41.7383 16.1291 42.0658 17.137 41.4723 17.7156L32.8381 26.1318C32.6024 26.3616 32.4949 26.6926 32.5505 27.017L34.5888 38.9009C34.7289 39.7178 33.8714 40.3408 33.1378 39.9551L22.4653 34.3443C22.174 34.1911 21.826 34.1911 21.5347 34.3443L10.8622 39.9551C10.1286 40.3408 9.27114 39.7178 9.41125 38.9009L11.4495 27.017C11.5051 26.6926 11.3976 26.3616 11.1619 26.1318L2.52771 17.7156C1.93419 17.137 2.2617 16.1291 3.08192 16.0099L15.0141 14.276C15.3398 14.2287 15.6214 14.0241 15.767 13.729L21.1033 2.9166Z"
                    fill="#FBBF24"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_13624_2608">
                    <rect width="44" height="44" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
              >
                <g clipPath="url(#clip0_13624_2608)">
                  <path
                    d="M21.1033 2.9166C21.4701 2.17335 22.5299 2.17335 22.8967 2.9166L28.233 13.729C28.3786 14.0241 28.6602 14.2287 28.9859 14.276L40.9181 16.0099C41.7383 16.1291 42.0658 17.137 41.4723 17.7156L32.8381 26.1318C32.6024 26.3616 32.4949 26.6926 32.5505 27.017L34.5888 38.9009C34.7289 39.7178 33.8714 40.3408 33.1378 39.9551L22.4653 34.3443C22.174 34.1911 21.826 34.1911 21.5347 34.3443L10.8622 39.9551C10.1286 40.3408 9.27114 39.7178 9.41125 38.9009L11.4495 27.017C11.5051 26.6926 11.3976 26.3616 11.1619 26.1318L2.52771 17.7156C1.93419 17.137 2.2617 16.1291 3.08192 16.0099L15.0141 14.276C15.3398 14.2287 15.6214 14.0241 15.767 13.729L21.1033 2.9166Z"
                    fill="#FBBF24"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_13624_2608">
                    <rect width="44" height="44" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="font-medium text-xl leading-8 text-gray-900 text-center">
              {summaryBook.totalCount} Đánh Giá
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="h-14 flex justify-between px-4 border-y border-x-gray-300 items-center">
        {/* Title */}
        <div>
          <div className=" font-medium text-base hidden xl:inline-block">
            Nhận Xét Về Sản Phẩm ({countComments})
          </div>
          <div className="font-medium text-base xl:hidden">
            Đánh Giá ({countComments})
          </div>
        </div>

        {/* Sort và Filter */}
        <div className="flex">
          <div className="hidden xl:block md:block">
            <DropDownClick
              icon={sortIcon}
              value={sort}
              setValue={setSort}
              titleOption={'Lọc:'}
              dataOption={SAMPLESORT}
              toggleDropdown={handleSortToggle}
              isOpen={isSortOpen}
              setIsOpen={setIsSortOpen}
              className={
                'h-full w-full flex xl:px-8 flex-col xl:gap-2 items-center justify-center border-x border-gray-300'
              }
            />
          </div>
          <DropDownClick
            icon={filterIcon}
            value={filter}
            setValue={setFilter}
            titleOption={'Lọc:'}
            dataOption={SAMPLESTAR}
            toggleDropdown={handleFilterToggle}
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
            className={
              'h-full w-40 flex flex-col xl:gap-2 items-center justify-center border-x border-gray-300'
            }
          />
        </div>
      </div>

      {/* comments */}
      <div className=" w-full flex flex-col mt-6 xl:mt-1 gap-12 max-h-[40rem] xl:max-h-[50rem] overflow-y-scroll xl:scrollbar-thin xl:scrollbar-webkit">
        {/* Hiển thị danh sách các comment */}
        {/* <div></div> */}
        {pageLoading ? (
          <div>
            <ShoppingCartLoader items={4} />
          </div>
        ) : (
          comments.length === 0 ?
            <div className="flex justify-center items-center text-slate-500 xl:p-40 p-10">
              <div className="flex-col items-center justify-center">
                <div className="w-full flex items-center justify-center">
                  <img src="/img/reviews.png" alt="reviews-image" className="xl:w-[8rem] w-20"/>
                </div>
               <div className="xl:text xl:mt-8 text-center">
                  Sản phẩm này chưa có đánh giá.
                  Hãy cho người khác biết suy nghĩ của bạn và là người đầu tiên viết đánh giá.
               </div>
              </div>
            </div>
            :
            comments?.map((comment) => (
              <div
                key={comment.feedback_id}
                className="flex gap-2 border-b border-b-gray-300 pb-8"
              >
                {/* avartar */}
                <img
                  className="w-10 h-10 me-4 rounded-full"
                  src={comment.user.user_avatar || '/logo/logo_home.png'}
                  alt="avatar"
                ></img>

                {/* user review */}
                <div className="flex flex-col gap-4 pr-2 w-full">
                  <div className="flex flex-col gap-1">
                    {/* rating-date */}
                    <div className="flex justify-between">
                      <StarRating
                        averageRating={parseInt(comment.feedback_rating)}
                        numReviews={5}
                        shownumReviews={false}
                        className="flex justify-start gap-2"
                      />
                      <span className="text-sm font-light ">
                        {formatDate(comment.create_time, true)}
                      </span>
                    </div>
                    {/* username-certifiedPurchase */}
                    <div className="flex flex-col xl:flex-row xl:items-center xl:gap-2">
                      <div>
                        <span className="text-sm">
                          {comment.user.user_username}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="20"
                          height="20"
                          viewBox="0 0 48 48"
                        >
                          <linearGradient
                            id="IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1"
                            x1="9.858"
                            x2="38.142"
                            y1="9.858"
                            y2="38.142"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0" stopColor="#9dffce"></stop>
                            <stop offset="1" stopColor="#50d18d"></stop>
                          </linearGradient>
                          <path
                            fill="url(#IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1)"
                            d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                          ></path>
                          <linearGradient
                            id="IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2"
                            x1="13"
                            x2="36"
                            y1="24.793"
                            y2="24.793"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset=".824" stopColor="#135d36"></stop>
                            <stop offset=".931" stopColor="#125933"></stop>
                            <stop offset="1" stopColor="#11522f"></stop>
                          </linearGradient>
                          <path
                            fill="url(#IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2)"
                            d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"
                          ></path>
                        </svg>
                        {'Chứng nhận đã mua hàng'}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-inter">
                    {comment.feedback_content}
                  </div>
                </div>
              </div>
          ))
        )}
      </div>

      {/* pagination */}
      {
        totalPages === 0 ? null :
        <div className="h-[10rem] w-full mb-10 xl:mb-5 py-4 xl:py-0">
          <ReactPaginate
            breakLabel={<span className="mr-4">...</span>}
            nextLabel={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10 text-[#ff4e4e]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            }
            onPageChange={(event) =>
              setPage(
                event.selected === 0
                  ? 1
                  : event.selected === totalPages
                    ? totalPages
                    : event.selected + 1,
              )
            }
            pageRangeDisplayed={2}
            pageCount={totalPages}
            previousLabel={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10 text-[#ff4e4e]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            }
            containerClassName="flex items-center justify-center gap-4 mt-2 pb-9"
            pageClassName="w-10 h-10 flex items-center justify-center ml-4 sm:mr-4 xl:hover:bg-red-200 hover:rounded-full hover:p-4 transition-all"
            activeClassName="rounded-full w-10 h-10 leading-8 text-center font-bold cursor-pointer bg-red-500 text-white"
          />
        </div>
      }
    </div>
  );
};

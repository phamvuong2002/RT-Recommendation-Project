import React from 'react';
import { Fragment, useState, useEffect, useRef } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  HiPlus,
  HiMinus,
  HiChevronDown,
  HiFunnel,
  HiMiniXMark,
} from 'react-icons/hi2';
import {
  useLocation,
  useNavigate,
  Link,
  createSearchParams,
} from 'react-router-dom';
import { AllProducts } from './AllProducts_v2';
import { fetchAPI } from '../helpers/fetch';
import MenuItems from './MenuItems';
import { PopupCenterPanel } from './popup/PopupCenterPanel';
import { useInsertionEffect } from 'react';
import PropTypes from 'prop-types';
import { getallcategories } from '../apis/category';

export default function FilterProduct({
  productsData = [],
  _totalPages = 0,
  _source = 'search_v2',
  _totalResults = 0,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [all_categories, setCategoriess] = useState([]);
  const [cate, setCate] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [source, setSource] = useState(_source);
  const [numPage, setNumPage] = useState(1);
  const [totalPages, setTotalPages] = useState(_totalPages);
  const [totalResults, setTotalResults] = useState(_totalResults);

  const navigate = useNavigate();
  const location = useLocation();
  //console.log('newest search ' + (window.location.search))
  const params = new URLSearchParams(location.search);
  let hasPublisher = params.has('publisher');

  let publisher_filter = [''];
  if (!hasPublisher) {
    //
  } else {
    publisher_filter = params.get('publisher').split(',');
  }

  let price_filter = '';
  if (!params.has('price')) {
    //
  } else {
    price_filter = params.get('price');
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    setIsLoading(true);
    const loadCategoriesData = async () => {
      const categoriesData = await fetchAPI(`../${getallcategories}`, 'POST');
      setCate(categoriesData.metadata.categoryData);
      setIsLoading(false);
    };
    //tải categories
    loadCategoriesData();
  }, []);

  const sortOptions_dict = {
    name_asc: 'Tên: A-Z',
    name_desc: 'Tên: Z-A',
    price_asc: 'Giá: Thấp đến Cao',
    price_desc: 'Giá: Cao đến Thấp',
    create_time_desc: 'Mới nhất',
    // publishedDate_desc: 'Mới nhất',
    // publishedDate_asc: 'Cũ nhất',
    // num_order_desc: 'Bán chạy nhất',
  };

  const sortOptions = [
    { name: 'Mới nhất', value: 'create_time_desc' },
    { name: 'Tên: A-Z', value: 'name_asc' },
    { name: 'Tên: Z-A', value: 'name_desc' },
    { name: 'Giá: Thấp đến Cao', value: 'price_asc' },
    { name: 'Giá: Cao đến Thấp', value: 'price_desc' },
    // { name: 'Mới nhất', value: 'publishedDate_desc' },
    // { name: 'Cũ nhất', value: 'publishedDate_asc' },
    // { name: 'Bán chạy nhất', value: 'num_order_desc' },
  ];

  const filters = [
    {
      id: 'price',
      name: 'Giá',
      options: [
        { value: '0,150000', label: '0-150.000đ', checked: false },
        { value: '150000,300000', label: '150.000đ-300.000đ', checked: false },
        { value: '300000,500000', label: '300.000đ-500.000đ', checked: false },
        {
          value: '500000,1000000',
          label: '500.000đ-1.000.000đ',
          checked: false,
        },
      ],
    },

    // {
    //   id: 'publisher',
    //   name: 'Nhà xuất bản',
    //   options: [
    //     { value: 'nxb-van-hoc', label: 'NXB Văn Học', checked: false },
    //     { value: 'nxb-dan-tri', label: 'NXB Dân Trí', checked: false },
    //     {
    //       value: 'nxb-dai-hoc-su-pham',
    //       label: 'NXB Đại học sư phạm',
    //       checked: false,
    //     },
    //     { value: 'NXB-phunuvn', label: 'NXB Phụ nữ Việt Nam', checked: false },
    //   ],
    // },
  ];

  const [sortOption, setSortOption] = useState(params.get('sort'));

  const [filterOptions, setFiterOption] = useState(filters);

  const sortProduct = (event) => {
    setSortOption(event.target.value);
  };

  const handleClickFilter = (event) => {
    const filter_target = event.target.name;
    const filter_target_value = event.target.id;
    //Price
    // console.log(event);
    // console.log(filter_target_value)
    if (event.target.name == 'price') {
      // console.log(params)
      if (event.target.checked) {
        // console.log('in price')
        price_filter = filter_target_value;
        if (params.has('price')) {
          // console.log('in price navigate set ' + price_filter);
          params.set('price', price_filter);
        } else {
          // console.log('in price navigate append' + price_filter);
          params.append('price', price_filter);
        }
      } else {
        price_filter = false;
        params.delete('price');
      }
    } else if (filter_target == 'publisher') {
      if (event.target.checked) {
        if (publisher_filter[0] == '') {
          publisher_filter[0] = filter_target_value;
        } else {
          publisher_filter.push(filter_target_value);
        }

        if (params.has('publisher')) {
          params.set('publisher', publisher_filter);
        } else {
          params.append('publisher', publisher_filter);
        }
      } else {
        const newPublisher = publisher_filter.filter(
          (p) => p !== filter_target_value,
        );
        if (newPublisher.length < 1) {
          params.delete('publisher');
        } else {
          params.set('publisher', newPublisher);
        }
      }
    }
    navigate(location.pathname + '?' + params);
  };

  const handlClickAllCategory = () => {
    params.set('categories', 'all');
    navigate(location.pathname + '?' + params);
  };

  // Sort
  useEffect(() => {
    // console.log(sortOption)
    if (sortOption.length > 0) {
      params.set('sort', sortOption);
    } else {
      //
    }
    navigate(location.pathname + '?' + params);
  }, [sortOption]);

  //Change page
  useEffect(() => {
    params.set('page', numPage);
    navigate(location.pathname + '?' + params);
  }, [numPage]);

  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  useEffect(() => {
    setSource(_source);
  }, [cate, sortOption]);

  useEffect(() => {
    if(_totalPages === 0) {
      setNumPage(1);
    }
    setTotalPages(_totalPages);
    setTotalResults(_totalResults);
  }, [_totalPages, _totalResults]);

  return (
    <div className="bg-[#efefef]">
      {/* desktop */}
      <div>
        <main className="hidden lg:block mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white xl:px-1 flex border-b border-gray-200 py-2 xl:pt-10my">
            {/*pt-24 */}
            <div className="flex w-full">
              {/* Label */}
              <div className="w-[25%] p-2">
                <button
                  className="text-[17px] font-bold tracking-tight text-gray-800"
                  onClick={handlClickAllCategory}
                >
                  TẤT CẢ NHÓM SẢN PHẨM
                </button>
              </div>
              {/* Result */}
              <div className="w-[52%] flex flex-col gap-1 pr-2">
                <div className="px-8 flex gap-1">
                  <span className="font-semibold">Kết quả Tìm kiếm</span>
                  <div className="text-blue-500">
                    ({totalResults} kết quả được tìm thấy)
                  </div>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap overflow-x-auto no-scrollbar">
                  <div className="text-sm">Đề xuất:</div>
                  <div className="flex gap-1">
                    <div className="text-[0.68rem] p-1 bg-blue-200 text-blue-500 rounded-lg cursor-pointer hover:bg-blue-400 hover:text-blue-100">
                      Sách Tiếng Việt (80)
                    </div>
                  </div>
                </div>
              </div>
              {/* Filter */}
              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div className="flex justify-center items-center gap-2">
                    <div className="text-sm">Sắp xếp theo</div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      <div className="flex gap-1 border border-gray-400 w-[10rem] h-[2.2rem] justify-between items-center rounded-lg px-1">
                        <span>{sortOptions_dict[sortOption]}</span>
                        <HiChevronDown
                          className="mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </div>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <button
                                name={option.name}
                                className={
                                  (option.current
                                    ? 'font-medium text-gray-900'
                                    : 'text-gray-500',
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm')
                                }
                                value={`${option.value}`}
                                onClick={(e) => sortProduct(e)}
                              >
                                {option.name}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="">
            <h2 id="products-heading" className="sr-only">
              Sản phẩm
            </h2>

            <div className=" flex gap-1 mt-1 border-t border-gray-200">
              {/* Filters */}
              <div className="p-2 w-[25%] bg-white">
                <div className="font-semibold text-red-500 text-3xl items-center p-2 border-b border-b-gray-200">
                  Lọc Theo
                </div>
                <form
                  className={` ${isMenuOpen ? '' : 'hidden'}  lg:block mt-4`}
                >
                  {/* name */}
                  <div className="font-medium text-gray-900 px-2 pb-4 border-b border-b-gray-200">
                    Thể loại
                  </div>
                  {/* TRUYỀN Ở ĐÂY */}
                  {isLoading && <p>Loading...</p>}
                  {!isLoading && (
                    <ul
                      className={`max-h-screen h-fit overflow-y-scroll no-scrollbar mt-4 border-b border-b-gray-200`}
                    >
                      {cate.map((menu) => (
                        <MenuItems
                          items={menu}
                          key={menu?.id}
                          depthLevel={0}
                          _source="search_v2"
                        />
                      ))}
                    </ul>
                  )}

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="sm:z-10 border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <HiMinus
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <HiPlus
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>

                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6 sm:space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={`${option.id}-${optionIdx}`}
                                  className="flex items-center "
                                >
                                  <input
                                    id={option.value}
                                    name={`${section.id}`}
                                    // value={option.id}
                                    // defaultValue={option.id}
                                    type="checkbox"
                                    aria-checked={true}
                                    onChange={handleClickFilter}
                                    checked={
                                      section.id === 'price'
                                        ? price_filter === option.value
                                        : publisher_filter.includes(
                                            option.value,
                                          )
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 accent-red-300"
                                  />
                                  <label
                                    htmlFor={option.value}
                                    className="ml-3 min-w-0 flex-1 text-gray-500 sm:text-sm sm:text-gray-600 hover:cursor-pointer"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-4 w-[75%]">
                {/* Your content */}
                {products.length === 0 ? (
                  <div className="flex flex-col gap-1 items-center justify-center text-gray-300">
                    <img src="/img/empty-box.png" />
                  </div>
                ) : (
                  < AllProducts
                    productsData={products}
                    numOfProductsInRow={4}
                    _totalPages={totalPages}
                    setPage={setNumPage}
                    page={numPage}
                    _loadmore={false}
                  />
                )}
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* mobile */}

      <main className=" flex lg:hidden  flex-col w-full">
        <div className="flex w-full justify-between  border-b border-gray-200  ">
          <div className="flex items-center pl-3">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sắp xếp
                  <HiChevronDown
                    className="mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <span>
                  {sortOptions_dict[sortOption]}
                  {/* {sortOptions_dict[sortOption]} */}
                </span>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <button
                            name={option.name}
                            className={
                              (option.current
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm')
                            }
                            value={`${option.value}`}
                            onClick={(e) => sortProduct(e)}
                          >
                            {option.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="px-4 py-6 ">
            <PopupCenterPanel
              open={isMenuOpen}
              setOpen={setIsMenuOpen}
              icon={<HiFunnel />}
              title={'Bộ lọc'}
              content={
                <form className={`${isMenuOpen ? '' : 'hidden'}  lg:block `}>
                  {/* name */}
                  {/* TRUYỀN Ở ĐÂY */}
                  {isLoading && <p>Loading...</p>}
                  {!isLoading && (
                    <ul
                      className={`min-h-[4rem] max-h-[15rem] overflow-y-scroll no-scrollbar`}
                    >
                      {cate.map((menu, index) => {
                        const depthLevel = 0;
                        return (
                          <MenuItems
                            items={menu}
                            key={index}
                            depthLevel={depthLevel}
                            _source="search_v2"
                          />
                        );
                      })}
                    </ul>
                  )}

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="sm:z-10 border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <HiMinus
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <HiPlus
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>

                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6 sm:space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center "
                                >
                                  <input
                                    id={option.value}
                                    name={`${section.id}`}
                                    defaultValue={option.value}
                                    value={option.value}
                                    type="checkbox"
                                    aria-checked={true}
                                    onChange={handleClickFilter}
                                    checked={
                                      section.id === 'price'
                                        ? price_filter == option.value
                                        : publisher_filter.includes(
                                            option.value,
                                          )
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 accent-red-300"
                                  />
                                  <label
                                    htmlFor={option.value}
                                    className="ml-3 min-w-0 flex-1 text-gray-500 sm:text-sm sm:text-gray-600 hover:cursor-pointer"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              }
              contentClassName={'max-h-[80%]'}
              titleClassName={'pt-0 pb-2 px-0 '}
            />
          </div>
        </div>

        <section aria-labelledby="products-heading" className="">
          <div className=" mt-1 border-t border-gray-200 sm:border-none sm:grid  sm:grid-cols-1 sm:gap-x-8  lg:grid-cols-5">
            {/* Filters */}

            {/* Product grid */}
            <div className="lg:col-span-4 bg-white">
              {/* Your content */}
              < AllProducts
                productsData={products}
                numOfProductsInRow={2}
                _totalPages={totalPages}
                setPage={setNumPage}
                page={numPage}
                // _loadmore={false}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

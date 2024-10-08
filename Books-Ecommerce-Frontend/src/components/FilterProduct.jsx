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
import { AllProducts } from '../components/AllProducts';
import { fetchAPI } from '../helpers/fetch';
import MenuItems from './MenuItems';
import { PopupCenterPanel } from './popup/PopupCenterPanel';
import { useInsertionEffect } from 'react';
import PropTypes from 'prop-types';
import { getallcategories } from '../apis/category';

export default function FilterProduct({
  _userId,
  _cate,
  _limit,
  _query,
  _price,
  _publisher,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [all_categories, setCategoriess] = useState([]);
  const [cate, setCate] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  //console.log('newest search ' + (window.location.search))
  //console.log(location.search)
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
    //ví dụ tải các sản phẩm trong giỏ hàng của khách
    loadCategoriesData();
  }, []);

  const sortOptions_dict = {
    name_asc: 'Tên: A-Z',
    name_desc: 'Tên: Z-A',
    price_asc: 'Giá: Thấp đến Cao',
    price_desc: 'Giá: Cao đến Thấp',
    publishedDate_desc: 'Mới nhất',
    publishedDate_asc: 'Cũ nhất',
    num_order_desc: 'Bán chạy nhất',
  };

  const sortOptions = [
    { name: 'Tên: A-Z', value: 'name_asc' },
    { name: 'Tên: Z-A', value: 'name_desc' },
    { name: 'Giá: Thấp đến Cao', value: 'price_asc' },
    { name: 'Giá: Cao đến Thấp', value: 'price_desc' },
    { name: 'Mới nhất', value: 'publishedDate_desc' },
    { name: 'Cũ nhất', value: 'publishedDate_asc' },
    { name: 'Bán chạy nhất', value: 'num_order_desc' },
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

    {
      id: 'publisher',
      name: 'Nhà xuất bản',
      options: [
        { value: 'nxb-van-hoc', label: 'NXB Văn Học', checked: false },
        { value: 'nxb-dan-tri', label: 'NXB Dân Trí', checked: false },
        {
          value: 'nxb-dai-hoc-su-pham',
          label: 'NXB Đại học sư phạm',
          checked: false,
        },
        { value: 'NXB-phunuvn', label: 'NXB Phụ nữ Việt Nam', checked: false },
      ],
    },
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
    // console.log(event)
    // console.log(filter_target_value)
    if (event.target.name == 'price') {
      // console.log(params)
      if (event.target.checked) {
        // console.log('in price')
        price_filter = filter_target_value;
        if (params.has('price')) {
          // console.log('in price navigate set ' + price_filter)
          params.set('price', price_filter);
        } else {
          // console.log('in price navigate append' + price_filter)
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

  return (
    <div className="bg-white">
      {/* desktop */}
      <div>
        <main className="hidden lg:block mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <button
              className="text-[17px] font-bold tracking-tight text-gray-900"
              onClick={handlClickAllCategory}
            >
              TẤT CẢ NHÓM SẢN PHẨM
            </button>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sắp xếp
                    <HiChevronDown
                      className="mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                  <span>{sortOptions_dict[sortOption]}</span>
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

          <section aria-labelledby="products-heading" className="">
            <h2 id="products-heading" className="sr-only">
              Sản phẩm
            </h2>

            <div className=" mt-1 border-t border-gray-200 sm:border-none sm:grid  sm:grid-cols-1 sm:gap-x-8  lg:grid-cols-5">
              {/* Filters */}

              <form className={` ${isMenuOpen ? '' : 'hidden'}  lg:block `}>
                {/* name */}
                {/* TRUYỀN Ở ĐÂY */}
                {isLoading && <p>Loading...</p>}
                {!isLoading && (
                  <ul
                    className={`max-h-screen h-fit overflow-y-scroll no-scrollbar`}
                  >
                    {cate.map((menu, index) => {
                      const depthLevel = 0;
                      return (
                        <MenuItems
                          items={menu}
                          key={index}
                          depthLevel={depthLevel}
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
                                      : publisher_filter.includes(option.value)
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

              {/* Product grid */}
              <div className="lg:col-span-4">
                {/* Your content */}
                <AllProducts
                  numOfProductsInRow={4}
                  _cate={_cate}
                  _sort={sortOption}
                  _limit={parseInt(_limit)}
                  _query={_query}
                  _price={_price}
                  _publisher={_publisher}
                  _choose={'all'}
                ></AllProducts>
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
            <div className="lg:col-span-4 bg-gray-100">
              {/* Your content */}
              <AllProducts
                numOfProductsInRow={4}
                _cate={_cate}
                _sort={sortOption}
                _limit={parseInt(_limit)}
                _query={_query}
                _price={_price}
                _publisher={_publisher}
                _choose={'all'}
              ></AllProducts>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

FilterProduct.propTypes = {
  _userId: PropTypes.string.isRequired,
  _cate: PropTypes.string,
  _limit: PropTypes.number,
  _query: PropTypes.string,
  _price: PropTypes.string,
  _publisher: PropTypes.string,
};

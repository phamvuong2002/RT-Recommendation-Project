/* eslint-disable react/no-unknown-property */
import { useState, useEffect, React } from 'react'
import { Tab, Disclosure } from '@headlessui/react'
import { BiWorld } from "react-icons/bi";
import { FaBook } from "react-icons/fa6";
import { HiChevronUp } from "react-icons/hi2";
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchAPI } from '../helpers/fetch';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import axios from "axios";
import { mergeObject } from "../utils/mergeObject";

import { gettop3cate } from "../apis/category"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Category_dropdown({ isShowCloseIcon, isMenuOpen, toggleMenu }) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [cate, setCate] = useState([{}])
    const [all_categories, setCategoriess] = useState([])

    const handleClose = () => {
        toggleMenu();
    };

    useEffect(() => {
        setIsLoading(true);
        const loadCategoriesData = async () => {
            //console.log('in get all cate')
            const categoriesData = await fetchAPI(`../${gettop3cate}`, 'POST');
            //console.log(categoriesData)
            setCate(categoriesData.metadata.categoryData);
            setIsLoading(false);
        };
        //ví dụ tải các sản phẩm trong giỏ hàng của khách
        loadCategoriesData();
    }, []);

    const handleOnClick = ((value) => {
        // console.log(value)

        let params = new URLSearchParams({ 'categories': value })
        // console.log(params)
        params.append("sort", 'num_order_desc')
        params.append("limit", '24')
        params.append("page", '1')
        // console.log(params)
        // params.append('genre', selectedCate)
        navigate('/search?' + params)
    })

    return (
        // Desktop
        <div >
            <div className="hidden sm:px-0 max-w-screen-xl lg:grid grid-cols-5 overflow-y-auto rounded-l-[6px] rounded-r-[6px] border-2 shadow-md relative ">
                {isLoading && <p>Loading...</p>}
                {!isLoading &&
                    <Tab.Group vertical>
                        <Tab.List className="flex flex-col py-1 border-r-2 bg-red-500 rounded-l-[6px]"
                        >
                            <h1 className='text-center text-[17px] py-3 text-slate-100'>DANH MỤC SẢN PHẨM</h1>
                            {cate.map((main_category) => (
                                <Tab
                                    key={main_category.id}
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full py-4 text-[17px] font-semibold uppercase font-inter border-none outline-none ',
                                            selected
                                                ? 'bg-rose-50 text-red-500 border-none '
                                                : 'text-white hover:bg-white/[0.12] border-none'
                                        )
                                    }
                                >
                                    {main_category.name}
                                </Tab>
                            ))}
                        </Tab.List>

                        <Tab.Panels className=" col-span-4">
                            {cate.map((main_cates, idx) => (
                                <Tab.Panel
                                    key={idx}
                                    className={classNames(
                                        'rounded-r-[6px] bg-white p-3 outline-none'
                                    )}
                                >
                                    {
                                        isShowCloseIcon ?
                                            <div>
                                                {isMenuOpen && (
                                                    <button onClick={handleClose} className="float-right">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-7 h-7 stroke-red-500">
                                                            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                            :
                                            <div className="hidden"></div>
                                    }

                                    <div value={main_cates.id} className='text-xl uppercase py-3 font-semibold flex gap-2 items-center hover:cursor-pointer'
                                        onClick={() => handleOnClick(main_cates.id)}>
                                        {main_cates.id == '1' ? <FaBook className='text-red-500' /> : <BiWorld className='text-indigo-500' />}
                                        {main_cates.name}
                                    </div>
                                    {/* Thể loại */}

                                    <ul className='grid grid-cols-4  font-bold font-inter '  >
                                        {main_cates.submenu.filter((single_submenu, idx) => idx < 8).map((main_cate) => (
                                            <li
                                                key={main_cate.id}
                                                className="flex flex-col p-3 uppercase hover:cursor-pointer hover:text-red-500 "
                                            >
                                                <div value={`${main_cates.id},${main_cate.id}`} onClick={() => handleOnClick(`${main_cates.id},${main_cate.id}`)}>
                                                    <h3 className="text-sm font-semibold font-inter truncate">{main_cate.name}</h3>
                                                </div>
                                                {/* Submenu */}
                                                <ul className="mt-1 flex flex-col   text-xs font-normal leading-4 text-gray-500">
                                                    {main_cate.submenu.filter((single_submenu, idx) => idx < 5).map((single_submenu, idx) => (
                                                        <li
                                                            key={single_submenu.id}
                                                            className="relative py-2 hover:text-red-400 text-sm normal-case truncate hover:cursor-pointer  "
                                                        > {single_submenu.name}
                                                            <div value={`${main_cates.id},${main_cate.id},${single_submenu.id}`}
                                                                onClick={() => handleOnClick(`${main_cates.id},${main_cate.id},${single_submenu.id}`)}
                                                                className={classNames(
                                                                    'absolute inset-0 rounded-md',
                                                                )}
                                                            />
                                                        </li>

                                                    ))}
                                                    <button className={`${main_cate.submenu.length >= 5 ? "" : "hidden"} text-[15px] font-normal leading-4 text-left text-blue-400`} onClick={() => handleOnClick(`${main_cates.id},${main_cate.id}`)}> Xem tất cả</button>
                                                </ul>

                                            </li>

                                        ))}

                                    </ul>
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>
                }
            </div>

            {/* mobile */}
            <div className=" sm:px-0 max-w-screen-xl h-dvh grid grid-cols-5 lg:hidden rounded-[5px] bg-gray-100 border-2 shadow-sm  overflow-y-scroll">
                {isLoading && <p>Loading...</p>}
                {!isLoading &&
                    <Tab.Group vertical>
                        <Tab.List className="flex flex-col md:space-x-1  p-2 border-r-2"
                        >
                            {cate.map((category) => (
                                <Tab
                                    key={category.id}
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full py-2.5 text-xs sm:text-base font-semibold uppercase font-inter border-none',
                                            selected
                                                ? 'bg-gray-100 border-none outline-none'
                                                : 'hover:bg-white/[0.12] border-none outline-none'
                                        )
                                    }
                                >
                                    <h2 className='items-center flex flex-col text-[9px] sm:text-base'>
                                        {category.id == '1' ? <FaBook className='text-red-500 text-xs sm:text-base mb-2' /> : <BiWorld className='text-indigo-500 text-xs sm:text-base mb-2' />}
                                        {category.name}
                                    </h2>

                                </Tab>
                            ))}
                        </Tab.List>

                        <Tab.Panels className=" col-span-4 ">
                            {cate.map((main_cates, idx) => (
                                <Tab.Panel
                                    key={idx}
                                    className={classNames(
                                        ' bg-gray-100 p-2'
                                    )}
                                >
                                    {/* Thể loại */}

                                    <ul className='flex flex-col  font-bold font-inter'  >
                                        {main_cates.submenu.map((main_cate) => (
                                            <Disclosure as="div" key={main_cate.id} >
                                                {({ open }) => (
                                                    <>
                                                        <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-lg font-inter font-semibold  focus:outline-none items-center border-2 mt-2">
                                                            <span className='text-xs sm:text-base'>{main_cate.name}</span>
                                                            <HiChevronUp
                                                                className={`${open ? 'rotate-180 transform' : ''
                                                                    } h-5 w-5 text-black`}
                                                            />
                                                        </Disclosure.Button>

                                                        <Disclosure.Panel className="px-4 pb-2 text-xs md:text-sm text-black font-normal">
                                                            {main_cate.submenu.filter((single_submenu, idx) => idx < 5).map((single_submenu) => (
                                                                <li
                                                                    key={single_submenu.id}
                                                                    className={`relative py-2 hover:text-red-400 text-xs sm:text-base normal-case truncate `}
                                                                > {single_submenu.name}
                                                                    <div value={`${main_cates.id},${main_cate.id},${single_submenu.id}`} onClick={() => handleOnClick(`${main_cates.id},${main_cate.id},${single_submenu.id}`)}
                                                                        className={classNames(
                                                                            'absolute inset-0 rounded-md',

                                                                        )}
                                                                    />

                                                                </li>

                                                            ))
                                                            }
                                                            <button className={`${main_cate.submenu.length >= 5 ? "" : "hidden"} text-[15px] font-normal leading-4 text-left text-blue-400`} onClick={() => handleOnClick(`${main_cates.id},${main_cate.id}`)}> Xem tất cả</button>
                                                        </Disclosure.Panel>

                                                    </>
                                                )}
                                            </Disclosure>

                                        ))}
                                    </ul>
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>}
            </div>


        </div>


    )
}

Category_dropdown.propTypes = {
    isShowCloseIcon: PropTypes.bool,
    isMenuOpen: PropTypes.bool,
    toggleMenu: PropTypes.func,

};
import { useState} from 'react'
import { Tab,Disclosure } from '@headlessui/react'
import { BiWorld } from "react-icons/bi";
import { FaBook } from "react-icons/fa6";
import {  HiChevronUp } from "react-icons/hi2";

import { Link } from 'react-router-dom';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Category_dropdown() {
    const all_categories = [
        {
            id: 'I',
            value: 'Trong nước',
            menu: [
                {
                    id: 1,
                    category: 'Văn học',
                    value: 'vanhoc',
                    submenu: [
                        { id: 11, name: 'Tiểu thuyết', value: 'tieuthuyet' },
                        { id: 12, name: 'Truyện ngắn', value: 'truyenngan' },
                        { id: 13, name: 'Light novel', value: 'lightnovel' },
                        { id: 14, name: 'Ngôn tình', value: 'ngontinh' },
                    ]
                },
                {
                    id: 2,
                    category: 'Kinh tế',
                    value: 'kinhte',
                    submenu: [
                        { id: 21, name: 'Nhân vật - Bài học kinh doanh', value: 'nhanvat-baihockinhdoanh' },
                        { id: 22, name: 'Quản trị - lãnh đạo', value: 'quantri-lanhdao' },
                        { id: 23, name: 'Marketing - Bán hàng', value: 'marketing-banhang' },
                        { id: 24, name: 'Phân tích kinh tế', value: 'phantichkinhte' },
                    ]
                },
                {
                    id: 3,
                    category: 'Tâm lý - Kỹ năng sống',
                    value: 'tamly-kynangsong',
                    submenu: [
                        { id: 31, name: 'Kỹ năng sống', value: 'kynangsong' },
                        { id: 32, name: 'Rèn luyện nhân cách', value: 'renluyennhancach' },
                        { id: 33, name: 'Tâm lý', value: 'tamly' },
                        { id: 34, name: 'Sách cho tuổi mới lớn', value: 'sachchotuoimoilon' },
                    ]
                },
                {
                    id: 4,
                    category: 'Nuôi dạy con',
                    value: 'nuoidaycon',
                    submenu: [
                        { id: 41, name: 'Phương pháp giáo dục trẻ các nước', value: 'phuongphpagiaoductrecacnuoc' },
                        { id: 42, name: 'Cẩm nang làm cha mẹ', value: 'camnanglamchame' },
                        { id: 43, name: 'Phát triển trí tuệ cho trẻ', value: 'phattrientrituechotre' },
                        { id: 44, name: 'Phát triển kỹ năng cho trẻ', value: 'phattrienkynangchotre' },
                    ]
                },
                {
                    id: 5,
                    category: 'Sách thiếu nhi',
                    value: 'sachthieunhi',
                    submenu: [
                        { id: 51, name: 'Manga-Comic', value: 'manga-comic' },
                        { id: 52, name: 'Kiến thức bách khoa', value: 'kienthucbachkhoa' },
                        { id: 53, name: 'Sách tranh kỹ năng sống cho trẻ', value: 'sachkynangsongchotre' },
                        { id: 54, name: 'Vừa học- vừa chơi với trẻ', value: 'vuahoc-vuachoivoitre' },
                    ]
                },
                {
                    id: 6,
                    category: 'Tiểu sử - Hồi ký',
                    value: 'tieusu-hoiky',
                    submenu: [
                        { id: 61, name: 'Câu chuyện cuộc đời', value: 'cauchuyencuocdoi' },
                        { id: 62, name: 'Chính trị', value: 'chinhtri' },
                        { id: 63, name: 'Kinh tế', value: 'kinhte' },
                        { id: 64, name: 'Nghệ thuật - giải trí', value: 'nghethuat-giaitri' }
                    ]
                },
                {
                    id: 7,
                    category: 'Giáo khoa - Tham khảo',
                    value: 'giaokhoa-thamkhao',
                    submenu: [
                        { id: 71, name: 'Sách tham khảo', value: 'sachthamkhao' },
                        { id: 72, name: 'Sách giáo khoa', value: 'sachgiaokhoa' },
                        { id: 73, name: 'Luyện thi đại học', value: 'luyenthidaihoc' },
                        { id: 74, name: 'Mẫu giáo', value: 'maugiao' },
                    ]
                },
                {
                    id: 8,
                    category: 'Sách học ngoại ngữ',
                    value: 'sachhocngoaingu',
                    submenu: [
                        { id: 81, name: 'Tiếng Anh', value: 'tienganh' },
                        { id: 82, name: 'Tiếng Nhật', value: 'tiengnhat' },
                        { id: 83, name: 'Tiếng Hoa', value: 'tienghoa' },
                        { id: 84, name: 'Tiếng Hàn', value: 'tienghan' },
                    ]
                },

            ],
        },
        {
            id: 'II',
            value: 'Foreign books',
            menu: [
                {
                    id: 1,
                    category: 'Fiction',
                    value: 'fiction',
                    submenu: [
                        { id: 11, name: 'Contemporary Fiction', value: 'contemporaryfiction' },
                        { id: 12, name: 'Romance', value: 'romance' },
                        { id: 13, name: 'Fantasy', value: 'fantasy' },
                        { id: 14, name: 'Classics', value: 'classics' },
                    ]
                },
                {
                    id: 2,
                    category: 'Business & Managment',
                    value: 'business_managment',
                    submenu: [
                        { id: 21, name: 'Business & Managment', value: 'business_managment' },
                        { id: 22, name: 'Economics', value: 'economics' },
                        { id: 23, name: 'Finance & Accounting', value: 'finance_accounting' },

                    ]
                },
                {
                    id: 3,
                    category: 'Personal development',
                    value: 'personal_development',
                    submenu: [
                        { id: 31, name: 'Popular Psychology', value: 'popularpsychology' },
                        { id: 32, name: 'Advice On Careers & Achieving Success', value: 'adviceoncareers_achievingsuccess' },
                        { id: 33, name: 'Personal Finance', value: 'personalfinance' },

                    ]
                },
                {
                    id: 4,
                    category: 'Dictionaries & Languages',
                    value: 'dictionaries_languages',
                    submenu: [
                        { id: 41, name: 'ELT: Learning material & Coursework', value: 'elt_learningmaterialcoursework' },

                        { id: 42, name: 'ELT: English For Specific Purposes', value: 'elt_englishforspecificpurposes' },

                        { id: 43, name: 'Dictionaries', value: 'dictionaries' },

                    ]
                },
                {
                    id: 5,
                    category: 'Other languages',
                    value: 'otherlanguages',
                    submenu: [
                        { id: 51, name: 'Japanese books', value: 'japanesebooks' },
                        { id: 52, name: 'German books', value: 'germanbooks' },
                        { id: 53, name: 'French books', value: 'frenchbooks' },

                    ]
                },
                {
                    id: 6,
                    category: 'Other categories',
                    value: 'othercategories',
                    submenu: [
                        { id: 61, name: 'Biography', value: 'biography' },
                        { id: 62, name: 'Society & Social Sciences', value: 'society_socialsciences' },
                        { id: 63, name: 'Science & Geography', value: 'science_geography' },
                        { id: 64, name: 'Food & Drink', value: 'food_drink' },

                    ]
                },
            ],
        },
    ]


    return (
        // Desktop
        <div >
            <div className="hidden sm:px-0 max-w-screen-xl lg:grid grid-cols-5 rounded-2xl  border-2 shadow-md">
                <Tab.Group vertical>
                    <Tab.List className="flex flex-col py-1 border-r-2 "
                    >
                        <h1 className='text-center text-xl py-5 text-gray-500'>DANH MỤC SẢN PHẨM</h1>
                        {all_categories.map((main_category) => (
                            <Tab
                                key={main_category.id}
                                className={({ selected }) =>
                                    classNames(
                                        'w-full py-2.5 text-lg font-semibold uppercase font-inter border-none outline-none',
                                        selected
                                            ? 'bg-red-100 border-none'
                                            : 'hover:bg-white/[0.12] border-none'
                                    )
                                }
                            >
                                {main_category.value}
                            </Tab>
                        ))}
                    </Tab.List>

                    <Tab.Panels className=" col-span-4">
                        {all_categories.map((main_cates, idx) => (
                            <Tab.Panel
                                key={idx}
                                className={classNames(
                                    'rounded-xl bg-white p-3 outline-none'
                                )}
                            >
                                <Link to='/' className='text-xl uppercase py-3 font-semibold flex gap-2 items-center' >
                                    {main_cates.id == 'I' ? <FaBook className='text-red-500' /> : <BiWorld className='text-indigo-500' />}
                                    {main_cates.value}</Link>
                                {/* Thể loại */}

                                <ul className='grid grid-cols-4  font-bold font-inter'  >
                                    {main_cates.menu.map((main_cate) => (
                                        <li
                                            key={main_cate.id}
                                            className="flex flex-col p-3 uppercase "
                                        >   
                                        <Link to='/'>
                                        <h3 className="text-sm font-semibold font-inter truncate">{main_cate.category}</h3>
                                        </Link>
                                            
                                            {/* Submenu */}
                                            <ul className="mt-1 flex flex-col  text-xs font-normal leading-4 text-gray-500">
                                                {main_cate.submenu.map((single_submenu) => (
                                                    <li
                                                        key={single_submenu.id}
                                                        className="relative py-2 hover:text-red-400 text-sm normal-case truncate   "
                                                    > {single_submenu.name}
                                                        <Link
                                                            to="/"
                                                            className={classNames(
                                                                'absolute inset-0 rounded-md',
                                                            )}
                                                        />
                                                    </li>
                                                ))}
                                            </ul>


                                        </li>
                                    ))}
                                </ul>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>



            {/* mobile */}
            
            <div className="sm:px-0 max-w-screen-xl h-svh grid grid-cols-5 lg:hidden rounded-[5px] bg-gray-100 border-2 shadow-sm  overflow-y-scroll">
                <Tab.Group vertical>
                    <Tab.List className="flex flex-col md:space-x-1  p-2 border-r-2"
                    >
                        {all_categories.map((category) => (
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
                                    {category.id == 'I' ? <FaBook className='text-red-500 text-xs sm:text-base mb-2' /> : <BiWorld className='text-indigo-500 text-xs sm:text-base mb-2' />}   
                                    {category.value}
                                </h2>

                            </Tab>
                        ))}
                    </Tab.List>

                    <Tab.Panels className=" col-span-4 ">
                        {all_categories.map((main_cates, idx) => (
                            <Tab.Panel
                                key={idx}
                                className={classNames(
                                    ' bg-gray-100 p-2'
                                )}
                            >
                                {/* Thể loại */}

                                <ul className='flex flex-col  font-bold font-inter'  >

                                    {main_cates.menu.map((main_cate) => (
                                        <Disclosure as="div" key={main_cate.id} >
                                            {({ open }) => (
                                                <>
                                                    <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-lg font-inter font-semibold  focus:outline-none items-center border-2 mt-2">
                                                        <span className='text-xs sm:text-base'>{main_cate.category}</span>
                                                        <HiChevronUp
                                                            className={`${open ? 'rotate-180 transform' : ''
                                                                } h-5 w-5 text-black`}
                                                        />
                                                    </Disclosure.Button>

                                                    <Disclosure.Panel className="px-4 pb-2 text-xs md:text-sm text-black font-normal">
                                                        {main_cate.submenu.map((single_submenu) => (
                                                            <li
                                                                key={single_submenu.id}
                                                                className={`relative py-2 hover:text-red-400 text-xs sm:text-base normal-case truncate `}
                                                            > {single_submenu.name}
                                                                <Link
                                                                    to="/"
                                                                    className={classNames(
                                                                        'absolute inset-0 rounded-md',

                                                                    )}
                                                                />
                                                            </li>
                                                        ))}
                                                    </Disclosure.Panel>

                                                </>
                                            )}
                                        </Disclosure>

                                    ))}
                                </ul>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>


        </div>


    )
}

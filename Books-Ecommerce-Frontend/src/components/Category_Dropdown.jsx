import { useState } from 'react'
import { Tab, Disclosure } from '@headlessui/react'
import { BiWorld } from "react-icons/bi";
import { FaBook } from "react-icons/fa6";
import { HiChevronUp } from "react-icons/hi2";

import { Link } from 'react-router-dom';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Category_dropdown() {
    const all_categories = [
        {
          id: 'I',
          name: 'Trong nước',
          value: 'trong-nuoc',
          menu: [
            {
              id: 1,
              category: 'Văn học',
              value: 'van-hoc',
              submenu: [
                { id: 11, name: 'Tiểu thuyết', value: 'tieu-thuyet' },
                { id: 12, name: 'Truyện ngắn', value: 'truyen-ngan' },
                { id: 13, name: 'Light novel', value: 'light-novel' },
                { id: 14, name: 'Ngôn tình', value: 'ngon-tinh' },
              ]
            },
            {
              id: 2,
              category: 'Kinh tế',
              value: 'kinh-te',
              submenu: [
                { id: 21, name: 'Nhân vật - Bài học kinh doanh', value: 'nhan-vat-bai-hoc-kinh-doanh' },
                { id: 22, name: 'Quản trị - lãnh đạo', value: 'quan-tri-lanh-dao' },
                { id: 23, name: 'Marketing - Bán hàng', value: 'marketing-ban-hang' },
                { id: 24, name: 'Phân tích kinh tế', value: 'phan-tich-kinh-te' },
              ]
            },
            {
              id: 3,
              category: 'Tâm lý - Kỹ năng sống',
              value: 'tam-ly-ky-nang-song',
              submenu: [
                { id: 31, name: 'Kỹ năng sống', value: 'ky-nang-song' },
                { id: 32, name: 'Rèn luyện nhân cách', value: 'ren-luyen-nhan-cach' },
                { id: 33, name: 'Tâm lý', value: 'tam-ly' },
                { id: 34, name: 'Sách cho tuổi mới lớn', value: 'sach-cho-tuoi-moi-lon' },
              ]
            },
            {
              id: 4,
              category: 'Nuôi dạy con',
              value: 'nuoi-day-con',
              submenu: [
                { id: 41, name: 'Phương pháp giáo dục trẻ các nước', value: 'phuong-phap-giao-duc-tre-cac-nuoc' },
                { id: 42, name: 'Cẩm nang làm cha mẹ', value: 'cam-nang-lam-cha-me' },
                { id: 43, name: 'Phát triển trí tuệ cho trẻ', value: 'phat-trien-tri-tue-cho-tre' },
                { id: 44, name: 'Phát triển kỹ năng cho trẻ', value: 'phat-trien-ky-nang-cho-tre' },
              ]
            },
            {
              id: 5,
              category: 'Sách thiếu nhi',
              value: 'sach-thieu-nhi',
              submenu: [
                { id: 51, name: 'Manga-Comic', value: 'manga-comic' },
                { id: 52, name: 'Kiến thức bách khoa', value: 'kien-thuc-bach-khoa' },
                { id: 53, name: 'Sách tranh kỹ năng sống cho trẻ', value: 'sach-ky-nang-song-cho-tre' },
                { id: 54, name: 'Vừa học- vừa chơi với trẻ', value: 'vua-hoc-vua-choi-voi-tre' },
              ]
            },
            {
              id: 6,
              category: 'Tiểu sử - Hồi ký',
              value: 'tieu-su-hoi-ky',
              submenu: [
                { id: 61, name: 'Câu chuyện cuộc đời', value: 'cau-chuyen-cuoc-doi' },
                { id: 62, name: 'Chính trị', value: 'chinh-tri' },
                { id: 63, name: 'Kinh tế', value: 'kinh-te' },
                { id: 64, name: 'Nghệ thuật - giải trí', value: 'nghe-thuat-giai-tri' }
              ]
            },
            {
              id: 7,
              category: 'Giáo khoa - Tham khảo',
              value: 'giao-khoa-tham-khao',
              submenu: [
                { id: 71, name: 'Sách tham khảo', value: 'sach-tham-khao' },
                { id: 72, name: 'Sách giáo khoa', value: 'sach-giao-khoa' },
                { id: 73, name: 'Luyện thi đại học', value: 'luyen-thi-dai-hoc' },
                { id: 74, name: 'Mẫu giáo', value: 'mau-giao' },
              ]
            },
            {
              id: 8,
              category: 'Sách học ngoại ngữ',
              value: 'sach-hoc-ngoai-ngu',
              submenu: [
                { id: 81, name: 'Tiếng Anh', value: 'tieng-anh' },
                { id: 82, name: 'Tiếng Nhật', value: 'tieng-nhat' },
                { id: 83, name: 'Tiếng Hoa', value: 'tieng-hoa' },
                { id: 84, name: 'Tiếng Hàn', value: 'tieng-han' },
              ]
            },
    
          ],
        },
        {
          id: 'II',
          name: 'Foreign books',
          value: 'foreign-books',
          menu: [
            {
              id: 1,
              category: 'Fiction',
              value: 'fiction',
              submenu: [
                { id: 11, name: 'Contemporary Fiction', value: 'contemporary-fiction' },
                { id: 12, name: 'Romance', value: 'romance' },
                { id: 13, name: 'Fantasy', value: 'fantasy' },
                { id: 14, name: 'Classics', value: 'classics' },
              ]
            },
            {
              id: 2,
              category: 'Business & Managment',
              value: 'business-managment',
              submenu: [
                { id: 21, name: 'Business & Managment', value: 'business-managment' },
                { id: 22, name: 'Economics', value: 'economics' },
                { id: 23, name: 'Finance & Accounting', value: 'finance-accounting' },
    
              ]
            },
            {
              id: 3,
              category: 'Personal development',
              value: 'personal-development',
              submenu: [
                { id: 31, name: 'Popular Psychology', value: 'popular-psychology' },
                { id: 32, name: 'Advice On Careers & Achieving Success', value: 'advice-on-careers-achieving-success' },
                { id: 33, name: 'Personal Finance', value: 'personal-finance' },
    
              ]
            },
            {
              id: 4,
              category: 'Dictionaries & Languages',
              value: 'dictionaries-languages',
              submenu: [
                { id: 41, name: 'ELT: Learning material & Coursework', value: 'elt-learning-material-coursework' },
    
                { id: 42, name: 'ELT: English For Specific Purposes', value: 'elt-english-for-specific-purposes' },
    
                { id: 43, name: 'Dictionaries', value: 'dictionaries' },
    
              ]
            },
            {
              id: 5,
              category: 'Other languages',
              value: 'other-languages',
              submenu: [
                { id: 51, name: 'Japanese books', value: 'japanese-books' },
                { id: 52, name: 'German books', value: 'german-books' },
                { id: 53, name: 'French books', value: 'french-books' },
    
              ]
            },
            {
              id: 6,
              category: 'Other categories',
              value: 'other-categories',
              submenu: [
                { id: 61, name: 'Biography', value: 'biography' },
                { id: 62, name: 'Society & Social Sciences', value: 'society-socialsciences' },
                { id: 63, name: 'Science & Geography', value: 'science-geography' },
                { id: 64, name: 'Food & Drink', value: 'food-drink' },
    
              ]
            },
          ],
        },
      ]


    return (
        // Desktop
        <div >
            <div className="hidden sm:px-0 max-w-screen-xl lg:grid grid-cols-5  rounded-l-[6px] rounded-r-[6px] border-2 shadow-md relative ">
                <Tab.Group vertical>
                    <Tab.List className="flex flex-col py-1 border-r-2 bg-red-500 rounded-l-[6px]"
                    >
                        <h1 className='text-center text-[17px] py-3 text-slate-100'>DANH MỤC SẢN PHẨM</h1>
                        {all_categories.map((main_category) => (
                            <Tab
                                key={main_category.id}
                                className={({ selected }) =>
                                    classNames(
                                        'w-full py-4 text-[17px] font-semibold uppercase font-inter border-none outline-none ',
                                        selected
                                            ? 'bg-rose-50 text-red-500 border-none'
                                            : 'text-white hover:bg-white/[0.12] border-none'
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
                                    'rounded-r-[6px] bg-white p-3 outline-none'
                                )}
                            >
                                <Link to={`/search/${main_cates.value}`} className='text-xl uppercase py-3 font-semibold flex gap-2 items-center' >
                                    {main_cates.id == 'I' ? <FaBook className='text-red-500' /> : <BiWorld className='text-indigo-500' />}
                                    {main_cates.value}</Link>
                                {/* Thể loại */}

                                <ul className='grid grid-cols-4  font-bold font-inter'  >
                                    {main_cates.menu.map((main_cate) => (
                                        <li
                                            key={main_cate.id}
                                            className="flex flex-col p-3 uppercase "
                                        >
                                            <Link to={`/search/${main_cates.value}/${main_cate.value}`} >
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
                                                           to={`/search/${main_cates.value}/${main_cate.value}/${single_submenu.value}`} 
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

            <div className=" sm:px-0 max-w-screen-xl h-svh grid grid-cols-5 lg:hidden rounded-[5px] bg-gray-100 border-2 shadow-sm  overflow-y-scroll">
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
                                                                   to={`/search/${main_cates.value}/${main_cate.value}/${single_submenu.value}`} 
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

import React from 'react';
import { Fragment, useState, useEffect, useRef } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { HiPlus, HiMinus, HiChevronDown, HiFunnel, HiMiniXMark } from "react-icons/hi2";
import { useLocation, useNavigate, Link, createSearchParams } from 'react-router-dom';
import { AllProducts } from '../components/AllProducts'

export default function FilterProduct({ selectCategory, pages, totalPages, currentPage, setCurrentPage }) {
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (selectCategory) {
      console.log(selectCategory)
      if (selectCategory.sub_category.length > 0) {
        console.log('category-1-in-search')
        var index_id = all_categories.findIndex(x => x.value === selectCategory.category);
        var index_option = all_categories[index_id].menu.findIndex(x => x.value === selectCategory.sub_category);

        setSelectedCateName(all_categories[index_id].menu[index_option]['category'])
        console.log(all_categories[index_id].menu[index_option])
      }
      else {
        setSelectedCateName('')
      } // selectedCategory(selectCategory)
    } else {
      selectCategory.category = 'all-category'
    }
  }, [selectCategory])

  const [sortOption, setSortOption] = useState({ name: '', value: '' })
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isChecked_price, setCheckBoxChecked_price] = React.useState(false);
  // const [isChecked_category, setCheckBoxChecked_category] = React.useState(false);



  const [selectedCateName, setSelectedCateName] = useState('')

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

  const sortOptions = [
    { name: 'Tên: A-Z', value: 'name_asc' },
    { name: 'Tên: Z-A', value: 'name_desc' },
    { name: 'Giá: Thấp đến Cao', value: 'price_asc' },
    { name: 'Giá: Cao đến Thấp', value: 'price_desc' },
    { name: 'Mới nhất', value: 'publishedDate_desc' },
    { name: 'Cũ nhất', value: 'publishedDate_asc' },
    { name: 'Bán chạy nhất', value: 'numProductSold_desc' },

  ]

  const filters = [
    {
      id: 'price',
      name: 'Giá',
      options: [
        { value: '0,150', label: '0-150.000đ', checked: false },
        { value: '150,300', label: '150.000đ-300.000đ', checked: false },
        { value: '300,500', label: '300.000đ-500.000đ', checked: false },
        { value: '500,1000', label: '500.000đ-1.000.000đ', checked: false },

      ],
    },

    {
      id: 'publisher',
      name: 'Nhà xuất bản',
      options: [
        { value: 'NXB-tre', label: 'NXB Trẻ', checked: false },
        { value: 'NXB-kimdong', label: 'NXB Kim Đồng', checked: false },
        { value: 'NXB-giaoducvn', label: 'NXB Giáo dục Việt Nam', checked: false },
        { value: 'NXB-phunuvn', label: 'NXB Phụ nữ Việt Nam', checked: false },

      ],
    },
    // {
    //   id: 'age',
    //   name: 'Tuổi',
    //   options: [
    //     { value: 'maugiao', label: 'Mẫu giáo', checked: false },
    //     { value: 'nhidong', label: 'Nhi đồng', checked: false },
    //     { value: 'thieunien', label: 'Thiếu niên', checked: false },
    //     { value: 'tuoimoilon', label: 'Tuổi mới lớn', checked: false },
    //     { value: 'truongthanh', label: 'Tuổi trưởng thành', checked: false },

    //   ],
    // },
  ]


  const productData = [
    {
      imgUrl: "https://product.hstatic.net/200000287623/product/86-9_bia_1_b43d7264e4ca4e48a5342ba95ce2a036_large.jpg",
      title: "86 - Eightysix - Tập 9",
      price: "145,000",
      salePrice: "125,000",
      currency: "đ",
    },

    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 4",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/100_bd275c22338e4df3a7b01a0b8553e338_large.jpg",
      title: "Conan - Thám tử lừng danh - Tập 100",
      price: "25,000",
      salePrice: "23,500",
      currency: "đ",
    },

    {
      imgUrl: "https://product.hstatic.net/200000343865/product/6.5---lmt_6614aed999634a95b52a584fc76d52ff_large.jpg",
      title: "Nhân vật hạ cấp Tomozaki - Tập 6.5",
      price: "99,900",
      salePrice: "111,000",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 5",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 6",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 7",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000287623/product/86-9_bia_1_b43d7264e4ca4e48a5342ba95ce2a036_large.jpg",
      title: "86 - Eightysix - Tập 8",
      price: "145,000",
      salePrice: "125,000",
      currency: "đ",
    },

    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 9",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/100_bd275c22338e4df3a7b01a0b8553e338_large.jpg",
      title: "Conan - Thám tử lừng danh - Tập 10",
      price: "25,000",
      salePrice: "23,500",
      currency: "đ",
    },

    {
      imgUrl: "https://product.hstatic.net/200000343865/product/6.5---lmt_6614aed999634a95b52a584fc76d52ff_large.jpg",
      title: "Nhân vật hạ cấp Tomozaki - Tập 11",
      price: "99,900",
      salePrice: "111,000",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 12",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 13",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 14",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000287623/product/86-9_bia_1_b43d7264e4ca4e48a5342ba95ce2a036_large.jpg",
      title: "86 - Eightysix - Tập 15",
      price: "145,000",
      salePrice: "125,000",
      currency: "đ",
    },

    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 16",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/100_bd275c22338e4df3a7b01a0b8553e338_large.jpg",
      title: "Conan - Thám tử lừng danh - Tập 17",
      price: "25,000",
      salePrice: "23,500",
      currency: "đ",
    },

    {
      imgUrl: "https://product.hstatic.net/200000343865/product/6.5---lmt_6614aed999634a95b52a584fc76d52ff_large.jpg",
      title: "Nhân vật hạ cấp Tomozaki - Tập 18",
      price: "99,900",
      salePrice: "111,000",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 19",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 20",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 21",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000287623/product/86-9_bia_1_b43d7264e4ca4e48a5342ba95ce2a036_large.jpg",
      title: "86 - Eightysix - Tập 9",
      price: "145,000",
      salePrice: "125,000",
      currency: "đ",
    },

    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 4",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/100_bd275c22338e4df3a7b01a0b8553e338_large.jpg",
      title: "Conan - Thám tử lừng danh - Tập 100",
      price: "25,000",
      salePrice: "23,500",
      currency: "đ",
    },

    {
      imgUrl: "https://product.hstatic.net/200000343865/product/6.5---lmt_6614aed999634a95b52a584fc76d52ff_large.jpg",
      title: "Nhân vật hạ cấp Tomozaki - Tập 6.5",
      price: "99,900",
      salePrice: "111,000",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 5",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 6",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 7",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000287623/product/86-9_bia_1_b43d7264e4ca4e48a5342ba95ce2a036_large.jpg",
      title: "86 - Eightysix - Tập 8",
      price: "145,000",
      salePrice: "125,000",
      currency: "đ",
    },

    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 9",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/100_bd275c22338e4df3a7b01a0b8553e338_large.jpg",
      title: "Conan - Thám tử lừng danh - Tập 10",
      price: "25,000",
      salePrice: "23,500",
      currency: "đ",
    },

    {
      imgUrl: "https://product.hstatic.net/200000343865/product/6.5---lmt_6614aed999634a95b52a584fc76d52ff_large.jpg",
      title: "Nhân vật hạ cấp Tomozaki - Tập 11",
      price: "99,900",
      salePrice: "111,000",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 12",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 13",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 14",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000287623/product/86-9_bia_1_b43d7264e4ca4e48a5342ba95ce2a036_large.jpg",
      title: "86 - Eightysix - Tập 15",
      price: "145,000",
      salePrice: "125,000",
      currency: "đ",
    },

    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 16",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/100_bd275c22338e4df3a7b01a0b8553e338_large.jpg",
      title: "Conan - Thám tử lừng danh - Tập 17",
      price: "25,000",
      salePrice: "23,500",
      currency: "đ",
    },

    {
      imgUrl: "https://product.hstatic.net/200000343865/product/6.5---lmt_6614aed999634a95b52a584fc76d52ff_large.jpg",
      title: "Nhân vật hạ cấp Tomozaki - Tập 18",
      price: "99,900",
      salePrice: "111,000",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 19",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 20",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
    {
      imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
      title: "Frieren - Pháp sư tiễn táng - Tập 21",
      price: "45,000",
      salePrice: "40,500",
      currency: "đ",
    },
  ];



  const [filterValue, setFilterValue] = useState({
    price: '',
    category: 'sgk',
    publisher: [],
    age: []
  });

  const [filterOptions, setFiterOption] = useState(filters);

  const [filteredProductList, setFilteredProductList] = useState(productData)


  const filterCategory = (event) => {

    const filter_target = event.target.name;
    const filter_target_value = event.target.value

    if (filter_target == 'category') {
      console.log('filter cate')
      filterValue['category'] = filter_target_value
      setCheckBoxChecked_category(filter_target_value)
    }
    let filteredData = JSON.parse(JSON.stringify(productData)).filter((item) => (filterValue.category == item.category))

    console.log(filteredData)
    console.log('in')

    //Price
    let price_value = 0
    let min_price = 0
    let max_price = 2000000
    if (event.target.checked) {
      if (event.target.name == 'price') {
        filterValue['price'] = filter_target_value
        price_value = filter_target_value
        setCheckBoxChecked_price(filter_target_value)
      } else {
        price_value = filterValue['price']
      }

      switch (price_value) {
        case '150':
          min_price = 0
          max_price = 150000
          // code block
          break;
        case '300':
          min_price = 150000
          max_price = 300000
          // code block
          break;
        case '500':
          min_price = 300000
          max_price = 500000
          // code block
          break;
        case '1000':
          min_price = 500000
          max_price = 1000000
          // code block
          break;
        default:
          ;
        // code block
      }
    } else {

      setCheckBoxChecked_price(false)
      filterValue["price"] = ''
      // console.log('uncheck price')

      // console.log(filterValue)

    }
    let filteredData_price = filteredData.filter((item) => (item.price >= min_price && item.price <= max_price))
    setFilteredProductList(filteredData_price)
    console.log(min_price + '' + max_price)
    console.log(filteredProductList)
    console.log(filteredData_price)



    // OTHERS
    let other_filter = []
    if (filter_target !== 'price' && filter_target !== 'category') {
      var prevOption = [...filterOptions]
      var index_id = filterOptions.findIndex(x => x.id === filter_target);
      var index_option = filterOptions[index_id].options.findIndex(x => x.value === filter_target_value);
      // console.log(prevOption[index_id].options[index_option])

      prevOption[index_id].options[index_option].checked = event.target.checked
      setFiterOption(prevOption)
      if (event.target.checked) {
        filterValue[filter_target].push(filter_target_value)
        console.log(filterValue[filter_target])

      } else if (!event.target.checked) {

        filterValue[event.target.name].pop(event.target.value)
      }
    }

    var count = 0
    for (var key in filterValue) {
      if (filterValue[key].length > 0 && key !== 'price' && key !== 'category') {
        other_filter = filteredData_price.filter((item) => (filterValue[key].includes(item[key])))
        count += 1
      }

    }
    if (count == 0) {
      other_filter = [...filteredData_price]
    }

    // sort
    var sorted = [...other_filter];
    let sort_type = sortOption.value
    var sort_type_value = sort_type.split('_')
    var sort_type_ = sort_type_value[0]

    if (sort_type_value[1] == 'desc') {
      switch (sort_type_) {
        case 'name':
          sorted.sort((a, b) => b[sort_type_].localeCompare(a[sort_type_], 'vi', { ignorePunctuation: true }));

          break;
        case 'publishedDate':
          sorted.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

          break;

        default:
          sorted.sort((a, b) => b[sort_type_] - a[sort_type_]);
          ;

      }
    } else if (sort_type_value[1] == 'asc') {
      switch (sort_type_) {
        case 'name':
          sorted.sort((a, b) => a[sort_type_].localeCompare(b[sort_type_], 'vi', { ignorePunctuation: true }));
          break;
        case 'publishedDate':
          console.log('in pub')
          sorted.sort((a, b) => new Date(a.publishedDate) - new Date(b.publishedDate));
          // code block
          break;

        default:
          sorted.sort((a, b) => a[sort_type_] - b[sort_type_]);
          ;

      }
    }
    const final_filter = [...sorted]


    // setFilteredProductList(filteredProductList.filter((item) => (filterValue[filter_target].includes(item[filter_target]))))
    setFilteredProductList(final_filter)
    console.log('final filter')
    console.log(filteredProductList)
    console.log(final_filter)

  }

  const getProducts = async (category_name) => {
    // setLoading(true);

    // await fetch(`...${category_name}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setProductList(data.products);
    //     setFilteredProductList(data.products);

    //     console.log(data.products)
    //   })
    //   .catch(err => alert(err))
    //   .finally(() => {
    //     setLoading(false);
    //   })

    const products = [...sampleProducts]

    setFilteredProductList(products)
    console.log(filteredProductList)
  }


  const sortProduct = (event) => {
    setSortOption({ name: event.target.name, value: event.target.value })
    let sort_type = event.target.value
    var sort_type_value = sort_type.split('_')
    var sort_type_ = sort_type_value[0]

    console.log(sort_type_)
    console.log(sort_type_value)


    var sorted = [...filteredProductList];
    if (sort_type_value[1] == 'desc') {
      switch (sort_type_) {
        case 'name':
          sorted.sort((a, b) => b[sort_type_].localeCompare(a[sort_type_], 'vi', { ignorePunctuation: true }));
          // code block
          break;
        case 'publishedDate':
          sorted.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
          // code block
          break;

        default:
          sorted.sort((a, b) => b[sort_type_] - a[sort_type_]);
          ;
        // code block
      }

      // if (sort_type_ == 'name') {
      //   sorted.sort((a, b) => b[sort_type_].localeCompare(a[sort_type_], 'vi', { ignorePunctuation: true }));
      // } else {
      //   sorted.sort((a, b) => b[sort_type_] - a[sort_type_]);
      // }

    } else if (sort_type_value[1] == 'asc') {
      switch (sort_type_) {
        case 'name':
          sorted.sort((a, b) => a[sort_type_].localeCompare(b[sort_type_], 'vi', { ignorePunctuation: true }));
          break;
        case 'publishedDate':
          console.log('in pub')
          sorted.sort((a, b) => new Date(a.publishedDate) - new Date(b.publishedDate));
          // code block
          break;

        default:
          sorted.sort((a, b) => a[sort_type_] - b[sort_type_]);
          ;
        // code block
      }
      // if (sort_type_ == 'name') {
      //   sorted.sort((a, b) => a[sort_type_].localeCompare(b[sort_type_], 'vi', { ignorePunctuation: true }));
      // } else {
      //   sorted.sort((a, b) => a[sort_type_] - b[sort_type_]);
      // }
    }

    setFilteredProductList(sorted);
    console.log('sort_desc')
    console.log(filteredProductList)
  }


  const handleClickFilter = (event) => {
    const filter_target = event.target.name;
    const filter_target_value = event.target.value
    //Price

    if (event.target.name == 'price') {
      if (event.target.checked) {
        console.log('in price ')
        filterValue['price'] = filter_target_value

        setCheckBoxChecked_price(filter_target_value)
      }
      else {
        setCheckBoxChecked_price(false)
        filterValue['price'] = ''
      }
    }


    if (filter_target !== 'price') {
      var prevOption = [...filterOptions]
      var index_id = filterOptions.findIndex(x => x.id === filter_target);
      var index_option = filterOptions[index_id].options.findIndex(x => x.value === filter_target_value);
      // console.log(prevOption[index_id].options[index_option])

      prevOption[index_id].options[index_option].checked = event.target.checked
      setFiterOption(prevOption)
      if (event.target.checked) {
        filterValue[filter_target].push(filter_target_value)
        console.log(filterValue[filter_target])

      } else if (!event.target.checked) {

        filterValue[event.target.name].pop(event.target.value)
      }
    }
    let searchParam = ''
    if (filterValue['price'].length > 0 && filterValue['publisher'].length > 0) {
      searchParam = `?${createSearchParams({
        price: filterValue['price'],
        publisher: filterValue['publisher'].join('_')
      })}`
    }
    else if (filterValue['price'].length > 0) {
      searchParam = `?${createSearchParams({
        price: filterValue['price']
      })}`
    } else if (filterValue['publisher'].length > 0) {
      searchParam = `?${createSearchParams({
        publisher: filterValue['publisher'].join('_')
      })}`
    }

    navigate(location.pathname + searchParam)
  }


  const handleSelectCategory = (event) => {
    var category_value = event.target.value
    var category_selected = category_value.split('/')

    console.log('selected: ')
    console.log(category_selected)
    // console.log(selectedCategory)
    if (category_value) {
      console.log(category_value)
      navigate('/search/' + category_value)
    }
  }

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <Link to='/search/all-category' className="text-[17px] font-bold tracking-tight text-gray-900">TẤT CẢ NHÓM SẢN PHẨM</Link>

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
                  <span>
                    {sortOption.name}
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


                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              name={option.name}
                              className={(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
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

          <section aria-labelledby="products-heading" className="pb-[80px] ">
            <h2 id="products-heading" className="sr-only">
              Sản phẩm
            </h2>


            <div className=" mt-1 border-t border-gray-200 sm:border-none sm:grid  sm:grid-cols-1 sm:gap-x-8  lg:grid-cols-5">
              {/* Filters */}
              <form className={`${isMenuOpen ? "" : "hidden"}  lg:block `}>
                {/* CATEGORY */}

                {all_categories.map((section) => (
                  <Disclosure as="div" key={section.id} className="sm:z-10 border-gray-200">
                    {() => (
                      <>
                        <div
                          className={`flex flex-col w-full text-left bg-white py-1 text-gray-400 hover:text-gray-500 text-[18px]                        
                        ${selectCategory.category == 'all-category' ? "" :
                              selectCategory.category == section.value ? "" : "hidden"} `}
                        >
                          {/* <Disclosure.Button className={`flex  w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 ${selectedCategory.category == section.value ? "" : "hidden"} `}> */}
                          <Link to={`/search/${section.value}`} className="font-medium text-gray-900 pb-2 " >
                            {section.name}
                          </Link>
                          {/* </Disclosure.Button> */}
                          <span className={`text-red-500 pl-3 ${selectCategory.sub_category.length == 0 ? "hidden" : ""}`}> {selectedCateName}</span>
                        </div>


                        {/* <Disclosure.Panel className="pt-3"> */}
                        <div className={`ml-4 `}>
                          {section.menu.map((option) => (
                            option.submenu.map((sub_sub_cate) => (
                              <div key={sub_sub_cate.id} className={`flex pb-3  text-[14px] items-center 
                              ${selectCategory.sub_category.length == 0 && selectCategory.category == section.value ? ""
                                  : selectCategory.sub_category == option.value ? "" : "hidden"}`}>
                                <input
                                  id={`${sub_sub_cate.id}`}
                                  name={`${sub_sub_cate.name}`}
                                  value={`${section.value}/${option.value}/${sub_sub_cate.value}`}

                                  type="checkbox"
                                  aria-checked={true}
                                  onChange={handleSelectCategory}
                                  checked={(sub_sub_cate.value == selectCategory.sub_sub_cate ? true : false)}

                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 accent-red-300"
                                />
                                <Link to={`/search/${section.value}/${option.value}/${sub_sub_cate.value}`} >
                                </Link>
                                <label
                                  htmlFor={`filter-${sub_sub_cate.id}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500 sm:text-sm sm:text-gray-600 "
                                >
                                  {sub_sub_cate.name}
                                </label>
                              </div>
                            ))

                          ))}
                        </div>
                        {/* </Disclosure.Panel> */}
                      </>
                    )}
                  </Disclosure>
                ))}

                {filterOptions.map((section) => (
                  <Disclosure as="div" key={section.id} className="sm:z-10 border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <HiMinus className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <HiPlus className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>

                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6 sm:space-y-6">

                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center ">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  aria-checked={true}
                                  onChange={handleClickFilter}


                                  checked={(section.id === 'price' ? isChecked_price === option.value
                                    : option.checked)}

                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 accent-red-300"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500 sm:text-sm sm:text-gray-600"
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
                  pages={pages}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}>
                </AllProducts>

              </div>
            </div>
          </section>
        </main>
      </div>

    </div>
  )
}

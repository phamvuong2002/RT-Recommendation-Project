import React from 'react';
import { Fragment, useState, useEffect, useRef } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { HiMiniSquares2X2, HiPlus, HiMinus, HiChevronDown, HiFunnel, HiMiniXMark } from "react-icons/hi2";
// import { AllProducts } from './AllProducts';


// Nhận vào Danh sách Product cần Filter (dự định hiển thị bằng cách truyền dữ liệu vào AllProducts)
// Vẫn cần chỉnh sửa 
export default function FilterProduct({product_filter}) {
  const [sortOption, setSortOption]=useState({ name: '', value: '' })
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isChecked_price, setCheckBoxChecked_price] = React.useState(false);
  const [isChecked_category, setCheckBoxChecked_category] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }


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
        { value: '150', label: '0-150.000đ', checked: false },
        { value: '300', label: '150.000đ-300.000đ', checked: false },
        { value: '500', label: '300.000đ-500.000đ', checked: true },
        { value: '1000', label: '500.000đ-1.000.000đ', checked: false },

      ],
    },
    {
      id: 'category',
      name: 'Thể loại',
      options: [
        { value: 'vhvn', label: 'Văn học Việt Nam', checked: false },
        { value: 'vnnn', label: 'Văn học nước ngoài', checked: false },
        { value: 'manga-comic', label: 'Manga-comic', checked: true },
        { value: 'light-novel', label: 'Light-novel', checked: false },
        { value: 'sgk', label: 'Sách giáo khoa', checked: false },
        { value: 'kienthu', label: 'Kiến thư', checked: false },
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
    {
      id: 'age',
      name: 'Tuổi',
      options: [
        { value: 'maugiao', label: 'Mẫu giáo', checked: false },
        { value: 'nhidong', label: 'Nhi đồng', checked: false },
        { value: 'thieunien', label: 'Thiếu niên', checked: false },
        { value: 'tuoimoilon', label: 'Tuổi mới lớn', checked: false },
        { value: 'truongthanh', label: 'Tuổi trưởng thành', checked: false },

      ],
    },
  ]

  const sampleProducts = [
    {
      id: 1,
      name: 'Thám tử lừng danh Conan - Tập 1',
      href: `/book/${1}`,
      format: 'Thường',
      price: 90000,
      quantity: 1,
      imageSrc: 'https://picsum.photos/300/300',
      imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
      currency: 'đ',
      category: 'sgk',
      publisher: 'NXB-kimdong',
      publishedDate:'2022-12-18',
      numProductSold:20,
    },
    {
      id: 2,
      name: 'Sách tiếng việt tập 1',
      href: `/book/${2}`,
      format: 'Thường',
      price: 32000,
      quantity: 1,
      imageSrc: 'https://picsum.photos/300/300',
      imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
      currency: 'đ',
      category: 'light-novel',
      publisher: 'NXB-giaoducvn',
      publishedDate:'2023-12-20',
      numProductSold:10,
    },
    {
      id: 3,
      name: 'Thám tử lừng danh Conan - Tập 1',
      href: `/book/${3}`,
      format: 'Thường',
      price: 320000,
      quantity: 1,
      imageSrc: 'https://picsum.photos/300/300',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
      currency: 'đ',
      category: 'sgk',
      publisher: 'NXB-tre',
      publishedDate:'2023-12-18',
      numProductSold:5,
    },
    {
      id: 4,
      name: '86 - Eightysix - Tập 8',
      href: `/book/${4}`,
      format: 'Thường',
      price: 200000,
      quantity: 1,
      imageSrc: 'https://picsum.photos/300/300',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
      currency: 'đ',
      category: 'sgk',
      publisher: 'NXB-phunuvn',
      publishedDate:'2022-12-12',
      numProductSold:10,
    },
    {
      id: 5,
      name: 'Thám tử lừng danh Conan - Tập 1',
      href: `/book/${5}`,
      format: 'Thường',
      price: 160000,
      quantity: 1,
      imageSrc: 'https://picsum.photos/300/300',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
      currency: 'đ',
      category: 'sgk',
      publisher: 'NXB-tre',
      publishedDate:'2023-10-10',
      numProductSold:5,
    },
    // More products...
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

    var count=0
    for (var key in filterValue) {
      if (filterValue[key].length>0 && key !== 'price' && key !== 'category') {
        other_filter = filteredData_price.filter((item) => (filterValue[key].includes(item[key])))
        count+=1
      }

    }
    if (count==0){
      other_filter=[...filteredData_price]
    }

    // sort
    var sorted = [...other_filter];
    let sort_type=sortOption.value
    var sort_type_value = sort_type.split('_')
    var sort_type_ = sort_type_value[0]

    if (sort_type_value[1] == 'desc') {
      switch (sort_type_) {
        case 'name':
          sorted.sort((a, b) => b[sort_type_].localeCompare(a[sort_type_], 'vi', { ignorePunctuation: true }));
         
          break;
        case 'publishedDate':
          sorted.sort((a, b) => new Date(b.publishedDate)- new Date(a.publishedDate));
          
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
          sorted.sort((a, b) => new Date(a.publishedDate)- new Date(b.publishedDate));
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
    setSortOption({name:event.target.name, value:event.target.value})
    let sort_type=event.target.value
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
          sorted.sort((a, b) => new Date(b.publishedDate)- new Date(a.publishedDate));
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
          sorted.sort((a, b) => new Date(a.publishedDate)- new Date(b.publishedDate));
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




  useEffect(() => {
    getProducts();
  }, [])


  return (
    <div className="bg-white">
      <div>


        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">DANH MỤC</h1>

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

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <HiMiniSquares2X2 className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                className="m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={toggleMenu}
              >
                {
                  isMenuOpen ? <HiMiniXMark className="h-6 w-6" aria-hidden="true" /> : <HiFunnel className="h-5 w-5" aria-hidden="true" />
                }
                <span className="sr-only">Danh mục</span>
                {/* <HiFunnel className="h-5 w-5" aria-hidden="true" /> */}
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Sản phẩm
            </h2>


            <div className=" mt-4 border-t border-gray-200 sm:border-none sm:grid  sm:grid-cols-1 sm:gap-x-8  lg:grid-cols-5">
              {/* Filters */}
              <form className={`${isMenuOpen ? "" : "hidden"}  lg:block `}>
                <h3 className="sr-only">Categories</h3>


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
                                  onChange={filterCategory}

                                  
                                  checked={(section.id === 'price' ? isChecked_price === option.value
                                    : section.id === 'category' ? isChecked_category === option.value
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
                {/* <AllProducts all_product={productData} /> */}

              </div>
            </div>
          </section>
        </main>
      </div>

    </div>
  )
}

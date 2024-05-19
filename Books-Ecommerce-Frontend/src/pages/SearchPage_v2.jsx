import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterProduct from '../components/FilterProduct_v2';
import { AppContext } from '../contexts/main';
import { searchbestselling } from '../apis/recommendation';
import { fetchAPI } from '../helpers/fetch';
import NavigationPath from '../components/NavigationPath';
import { searchBooks } from '../apis/book';

const QUERY_TYPE = {
  NORMAL: 'normal',
  BEST_SELLER_SUGGEST: 'best_seller_suggest',
};

export const SearchPage_v2 = () => {
  const { userId, setIsLoading, setIsShowFooter, setActivePage } =
    useContext(AppContext);
  const [productsSearch, setProductsSearch] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  //console.log('search page', location.search)
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search');
  const [source, setSource] = useState('search_v2');
  const [totalPages, setTotalPages] = useState(0);
  const paths = [
    { path: '/', label: 'Trang Chủ' },
    { path: `#`, label: 'Kết Quả Tìm kiếm' },
  ];

  // lấy Param: Page & Limit
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const sortBy = searchParams.get('sort');
  const categories = searchParams.get('categories');
  const price = searchParams.get('price');
  const publisher = searchParams.get('publisher');
  const search_type = searchParams.get('search_type');

  useEffect(() => {
    setActivePage('Home');
    setIsShowFooter(true);
  }, []);

  useEffect(() => {
    //best selling
    const loadCategoriesData = async () => {
      setIsLoading(true);
      const data = await fetchAPI(`../${searchbestselling}`, 'POST', {
        pageNumber: page,
        pageSize: limit,
        categories,
        price,
        publisher,
      });
      if (data.status != 200) {
        setProductsSearch([]);
        setIsLoading(false);
        return;
      }
      setProductsSearch(data?.metadata?.books);
      setTotalPages(data.metadata?.totalPages);
      setIsLoading(false);
    };

    //normal
    const loadSearchNormalData = async () => {
      setIsLoading(true);
      const data = await fetchAPI(`../${searchBooks}`, 'POST', {
        page: parseInt(page),
        limit: parseInt(limit),
        categories,
        price,
        query,
        sortBy,
      });

      if (data.status != 200) {
        setProductsSearch([]);
        setIsLoading(false);
        return;
      }
      setProductsSearch(data?.metadata?.books);
      setTotalPages(data.metadata?.totalPages);
      setIsLoading(false);
    };

    //ví dụ tải các sản phẩm trong giỏ hàng của khách
    if (search_type === QUERY_TYPE.BEST_SELLER_SUGGEST) {
      loadCategoriesData();
    } else if (search_type === QUERY_TYPE.NORMAL) {
      loadSearchNormalData();
      // setProductsSearch([]);
    } else setProductsSearch([]);
    // console.log('search:::', {
    //   limit,
    //   categories,
    //   query,
    //   price,
    //   publisher,
    //   search_type,
    //   page,
    // });
  }, [limit, userId, categories, query, price, search_type, page, sortBy]);

  useEffect(() => {
    setSource('search_v2');
  }, [limit, categories, query, price, publisher, page, sortBy]);

  useEffect(() => {
    setTotalPages(0);
    searchParams.set('page', 1);
    navigate(location.pathname + '?' + searchParams);
  }, [limit, categories, query, price, publisher, sortBy]);

  return (
    <div className="pb-5 sm:pb-0">
      <NavigationPath components={paths} />
      {/*Truyền thêm đống pages, totalPages, currentPage, setCurrentPag để gọi AllProduct trong cái FilterProduct luôn*/}
      <FilterProduct
        productsData={productsSearch}
        _source={source}
        _totalPages={totalPages}
      />
    </div>
  );
};

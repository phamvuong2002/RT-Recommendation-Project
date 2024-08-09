import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterProduct from '../components/FilterProduct_v2';
import { AppContext } from '../contexts/main';
import { searchbestselling, getRecommendByContentBase, getRecommendByContentBaseFaiss } from '../apis/recommendation';
import { fetchAPI } from '../helpers/fetch';
import NavigationPath from '../components/NavigationPath';
import { searchBooks } from '../apis/book';
import { shortenString } from '../utils/shortenString';

const QUERY_TYPE = {
  NORMAL: 'normal',
  BEST_SELLER_SUGGEST: 'best_seller_suggest',
  RELATED_BOOK: 'related_book',
};

const QUERY_TYPE_NAME = {
  NORMAL: 'normal',
  BEST_SELLER_SUGGEST: 'Sách Bán Chạy',
  RELATED_BOOK: 'Sách liên quan',
};

export const SearchPage_v2 = () => {
  const { userId, setIsProgressLoading, setIsShowFooter, setActivePage } =
    useContext(AppContext);
  const [productsSearch, setProductsSearch] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  //console.log('search page', location.search)
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search');
  const [source, setSource] = useState('search_v2');
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const previousQuery = useRef(query);

  // lấy Param: Page & Limit
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const sortBy = searchParams.get('sort');
  const categories = searchParams.get('categories');
  const price = searchParams.get('price');
  const publisher = searchParams.get('publisher');
  const search_type = searchParams.get('search_type');

  const paths = [
    { path: '/', label: 'Trang Chủ' },
    { path: `#`, label: 'Kết Quả Tìm kiếm' },
    ...(search_type !== QUERY_TYPE.NORMAL
      ? [
        {
          path: `#`,
          label: shortenString(
            `${QUERY_TYPE_NAME[search_type.toUpperCase()]}`,
            15,
          ),
        },
      ]
      : []),
  ];

  useEffect(() => {
    setActivePage('Home');
    setIsShowFooter(true);
  }, []);

  useEffect(() => {
    //best selling
    const loadSearchBestSellerData = async () => {
      if(!userId) return;
      setIsProgressLoading(true);
      const data = await fetchAPI(`../${searchbestselling}`, 'POST', {
        pageNumber: parseInt(page),
        pageSize: parseInt(limit),
        categories,
        price,
        sortBy,
        query,
      });
      if (data.status != 200) {
        setProductsSearch([]);
        setIsProgressLoading(false);
        return;
      }
      // console.log('metadata:::', data?.metadata);
      setProductsSearch(data?.metadata?.books);
      setTotalPages(data.metadata?.totalPages);
      setTotalResults(data.metadata?.totalBooks);
      setIsProgressLoading(false);
    };

    //content based
    const loadSearchContentBase = async () => {
      if(!userId) return
      setIsProgressLoading(true);
      const data = await fetchAPI(`../${getRecommendByContentBaseFaiss}`, 'POST', {
        key_words: query,
        userId: userId.toString(),
        pageSize: parseInt(limit),
        pageNumber: parseInt(page),
        model_type: "online",
        categories: categories || "all"
      });
      // console.log("data: ", data)
      // if (data.status != 200) {
      //   setProductsSearch([]);
      //   setIsProgressLoading(false);
      //   return;
      // }
      // console.log('metadata:::', data?.metadata);
      setProductsSearch(data?.metadata?.books);
      setTotalPages(data.metadata?.totalPages);
      setTotalResults(data.metadata?.totalBooks);
      setIsProgressLoading(false);
    };

    //normal
    const loadSearchNormalData = async () => {
      if(!userId) return;
      setIsProgressLoading(true);
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
        setIsProgressLoading(false);
        return;
      }
      // console.log('metadata:::', data?.metadata);
      setProductsSearch(data?.metadata?.books);
      setTotalPages(data.metadata?.totalPages);
      setTotalResults(data.metadata?.totalBooks);
      setIsProgressLoading(false);
    };

    //lựa chọn search engine
    if (search_type === QUERY_TYPE.BEST_SELLER_SUGGEST) {
      loadSearchBestSellerData();
    } else if (search_type === QUERY_TYPE.RELATED_BOOK && query) {
      loadSearchContentBase();
    }
    else if (search_type === QUERY_TYPE.NORMAL && !query) {
      // 
      loadSearchNormalData();
      // setProductsSearch([]);
    } else setProductsSearch([]);
  }, [limit, userId, categories, query, price, search_type, page, sortBy]);

  useEffect(() => {
    setSource('search_v2');
  }, [limit, categories, query, price, publisher, page, sortBy]);

  useEffect(() => {
    if (previousQuery.current !== query) {
      setProductsSearch([]);
      previousQuery.current = query;
    }
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
        _totalResults={totalResults}
      />
    </div>
  );
};

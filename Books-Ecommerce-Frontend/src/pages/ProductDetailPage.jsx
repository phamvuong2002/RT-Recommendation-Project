import React, { useContext, useEffect, useState } from 'react';
import { DetailCart } from '../components/DetailCart';
import { DescriptionFeedback } from '../components/DescriptionFeedback';
import NavigationPath from '../components/NavigationPath';
import { SliderProducts } from '../components/SliderProducts';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAPI } from '../helpers/fetch';
import { getonebook } from '../apis/book';
import { getRecommendByContentBaseID } from '../apis/recommendation';
import { getCateFromText } from '../utils/getCateFromText';
import { shortenString } from '../utils/shortenString';
import { AppContext } from '../contexts/main';
import { collectBehaviour } from '../apis/collectBehaviour';
import { slugify } from '../utils/slugify';
import { isMobileDevice } from '../utils/isMobileDevice';
import { recRandomBook } from '../apis/recommendation';

export const ProductDetailPage = () => {
  const { userId, setIsShowFooter, token, setIsLoading } =
    useContext(AppContext);
  const { bookid } = useParams();
  const [id, setId] = useState('');
  const [paths, setPaths] = useState([]);
  const [products, setProducts] = useState([]);

  const [book, setBook] = useState('');

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [collabProducts, setCollabProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setIsShowFooter(true);
    if (userId) {
      const timeoutId = setTimeout(async () => {
        //collect behavior "view"
        const dataCollect = {
          topic: 'view',
          message: {
            userId,
            behaviour: 'view',
            productId: bookid,
          },
        };
        const result = await fetchAPI(
          `../${collectBehaviour}`,
          'POST',
          dataCollect,
        );
      }, 5000);

      // Xóa timeout khi component unmount
      return () => clearTimeout(timeoutId);
    }
  }, [userId, book]);

  //Get bookid from url
  useEffect(() => {
    setId(bookid);
    const getBook = async () => {
      setIsLoading(true);
      const book = await fetchAPI(`../${getonebook}`, 'POST', {
        bookId: bookid,
      });
      if (book.status !== 200) {
        navigate('/notfound');
        setIsLoading(false);
      } else {
        setBook(book.metadata);
        setIsLoading(false);
      }
    };
    getBook();
  }, [bookid]);

  //Xử ký sau khi lấy được bookid
  useEffect(() => {
    function createPaths(categories) {
      if (!categories) return [];
      const cateArr = categories?.split(', ').filter((item) => item !== 'null');
      const pathArr = [{ path: '/', label: 'Trang Chủ' }];
      let source = '';
      if (!isMobileDevice()) {
        for (let i = 0; i < cateArr.length; i++) {
          if (cateArr[i] === 'null') break;
          const cateSlug = slugify(cateArr[i]);
          source += `${i === 0 ? 'search_v2?categories=' : ','}${cateSlug}`;
          const sourceObj = {
            path: `/${source}&sort=create_time_desc&limit=24&page=1&search_type=normal`,
            label: shortenString(cateArr[i]),
          };
          pathArr.push(sourceObj);
        }
      } else {
        source = '';
        for (let i = 0; i < cateArr.length; i++) {
          if (cateArr[i] === 'null') break;
          const cateSlug = slugify(cateArr[i]);
          source += `${i === 0 ? 'search_v2?categories=' : ','}${cateSlug}`;
        }
        const sourceObj = {
          path: `/${source}&sort=create_time_desc&limit=24&page=1&search_type=normal`,
          label: shortenString(cateArr[cateArr.length - 1], 20),
        };
        pathArr.push(sourceObj);
      }
      pathArr.push({
        path: `/books/${bookid}`,
        label: `${shortenString(book?.book?.book_title || '', isMobileDevice() ? 15 : 80, true)}`,
        // label: `${shortenString(book?.book?.book_title || '', 80, true)}`,
      });
      return pathArr;
    }

    if (book) {
      const categories = book?.book_detail?.book_categories_name;
      const pathArr = createPaths(categories);
      setPaths(pathArr);
    }
  }, [book]);

  // CONTENT-BASED FILTERING
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAPI(`../${getRecommendByContentBaseID}`, 'POST', {
        bookId: bookid,
        userId: userId.toString(),
        quantity: 24,
        model_type: 'online',
      });
      if (data.status != 200) {
        setProducts([]);
        return;
      }
      setProducts(data?.metadata);
    };
    loadData();
  }, [bookid, userId]);

  // COLLABORATIVE FILTERING
  // Có thể bạn sẽ thích: Random 15 cuốn từ các đề xuất có trong ngày
  useEffect(() => {
    const collabBook = async () => {
      const rec_book = await fetchAPI(`../${recRandomBook}`, 'POST', {
        userId: userId,
        quantity: 15,
        model_type: 'online',
      });
      if (rec_book.status == 200) {
        //console.log(rec_book.metadata)
        setCollabProducts(rec_book.metadata);
      }
    };
    // console.log('in rec svd')
    collabBook();
  }, [userId, paths]);

  return (
    <div className="flex flex-col mb-14">
      <NavigationPath components={paths} />
      <div className="flex flex-col gap-[0.2rem]">
        <DetailCart book={book} />
        <DescriptionFeedback book={book} />

        {/*Gợi ý Sản phẩm liên quan*/}
        <div
          className={`flex flex-col mt-1 px-1 xl:px-28 ${products.length === 0 ? 'hidden' : ''}`}
        >
          <div className="flex items-center mb-[0.1rem] xl:mb-1 pl-2 h-14 bg-gradient-to-t from-red-50 to-gray-50 rounded-t-lg border border-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-[#ffbe98] w-[5%] md:w-[2%]"
            >
              <path
                fillRule="evenodd"
                d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex px-4 text-sm items-center ">
              <div className="text-sm md:text-[150%] font-bold text-red-500 font-['Inter'] tracking-wider">
                Sản phẩm liên quan
              </div>
            </div>
          </div>
          <div className="bg-white border-x border-b xl:border border-red-50">
            <SliderProducts
              userId={userId.toString()}
              productData={products}
            ></SliderProducts>
          </div>
        </div>

        {/*Gợi ý Có thể bạn sẽ thích*/}
        <div
          className={`flex flex-col mt-2 px-1 xl:px-28 ${collabProducts.length === 0 ? 'hidden' : ''}`}
        >
          <div className="flex items-center mb-[0.1rem] xl:mb-1 pl-2 h-14 bg-gradient-to-t from-red-50 to-gray-50 rounded-t-lg border border-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-[#ffbe98] w-[5%] md:w-[2%]"
            >
              <path
                fillRule="evenodd"
                d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex px-4 text-sm items-center">
              <div className="text-sm md:text-[150%] font-bold text-red-500  font-['Inter'] tracking-wider">
                Có thể bạn sẽ thích
              </div>
            </div>
          </div>
          <div className="bg-white border-x border-b xl:border border-red-100">
            <SliderProducts
              userId={userId?.toString()}
              productData={collabProducts}
            ></SliderProducts>
          </div>
        </div>
      </div>
    </div>
  );
};

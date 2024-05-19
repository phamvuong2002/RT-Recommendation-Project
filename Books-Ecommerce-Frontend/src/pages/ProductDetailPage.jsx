import React, { useContext, useEffect, useState } from 'react';
import { DetailCart } from '../components/DetailCart';
import { DescriptionFeedback } from '../components/DescriptionFeedback';
import NavigationPath from '../components/NavigationPath';
import { SliderProducts } from '../components/SliderProducts';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAPI } from '../helpers/fetch';
import { getonebook } from '../apis/book';
import { getCateFromText } from '../utils/getCateFromText';
import { shortenString } from '../utils/shortenString';
import { AppContext } from '../contexts/main';
import { collectBehaviour } from '../apis/collectBehaviour';
import { slugify } from '../utils/slugify';
import { isMobileDevice } from '../utils/isMobileDevice';

export const ProductDetailPage = () => {
  const { userId, setIsShowFooter, token } = useContext(AppContext);
  const { bookid } = useParams();
  const [id, setId] = useState('');
  const [paths, setPaths] = useState([]);
  const [products, setProducts] = useState([]);
  const [book, setBook] = useState('');
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
      const book = await fetchAPI(`../${getonebook}`, 'POST', {
        bookId: bookid,
      });
      if (book.status !== 200) {
        navigate('/notfound');
      } else {
        setBook(book.metadata);
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
        label: `${shortenString(book?.book?.book_title || '', isMobileDevice() ? 15 : 14)}`,
      });
      return pathArr;
    }

    if (book) {
      const categories = book?.book_detail?.book_categories_name;
      const pathArr = createPaths(categories);
      setPaths(pathArr);
    }
  }, [book]);

  return (
    <div className="flex flex-col mb-14">
      <NavigationPath components={paths} />
      <div className="flex flex-col gap-[0.2rem]">
        <DetailCart book={book} />
        <DescriptionFeedback book={book} />

        {/*Gợi ý cho bạn*/}
        <div className="flex flex-col mt-2 px-1 xl:px-28">
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
                Dành Cho Bạn
              </div>
            </div>
          </div>
          <div className="bg-white border-x border-b xl:border border-red-100">
            {/* <SliderProducts
              userId={userId?.toString()}
              productData={products}
            ></SliderProducts> */}
          </div>
        </div>

        {/*Sản phẩm bán chạy*/}
        <div className="flex flex-col mt-1 px-1 xl:px-28">
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
                Sản phẩm bán chạy
              </div>
            </div>
          </div>
          <div className="bg-white border-x border-b xl:border border-red-50">
            {/* <SliderProducts
              userId={userId?.toString()}
              productData={products}
            ></SliderProducts> */}
          </div>
        </div>
      </div>
    </div>
  );
};

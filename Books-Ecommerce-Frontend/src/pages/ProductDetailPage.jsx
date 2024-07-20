import React, { useContext, useEffect, useRef, useState } from 'react';
import { DetailCart } from '../components/DetailCart';
import { DescriptionFeedback } from '../components/DescriptionFeedback';
import NavigationPath from '../components/NavigationPath';
import { SliderProducts } from '../components/SliderProducts';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAPI } from '../helpers/fetch';
import { getonebook } from '../apis/book';
import { getconbasedrecentbook, getRecommendByContentBaseID, searchrecbook } from '../apis/recommendation';
import { getCateFromText } from '../utils/getCateFromText';
import { shortenString } from '../utils/shortenString';
import { AppContext } from '../contexts/main';
import { collectBehaviour } from '../apis/collectBehaviour';
import { slugify } from '../utils/slugify';
import { isMobileDevice } from '../utils/isMobileDevice';
import { recRandomBook } from '../apis/recommendation';
import { AllProducts } from '../components/AllProducts_v2';
import { compareBookIds } from '../utils/arraysEqual';

export const ProductDetailPage = () => {
  const { userId, setIsShowFooter, token, setIsLoading } =
    useContext(AppContext);
  const { bookid } = useParams();
  const [id, setId] = useState('');
  const [paths, setPaths] = useState([]);
  const [products, setProducts] = useState([]);
  const [book, setBook] = useState('');
  const [collabProducts, setCollabProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadingRecBooks, setIsLoadingRecBooks] = useState(false);
  const [loadRecentBook, setLoadRecentBook] = useState(false);
  const navigate = useNavigate();
  const prevBooksRef = useRef([]);


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
  useEffect(() => {
    const collabBook = async () => {
      if(!userId || !book) return;
      console.log("chạy dô đây 1");

      setIsLoadingRecBooks(true);
      const rec_book = await fetchAPI(`../${searchrecbook}`, 'POST', {
        page: parseInt(page),
        limit: 24,
        categories: 'sach-tieng-viet',
        userId,
      });
      if (rec_book.status == 200) {
        //console.log(rec_book.metadata)
        if(rec_book?.metadata?.books.length > 0) {
          const currentBooks = rec_book?.metadata?.books;
          if (!compareBookIds(currentBooks, prevBooksRef.current)) {
            setCollabProducts(currentBooks);
            prevBooksRef.current = currentBooks;
          }
          // setCollabProducts(rec_book?.metadata?.books);
        }
        else{
          setLoadRecentBook(true);
        }
        setIsLoadingRecBooks(false);
      }
    };
    // console.log('in rec svd')
    collabBook();
  }, [userId, paths, page, book]);

  //Recent Books
  useEffect(() => {
    //load content based recent books
    const loadRecRecentBooks = async() => {
      console.log("chạy dô đây 2");
      if(!userId || !book) return
      setIsLoadingRecBooks(true);
      const dataRec = await fetchAPI(`../${getconbasedrecentbook}`, 'POST', {
        userId,
        days: 3,
        page,
        page_size: 2,
        num_rec: 6,
        model_type: "online"
      });

      if (dataRec.status != 200) {
        setIsLoadingRecBooks(false);
        return;
      } else {
        if(dataRec?.metadata?.books.length === 0){
          setIsLoadingRecBooks(false);
          setLoadRecentBook(false);
        }else{
          const currentBooks = dataRec?.metadata?.books;
          if (!compareBookIds(currentBooks, prevBooksRef.current)) {
            setCollabProducts(currentBooks);
            prevBooksRef.current = currentBooks;
          }
          // setCollabProducts(dataRec?.metadata?.books);
        }
      }
      setIsLoadingRecBooks(false);
      return;
    };
    if(loadRecentBook) {
      loadRecRecentBooks();
    }
  }, [loadRecentBook, page, userId, book])

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
          <div className="flex w-full">
            <img src="/img/same_products.png" alt="same_products" className="w-[3rem]"/>
            <div className="flex px-4 text-sm items-center ">
              <div className="text-sm md:text-[150%] font-bold text-red-500 font-['Inter'] tracking-wider">
                Sản phẩm liên quan
              </div>
            </div>
          </div>
           <div
              className="flex gap-2 font-inter w-[12rem] xl:[w-8rem] items-center xl:px-4 pl-6 cursor-pointer hover:text-red-500"
              onClick={() =>
                navigate(
                  `../search_v2?search=${book?.book?.book_title}&sort=create_time_desc&page=1&limit=24&search_type=related_book`,
                )
              }
            >
              <div className="xl:ml-7 items-center text-sm xl:text-base font-normal ">
                Xem Thêm
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4 xl:size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
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
            <img src="/img/for_you.png" alt="for_you" className="w-[3rem]"/>
            <div className="flex px-4 text-sm items-center">
              <div className="text-sm md:text-[150%] font-bold text-red-500  font-['Inter'] tracking-wider">
                Có thể bạn sẽ thích
              </div>
            </div>
          </div>
          <div className="bg-white border-x border-b xl:border border-red-100">
            {/* <SliderProducts
              userId={userId?.toString()}
              productData={collabProducts}
            ></SliderProducts> */}
            <AllProducts
              productsData={collabProducts}
              numOfProductsInRow={5}
              // _totalPages={totalPages}
              setPage={setPage}
              page={page}
              isLoading={isLoadingRecBooks}
            ></AllProducts>
          </div>
        </div>
      </div>
    </div>
  );
};

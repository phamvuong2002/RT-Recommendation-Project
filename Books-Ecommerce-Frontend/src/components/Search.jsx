import React, { useState, useEffect, useContext, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getAllBook } from '../apis/book';
import { recLatestBook } from '../apis/recommendation';
import { fetchAPI } from '../helpers/fetch';
import { AllProducts } from '../components/AllProducts';
import { Product } from '../components/Product';
import { AppContext } from '../contexts/main';
import { popularrating } from '../apis/recommendation';

// Thanh Tìm Kiếm được đặt trong Navbar
const Search = () => {
  const { userId } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const dropdownRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [popularSuggestions, setPopularSuggestions] = useState([]);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const loadProductData = async () => {
      const productData = await fetchAPI(`../${getAllBook}`, 'POST');
      ///hiện chỗ này đang gọi đỡ là load all book từ db
      setProducts(productData.metadata);
    };
    loadProductData();
  }, []); ////Gọi api để load book từ model gán dô state product
  ///thì coi coi nhớ để biến phụ thuộc khi thay đổi là gì để gắn dô []
  /// cái lần đầu render ra mấy dòng tìm kiếm hay ko phụ thuộc chỗ này

  useEffect(() => {
    if (input) {
      setShowDropdown(true);
      const bookTitles = products.map((book) => ({
        book_id: book.book_id,
        book_title: book.book_title,
        book_img: book.book_img,
      }));
      let filteredSuggestions = bookTitles.filter((item) =>
        item.book_title.toLowerCase().includes(input.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
      //console.log("TỚI ĐÂY RA CHƯA", products);
    } else {
      setShowDropdown(false);
    }
  }, [input, products]);

  // useEffect(() => {
  //   const loadProductData = async () => {
  //     const rec_book = await fetchAPI(`../${recLatestBook}`, 'POST', {
  //       userId: userId.toString(), 
  //       quantity: 24,
  //       model_type: "online",
  //     });
  //     // console.log("TỚI ĐÂY RA CHƯA", rec_book);
  //   };

  //   loadProductData();
  // }, [input, userId]);

  const searchFunction = (event, inputValue) => {
    // console.log(event.code)
    // alert(event.code)
    // alert(event.key)
    event.preventDefault();
    let path = '';
    let page = 1;
    let params = new URLSearchParams({ search: inputValue });

    if (inputValue) {
      params.append('search_type', 'related_book');
    } else {
      params.append('search_type', 'normal');
    }

    params.append('sort', 'create_time_desc');
    params.append('page', '1');
    params.append('limit', '24');


    navigate('/search_v2?' + params);
  };

  const handleChange = (value) => {
    setInput(value);

  };

  const handleSuggestionClick = (suggestion, e, id) => {

    setInput(suggestion);
    setShowDropdown(false);
    searchFunction(e, suggestion);

    navigate('/books/' + id);
  };

  const handelLoadPopularRec = async () => {
    setPopularSuggestions([]);
    const productData = await fetchAPI(`../${popularrating}`, 'POST', {
      quantity: 4,
    });
    if (productData.status === 200) {
      setPopularSuggestions(productData.metadata);
    } else {
      setPopularSuggestions([]);
    }
    setShowDropdown(true);
  };

  const handleLoadCollabRec = async () => {
    setUserSuggestions([]);
    const productData = await fetchAPI(`../${recLatestBook}`, 'POST', {
      userId: userId.toString(),
      quantity: 4,
      model_type: "online",
    });
    if (productData.status === 200) {
      setUserSuggestions(productData.metadata);
    } else {
      setUserSuggestions([]);
    }
    setShowDropdown(true);
  };

  useEffect(() => {
    if (!location.pathname.includes('/search_v2') && input) {
      setInput('');
    }
  }, [location]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div id="search-bar" className="min-h-[2.5rem] sm:h-0.8 rounded-[5px] grid">
      <div
        className="relative flex items-stretch"
        onClick={() => { handelLoadPopularRec(); handleLoadCollabRec(); }}
      >
        <input
          type="search"
          className={`w-full relative m-0 block flex-auto pr-14 border-[1px] rounded-md bg-white bg-clip-padding-x px-3 py-[0.1rem] text-[1rem] sm:text-base lg:text-lg font-normal  text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] 
                        focus:outline-none search-cancel:w-4 search-cancel:h-4  search-cancel:grayscale `}
          placeholder="Tìm kiếm"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => ((e.code == 'Enter') || (e.key == 'Enter') ? searchFunction(e, input) : '')}

        />
        <button
          className="flex absolute right-0 h-full px-3 input-group-text items-center white space-nowrap rounded-r-md text-center text-sm lg:text-base font-normal text-white z-10 bg-red-500"
          id="basic-addon2"
          onClick={(e) => searchFunction(e, input)}
        >
          <FaSearch className=" w-4 h-4 block cursor-pointer text-white" />
        </button>
      </div>
      {showDropdown && (
        <div className="dropdown-content absolute top-10 bg-white z-10 w-full shadow-xl rounded-b-md">
          <div ref={dropdownRef}>
            {suggestions.slice(0, 4).map((suggestion) => (
              <div
                key={suggestion.book_id}
                onClick={(e) =>
                  handleSuggestionClick(
                    suggestion.book_title,
                    e,
                    suggestion.book_id,
                  )
                }
                className="dropdown-item p-1 hover:bg-slate-100 hover:rounded-md"
              >
                <div className="relative flex items-center">
                  <img
                    className="max-h-10"
                    src={suggestion.book_img}
                    alt="Product Image"
                  />
                  <p className="absolute top-1/2 w-4/5 transform -translate-y-1/2 left-12 whitespace-nowrap overflow-hidden text-ellipsis">
                    {suggestion.book_title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Đặt kết quả thuật toán collab ở đây */}
          <div
            className={
              userSuggestions.length === 0 ? 'hidden' : 'cursor-pointer'
            }
          >
            <p className="font-semibold px-2">Có thể bạn sẽ thích</p>
            <div className="grid grid-cols-4 gap-4">
              {userSuggestions.slice(0, 4).map((suggestion) => (
                <div
                  key={suggestion.book.book_id}
                  onClick={(e) =>
                    handleSuggestionClick(
                      suggestion.book.book_title,
                      e,
                      suggestion.book.book_id,
                    )
                  }
                  className="dropdown-item p-2 hover:bg-slate-100 hover:rounded-md text-center"
                >
                  <div className="flex flex-col items-center">
                    <img
                      className="w-full h-auto"
                      src={suggestion.book.book_img}
                      alt="Product Image"
                    />
                    <p className="my-2 w-full text-center text-xs line-clamp-2">
                      {suggestion.book.book_title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular rating */}
          <div
            className={
              popularSuggestions.length === 0 ? 'hidden' : 'cursor-pointer'
            }
          >
            <p className="font-semibold px-2">Sách được ưa chuộng</p>
            <div className="grid grid-cols-4 gap-4">
              {popularSuggestions.slice(0, 4).map((suggestion) => (
                <div
                  key={suggestion.book.book_id}
                  onClick={(e) =>
                    handleSuggestionClick(
                      suggestion.book.book_title,
                      e,
                      suggestion.book.book_id,
                    )
                  }
                  className="dropdown-item p-2 hover:bg-slate-100 hover:rounded-md text-center"
                >
                  <div className="flex flex-col items-center">
                    <img
                      className="w-full h-auto"
                      src={suggestion.book.book_img}
                      alt="Product Image"
                    />
                    <p className="my-2 w-full text-center text-xs line-clamp-2">
                      {suggestion.book.book_title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="">
            <AllProducts
              isShowHeader={false}
              numOfProductsInRow={2}
              // _limit={isMobileDevice() ? 2 : 10}
              _limit={4}
              _choose={'all'}></AllProducts>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Search;

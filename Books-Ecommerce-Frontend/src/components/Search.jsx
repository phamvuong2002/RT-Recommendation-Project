import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getAllBook } from '../apis/book';
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

  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [popularSuggestions, setPopularSuggestions] = useState([]);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (input !== '') {
      const loadProductData = async () => {
        const productData = await fetchAPI(`../${getAllBook}`, 'POST');
        setProducts(productData.metadata);
      };
      loadProductData();
    }
  }, [input]);

  const searchFunction = (event, inputValue) => {
    event.preventDefault();
    let path = '';
    //event.preventDefault();
    let page = 1;
    //console.log("INPUT: ", input)
    let params = new URLSearchParams({ search: inputValue });
    // console.log(params)

    //params.append("limit", '24')
    //params.append("page", page)
    params.append('sort', 'create_time_desc');
    params.append('page', '1');
    params.append('limit', '24');
    params.append('search_type', 'normal');

    // path = '/search?q=' + input
    //navigate('/search?' + params)
    //console.log(params)
    navigate('/search_v2?' + params);
  };

  const handleChange = (value) => {
    setInput(value);
    console.log('value change::', input);
    if (value) {
      const bookTitles = products.map((book) => ({
        book_id: book.book_id,
        book_title: book.book_title,
        book_img: book.book_img,
      }));
      const filteredSuggestions = bookTitles.filter((item) =>
        item.book_title.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);

      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
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

  useEffect(() => {
    if (!location.pathname.includes('/search_v2') && input) {
      setInput('');
    }
  }, [location]);

  return (
    <div id="search-bar" className="min-h-[2.5rem] sm:h-0.8 rounded-[5px] grid">
      <div
        className="relative flex items-stretch"
        onClick={handelLoadPopularRec}
      >
        <input
          type="search"
          className={`w-full relative m-0 block flex-auto pr-14 border-[1px] rounded-md bg-white bg-clip-padding-x px-3 py-[0.1rem] text-[1rem] sm:text-base lg:text-lg font-normal  text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] 
                        focus:outline-none search-cancel:w-4 search-cancel:h-4  search-cancel:grayscale `}
          placeholder="Tìm kiếm"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => (e.code == 'Enter' ? searchFunction(e, input) : '')}
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
          <div className="">
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
                  key={suggestion.book_id}
                  onClick={(e) =>
                    handleSuggestionClick(
                      suggestion.book_title,
                      e,
                      suggestion.book_id,
                    )
                  }
                  className="dropdown-item p-2 hover:bg-slate-100 hover:rounded-md text-center"
                >
                  <div className="flex flex-col items-center">
                    <img
                      className="w-full h-auto"
                      src={suggestion.book_img}
                      alt="Product Image"
                    />
                    <p className="my-2 w-full text-center text-xs line-clamp-2">
                      {suggestion.book_title}
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

import React from 'react';
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getAllBook } from '../apis/book';
import { fetchAPI } from '../helpers/fetch';

// Thanh Tìm Kiếm được đặt trong Navbar
const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (input !== "") {
      const loadProductData = async () => {
        const productData = await fetchAPI(`../${getAllBook}`, 'POST');
        setProducts(productData.metadata);
      };
      setTimeout(() => {
        loadProductData();
      }, 1000);
    };


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

    if (value) {
      const bookTitles = products.map(book => book.book_title);
      console.log("book", products);
      const filteredSuggestions = bookTitles.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (suggestion, e) => {
    setInput(suggestion);
    setShowDropdown(false);
    searchFunction(e, suggestion);
  };

  useEffect(() => {
    if (!location.pathname.includes('/search') && input) {
      setInput('');
    }
  }, [location]);

  return (
    <div
      id="search-bar"
      className="min-h-[2.5rem] sm:h-0.8 rounded-[5px] grid"
    >
      <div className="relative flex items-stretch">
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
          {suggestions.slice(0, 5).map((suggestion, index) => (
            <div
              key={index}
              onClick={(e) => handleSuggestionClick(suggestion, e)}
              className="dropdown-item p-2 hover:bg-slate-100 hover:rounded-md"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;

import React from 'react'
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation, useParams } from 'react-router-dom'

// Thanh Tìm Kiếm được đặt trong Navbar
const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [input, setInput] = useState('');

    const searchFunction = (event) => {
        event.preventDefault();
        let path = ''
        let params = new URLSearchParams({'q': input})
        // console.log(params)
        params.append("sort", 'num_order_desc')
        params.append("limit", '24')
        params.append("page", '1')
        // console.log(params)
      
        // path = '/search?q=' + input
        navigate('/search?'+params)

    };

    const handleChange = (value) => {
        setInput(value);
        // searchFunction(value)
    };

    useEffect(() => {
        if (!location.pathname.includes('/search')) {
            setInput('')
            console.log('in change')
        }

    }, [location])

    return (
        <div id="search-bar" className="min-h-[38px] sm:h-0.8  bg-gray-200 rounded-[5px] grid">
            <div className="relative flex items-stretch">
                <input
                    type="search"
                    className={`w-full relative m-0 block flex-auto border-neutral-300 bg-gray-200 bg-clip-padding x px-3 py-[0.1rem] text-[15px] sm:text-base lg:text-lg font-normal  text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] 
                        focus:outline-none search-cancel:w-4 search-cancel:h-4  search-cancel:grayscale `}
                    placeholder="Tìm kiếm"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyDown={(e) => e.code == "Enter" ? searchFunction(e) : ""} />    
                <button
                    className="flex input-group-text  items-center white space-nowrap rounded-r px-3 text-center text-sm lg:text-base font-normal text-white  bg-red-500"
                    id="basic-addon2" onClick={
                        (e) => searchFunction(e)}>
                    <FaSearch className=" w-4 h-4 block cursor-pointer text-white" 
                    />
                </button>
            </div>
        </div>
    )
}

export default Search;
import React from 'react'
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation, useParams } from 'react-router-dom'

// Thanh Tìm Kiếm được đặt trong Navbar
const Search = ({ setResults }) => {
   
    const navigate = useNavigate();
    const [input, setInput] = useState();
    const searchFunction = (event) => {
        event.preventDefault();
        let path='/search/?q='+input
        navigate(path)
     
    };

    const handleChange = (value) => {
        setInput(value);

        // searchFunction(value)
    };

    return (
        <div id="search-bar" className="h-0.8 sm:my-3 bg-gray-200 rounded-[5px] grid">
            <div className="relative flex items-stretch">
                <input
                    className="w-full relative m-0 block flex-auto border-neutral-300 bg-gray-200 bg-clip-padding px-3 py-[0.1rem] text-[15px] sm:text-base lg:text-lg font-normal  text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3]  focus:outline-none "
                    placeholder="Tìm kiếm"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)} 
                    onKeyDown={(e) => e.code == "Enter" ? searchFunction(e) : ""} />

              

                <button
                    className="hidden  lg:flex input-group-text  items-center white space-nowrap rounded sm:px-3 text-center text-sm lg:text-base font-normal text-neutral-700 dark:text-neutral-200"
                    id="basic-addon2">
                  <FaSearch className="text-black w-5 h-5  block cursor-pointer" onClick={
                        (e) => searchFunction(e)}
                    />
                </button>
            </div>
        </div>
    )
}

export default Search;
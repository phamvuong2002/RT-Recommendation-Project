import React from 'react'
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

// Thanh Tìm Kiếm được đặt trong Navbar
const Search = ({ setResults }) => {
    const [input, setInput] = useState("");


    const searchFunction = (value) => {
        // const results = sampleProducts.filter((keyword) => {
        //     console.log('click')
        //     return (
        //         value &&
        //         keyword &&
        //         keyword.name
        //         && keyword.name.toLowerCase().includes(value)
        //     );
        // });
        // setResults(results);
        
        // console.log('in handle search '+ value)
    };

    const handleChange = (value) => {
        setInput(value);

        // searchFunction(value)
    };

    return (
        <div id="search-bar" className="h-0.8 sm:my-3 bg-gray-100  rounded-[5px] grid">
            <div className="relative flex items-stretch">
                <input
                    className="relative m-0 block flex-auto border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-sm sm:text-base font-normal  text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3]  focus:outline-none dark:border-neutral-600 dark:text-neutral-200 "
                    placeholder="Tìm kiếm"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)} 
                    onKeyDown={(e)=> e.code=="Enter"?searchFunction(input):""}/>

              

                <button
                    className="hidden md:flex input-group-text  items-center white space-nowrap rounded sm:px-3 text-center text-sm lg:text-base font-normal text-neutral-700 dark:text-neutral-200"
                    id="basic-addon2">
                  <FaSearch className="text-black w-5 h-5  block cursor-pointer" onClick={
                        () => searchFunction(input)}
                    />
                </button>
            </div>
        </div>
    )
}

export default Search;
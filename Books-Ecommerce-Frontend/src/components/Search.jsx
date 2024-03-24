import React from 'react'
import { useState } from "react";
import { FaSearch } from "react-icons/fa";


const Search = ({ setResults }) => {
    const [input, setInput] = useState("");

    const sampleProducts = [
        {
            id: 1,
            name: 'Thám tử lừng danh Conan - Tập 1',
            href: `/book/${1}`,
            format: 'Thường',
            price: 90000,
            quantity: 1,
            imageSrc: 'https://picsum.photos/300/300',
            imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
            currency: 'đ',
        },
        {
            id: 2,
            name: '86 - Eightysix - Tập 8',
            href: `/book/${2}`,
            format: 'Thường',
            price: 32000,
            quantity: 1,
            imageSrc: 'https://picsum.photos/300/300',
            imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
            currency: 'đ',
        },
        {
            id: 3,
            name: 'Thám tử lừng danh Conan - Tập 1',
            href: `/book/${3}`,
            format: 'Thường',
            price: 32000,
            quantity: 1,
            imageSrc: 'https://picsum.photos/300/300',
            imageAlt:
                'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
            currency: 'đ',
        },
        {
            id: 4,
            name: '86 - Eightysix - Tập 8',
            href: `/book/${4}`,
            format: 'Thường',
            price: 32000,
            quantity: 1,
            imageSrc: 'https://picsum.photos/300/300',
            imageAlt:
                'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
            currency: 'đ',
        },
        {
            id: 5,
            name: 'Thám tử lừng danh Conan - Tập 1',
            href: `/book/${5}`,
            format: 'Thường',
            price: 32000,
            quantity: 1,
            imageSrc: 'https://picsum.photos/300/300',
            imageAlt:
                'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
            currency: 'đ',
        },
        // More products...
    ]


    const searchFunction = (value) => {
        const results = sampleProducts.filter((keyword) => {
            console.log('click')
            return (
                value &&
                keyword &&
                keyword.name
                && keyword.name.toLowerCase().includes(value)
            );
        });
        setResults(results);
    };

    const handleChange = (value) => {
        setInput(value);

        searchFunction(value)
    };

    return (
        <div id="search-bar" className="h-0.8 sm:my-3 bg-gray-100  rounded-[5px] grid">
            <div className="relative flex items-stretch">
                <input
                    className="relative m-0 block flex-auto border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-sm sm:text-base font-normal  text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3]  focus:outline-none dark:border-neutral-600 dark:text-neutral-200 "
                    placeholder="Tìm kiếm"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)} />

                {/* <!--Search icon--> */}

                <button
                    className="input-group-text flex items-center white space-nowrap rounded sm:px-3 text-center text-sm lg:text-base font-normal text-neutral-700 dark:text-neutral-200"
                    id="basic-addon2">
                    <FaSearch className="text-black w-5 h-5  block cursor-pointer" onClick={(e) => searchFunction(e.target.value)}
                    />
                </button>
            </div>
        </div>
    )
}

export default Search;
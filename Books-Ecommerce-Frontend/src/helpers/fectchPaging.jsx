import React, { useState, useEffect } from 'react';
import axios from "axios";


export const FectchPaging = ({ url }) => {
    //const API_URL = "https://api.github.com/users/fabpot/followers?per_page=6"; 
    //const url = "../data/test/product"
    const totalPages = 5;
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const page = Math.min(currentPage + 1, totalPages);
            // console.log('url1', `${url}page=${page}.json`)
            //const result = await axios.get(`${API_URL}&page=${page}`);api for test
            const result = await axios.get(`${url}page=${page}.json`);
            setPages(result.data);
            setLoading(false);
            // console.log('url2', `${url}page=${page}.json`)
        };
        fetchData();
    }, [url, currentPage]);
    return {
        loading,
        pages,
        totalPages,
        currentPage,
        setCurrentPage,
    };
};



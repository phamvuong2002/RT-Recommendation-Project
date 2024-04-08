import React, { useState, useRef } from 'react';
import { Product } from "./Product";
import { useFectchPaging } from '../helpers/fectchPaging';
import { PaginationButtons } from "./PaginationButtons";



export const AllProducts = () => {
    const { pages, totalPages, currentPage, setCurrentPage } = useFectchPaging();

    const topRef = useRef(null);
    const handlePageChange = () => {
        // Di chuyển màn hình đến phần tử đầu tiên của component
        topRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div ref={topRef} className="md:m-2">
            <div className="grid justify-items-center grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-2 ">
                {/* Hiển thị các sản phẩm của trang hiện tại */}
                {pages.map((product, index) => (
                    <div key={index}>
                        <Product productData={product} />
                    </div>
                ))}
            </div>

            <PaginationButtons
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />

        </div>
    );
};

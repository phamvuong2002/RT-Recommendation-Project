import React, { useState } from 'react';
import { Product } from "./Product";
import { useFectchPaging } from '../helpers/fectchPaging';
import { PaginationButtons } from "./PaginationButtons";


export const AllProducts = () => {
    const { pages, totalPages, currentPage, setCurrentPage } = useFectchPaging();

    return (
        <div className="m-2">
            <div className="grid justify-items-center grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-2 ">
                {/* Hiển thị các sản phẩm của trang hiện tại */}
                {pages.map((product, index) => (
                    <div key={index}>
                        <Product productData={product} />
                    </div>
                ))}
            </div>

            <PaginationButtons
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

        </div>
    );
};

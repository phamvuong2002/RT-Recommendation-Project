import React, { useState } from 'react';
import { range } from 'lodash'; // Import lodash function range to generate page numbers
import { Product } from "./Product";
const productData = [
    {
        imgUrl: "https://product.hstatic.net/200000287623/product/86-9_bia_1_b43d7264e4ca4e48a5342ba95ce2a036_large.jpg",
        title: "86 - Eightysix - Tập 9",
        price: "145,000",
        salePrice: "125,000",
        currency: "đ",
    },

    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 4",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/100_bd275c22338e4df3a7b01a0b8553e338_large.jpg",
        title: "Conan - Thám tử lừng danh - Tập 100",
        price: "25,000",
        salePrice: "23,500",
        currency: "đ",
    },

    {
        imgUrl: "https://product.hstatic.net/200000343865/product/6.5---lmt_6614aed999634a95b52a584fc76d52ff_large.jpg",
        title: "Nhân vật hạ cấp Tomozaki - Tập 6.5",
        price: "99,900",
        salePrice: "111,000",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 5",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 6",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 7",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000287623/product/86-9_bia_1_b43d7264e4ca4e48a5342ba95ce2a036_large.jpg",
        title: "86 - Eightysix - Tập 8",
        price: "145,000",
        salePrice: "125,000",
        currency: "đ",
    },

    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 9",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/100_bd275c22338e4df3a7b01a0b8553e338_large.jpg",
        title: "Conan - Thám tử lừng danh - Tập 10",
        price: "25,000",
        salePrice: "23,500",
        currency: "đ",
    },

    {
        imgUrl: "https://product.hstatic.net/200000343865/product/6.5---lmt_6614aed999634a95b52a584fc76d52ff_large.jpg",
        title: "Nhân vật hạ cấp Tomozaki - Tập 11",
        price: "99,900",
        salePrice: "111,000",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 12",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 13",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 14",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000287623/product/86-9_bia_1_b43d7264e4ca4e48a5342ba95ce2a036_large.jpg",
        title: "86 - Eightysix - Tập 15",
        price: "145,000",
        salePrice: "125,000",
        currency: "đ",
    },

    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 16",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/100_bd275c22338e4df3a7b01a0b8553e338_large.jpg",
        title: "Conan - Thám tử lừng danh - Tập 17",
        price: "25,000",
        salePrice: "23,500",
        currency: "đ",
    },

    {
        imgUrl: "https://product.hstatic.net/200000343865/product/6.5---lmt_6614aed999634a95b52a584fc76d52ff_large.jpg",
        title: "Nhân vật hạ cấp Tomozaki - Tập 18",
        price: "99,900",
        salePrice: "111,000",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 19",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 20",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 21",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000287623/product/86-9_bia_1_b43d7264e4ca4e48a5342ba95ce2a036_large.jpg",
        title: "86 - Eightysix - Tập 9",
        price: "145,000",
        salePrice: "125,000",
        currency: "đ",
    },

    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 4",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/100_bd275c22338e4df3a7b01a0b8553e338_large.jpg",
        title: "Conan - Thám tử lừng danh - Tập 100",
        price: "25,000",
        salePrice: "23,500",
        currency: "đ",
    },

    {
        imgUrl: "https://product.hstatic.net/200000343865/product/6.5---lmt_6614aed999634a95b52a584fc76d52ff_large.jpg",
        title: "Nhân vật hạ cấp Tomozaki - Tập 6.5",
        price: "99,900",
        salePrice: "111,000",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 5",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 6",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 7",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000287623/product/86-9_bia_1_b43d7264e4ca4e48a5342ba95ce2a036_large.jpg",
        title: "86 - Eightysix - Tập 8",
        price: "145,000",
        salePrice: "125,000",
        currency: "đ",
    },

    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 9",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/100_bd275c22338e4df3a7b01a0b8553e338_large.jpg",
        title: "Conan - Thám tử lừng danh - Tập 10",
        price: "25,000",
        salePrice: "23,500",
        currency: "đ",
    },

    {
        imgUrl: "https://product.hstatic.net/200000343865/product/6.5---lmt_6614aed999634a95b52a584fc76d52ff_large.jpg",
        title: "Nhân vật hạ cấp Tomozaki - Tập 11",
        price: "99,900",
        salePrice: "111,000",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 12",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 13",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 14",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000287623/product/86-9_bia_1_b43d7264e4ca4e48a5342ba95ce2a036_large.jpg",
        title: "86 - Eightysix - Tập 15",
        price: "145,000",
        salePrice: "125,000",
        currency: "đ",
    },

    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 16",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/100_bd275c22338e4df3a7b01a0b8553e338_large.jpg",
        title: "Conan - Thám tử lừng danh - Tập 17",
        price: "25,000",
        salePrice: "23,500",
        currency: "đ",
    },

    {
        imgUrl: "https://product.hstatic.net/200000343865/product/6.5---lmt_6614aed999634a95b52a584fc76d52ff_large.jpg",
        title: "Nhân vật hạ cấp Tomozaki - Tập 18",
        price: "99,900",
        salePrice: "111,000",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 19",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 20",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
    {
        imgUrl: "https://product.hstatic.net/200000343865/product/4_450e25becf1d487baaf6d6f07aeb9659_large.jpg",
        title: "Frieren - Pháp sư tiễn táng - Tập 21",
        price: "45,000",
        salePrice: "40,500",
        currency: "đ",
    },
];

export const AllProducts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 24;
    const totalProducts = productData.length; // Tổng số sản phẩm từ mảng productData

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Tính chỉ số sản phẩm bắt đầu và kết thúc của trang hiện tại
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, totalProducts);

    // Mảng chứa các chỉ số sản phẩm để hiển thị trên trang hiện tại
    const currentPageProducts = productData.slice(startIndex, endIndex);

    // Tính toán phạm vi của các số trang cần hiển thị
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(startPage + 2, totalPages);

    // Đảm bảo có đủ 3 số trang để hiển thị nếu trang hiện tại gần cuối danh sách
    if (endPage - startPage < 2) {
        startPage = Math.max(1, endPage - 2);
    }

    return (
        <div className="m-2">
            <div className="grid justify-items-center grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-2 ">
                {/* Hiển thị các sản phẩm của trang hiện tại */}
                {currentPageProducts.map((product, index) => (
                    <div key={index}>
                        <Product productData={product} />
                    </div>
                ))}
            </div>
            <div className="hidden md:block">
                <div className="flex justify-center mt-4 gap-6">
                    <button onClick={prevPage} disabled={currentPage === 1} className=" text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>

                    <div className="">
                        {/* Hiển thị số trang và xử lý khi nhấn vào số trang */}
                        {range(startPage, endPage + 1).map(page => (
                            <span key={page} onClick={() => goToPage(page)}
                                className={page === currentPage ? 'inline-block rounded-[50%] w-8 h-8 leading-8 text-center font-bold cursor-pointer bg-red-500 text-white' : 'cursor-pointer p-1 mx-2'}>{page}</span>
                        ))}
                    </div>

                    <button onClick={nextPage} disabled={currentPage === totalPages} className="text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    );
};
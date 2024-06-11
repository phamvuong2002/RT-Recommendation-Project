import React from 'react'
import "./chooseCate.css"
import { useNavigate } from 'react-router-dom'
export const ChooseCate = () => {
    const navigate = useNavigate()
    const handleOnClick = (value) => {
        // console.log(value)

        let params = new URLSearchParams({ categories: value });
        // console.log(params)
        params.append('sort', 'create_time_desc');
        params.append('limit', '24');
        params.append('page', '1');
        params.append('search_type', 'normal');
        // console.log(params)
        // params.append('genre', selectedCate)
        navigate('/search_v2?' + params);
    };
    
    return (
        <div className="h-[16rem] cursor-pointer">
            <div className="swatch text-sm font-inter text-white font-semibold">
                <div className="shadow hover:shadow-2xl hover:shadow-purple-700" 
                    onClick={() => handleOnClick("sach-tieng-viet,thieu-nhi")}
                >
                    Sách Thiếu Nhi
                    <img width="50" height="50" src="https://img.icons8.com/external-others-pike-picture/50/external-Book-library-others-pike-picture.png" alt="external-Book-library-others-pike-picture"/>
                </div>
                <div className="shadow hover:shadow-2xl hover:shadow-blue-700"
                    onClick={() => handleOnClick("sach-tieng-viet,giao-khoa-tham-khao")}
                >
                    Giáo Khoa - Tham Khảo
                    <img width="48" height="48" src="https://img.icons8.com/color/48/books.png" alt="books"/>
                </div>
                <div className="shadow hover:shadow-2xl hover:shadow-green-700"
                    onClick={() => handleOnClick("sach-tieng-viet,manga-comic")}
                >
                    Manga - Truyện Tranh
                    <img width="64" height="64" src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-comic-book-art-and-design-wanicon-lineal-color-wanicon.png" alt="external-comic-book-art-and-design-wanicon-lineal-color-wanicon"/>
                </div>
                <div className="shadow hover:shadow-2xl hover:shadow-yellow-400"
                    onClick={() => handleOnClick("sach-tieng-viet,sach-hoc-ngoai-ngu")}
                >
                    Sách Học Ngoại Ngữ
                    <img width="50" height="50" src="/img/languages_books_cate.png" alt="languages_books_cate"/>

                </div>
                <div className="shadow hover:shadow-2xl hover:shadow-yellow-700"
                    onClick={() => handleOnClick("sach-tieng-viet,kinh-te")}
                >
                    Kinh Tế - Doanh Nhân
                    <img width="50" height="50" src="/img/economics_book.png" alt="economics_book"/>

                </div>
                <div className="shadow hover:shadow-2xl hover:shadow-red-600"
                    onClick={() => handleOnClick("sach-tieng-viet,tam-ly-ky-nang-song")}
                >
                    Tâm Lý - Kỹ Năng Sống
                    <img width="50" height="50" className="ml-3" src="/img/psychology-book.png" alt="psychology-book"/>

                </div>
            </div>
        </div>
    )
}

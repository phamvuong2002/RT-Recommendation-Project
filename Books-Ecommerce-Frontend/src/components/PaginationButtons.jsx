import ReactPaginate from "react-paginate";
import PropTypes from 'prop-types';

// export const PaginationButtons = ({ setCurrentPage, currentPage, totalPages, handlePageChange }) => {
//     const handlePageClick = ({ selected, url }) => {
//         setCurrentPage(selected)
//         console.log('lan2', selected)
//     };

//     const showNextButton = currentPage !== totalPages - 1;
//     const showPrevButton = currentPage !== 0;
//     return (
//         <div>
//             <ReactPaginate
//                 onClick={handlePageChange}
//                 breakLabel={<span className="mr-4">...</span>}
//                 nextLabel={
//                     showNextButton ? (
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-[#ff4e4e]">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//                         </svg>
//                     ) : null
//                 }
//                 onPageChange={handlePageClick}
//                 pageRangeDisplayed={2}
//                 pageCount={totalPages}
//                 previousLabel={
//                     showPrevButton ? (
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-[#ff4e4e]">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//                         </svg>
//                     ) : null
//                 }
//                 containerClassName="flex items-center justify-center mt-8 mb-4"
//                 pageClassName="w-8 h-8 flex items-center justify-center mr-4"
//                 activeClassName="rounded-[50%] w-8 h-8 leading-8 text-center font-bold cursor-pointer bg-red-500 text-white"
//             />
//         </div>

//     );
// };

// PaginationButtons.propTypes = {
//     setCurrentPage: PropTypes.func.isRequired,
//     currentPage: PropTypes.number.isRequired,
//     totalPages: PropTypes.number.isRequired,
//     handlePageChange: PropTypes.func.isRequired,
// };

export const PaginationButtons = ({ pagination, onPageChange }) => {

    const { _page, _limit, _totalRows } = pagination;
    const totalPages = Math.ceil(_totalRows / _limit);

    const handlePageChange = ({ selected }) => {
        onPageChange(selected + 1); //+1 là do thư viện ReactPaginate mặc định page đầu tiên là 0
    };

    const showPrevButton = _page <= 1
    const showNextButton = _page >= totalPages

    return (
        <div>
            <ReactPaginate
                breakLabel={<span className="mr-4">...</span>}
                nextLabel={
                    showNextButton ? null : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-[#ff4e4e]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    )
                }
                onPageChange={handlePageChange}
                pageRangeDisplayed={2}
                pageCount={totalPages}
                previousLabel={
                    showPrevButton ? null : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-[#ff4e4e]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    )
                }
                containerClassName="flex items-center justify-center mt-8 mb-4"
                pageClassName="w-8 h-8 flex items-center justify-center mr-4"
                activeClassName="rounded-[50%] w-8 h-8 leading-8 text-center font-bold cursor-pointer bg-red-500 text-white"
            />
        </div>

    );
}


PaginationButtons.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
};


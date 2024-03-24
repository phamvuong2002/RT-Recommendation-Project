import React, { useEffect, useRef, useState } from 'react'
import { StarRating } from './StarRating';
import { DropDownClick } from './DropDownClick';

const SAMPLESORT = {
    default: 'Liên quan',
    recent: 'Gần Đây',
    a_z: 'Đánh giá: Từ cao tới thấp',
    z_a: 'Đánh giá: Từ thấp tới cao',
}

const SAMPLESTAR = {
    default: 'Tất Cả',
    '1': '1 sao',
    '2': '2 sao',
    '3': '3 sao',
    '4': '4 sao',
    '5': '5 sao',
    'LOW': 'Đánh giá Thấp',
    'HIGH': 'Đánh giá Cao',
}

export const FeedBack = () => {
    const [totalComments, setTotalComments] = useState(1745);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const commentContainerRef = useRef(null);
    const [sort, setSort] = useState(SAMPLESORT.default);
    const [filter, setFilter] = useState(SAMPLESTAR.default);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const sortIcon = (className) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
        );
    }

    const filterIcon = (className) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
        );
    }


    // Load Comments
    const loadComments = async (url) => {
        try {
            const response = await fetch(url); // Đường dẫn đến file JSON chứa danh sách comments
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log('Error fetching comments:', error);
            throw error;
        }
    };

    useEffect(() => {
        const url = '../data/test/comments.json';
        const loadCommentsData = async () => {
            try {
                const commentsData = await loadComments(url);
                setComments(filterAndSortComments(filter, sort, commentsData))
            } catch (error) {
                // throw error;
            }
        }
        loadCommentsData();
    }, [filter, sort])

    useEffect(() => {
        const url = '../data/test/comments.json';

        // Hàm để tải thêm comment
        const loadMoreComments = () => {
            setLoading(true);
            // Thực hiện logic để tải thêm comment ở đây, ví dụ: gọi API
            // Sau khi tải xong, cập nhật state comments và loading
            // Ví dụ:
            // fetchDataForMoreComments().then((newComments) => {
            //   setComments((prevComments) => [...prevComments, ...newComments]);
            //   setLoading(false);
            // });
            setTimeout(async () => {
                try {
                    const commentsData = await loadComments(url);
                    setComments(filterAndSortComments(filter, sort, (prevComments) => [...prevComments, ...commentsData]))
                } catch (error) {
                    // throw error;
                }
                setLoading(false);
                scrollUp();
            }, 2000);

        };


        // Đăng ký sự kiện cuộn trang để xác định khi nào nên tải thêm comment
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = commentContainerRef.current;

            if (scrollTop + clientHeight >= scrollHeight - 100) {
                // Khi cuộn đến cuối của phần tử
                console.log('Cuộn đến cuối của phần tử');
                loadMoreComments();
            }
        };

        commentContainerRef?.current.addEventListener('scroll', handleScroll);

        return () => {
            commentContainerRef?.current?.removeEventListener('scroll', handleScroll);
        };
    }, [filter, sort]); // Thay đổi trong comments sẽ gọi lại useEffect

    // Cuộn trang lên đầu phần tử chứa danh sách comment
    const scrollUp = () => {
        commentContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    //Xử lý đóng mở 2 Select 
    const handleSortToggle = () => {
        setIsSortOpen(!isSortOpen);
        setIsFilterOpen(false); // Đóng dropdown filter khi mở dropdown sort
    };

    const handleFilterToggle = () => {
        setIsFilterOpen(!isFilterOpen);
        setIsSortOpen(false); // Đóng dropdown sort khi mở dropdown filter
    };

    //Lọc Comments
    const filterCommentsByRating = (filterType, comments) => {
        if (filterType === SAMPLESTAR.default) {
            return comments;
        } else if (filterType === SAMPLESTAR.LOW) { // Đánh giá thấp (1-3 sao)
            return comments.filter(comment => comment.rating >= 1 && comment.rating <= 3);
        } else if (filterType === SAMPLESORT.HIGH) { // Đánh giá cao (4-5 sao)
            return comments.filter(comment => comment.rating >= 4 && comment.rating <= 5);
        } else { // Lọc theo số sao cụ thể
            const rating = parseInt(filterType);
            return comments.filter(comment => comment.rating === rating);
        }
    };

    //Sắp Xếp comments
    const sortComments = (sortType, comments) => {
        switch (sortType) {
            case SAMPLESORT.recent:
                return [...comments].sort((a, b) => new Date(b.date) - new Date(a.date));
            case SAMPLESORT.a_z:
                return [...comments].sort((a, b) => b.rating - a.rating);
            case SAMPLESORT.z_a:
                return [...comments].sort((a, b) => a.rating - b.rating);
            default:
                return comments;
        }
    };

    //Lọc và Sếp
    const filterAndSortComments = (filterType, sortType, comments) => {
        // Filter comments based on filterType
        let filteredComments = filterCommentsByRating(filterType, comments);

        // Sort filtered comments based on sortType
        let sortedComments = sortComments(sortType, filteredComments);

        return sortedComments;
    };

    return (
        <div className="xl:flex flex-col px-2 xl:gap-6  ">
            <div className="flex flex-col xl:gap-16 xl:flex-row">
                {/* total rating */}
                <div className="flex flex-col mb-2 items-center justify-center gap-1">
                    <div className="w-20 h-11 relative">
                        <div className="w-8 h-10 left-0 top-0 absolute text-black text-4xl font-medium font-['Inter'] capitalize">5</div>
                        <div className="w-9 h-px left-[41.98px] top-[11.57px] absolute origin-top-left rotate-[104.04deg] border border-black"></div>
                        <div className="w-10 h-7 left-[46.29px] top-[10.41px] absolute text-black text-3xl font-medium font-['Inter'] capitalize">5</div>
                    </div>
                    <StarRating averageRating={4} numReviews={5} shownumReviews={false} />
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 Đánh giá</p>
                </div>

                {/* sort rating */}
                <div className="pl-8 w-full xl:w-[50rem]">
                    <div className="flex items-center mt-4 ml-4">
                        <a href="#" className="text-sm font-medium text-red-600 dark:text-red-500 hover:underline xl:hidden">5 star</a>
                        <div className="hidden xl:inline-block">
                            <StarRating averageRating={5} numReviews={5} shownumReviews={false} />
                        </div>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                            <div className="h-5 bg-yellow-300 rounded w-[70%]"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">70%</span>
                    </div>
                    <div className="flex items-center mt-4 ml-4">
                        <a href="#" className="text-sm font-medium text-red-600 dark:text-red-500 hover:underline xl:hidden">4 star</a>
                        <div className="hidden xl:inline-block">
                            <StarRating averageRating={4} numReviews={5} shownumReviews={false} />
                        </div>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                            <div className="h-5 bg-yellow-300 rounded w-[17%]"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">17%</span>
                    </div>
                    <div className="flex items-center mt-4 ml-4">
                        <a href="#" className="text-sm font-medium text-red-600 dark:text-red-500 hover:underline xl:hidden">3 star</a>
                        <div className="hidden xl:inline-block">
                            <StarRating averageRating={3} numReviews={5} shownumReviews={false} />
                        </div>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                            <div className="h-5 bg-yellow-300 rounded w-[8%]"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">8%</span>
                    </div>
                    <div className="flex items-center mt-4 ml-4">
                        <a href="#" className="text-sm font-medium text-red-600 dark:text-red-500 hover:underline xl:hidden">2 star</a>
                        <div className="hidden xl:inline-block">
                            <StarRating averageRating={2} numReviews={5} shownumReviews={false} />
                        </div>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                            <div className="h-5 bg-yellow-300 rounded w-[4%]"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">4%</span>
                    </div>
                    <div className="flex items-center mt-4 ml-4">
                        <a href="#" className="text-sm font-medium text-red-600 dark:text-red-500 hover:underline xl:hidden">1 star</a>
                        <div className="hidden xl:inline-block">
                            <StarRating averageRating={1} numReviews={5} shownumReviews={false} />
                        </div>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                            <div className="h-5 bg-yellow-300 rounded w-[1%]"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">1%</span>
                    </div>
                </div>
            </div>

            {/* <hr /> */}
            {/* Filter comments */}
            <div className="mt-2 h-14 flex xl:gap-14 border-y border-x-gray-300 items-center">
                <div className="w-[50rem] xl:w-[52rem]">
                    <div className=" font-medium text-base hidden xl:inline-block">
                        Nhận Xét Về Sản Phẩm ({`${comments.length} /${totalComments}`})
                    </div>
                    <div className="font-medium text-base xl:hidden">
                        Đánh Giá ({`${comments.length} /${totalComments}`})
                    </div>
                </div>

                {/* Sort và Filter */}
                <div className="flex">
                    <div className="hidden xl:block">
                        <DropDownClick icon={sortIcon} value={sort} setValue={setSort} titleOption={"Lọc:"} dataOption={SAMPLESORT} toggleDropdown={handleSortToggle} isOpen={isSortOpen} setIsOpen={setIsSortOpen} className={"h-full w-40 flex flex-col xl:gap-2 items-center justify-center border-x border-gray-300"} />
                    </div>
                    <DropDownClick icon={filterIcon} value={filter} setValue={setFilter} titleOption={"Lọc:"} dataOption={SAMPLESTAR} toggleDropdown={handleFilterToggle} isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} className={"h-full w-40 flex flex-col xl:gap-2 items-center justify-center border-x border-gray-300"} />
                </div>


            </div>
            {/* <hr /> */}


            {/* comments */}
            <div className=" w-full flex flex-col mt-6 xl:mt-1 gap-12 max-h-[24rem] xl:max-h-[50rem] overflow-y-scroll xl:scrollbar-thin xl:scrollbar-webkit" ref={commentContainerRef}>
                {/* Hiển thị danh sách các comment */}
                {/* <div></div> */}
                {comments?.map(comment => (
                    <div key={comment.commentId} className="flex gap-2 border-b border-b-gray-300 pb-8">
                        {/* avartar */}
                        <img className="w-10 h-10 me-4 rounded-full" src={comment.avatar} alt="avatar"></img>

                        {/* user review */}
                        <div className="flex flex-col gap-4 pr-2 w-full">
                            <div className="flex flex-col gap-1">
                                {/* rating-date */}
                                <div className="flex justify-between">
                                    <StarRating averageRating={comment.rating} numReviews={5} shownumReviews={false} className="flex justify-start gap-2" />
                                    <span className="text-sm font-light ">{comment.date}</span>
                                </div>
                                {/* username-certifiedPurchase */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">{comment.username}</span>
                                    <div className="flex items-center text-xs text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                                            <linearGradient id="IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#9dffce"></stop><stop offset="1" stopColor="#50d18d"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><linearGradient id="IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stopColor="#135d36"></stop><stop offset=".931" stopColor="#125933"></stop><stop offset="1" stopColor="#11522f"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
                                        </svg>
                                        {'Chứng nhận đã mua hàng'}
                                    </div>
                                </div>
                            </div>

                            {/* <div className="flex items-center">
                                <div className="flex flex-col font-inter">
                                </div>
                            </div> */}
                            {/* content */}
                            <div className="text-sm font-inter">
                                {comment.content}
                            </div>
                        </div>
                    </div>
                ))}
                {/* Hiển thị loading indicator nếu đang tải */}
                {loading && <div>Loading...</div>}
            </div>
        </div>
    );
}

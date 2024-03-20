import React, { useEffect, useRef, useState } from 'react'
import { StarRating } from './StarRating';


const sampleComments = [
    "Hàng giao nhanh, chất lượng sản phẩm tuyệt vời, quà đầy đủ, vẫn còn nguyên seal",
    "Sản phẩm đáng giá tiền",
    "Dịch vụ khách hàng rất tốt",
    "Giao hàng nhanh chóng và đúng hẹn",
    "Chất lượng sản phẩm ổn định qua thời gian",
    "Rất hài lòng với trải nghiệm mua sắm này",
    "Sản phẩm đáp ứng đầy đủ mong đợi của tôi",
    "Đóng gói cẩn thận và chắc chắn",
    "Giá cả hợp lý so với chất lượng",
    "Tôi sẽ quay lại mua hàng ở đây lần sau"
];



export const FeedBack = () => {
    const [comments, setComments] = useState(sampleComments);
    const [loading, setLoading] = useState(false);
    const commentContainerRef = useRef(null);

    useEffect(() => {
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
            setTimeout(() => {
                setLoading(false);
                setComments((prevComments) => [...prevComments, ...sampleComments])
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
    }, [comments]); // Thay đổi trong comments sẽ gọi lại useEffect

    const scrollUp = () => {
        // Cuộn trang lên đầu phần tử chứa danh sách comment
        commentContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="flex flex-col px-2 gap-8 xl:items-center ">
            {/* sort rating */}
            <div className="flex flex-col xl:flex-row xl:pl-[18rem]">
                {/* total rating */}
                <div className="flex flex-col mb-2 items-center justify-center gap-2">
                    <div className="w-20 h-11 relative">
                        <div className="w-8 h-10 left-0 top-0 absolute text-black text-4xl font-medium font-['Inter'] capitalize">5</div>
                        <div className="w-9 h-px left-[41.98px] top-[11.57px] absolute origin-top-left rotate-[104.04deg] border border-black"></div>
                        <div className="w-10 h-7 left-[46.29px] top-[10.41px] absolute text-black text-3xl font-medium font-['Inter'] capitalize">5</div>
                    </div>
                    <StarRating averageRating={4} numReviews={5} shownumReviews={false} />
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 Đánh giá</p>
                </div>

                {/* sort rating */}
                <div className="px-8 xl:w-[50rem]">
                    <div className="flex items-center mt-4 ml-4">
                        <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">5 star</a>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                            <div className="h-5 bg-yellow-300 rounded w-[70%]"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">70%</span>
                    </div>
                    <div className="flex items-center mt-4 ml-4">
                        <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">4 star</a>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                            <div className="h-5 bg-yellow-300 rounded w-[17%]"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">17%</span>
                    </div>
                    <div className="flex items-center mt-4 ml-4">
                        <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">3 star</a>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                            <div className="h-5 bg-yellow-300 rounded w-[8%]"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">8%</span>
                    </div>
                    <div className="flex items-center mt-4 ml-4">
                        <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">2 star</a>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                            <div className="h-5 bg-yellow-300 rounded w-[4%]"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">4%</span>
                    </div>
                    <div className="flex items-center mt-4 ml-4">
                        <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">1 star</a>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                            <div className="h-5 bg-yellow-300 rounded w-[1%]"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">1%</span>
                    </div>
                </div>
            </div>

            {/* comment */}
            <div className=" flex flex-col gap-4 max-h-[32rem] xl:max-h-[20rem] overflow-y-scroll xl:scrollbar-thin xl:scrollbar-webkit" ref={commentContainerRef}>
                {/* Hiển thị danh sách các comment */}
                {/* <div></div> */}
                {comments.map((comment, index) => (
                    <div key={index} className="flex flex-col xl:flex-row pr-2">
                        {/* user rating */}
                        <div className="flex items-center">
                            <img className="w-10 h-10 me-4 rounded-full" src="https://picsum.photos/200" alt="avatar"></img>
                            <div className="flex flex-col font-inter">
                                <span className="text-sm">Nguyễn Văn A</span>
                                <StarRating averageRating={4} numReviews={5} shownumReviews={false} className="flex justify-start gap-2" />
                                <span className="text-sm font-light ">10/01/2023</span>
                            </div>
                        </div>
                        {/* user review */}
                        <div className="text-base font-inter pl-14">
                            {comment}
                        </div>
                    </div>
                ))}
                {/* Hiển thị loading indicator nếu đang tải */}
                {loading && <div>Loading...</div>}
            </div>
        </div>
    );
}

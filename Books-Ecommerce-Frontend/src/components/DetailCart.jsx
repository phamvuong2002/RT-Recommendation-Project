import React, { useEffect, useState } from 'react'
import { StarRating } from './StarRating';
import { PopupOpen } from './popup/PopupOpen';
import { DropDownClick } from './DropDownClick';
import { popupContent } from '../helpers/popupContent'
import { sharePopupUI } from '../components/childComponents/sharePopupUI';
import { formatNumberToText } from '../utils/formatNumberToText';
import { fetchData, fetchDataGHN } from '../helpers/fetch';
import { TextLoader } from '../components/loaders/TextLoader';
import { SelectAddressPopup } from '../helpers/SelectAddressPopup';
import { calculateShippingFeeDefault } from '../utils/calculateShippingFeeDefault';

const SAMPLEVERSION = {
    default: 'Thường',
    'special': 'Đặt biệt'
}


export const DetailCart = (/*{ product }*/) => {

    const [product, setProduct] = useState({ productid: 0 })
    const [numCarts, setNumCarts] = useState(1);
    const [version, setVersion] = useState(SAMPLEVERSION.default);
    const [isVersionOpen, setIsVersionOpen] = useState(false);
    const [openLovePopup, setOpenLovePopup] = useState(false);
    const [openAddToCartsPopup, setOpenAddToCartsPopup] = useState(false);
    const [openSharePopup, setOpenSharePopup] = useState(false);
    const [urlShare, setUrlShare] = useState('');

    const [userAddresses, setUserAddresses] = useState([]);
    const [defaultAddress, setDefaultAddress] = useState({ addressid: 0 });
    const [isAddrPopupOpen, setIsAddrPopupOpen] = useState(false);
    const [shippingService, setShippingService] = useState({ serviceid: 0 });



    //Xử lý chọn version
    const handleVersionToggle = async () => {
        setIsVersionOpen(!isVersionOpen);
    };

    //Xử lý khách hàng thêm sản phẩm vào giỏ
    const handleAddToCarts = async (e) => {
        if (!numCarts) {
            return
        }
        e.preventDefault();
        setOpenAddToCartsPopup(true);
    };

    //Xử lý khách hàng yêu thích sản phẩm
    const handleAddToInterestList = async (e) => {
        e.preventDefault();
        setOpenLovePopup(true);
    }

    //Xử lý nút chia sẻ
    const handleShare = (e) => {
        e.preventDefault();
        setOpenSharePopup(true);
    }

    // Xử lý sự kiện click chỉnh sửa địa chỉ
    //Load địa chỉ khi mở popup
    const handleAddressChange = async (e) => {
        e.preventDefault();
        const url = '../data/test/useraddresses.json';
        try {
            const addressData = await fetchData(url);
            setUserAddresses(addressData)
        } catch (error) {
            // throw error;
        }
    }

    //Cập nhật url share
    useEffect(() => {
        const url = window.location.href;
        setUrlShare(url)
    }, [urlShare])

    //Fetch User Address Default
    useEffect(() => {
        const url = '../data/test/useraddresses.json';
        const loadShoppingAddress = async () => {
            try {
                const addressData = await fetchData(url);
                setDefaultAddress(addressData[0])
            } catch (error) {
                // throw error;
            }
        }

        setTimeout(() => {
            loadShoppingAddress()
        }, 1000)
    }, [])


    //Fetch service shipping free
    useEffect(() => {
        // const url = '../data/test/services.json';
        setShippingService({ serviceid: 0 })
        const loadService = async () => {
            try {
                const services = await calculateShippingFeeDefault(defaultAddress, { name: product.title, id: product.productid, ...product })
                // const service = serviceData.find(s => s.typeid === 'GHTC');

                const service = services[0]
                setShippingService(service)
            } catch (error) {
                // throw error;
            }
        }

        if (defaultAddress.addressid !== 0) {
            loadService()
        }
    }, [defaultAddress])

    //Load Sản phẩm
    useEffect(() => {
        const url = '../data/test/singleproduct.json';
        const loadSingleProduct = async () => {
            try {
                const singleProductData = await fetchData(url);
                setProduct(singleProductData[0])
            } catch (error) {
                // throw error;
            }
        }

        setTimeout(() => {
            loadSingleProduct()
        }, 1000)
    }, [])

    return (
        <div className="font-inter xl:px-28">
            <div className="">
                <div className=" bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:gap-14 md:gap-1 gap-2 h-max">
                        {/* Images */}
                        {
                            product.productid === 0 ?
                                <div className="flex items-center justify-center">
                                    <img
                                        src={"/img/detail_book_pattern.JPG"}
                                        alt={"product image"}
                                        className="mx-auto w-full xl:hover:scale-105 trasition-all duration-300 aspect-auto xl:h-[25rem] md:h-[32rem] animate-pulse"
                                    />
                                </div>
                                :
                                <div className="flex items-center justify-center">
                                    <img
                                        src={product.imgUrl}
                                        alt={product.title || "product image"}
                                        className="mx-auto w-full xl:hover:scale-105 trasition-all duration-300 aspect-auto xl:h-[34rem] md:h-[32rem]"
                                    />
                                </div>
                        }
                        {/* Details - Main information*/}
                        {
                            product.productid === 0 ?
                                <TextLoader items={5} />
                                :
                                <div className="px-1">
                                    {/* Title */}
                                    <h1 className="mt-2 text-2xl font-bold text-[#393280]">{product.title}</h1>
                                    <div className="w-[8rem] mt-6 border-t-2 border-[#ED553B]"></div>

                                    {/* Additional Information */}
                                    <div className="flex items-center justify-between">
                                        {/* Author name */}
                                        <div className="text-zinc-600">{product.author}</div>
                                        {/* Rating */}
                                        <StarRating averageRating={product.averageRating} numReviews={product.numReviews} />
                                    </div>

                                    {/* Short Description */}
                                    <div className="mt-4 ">
                                        <div className="text-base font-bold text-[#393280]">Nội dung chính</div>
                                        <p className="mt-2 text-sm">
                                            {product.shortDescription}
                                        </p>
                                    </div>
                                    {/* Prices */}
                                    <div title="price" className=" flex gap-2 mt-8 sm:text-2xl pr-8 ">
                                        <div className="text-red-500 text-3xl font-bold capitalize tracking-wide">
                                            <span>
                                                {formatNumberToText(product.salePrice)}
                                            </span>
                                            <span className="underline">
                                                {product.currency}
                                            </span>
                                        </div>
                                        <div className="flex items-end text-sm line-through text-red-400 font-bold tracking-wide">
                                            <span className="">
                                                {formatNumberToText(product.price)}
                                            </span>
                                            <span className="underline">{product.currency}</span>
                                        </div>
                                    </div>
                                    {/* Order Space */}
                                    <div className="mt-10">
                                        <div className="flex mt-6 justify-start items-center gap-4 text-base ">
                                            <div className="font-inter font-medium leading-tight tracking-wide">Phiên bản:</div>
                                            <div></div>
                                            <DropDownClick
                                                icon={false}
                                                value={version}
                                                setValue={setVersion}
                                                titleOption={''}
                                                dataOption={SAMPLEVERSION}
                                                toggleDropdown={handleVersionToggle}
                                                isOpen={isVersionOpen}
                                                setIsOpen={setIsVersionOpen}
                                                className={"w-[7rem] h-[2rem] flex items-center justify-center border border-red-500 xl:hover:bg-red-500  xl:hover:text-white transition-all"}
                                                customButton={"text-base font-[400] pr-1"}
                                            />

                                        </div>

                                        <div className="mt-6 flex gap-6">
                                            <div>
                                                <div className=" flex items-center">
                                                    <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-red-500  xl:hover:bg-red-300 p-3 rounded-sm h-9 w-9" onClick={() => setNumCarts(numCarts === 1 ? 1 : numCarts - 1)}>
                                                        <svg className="w-3 h-3 text-center text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                        </svg>
                                                    </button>
                                                    <input className="h-9 max-w-24 text-center border border-y-red-500" type="text" value={numCarts} id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" placeholder="Chọn số lượng cần mua" required readOnly />
                                                    <button type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-red-500  xl:hover:bg-red-300 p-3 rounded-sm h-9 w-9" onClick={() => setNumCarts(numCarts + 1)}>
                                                        <svg className="w-3 h-3 text-center text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <span id="helper-text-explanation" className="mt-1 text-sm text-gray-500 dark:text-gray-400">Chọn số lượng cần mua</span>
                                            </div>
                                            {/* Adding to cart button */}
                                            <div className="flex gap-8 xl:gap-20">
                                                {/* Add to cart button */}
                                                <div className="flex gap-1">
                                                    <PopupOpen
                                                        open={openAddToCartsPopup}
                                                        setOpen={setOpenAddToCartsPopup}
                                                        autoClose={2000}
                                                        Content={popupContent('text-gray-800 text-base text-center',
                                                            <div className="flex flex-col gap-2 justify-center items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="120" height="120" viewBox="0 0 48 48">
                                                                    <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
                                                                </svg>
                                                                <div>
                                                                    {`Bạn đã thêm ${numCarts} sản phẩm vào Giỏ Hàng!`}
                                                                </div>
                                                            </div>

                                                        )}
                                                        onNoClick={() => setOpenAddToCartsPopup(false)}
                                                    />
                                                    <button title="Thêm vào giỏ" className="w-9 flex h-9 rounded border border-black border-opacity-50 items-center justify-center cursor-pointer" onClick={handleAddToCarts}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="flex gap-1">
                                                    {/* love button */}
                                                    <div>
                                                        <PopupOpen
                                                            open={openLovePopup}
                                                            setOpen={setOpenLovePopup}
                                                            autoClose={1000}
                                                            Content={popupContent('text-gray-800 text-base text-center',
                                                                <div className="flex flex-col gap-2 justify-center items-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="120" height="120" viewBox="0 0 48 48">
                                                                        <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
                                                                    </svg>
                                                                    <div>
                                                                        Bạn đã thêm sản phẩm này vào danh sách yêu thích!
                                                                    </div>
                                                                </div>

                                                            )}
                                                            onNoClick={() => setOpenLovePopup(false)}
                                                        />
                                                        <button
                                                            title="Thêm danh sách yêu thích"
                                                            className="w-9 flex h-9 rounded border border-black border-opacity-50 items-center justify-center cursor-pointer"
                                                            onClick={handleAddToInterestList}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    {/* share button */}
                                                    <div>
                                                        <PopupOpen
                                                            open={openSharePopup}
                                                            setOpen={setOpenSharePopup}
                                                            autoClose={3000}
                                                            Content={
                                                                sharePopupUI(urlShare)
                                                            }
                                                            onNoClick={() => setOpenSharePopup(false)}
                                                        />
                                                        <button title="Chia sẻ sản phẩm" className="w-9 flex h-9 rounded border border-black border-opacity-50 items-center justify-center cursor-pointer"
                                                            onClick={handleShare}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                        {/* Order Button */}
                                        <div className="w-full text-left my-4">
                                            <button className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-red-500
                                    text-white font-bold border border-red-500 ease-in-out duration-150
                                    shadow-slate-600 xl:hover:bg-white xl:hover:text-red-500 lg:m-0 md:px-6">
                                                <span>Mua Ngay</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                        }

                        {/* Details - Sub information*/}
                        <div className="flex flex-col gap-4 pb-4 xl:pb-0 xl:gap-1 px-2 xl:px-0 md:p-2">
                            {/* Sub information */}
                            {
                                product.productid === 0 ?
                                    <TextLoader items={1} />
                                    :
                                    <div className="grid grid-cols-2 text-[0.8rem] xl:text-base xl:flex xl:flex-col xl:mt-12 xl:p-4 gap-4 md:gap-3 md:text-[0.8rem]">
                                        <div className="flex items-center text-base font-semibold">Thông Tin Sản Xuất</div>
                                        <div></div>
                                        <div className="flex justify-between">
                                            <div className="font-semibold">Tác giả:</div>
                                            <div>{product.author}</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="font-semibold">Năm xuất bản:</div>
                                            <div>{product.publishDate}</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="font-semibold">Nhà xuất bản:</div>
                                            <div>{product.publisher}</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="font-semibold">Hình thức:</div>
                                            <div>{product.dimension}</div>
                                        </div>
                                    </div>
                            }
                            {/* <hr className="inline" /> */}
                            <hr className="w-full md:hidden xl:block h-1 xl:h-[0.1rem] bg-gray-100 border-0 dark:bg-gray-700"></hr>
                            {/* Address */}
                            {
                                shippingService.serviceid === 0 ?
                                    <TextLoader items={1} />
                                    :
                                    <div className="md:hidden xl:block xl:p-4">
                                        <div className="flex flex-col gap-3">

                                            <div className="flex justify-between">
                                                <div className="flex items-center text-base font-semibold">Hình thức giao hàng</div>
                                                {/* Popup address*/}
                                                <SelectAddressPopup
                                                    isAddrPopupOpen={isAddrPopupOpen}
                                                    setIsAddrPopupOpen={setIsAddrPopupOpen}
                                                    defaultAddress={defaultAddress}
                                                    userAddresses={userAddresses}
                                                    setDefaultAddress={setDefaultAddress}
                                                    setUserAddresses={setUserAddresses}
                                                    icon={
                                                        <div
                                                            className="flex items-center text-red-500 cursor-pointer xl:hover:text-red-300 transition-all"
                                                            onClick={handleAddressChange}
                                                        >
                                                            <div>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                                </svg>
                                                            </div>
                                                            <div className="flex gap-1 items-center text-[0.8rem]">
                                                                <div>
                                                                    {defaultAddress.wardName || 'Chỉnh sửa'}
                                                                </div>
                                                                <div>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                                    </svg>

                                                                </div>

                                                            </div>
                                                        </div>
                                                    }

                                                />


                                            </div>

                                            <div className="flex justify-between">
                                                <div className="flex items-center text-gray-800 text-xs xl:text-sm font-nomal">
                                                    {shippingService.type}
                                                </div>
                                                <div className="flex items-center text-red-500 xl:hover:text-red-300 transition-all">
                                                    <div className="flex gap-1 items-center text-[0.8rem] xl:text-sm">
                                                        <div className="flex text-gray-400 tracking-wide line-through">
                                                            <div>
                                                                {formatNumberToText(shippingService.fee * 2)}
                                                            </div>
                                                            <div className="underline">đ</div>
                                                        </div>
                                                        <div className="flex text-red-500 font-semibold tracking-wide">
                                                            <div>
                                                                {formatNumberToText(shippingService.fee)}
                                                            </div>
                                                            <div className="underline">đ</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between xl:text-sm">
                                                <div className="flex items-center text-gray-800 text-xs font-nomal">
                                                    {`Nhận vào: ${shippingService.date}`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                        {/* Address md*/}
                        <div className="hidden xl:hidden md:block p-2 xl:p-4 md:text-sm">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between">
                                    <div className="flex items-center text-base font-semibold">Hình thức giao hàng</div>
                                    <div className="flex items-center text-red-500 cursor-pointer xl:hover:text-red-300 transition-all">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                            </svg>
                                        </div>
                                        <div className="flex gap-1 items-center text-[0.8rem]">
                                            <div>
                                                {defaultAddress.wardName || 'Chỉnh sửa'}
                                            </div>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                </svg>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex items-center text-gray-800 text-xs xl:text-sm font-nomal">
                                        {shippingService.type}
                                    </div>
                                    <div className="flex items-center text-red-500 xl:hover:text-red-300 transition-all">
                                        <div className="flex gap-1 items-center text-[0.8rem] xl:text-sm">
                                            <div className="flex text-gray-400 tracking-wide line-through">
                                                <div>
                                                    {formatNumberToText(shippingService.fee * 2)}
                                                </div>
                                                <div className="underline">đ</div>
                                            </div>
                                            <div className="flex text-red-500 font-semibold tracking-wide">
                                                <div>
                                                    {formatNumberToText(shippingService.fee * 1)}
                                                </div>
                                                <div className="underline">đ</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between xl:text-sm">
                                    <div className="flex items-center text-gray-800 text-[0.8rem] font-nomal">
                                        {`Nhận vào: ${shippingService.date}`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
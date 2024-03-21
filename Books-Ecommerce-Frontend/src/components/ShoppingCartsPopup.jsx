import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ShoppingCartLoader } from './loaders/ShoppingCartLoader'
import { calculateTotalPrice } from '../utils/calculateTotalPrice'
import { formatNumberToText } from '../utils/formatNumberToText'
// import { XMarkIcon } from '@heroicons/react/24/outline'

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

export const ShoppingCartsPopup = (/*products*/) => {
    const [open, setOpen] = useState(true);
    const [products, setProducts] = useState([]);
    const NUMLOADER = 6;

    // Xử lý sự kiện khi nhấn nút "Xoá"
    const handleDeleteProduct = (productId) => {
        //ví dụ gửi yêu cầu xoá sản phẩm xuống backend
        //sau đó update products
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
    }

    useEffect(() => {
        //ví dụ tải các sản phẩm trong giỏ hàng của khách
        setTimeout(() => {
            if (open) {
                setProducts(sampleProducts);
            }
        }, 1000)
    }, [open])

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-hidden font-inter">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl ">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 xl:scrollbar-thin xl:scrollbar-webkit">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Giỏ Hàng</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                        </svg>

                                                    </button>
                                                </div>
                                            </div>

                                            {
                                                products.length === 0 ?
                                                    <ShoppingCartLoader items={NUMLOADER} />
                                                    :
                                                    <div className="mt-8">
                                                        <div className="flow-root">
                                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                                {products.map((product) => (
                                                                    <li key={product.id} className="flex py-6" href={product.href}>
                                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                            <img
                                                                                src={product.imageSrc}
                                                                                alt={product.imageAlt}
                                                                                className="h-full w-full object-cover object-center"
                                                                            />
                                                                        </div>

                                                                        <div className="ml-4 flex flex-1 flex-col">
                                                                            <div>
                                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                    <h3>
                                                                                        <a href={product.href}>{product.name}</a>
                                                                                    </h3>
                                                                                    <div className="ml-4 text-red-500 capitalize tracking-wide">
                                                                                        <span>
                                                                                            {formatNumberToText(product.price)}
                                                                                        </span>
                                                                                        <span className="underline">
                                                                                            {product.currency}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <p className="mt-1 text-sm text-gray-500">{product.format}</p>
                                                                            </div>
                                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                                <p className="text-gray-500">Qty {product.quantity}</p>

                                                                                <div className="flex">
                                                                                    <button
                                                                                        type="button"
                                                                                        className=" font-medium text-gray-900 xl:hover:text-gray-600"
                                                                                        onClick={() => handleDeleteProduct(product.id)}
                                                                                    >
                                                                                        Xoá
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                            }
                                        </div>

                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">

                                                <p>Tổng cộng</p>
                                                <div className="text-red-500 text-xl font-bold capitalize tracking-wide">
                                                    <span>
                                                        {formatNumberToText(calculateTotalPrice(products))}
                                                    </span>
                                                    <span className="underline">
                                                        {products[0]?.currency}
                                                    </span>
                                                </div>

                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Phí ship và thuế bao gồm ở trang thanh toán</p>
                                            <div className="mt-6">
                                                <a
                                                    href="#"
                                                    className={`flex items-center justify-center rounded-md border border-transparent bg-red-500 px-6 py-3 text-base font-bold text-white shadow-sm xl:hover:bg-red-700 ${products.length ? '' : 'hidden'}`}
                                                >
                                                    Thanh Toán
                                                </a>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    {products.length === 0 ?
                                                        <button
                                                            type="button"
                                                            className="font-medium text-red-600 hover:text-red-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            Tiếp Tục Mua Sắm
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                        :
                                                        <>đến{' '}
                                                            <button
                                                                type="button"
                                                                className="font-medium text-red-600 hover:text-red-500"
                                                                onClick={() => setOpen(false)}
                                                            >
                                                                Giỏ Hàng Của Bạn
                                                                <span aria-hidden="true"> &rarr;</span>
                                                            </button>
                                                        </>
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

import React from 'react'
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
      category: 'sgk',
      publisher: 'NXB-kimdong',
      publishedDate:'2022-12-18',
      numProductSold:10
    },
    {
      id: 2,
      name: 'Sách tiếng việt tập 1',
      href: `/book/${2}`,
      format: 'Thường',
      price: 32000,
      quantity: 1,
      imageSrc: 'https://picsum.photos/300/300',
      imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
      currency: 'đ',
      category: 'light-novel',
      publisher: 'NXB-giaoducvn',
      publishedDate:'2023-12-20',
      numProductSold:20
    },
    {
      id: 3,
      name: 'Thám tử lừng danh Conan - Tập 1',
      href: `/book/${3}`,
      format: 'Thường',
      price: 320000,
      quantity: 1,
      imageSrc: 'https://picsum.photos/300/300',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
      currency: 'đ',
      category: 'sgk',
      publisher: 'NXB-tre',
      publishedDate:'2023-12-18',
      numProductSold:5
    },
    {
      id: 4,
      name: '86 - Eightysix - Tập 8',
      href: `/book/${4}`,
      format: 'Thường',
      price: 200000,
      quantity: 1,
      imageSrc: 'https://picsum.photos/300/300',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
      currency: 'đ',
      category: 'sgk',
      publisher: 'NXB-phunuvn',
      publishedDate:'2022-12-12',
      numProductSold:10,
    },
    {
      id: 5,
      name: 'Thám tử lừng danh Conan - Tập 1',
      href: `/book/${5}`,
      format: 'Thường',
      price: 160000,
      quantity: 1,
      imageSrc: 'https://picsum.photos/300/300',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
      currency: 'đ',
      category: 'sgk',
      publisher: 'NXB-tre',
      publishedDate:'2023-10-10',
      numProductSold:10
    },
    {
        id: 6,
        name: 'Thám tử lừng danh Conan - Tập 1',
        href: `/book/${1}`,
        format: 'Thường',
        price: 90000,
        quantity: 1,
        imageSrc: 'https://picsum.photos/300/300',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
        currency: 'đ',
        category: 'sgk',
        publisher: 'NXB-kimdong',
        publishedDate:'2022-12-18',
        numProductSold:10
      },
      {
        id: 7,
        name: 'Sách tiếng việt tập 1',
        href: `/book/${2}`,
        format: 'Thường',
        price: 32000,
        quantity: 1,
        imageSrc: 'https://picsum.photos/300/300',
        imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        currency: 'đ',
        category: 'light-novel',
        publisher: 'NXB-giaoducvn',
        publishedDate:'2023-12-20',
        numProductSold:20
      },
      {
        id: 8,
        name: 'Thám tử lừng danh Conan - Tập 1',
        href: `/book/${3}`,
        format: 'Thường',
        price: 320000,
        quantity: 1,
        imageSrc: 'https://picsum.photos/300/300',
        imageAlt:
          'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        currency: 'đ',
        category: 'sgk',
        publisher: 'NXB-tre',
        publishedDate:'2023-12-18',
        numProductSold:5
      },
      {
        id: 9,
        name: '86 - Eightysix - Tập 8',
        href: `/book/${4}`,
        format: 'Thường',
        price: 200000,
        quantity: 1,
        imageSrc: 'https://picsum.photos/300/300',
        imageAlt:
          'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        currency: 'đ',
        category: 'sgk',
        publisher: 'NXB-phunuvn',
        publishedDate:'2022-12-12',
        numProductSold:10,
      },
      {
        id: 10,
        name: 'Thám tử lừng danh Conan - Tập 1',
        href: `/book/${5}`,
        format: 'Thường',
        price: 160000,
        quantity: 1,
        imageSrc: 'https://picsum.photos/300/300',
        imageAlt:
          'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        currency: 'đ',
        category: 'sgk',
        publisher: 'NXB-tre',
        publishedDate:'2023-10-10',
        numProductSold:10
      },
    // More products...
  ]



const ProductListStatus = () => {
    return (
        <div className="w-full sm:w-2/3 h-[85%] bg-white px-5  shadow-xl rounded-[5px]  flex flex-col items-center ">
            <div className="w-full sticky top-0 text-lg font-medium text-red-500 font-inter z-30">Theo dõi sách</div>
            <div className="w-fit max-w-full h-full grid grid-cols-1 sm:grid-cols-2 sm:gap-10 gap-y-5 overflow-y-auto">
                { sampleProducts.map((product) => (
                        <div key={product.id} className='min-w-1/3 h-fit my-3 flex rounded-xl mx-2  border border-gray-200  '>
                            <img
                                src={product.imageSrc}
                                alt='product'
                                className='w-1/3 h-28 object-cover px-2 py-2'
                            />
                            <div className="w-1/2 mt-2 mb-1 px-2">
                                <div className="font-semibold text-base">
                                    {/* {(product.name.length > 20) ? product.name.substring(0, 15) + '...' : product.name} */}
                                    {product.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {product.category} 
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export default ProductListStatus
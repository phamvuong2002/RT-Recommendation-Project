import React from 'react'
// import data from '../../public/data/test/singleproduct.json';


const sampleProducts = [
    {
      id: 1,
      title: 'Thám tử lừng danh Conan - Tập 1',
      href: `/book/${1}`,
      format: 'Thường',
      price: 90000,
      quantity: 1,
      imgUrl: 'https://picsum.photos/300/300',
      imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
      currency: 'đ',
      category: 'sgk',
      publisher: 'NXB-kimdong',
      publishedDate:'2022-12-18',
      numProductSold:10
    },
    {
      id: 2,
      title: 'Sách tiếng việt tập 1',
      href: `/book/${2}`,
      format: 'Thường',
      price: 32000,
      quantity: 1,
      imgUrl: 'https://picsum.photos/300/300',
      imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
      currency: 'đ',
      category: 'light-novel',
      publisher: 'NXB-giaoducvn',
      publishedDate:'2023-12-20',
      numProductSold:20
    },
    {
      id: 3,
      title: 'Thám tử lừng danh Conan - Tập 1',
      href: `/book/${3}`,
      format: 'Thường',
      price: 320000,
      quantity: 1,
      imgUrl: 'https://picsum.photos/300/300',
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
      title: '86 - Eightysix - Tập 8',
      href: `/book/${4}`,
      format: 'Thường',
      price: 200000,
      quantity: 1,
      imgUrl: 'https://picsum.photos/300/300',
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
      title: 'Thám tử lừng danh Conan - Tập 1',
      href: `/book/${5}`,
      format: 'Thường',
      price: 160000,
      quantity: 1,
      imgUrl: 'https://picsum.photos/300/300',
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
        title: 'Thám tử lừng danh Conan - Tập 1',
        href: `/book/${1}`,
        format: 'Thường',
        price: 90000,
        quantity: 1,
        imgUrl: 'https://picsum.photos/300/300',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
        currency: 'đ',
        category: 'sgk',
        publisher: 'NXB-kimdong',
        publishedDate:'2022-12-18',
        numProductSold:10
      },
      {
        id: 7,
        title: 'Sách tiếng việt tập 1',
        href: `/book/${2}`,
        format: 'Thường',
        price: 32000,
        quantity: 1,
        imgUrl: 'https://picsum.photos/300/300',
        imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        currency: 'đ',
        category: 'light-novel',
        publisher: 'NXB-giaoducvn',
        publishedDate:'2023-12-20',
        numProductSold:20
      },
      {
        id: 8,
        title: 'Thám tử lừng danh Conan - Tập 1',
        href: `/book/${3}`,
        format: 'Thường',
        price: 320000,
        quantity: 1,
        imgUrl: 'https://picsum.photos/300/300',
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
        title: '86 - Eightysix - Tập 8',
        href: `/book/${4}`,
        format: 'Thường',
        price: 200000,
        quantity: 1,
        imgUrl: 'https://picsum.photos/300/300',
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
        title: 'Thám tử lừng danh Conan - Tập 1',
        href: `/book/${5}`,
        format: 'Thường',
        price: 160000,
        quantity: 1,
        imgUrl: 'https://picsum.photos/300/300',
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
        <div className="w-full sm:w-[60%] h-[85%] mr-10 bg-white px-5  shadow-xl rounded-[5px]  flex flex-col items-center ">
            <div className="w-full sticky top-0 text-lg font-semibold text-red-500 font-inter py-5">Theo dõi sách</div>
            <div className="w-full max-w-full h-full grid grid-cols-1 md:grid-cols-2 sm:gap-10 gap-y-5 overflow-y-auto">
                { sampleProducts.map((product) => (
                        <div key={product.id} className='w-full h-fit my-3 flex  rounded-xl mx-2  border border-gray-200  '>
                            <img
                                src={product.imgUrl}
                                alt='product'
                                className='w-1/3 md:h-28 lg:h-36 object-cover px-2 py-2  '
                            />
                            <div className="w-1/2 mt-2 mb-1 px-2">
                                <div className="font-semibold text-sm lg:text-base ">
                                    {/* {(product.title.length > 20) ? product.name.substring(0, 15) + '...' : product.name} */}
                                    {product.title}
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
import React from "react"


const ProductList_Temp = ({filteredProductList}) => {
  
    // if(loading)
    //   return <>Loading</> // use your loading state or component
  
    return (
      <div className="w-full h-[85%] px-5">
          <div className="w-full">Sản phẩm: </div>
          <div className="w-full h-full grid grid-cols-2 sm:grid-cols-4 content-start">
              {
                  filteredProductList.map((product) => (
                      <div key={product.id} className='w-full h-fit my-3 rounded-xl overflow-hidden border border-gray-200'>
                          <img
                              src={product.imageSrc}
                              alt='product'
                              className='w-full h-28 object-cover'
                          />
                          <div className="mt-2 mb-1 px-3">
                              <div className="font-semibold">
                                  {(product.name.length > 20)? product.name.substring(0,15) + '...': product.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                  {product.category} {product.price} {product.publishedDate} {product.numProductSold}
                              </div>
                          </div>
                      </div>
                  ))
              }
          </div>
      </div>
    )
  }
  
  export default ProductList_Temp
import { Link, useNavigate } from 'react-router-dom';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartLoader } from './loaders/ShoppingCartLoader';
import { calculateTotalPrice } from '../utils/calculateTotalPrice';
import { formatNumberToText } from '../utils/formatNumberToText';
import { fetchAPI, fetchData } from '../helpers/fetch';
import ShoppingCartsPopupGroupedByPublisherID from './ShoppingCartsPopupGroupByPushlisherID';
import { AppContext } from '../contexts/main';
import { addtocart, deletecartsbypub, getcarts } from '../apis/cart';

export const ShoppingCartsPopup = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { userId, session, setIsLoading, setNumCart, numCart } =
    useContext(AppContext);
  const NUMLOADER = 6;

  // Xử lý sự kiện khi nhấn nút "Xoá"
  const handleDeleteProduct = async (productId) => {
    //ví dụ gửi yêu cầu xoá sản phẩm xuống backend
    //sau đó update products
    setIsLoading(true);
    const update = await fetchAPI(`../${addtocart}`, 'POST', {
      userId: userId,
      book: {
        book_id: productId,
        quantity: 0,
        old_quantity: 1,
      },
    });
    if (update.status !== 200) return;
    const updatedProducts = update.metadata.cart_data;
    setProducts(updatedProducts);
    setNumCart(update.metadata.cart_count_products);
    setIsLoading(false);
  };

  //Xử lý sự kiện xoá tất cả sản phẩm của một nhà xuất bản
  const handleDeletePublisherProducts = async (publisherID) => {
    setIsLoading(true);
    const update = await fetchAPI(`../${deletecartsbypub}`, 'POST', {
      userId,
      publisherId: publisherID,
    });
    if (update.status !== 200) return;
    const updatedProducts = update.metadata.cart_data;
    setProducts(updatedProducts);
    setNumCart(update.metadata.cart_count_products);

    setIsLoading(false);
  };

  //Click quay về giỏ hàng
  const handleReturnShoppingCarts = () => {
    setOpen(false);
    navigate('../shoppingcarts');
  };

  //Fetch Shopping Carts
  useEffect(() => {
    setPageLoading(true);
    const loadShoppingCartsData = async () => {
      if (!userId) {
        setProducts([]);
        setNumCart(0);
        setIsLoading(false);
        setPageLoading(false);
        return;
      }
      const shoppingCartsData = await fetchAPI(`../${getcarts}`, 'POST', {
        userId: userId,
      });
      if (shoppingCartsData.status === 200) {
        setProducts(shoppingCartsData.metadata.cart_data);
        setNumCart(shoppingCartsData.metadata.cart_count_products);
      } else {
        setProducts([]);
        setNumCart(0);
      }
      setPageLoading(false);
    };
    //ví dụ tải các sản phẩm trong giỏ hàng của khách
    loadShoppingCartsData();
  }, [userId, open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => console.log('Close')}
      >
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
                        <Dialog.Title className="text-lg font-medium text-gray-900">{`Giỏ Hàng (${products.length})`}</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 outline-none focus:outline-none"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute " />
                            <span className="sr-only">Close panel</span>
                            {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {pageLoading ? (
                        <ShoppingCartLoader items={NUMLOADER} />
                      ) : products.length === 0 ? (
                        <div className="flex justify-center h-[20rem]">
                          <div className="flex flex-col gap-1 items-center justify-center text-gray-300 bg-white xl:h-fixed">
                            <img src="/img/empty-box.png" />
                            Không Có sản phẩm nào trong giỏ hàng
                          </div>
                        </div>
                      ) : (
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              <ShoppingCartsPopupGroupedByPublisherID
                                products={products}
                                handleDeleteProduct={handleDeleteProduct}
                                handleDeletePublisherProducts={
                                  handleDeletePublisherProducts
                                }
                              />
                            </ul>
                          </div>
                        </div>
                      )}
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
                      <p className="mt-0.5 text-sm text-gray-500">
                        Phí ship và thuế bao gồm ở trang thanh toán
                      </p>
                      <div className="mt-6">
                        <Link
                          onClick={() => setOpen(false)}
                          to="../payment?type=cart"
                          className={`flex items-center justify-center rounded-md border border-transparent bg-red-500 px-6 py-3 text-base font-bold text-white shadow-sm xl:hover:bg-red-700 ${products.length ? '' : 'hidden'}`}
                        >
                          Thanh Toán ({numCart})
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          {products.length === 0 ? (
                            <button
                              type="button"
                              className="font-medium text-red-600 hover:text-red-500"
                              onClick={() => setOpen(false)}
                            >
                              Tiếp Tục Mua Sắm
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          ) : (
                            <>
                              đến{' '}
                              <button
                                type="button"
                                className="font-medium text-red-600 hover:text-red-500"
                                onClick={handleReturnShoppingCarts}
                              >
                                Giỏ Hàng Của Bạn
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </>
                          )}
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
  );
};

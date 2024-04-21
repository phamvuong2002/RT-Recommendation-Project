export const calculateTotalPrice = (products) => {
  let totalPrice = 0;
  for (const product of products) {
    totalPrice += product.book.book_spe_price * product.cb_book_num;
  }
  return totalPrice;
};

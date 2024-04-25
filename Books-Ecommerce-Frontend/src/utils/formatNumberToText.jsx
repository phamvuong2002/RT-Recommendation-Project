export const formatNumberToText = (number) => {
  const roundedNumber = parseFloat(number).toFixed(2); // Làm tròn số với hai chữ số thập phân
  const numberWithCommas = roundedNumber
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Thêm dấu phẩy ngăn cách hàng nghìn
  return numberWithCommas.split('.')[0]; // Loại bỏ phần thập phân
};

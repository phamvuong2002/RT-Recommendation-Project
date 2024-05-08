// export const formatDate = (dateString, getYear = false) => {
//     // Xử lý newDate
//     const dateObj = new Date(dateString);
//     const dateOptions = { day: '2-digit', month: 'short'};
//     const dateFormatted = dateObj.toLocaleDateString('vi-VN', dateOptions);
//     return dateFormatted;
// }
export const formatDate = (dateString, getYear = false) => {
  const dateObj = new Date(dateString);
  let dateOptions = { day: '2-digit', month: 'short' };

  if (getYear) {
    dateOptions.year = 'numeric';
  }

  const dateFormatted = dateObj.toLocaleDateString('vi-VN', dateOptions);
  return dateFormatted;
};

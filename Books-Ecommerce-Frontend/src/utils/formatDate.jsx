export const formatDate = (dateString) => {
    // Xử lý newDate
    const dateObj = new Date(dateString);
    const dateOptions = { day: '2-digit', month: 'short' };
    const dateFormatted = dateObj.toLocaleDateString('vi-VN', dateOptions);
    return dateFormatted;
}
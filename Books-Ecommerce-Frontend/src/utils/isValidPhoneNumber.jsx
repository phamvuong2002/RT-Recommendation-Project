export const isValidPhoneNumber = (phoneNumber) => {
    // Sử dụng biểu thức chính quy để kiểm tra số điện thoại
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phoneNumber);
};
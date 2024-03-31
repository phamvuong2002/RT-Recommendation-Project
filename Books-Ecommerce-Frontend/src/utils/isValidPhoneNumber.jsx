export const isValidPhoneNumber = (phoneNumber) => {
    // Sử dụng biểu thức chính quy để kiểm tra số điện thoại
    // Đây chỉ là một ví dụ đơn giản, bạn có thể điều chỉnh biểu thức chính quy theo yêu cầu cụ thể của mình
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phoneNumber);
};
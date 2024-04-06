export const maskPhone = (input) => {
    // Kiểm tra xem input có đúng định dạng số điện thoại không
    if (/^\d{10}$/.test(input)) {
        // Chia chuỗi thành các phần: phần đầu, phần giữa và phần cuối
        let firstPart = input.substring(0, 3);
        let middlePart = "*****"; // Số giữa sẽ được thay thế bằng dấu *
        let lastPart = input.substring(8);

        // Kết hợp các phần và trả về chuỗi đã che giấu
        return firstPart + middlePart + lastPart;
    } else {
        // Trả về input không thay đổi nếu không phải là số điện thoại hợp lệ
        return input;
    }
}

export const maskEmail = (email, startIndex = 2) => {
    // Tách phần tên người dùng và tên miền
    const [username, domain] = email.split('@');

    // Lấy độ dài của phần tên người dùng
    const usernameLength = username.length;

    // Chừa lại 2 ký tự đầu, che phần còn lại
    const maskedUsername = username.substring(0, startIndex) + '*'.repeat(usernameLength - 2);

    // Ghép lại email đã che
    const maskedEmail = maskedUsername + '@' + domain;

    return maskedEmail;
}
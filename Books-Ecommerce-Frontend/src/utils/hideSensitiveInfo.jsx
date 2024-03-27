export const hideSensitiveInfo = (input) => {
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

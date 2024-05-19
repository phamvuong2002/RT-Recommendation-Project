export const slugify = (text) => {
  return text
    .toLowerCase() // Chuyển đổi thành chữ thường
    .normalize('NFD') // Chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu thanh
    .replace(/[đĐ]/g, 'd') // Chuyển đổi các ký tự đặc biệt tiếng Việt
    .replace(/[^a-z0-9]+/g, '-') // Loại bỏ các ký tự không hợp lệ
    .replace(/^-+|-+$/g, '') // Loại bỏ dấu gạch ngang ở đầu và cuối
    .replace(/-+/g, '-'); // Loại bỏ các dấu gạch ngang liên tiếp
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return { status: false, message: "Email không được để trống." };
    } else if (!emailRegex.test(email)) {
        return { status: false, message: "Email không hợp lệ." };
    } else {
        return { status: true, message: "Email hợp lệ." };
    }
}

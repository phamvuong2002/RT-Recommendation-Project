export const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
        errors.push({ code: "LENGTH_ERROR", message: "Ít nhất 8 ký tự." });
    }

    if (!/[a-z]/.test(password)) {
        errors.push({ code: "LOWER_CASE_ERROR", message: "Ít nhất một chữ cái viết thường. [a-z]" });
    }

    if (!/[A-Z]/.test(password)) {
        errors.push({ code: "UPPER_CASE_ERROR", message: "Ít nhất một chữ cái viết hoa. [A-Z]" });
    }

    if (!/\d/.test(password)) {
        errors.push({ code: "NUMBER_ERROR", message: "Ít nhất một số.[0-9]" });
    }

    if (!/[!@#$%^&*]/.test(password)) {
        errors.push({ code: "SPECIAL_CHARACTER_ERROR", message: "Ít nhất một ký tự đặc biệt. [@-%...]" });
    }

    return errors;
}
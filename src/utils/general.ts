import jwt from 'jsonwebtoken'
export const generateOtp = (length) => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    const OTP: number = parseInt(otp)
    return OTP;
}
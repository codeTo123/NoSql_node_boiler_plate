import * as CryptoJS from 'crypto-js'
const key = CryptoJS.enc.Utf8.parse("7061737323313233");
const iv = CryptoJS.enc.Utf8.parse("7061737323313233");

export const hashPassword = async (data: any, is_password: boolean) => {
    if (is_password) {
        let hash = CryptoJS.AES.encrypt(data, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
        });
        return hash.toString();
    } else {
        return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
            keySize: 64 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
    }
}

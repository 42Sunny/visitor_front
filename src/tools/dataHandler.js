import CryptoJS from "crypto-js";

export const encrypt = (data, key) => {
  const code = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  return code;
};

export const decrypt = (text, key) => {
  try {
	  const bytes = CryptoJS.AES.decrypt(text, key);
	  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
	  console.error(error);
    return "";
  }
};
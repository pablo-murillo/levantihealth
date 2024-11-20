import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key-2024';

export interface LinkData {
  productId: string;
  expiresAt: number;
}

export const encryptLinkData = (data: LinkData): string => {
  const jsonString = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
  return encodeURIComponent(encrypted);
};

export const decryptLinkData = (encryptedData: string): LinkData | null => {
  try {
    const decoded = decodeURIComponent(encryptedData);
    const decrypted = CryptoJS.AES.decrypt(decoded, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted) as LinkData;
  } catch (error) {
    console.error('Failed to decrypt link data:', error);
    return null;
  }
};
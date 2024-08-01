import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  publicKey = `12345678901234567890123456789012`

  secretKey = "YourSecretKeyForEncryption&Descryption";
  constructor() {
    this.encode({})
  }

  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.publicKey.trim()).toString();
  }

  decrypt(textToDecrypt: string) {
    return CryptoJS.AES.decrypt(textToDecrypt, this.publicKey.trim()).toString(CryptoJS.enc.Utf8);
  }

  encryptData(data: string): string {
    const encrypted = CryptoJS.RSA.encrypt(data, this.publicKey);
    return encrypted.toString();
  }


  encode(body) {
    const secretKey = CryptoJS.enc.Utf8.parse('ABCDFRAM09876543'); // 16-byte key for AES
    const iv = CryptoJS.enc.Utf8.parse('ABCDFRAMIV098765'); // 16-byte IV for AES

    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(body), secretKey, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7, // Ensure padding is consistent
      mode: CryptoJS.mode.CBC // Use CBC mode
    }).toString();
    return encrypted;

  }


  // test grid commit test 12020
}

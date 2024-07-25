import { Injectable } from '@angular/core';
import * as forge from 'node-forge';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class ForgeService {



  private readonly algorithm = 'AES';
  private readonly transformation = 'AES-CBC';







  readonly publicKey = `12345678901234567890123456789012`
  key = CryptoJS.enc.Utf8.parse(this.publicKey);
  iv = CryptoJS.lib.WordArray.random(16);


  cryptoencryption(valueToEncrypt) {
    const encrypted = CryptoJS.AES.encrypt(valueToEncrypt, this.publicKey, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const encryptedBytes = CryptoJS.enc.Base64.parse(encrypted.toString());
    const combinedBytes = this.iv.concat(encryptedBytes);

    return CryptoJS.enc.Base64.stringify(combinedBytes);


  }


}

import {
  findNthPrime,
  validateCharCode,
  wrappedCharacter,
  wrappedCharacterValue,
  wrappedNumber,
} from "./utilities";

type CharCodeRange = [number, number];

export class Encrypter {
  permittedCharCodeRange: CharCodeRange;

  constructor(permittedCharCodeRange: CharCodeRange = [32, 126]) {
    this.permittedCharCodeRange = permittedCharCodeRange;
  }
  /**
   * Ensures character is in permitted charCode range
   * @param {string} character Character to test
   * @param {CharCodeRange} permittedCharCodeRange Permitted char code range
   * @returns {boolean}
   */
  __validateCharCode(
    character: string,
    permittedCharCodeRange = this.permittedCharCodeRange
  ): Boolean {
    return validateCharCode(character, permittedCharCodeRange);
  }

  __wrappedNumber(
    numberToWrap: number,
    permittedCharCodeRange: CharCodeRange = this.permittedCharCodeRange
  ): number {
    return wrappedNumber(numberToWrap, permittedCharCodeRange);
  }

  /**
   * @param {boolean} operation True for encode, False for decode
   * @param {string} textToEncrypt text to encode/decode
   * @param {string} encryptionKey encryptionKey for encode/decode
   */
  __parser(operation: boolean, textToEncrypt: string, encryptionKey: string) {
    try {
      const ret = [...textToEncrypt].map((v, index) => {
        const keyChar = wrappedCharacter(index, encryptionKey);
        if (!this.__validateCharCode(v) || !this.__validateCharCode(keyChar))
          throw new Error("Invalid Character found");

        const textCharCode = v.charCodeAt(0);
        const keyCharCode = wrappedCharacterValue(index, encryptionKey);
        const n = index + keyCharCode;
        const primeNumber = findNthPrime(n);

        let key;
        switch (operation) {
          case true:
            //Sum the Prime number, the original character position and the
            //original unencrypted character value
            key = textCharCode + index + primeNumber;
            return String.fromCharCode(this.__wrappedNumber(key));
          default:
            //Reverse the addition
            key = textCharCode - index - primeNumber;
            return String.fromCharCode(this.__wrappedNumber(key));
        }
      });
      return ret.join("");
    } catch (error) {
      return "Invalid String";
    }
  }

  /**
   * @param {string} textToEncrypt Text to encode
   */
  encode(textToEncrypt: string, encryptionKey: string) {
    return this.__parser(true, textToEncrypt, encryptionKey);
  }

  /**
   * @param {string} textToEncrypt Text to decode
   */
  decode(textToEncrypt: string, encryptionKey: string) {
    return this.__parser(false, textToEncrypt, encryptionKey);
  }
}

// const encrypter = new Encrypter();

// // 01, 0
// // 131, 137 ->
// const keyString = "123456";
// const encrypted = encrypter.encode("abc", keyString);
// console.log(encrypter.encode("abc", keyString));
// console.log(encrypter.decode(encrypted, keyString));

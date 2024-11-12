export const isPrime = (num: number | string): boolean => {
  try {
    const number: number = parseInt(num as string);
    if (!number || number <= 1 || isNaN(number))
      throw new Error("Invalid input");

    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
        return false;
      }
    }
    return true;
  } catch (error) {
    return false;
  }
};

//NB: On for this funcion is O(n * sqrt(num))
//This will be the computational bottleneck for this tasks encoder
export const findNthPrime = (n: number): number => {
  let count = 0;
  let num = 2;
  while (count < n) {
    if (isPrime(num)) {
      count++;
    }
    num++;
  }
  return num - 1;
};

/**
 * Verifies string character ascii value is withing number range
 * @param {string} character
 * @param {[number, number]} permittedCharCodeRange
 * @returns {boolean}
 */
export const validateCharCode = (
  character: string,
  permittedCharCodeRange: [number, number]
): Boolean => {
  try {
    if (!character || typeof character !== "string")
      throw new Error("Invalid Type");
    return (
      permittedCharCodeRange[0] <= character.charCodeAt(0) &&
      character.charCodeAt(0) <= permittedCharCodeRange[1]
    );
  } catch (error) {
    return false;
  }
};

/**
 * Keeps number in number range, wraps around (inclusive at start & finish)
 * @param numberToWrap
 * @param permittedCharCodeRange
 * @returns {number}
 */
export const wrappedNumber = (
  numberToWrap: number,
  permittedCharCodeRange: [number, number]
): number => {
  const [min, max] = permittedCharCodeRange;
  const rangeSize = max - min + 1;
  return ((((numberToWrap - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

/**
 * Get character by wrapped index
 * @param index target index to be wrapped
 * @param characterString string within which to confine the index
 * @returns {number}
 */
export const wrappedCharacter = (
  index: number,
  characterString: string
): string => {
  try {
    const wrappedIndex = wrappedNumber(index, [0, characterString.length - 1]);
    return characterString[wrappedIndex];
  } catch (error) {
    return "";
  }
};
/**
 * Get ascii value of character by wrapped index
 * @param index target index to be wrapped
 * @param characterString string within which to confine the index
 * @returns {number}
 */
export const wrappedCharacterValue = (
  index: number,
  characterString: string
): number => {
  try {
    const wrappedIndex = wrappedNumber(index, [0, characterString.length - 1]);
    return characterString[wrappedIndex].charCodeAt(0);
  } catch (error) {
    return 0;
  }
};

import {
  findNthPrime,
  validateCharCode,
  wrappedCharacterValue,
  wrappedNumber,
} from "../utilities";

const { isPrime } = require("../utilities");

describe("Prime N Encoder Utility Functions", () => {
  describe("isPrime handles expected data: ", () => {
    it("returns true with prime number(3)", () => {
      expect(isPrime(3)).toBe(true);
    });
    it("returns true with prime number(5)", () => {
      expect(isPrime(5)).toBe(true);
    });
    it("returns true with prime number(97)", () => {
      expect(isPrime(97)).toBe(true);
    });

    it("returns false with non primary number(-1)", () => {
      expect(isPrime(-1)).toBe(false);
    });
    it("returns false with non primary number(-100)", () => {
      expect(isPrime(-100)).toBe(false);
    });
    it("returns false with non primary number(1)", () => {
      expect(isPrime(1)).toBe(false);
    });
    it("returns false with non primary number(4)", () => {
      expect(isPrime(4)).toBe(false);
    });
    it("returns false with non primary number(99)", () => {
      expect(isPrime(99)).toBe(false);
    });
  });
  describe("isPrime handles non-number data: ", () => {
    it("returns false with a non-parsable string", () => {
      expect(isPrime("hello")).toBe(false);
    });
    it("returns true with a parsable string that is prime ('3')", () => {
      expect(isPrime("3")).toBe(true);
    });
    it("returns false with a parsable string that is not prime ('100')", () => {
      expect(isPrime("100")).toBe(false);
    });
    it("returns false with a parsable string that is not prime ('-100')", () => {
      expect(isPrime("100")).toBe(false);
    });
    it("returns false with a true", () => {
      expect(isPrime(true)).toBe(false);
    });
    it("returns false with a false", () => {
      expect(isPrime(false)).toBe(false);
    });
    it("returns false with a undefined", () => {
      expect(isPrime(undefined)).toBe(false);
    });
    it("returns false with a null", () => {
      expect(isPrime(null)).toBe(false);
    });
    it("returns false with an empyy object", () => {
      expect(isPrime({})).toBe(false);
    });
    it("returns false with an object", () => {
      expect(isPrime({ value: "string" })).toBe(false);
    });
    it("returns false with an array", () => {
      expect(isPrime([])).toBe(false);
    });
  });

  describe("findNthPrime handles expected data: ", () => {
    it("1 prime is 2", () => {
      expect(findNthPrime(1)).toBe(2);
    });
    it("2 prime is 3", () => {
      expect(findNthPrime(2)).toBe(3);
    });
    it("25 prime is 97", () => {
      expect(findNthPrime(25)).toBe(97);
    });
  });
  describe("findNthPrime handles erroneous data: ", () => {
    it("Negative numbers equal 0", () => {
      expect(findNthPrime(-10)).toBe(1);
    });
    it("handles Numbery string", () => {
      const n: number = "10" as unknown as number;
      expect(findNthPrime(n)).toBe(29);
    });
  });

  describe("ValidateCharCode handles expected data in range [33, 126]: ", () => {
    it("returns false below ranges minimum boundary", () => {
      expect(validateCharCode(" ", [33, 126])).toBe(false);
    });
    it("returns true at ranges minimum boundary (33)", () => {
      expect(validateCharCode("!", [33, 126])).toBe(true);
    });
    it("returns true within range (33)", () => {
      expect(validateCharCode("!", [33, 126])).toBe(true);
    });
    it("returns true within range (125)", () => {
      expect(validateCharCode("}", [33, 126])).toBe(true);
    });
    it("returns true at ranges maxiimum boundary", () => {
      expect(validateCharCode("~", [33, 126])).toBe(true);
    });
    it("returns false above maxiimum boundary", () => {
      expect(validateCharCode("€", [33, 126])).toBe(false);
    });
  });
  describe("WrappedNumber handles expected data in range [32, 126]: ", () => {
    it("it returns 32 unmodified", () => {
      expect(wrappedNumber(32, [32, 126])).toBe(32);
    });
    it("it returns 34 unmodified", () => {
      expect(wrappedNumber(34, [32, 126])).toBe(34);
    });
    it("it returns 126 unmodified", () => {
      expect(wrappedNumber(126, [32, 126])).toBe(126);
    });
    it("it returns 127 wrapped to 32", () => {
      expect(wrappedNumber(127, [32, 126])).toBe(32);
    });
    it("it returns 128 wrapped to 33", () => {
      expect(wrappedNumber(128, [32, 126])).toBe(33);
    });
    it("it returns 221 wrapped to 32 (127 + length of range)", () => {
      expect(wrappedNumber(222, [32, 126])).toBe(32);
    });
  });
  describe("WrappedCharacter handles expected input: 'abcd' ", () => {
    it("it returns character 0 as 'a'", () => {
      expect(wrappedCharacterValue(0, "abcd")).toBe(97);
    });
    it("it returns character 1 as 'b'", () => {
      expect(wrappedCharacterValue(1, "abcd")).toBe(98);
    });
    it("it returns character 4 as 'a' for wraparound", () => {
      expect(wrappedCharacterValue(4, "abcd")).toBe(97);
    });
    it("it returns character 7 as 'd' for wraparound", () => {
      expect(wrappedCharacterValue(7, "abcd")).toBe(100);
    });
    it("it returns character 8 as '1' for secondary wraparound", () => {
      expect(wrappedCharacterValue(8, "abcd")).toBe(97);
    });
  });
});

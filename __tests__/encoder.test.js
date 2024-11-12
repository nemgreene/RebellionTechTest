const { Encrypter } = require("..");

const encoder = new Encrypter();

describe("Encoder Tests ", () => {
  it("Encodes decoded nmessage, normal characters", () => {
    const [textToEncrypt, encryptionKey] = ["abc", "123"];

    const encoded = encoder.encode(textToEncrypt, encryptionKey);
    const decoded = encoder.decode(encoded, encryptionKey);
    expect(decoded).toBe(textToEncrypt);
  });
  it("String much longer then key", () => {
    const [textToEncrypt, encryptionKey] = [
      "Hello world this string is long",
      "SHortKey!",
    ];

    const encoded = encoder.encode(textToEncrypt, encryptionKey);
    const decoded = encoder.decode(encoded, encryptionKey);
    expect(decoded).toBe(textToEncrypt);
  });
  it("String much shorter then key", () => {
    const [textToEncrypt, encryptionKey] = [
      "Secret",
      "GoshGoollyHeck th!s 1s a long encrypti0n K$y",
    ];

    const encoded = encoder.encode(textToEncrypt, encryptionKey);
    const decoded = encoder.decode(encoded, encryptionKey);
    expect(decoded).toBe(textToEncrypt);
  });
  it("handles strings at bound start are handled", () => {
    const [textToEncrypt, encryptionKey] = [
      "This has spaces and a ~",
      "This has spaces and a ~",
    ];

    const encoded = encoder.encode(textToEncrypt, encryptionKey);
    const decoded = encoder.decode(encoded, encryptionKey);
    expect(decoded).toBe(textToEncrypt);
  });
});

describe("Invalid data entry", () => {
  it("prompts users with invalid text and valid key", () => {
    const [textToEncrypt, encryptionKey] = [
      "Theres an ill€gal character in this string",
      "This has no illegal characters",
    ];

    const encoded = encoder.encode(textToEncrypt, encryptionKey);
    expect(encoded).toBe("Invalid String");
  });
  it("prompts users with valid text and invalid key", () => {
    const [textToEncrypt, encryptionKey] = [
      "Theres no illegal character in this string",
      "This has illegál characters",
    ];

    const encoded = encoder.encode(textToEncrypt, encryptionKey);
    expect(encoded).toBe("Invalid String");
  });
  it("prompts users with invalid text and invalid key", () => {
    const [textToEncrypt, encryptionKey] = [
      "Theres an ill€gal character in this string",
      "This has anillegál characters",
    ];

    const encoded = encoder.encode(textToEncrypt, encryptionKey);
    expect(encoded).toBe("Invalid String");
  });
  it("prompts users with undefined text", () => {
    const [textToEncrypt, encryptionKey] = ["Hello World", "MY Secret Key"];

    const encoded = encoder.encode(undefined, encryptionKey);
    expect(encoded).toBe("Invalid String");
  });
  it("prompts users with undefined key", () => {
    const [textToEncrypt, encryptionKey] = ["Hello World", "MY Secret Key"];

    const encoded = encoder.encode(textToEncrypt, undefined);
    expect(encoded).toBe("Invalid String");
  });
  it("prompts users with numeric values", () => {
    const [textToEncrypt, encryptionKey] = [1, 10000];

    expect(encoder.encode(textToEncrypt, "valid")).toBe("Invalid String");
    expect(encoder.encode("valid", encryptionKey)).toBe("Invalid String");
  });
});
describe("Custom number range (only lower case letters)", () => {
  const customEncrypter = new Encrypter([97, 122]);

  it("Input valid to custom range", () => {
    const [textToEncrypt, encryptionKey] = ["foo", "bar"];

    const encoded = customEncrypter.encode(textToEncrypt, encryptionKey);
    const decoded = customEncrypter.decode(encoded, encryptionKey);
    expect(decoded).toBe(textToEncrypt);
  });
  it("Input invalid to custom range", () => {
    const [textToEncrypt, encryptionKey] = ["Foo", "bar"];

    const encoded = customEncrypter.encode(textToEncrypt, encryptionKey);
    const decoded = customEncrypter.decode(encoded, encryptionKey);
    expect(decoded).toBe("Invalid String");
  });
});

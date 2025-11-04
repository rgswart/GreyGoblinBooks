// src/tests/utils/usernameEncoding.test.js

// Import the functions to be tested
import { encodeUsername, decodeUsername } from "../../utils/usernameEncoding";

// Describe a test suite
describe("usernameEncoding", () => {
  // Define tests //

  // Verify that encoding and decoding preserves all characters
  test("encodes and decodes complex usernames correctly", () => {
    const complexUsername = "J0hn_doe+.1-2@3";
    const encoded = encodeUsername(complexUsername);
    const decoded = decodeUsername(encoded);

    expect(decoded).toBe(complexUsername); //Check if properly decoded
    expect(encoded).not.toBe(complexUsername); //Ensure that the encoded and decoded are not the same
    expect(encoded).toMatch(/^[A-Za-z0-9+/]+=*$/); //Ensure that the encoded is properly base64 encoded
  });
});

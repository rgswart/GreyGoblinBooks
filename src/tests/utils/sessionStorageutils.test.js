// src/tests/utils/sessionStorageUtils.test.js

// Import the functions to be tested
import {
  loadFromSessionStorage,
  saveToSessionStorage,
} from "../../utils/sessionStorageUtils";

// Describe a test suite
describe("sessionStorageUtils", () => {
  // Prior to each test execute the following
  beforeEach(() => {
    sessionStorage.clear(); // Clear browser sessionStorage
    jest.clearAllMocks(); // Clear any Jest mocks from previous tests
  });

  // Define tests //

  // Test 1: Verify that saving and loading data works correctly
  test("save and load work together", () => {
    // Create test data for storage
    const testData = { user: "john", cart: ["book1"] };

    // Save the test data to sessionStorage n
    saveToSessionStorage("test", testData);

    // Load the data back using your utility function
    const result = loadFromSessionStorage("test", null);

    // Assert that what we loaded matches what we saved
    expect(result).toEqual(testData);
  });

  // Test 2: Verify the fallback behavior when data doesn't exist
  test("load returns fallback for missing key", () => {
    // Try to load a key that was never saved
    // Should return the fallback value 'default' instead of null/undefined
    expect(loadFromSessionStorage("missing", "default")).toBe("default");
  });
});

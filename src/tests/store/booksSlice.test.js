// src/tests/store/booksSlice.test.js

// Import the functions to be tested
import { configureStore } from "@reduxjs/toolkit";
import booksReducer, { updateColor } from "../../store/booksSlice";
// Import data
import { booksData } from "../../data/BooksData";

// Describe tests //

describe("booksSlice", () => {
  // Assign priors //
  let store;

  // Prior to each test execute the following
  beforeEach(() => {
    // Initialize Redux store with books reducer
    store = configureStore({
      reducer: { books: booksReducer },
    });
  });

  // Define tests //

  // Test 1: Test if booksData was loaded correctly
  test("initial state loads books data", () => {
    const state = store.getState().books;

    // Check ALL properties from the Book constructor
    expect(state[0]).toHaveProperty("id");
    expect(state[0]).toHaveProperty("title");
    expect(state[0]).toHaveProperty("author");
    expect(state[0]).toHaveProperty("description");
    expect(state[0]).toHaveProperty("price");
    expect(state[0]).toHaveProperty("colorIndex");
    expect(state[0]).toHaveProperty("quantity");
    expect(state[0]).toHaveProperty("total");
    expect(state[0]).toHaveProperty("purchaseState");

    // Also verify they have the correct types
    expect(typeof state[0].id).toBe("number");
    expect(typeof state[0].title).toBe("string");
    expect(typeof state[0].author).toBe("string");
    expect(typeof state[0].description).toBe("string");
    expect(typeof state[0].price).toBe("number");
    expect(typeof state[0].colorIndex).toBe("number");
    expect(typeof state[0].quantity).toBe("number");
    expect(typeof state[0].total).toBe("number");
    expect(typeof state[0].purchaseState).toBe("number");
  });

  // Test 2: Test if updating the colour of the book works
  test("updateColor action modifies book color", () => {
    const targetBookId = booksData[0].id;
    const updatedColorIndex = 1;

    // Dispatch action to update book colour
    store.dispatch(
      updateColor({ bookId: targetBookId, colorIndex: updatedColorIndex })
    );

    // Retrieve updated state from store
    const state = store.getState().books;

    // Find the specific book that was updated
    const modifiedBook = state.find((book) => book.id === targetBookId);

    // Verify the color index was successfully updated
    expect(modifiedBook.colorIndex).toBe(updatedColorIndex);
  });

  // Test 3: Test if updating the colour of the same book twice matters
  test("color updates maintain state integrity", () => {
    const targetBookId = booksData[0].id;

    // First color update
    store.dispatch(updateColor({ bookId: targetBookId, colorIndex: 1 }));
    expect(
      store.getState().books.find((book) => book.id === targetBookId).colorIndex
    ).toBe(1);

    // Second color update to same book
    store.dispatch(updateColor({ bookId: targetBookId, colorIndex: 2 }));
    expect(
      store.getState().books.find((book) => book.id === targetBookId).colorIndex
    ).toBe(2);
  });
});

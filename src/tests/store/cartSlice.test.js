// src/tests/store/cartSlice.test.js

// Imports //

import { configureStore } from "@reduxjs/toolkit";
import cartReducer, {
  addToCart,
  clearItem,
  clearCart,
  updateItemQuantity,
} from "../../store/cartSlice.js";
import { booksData, images } from "../../data/BooksData.js";
import { v4 as uuidv4 } from "uuid";

// Describe tests //

describe("cartSlice", () => {
  // Assign priors
  let store;

  // Prior to each test execute the following
  beforeEach(() => {
    // Initialize Redux store with cart reducer
    store = configureStore({
      reducer: { cart: cartReducer },
    });
  });

  // Define tests //

  // Test 1: Check if state initialises correctly
  test("initial state loads empty cart from session storage", () => {
    const state = store.getState().cart;

    // Verify initial state structure matches expected format
    expect(state).toEqual({ items: [] });
  });

  // Test 2: Mock an add to cart action with book data
  test("addToCart action creates item with UUID and calculates total", () => {
    const fellowshipBook = booksData[7]; // The Fellowship of the Ring

    const mockBookData = {
      bookId: fellowshipBook.id,
      title: fellowshipBook.title,
      author: fellowshipBook.author,
      color: "green", // colorIndex 0 corresponds to green
      image: images[0], // Use green cover image
      quantity: 2,
      price: fellowshipBook.price,
    };

    // Dispatch action to add item to cart
    store.dispatch(addToCart(mockBookData));

    const state = store.getState().cart;
    const addedItem = state.items[0];

    // Verify item structure and calculated values with UUID
    expect(addedItem.itemId).toBeDefined();
    expect(typeof addedItem.itemId).toBe("string");
    expect(addedItem.itemId.length).toBe(36);
    expect(addedItem.bookId).toBe(0);
    expect(addedItem.title).toBe("The Fellowship of the Ring");
    expect(addedItem.author).toBe("J.R.R. Tolkien");
    expect(addedItem.quantity).toBe(2);
    expect(addedItem.unitPrice).toBe(600);
    expect(addedItem.total).toBe(1200); // 2 * 600
  });

  // Test 3: Test clearItem action
  test("clearItem action removes specific item by itemId", () => {
    // Generate UUIDs for test items
    const realUuid1 = uuidv4();
    const realUuid2 = uuidv4();

    // Populate cart with test items
    const mockItems = [
      {
        itemId: realUuid1,
        bookId: booksData[7].id, // The Fellowship of the Ring
        title: booksData[7].title,
        author: booksData[7].author,
        color: "green",
        image: images[0],
        quantity: 1,
        unitPrice: booksData[7].price,
        total: booksData[7].price,
      },
      {
        itemId: realUuid2,
        bookId: booksData[4].id, // Dune
        title: booksData[4].title,
        author: booksData[4].author,
        color: "brown",
        image: images[2],
        quantity: 1,
        unitPrice: booksData[4].price,
        total: booksData[4].price,
      },
    ];

    // Initialize store with pre-populated cart state
    store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: { cart: { items: mockItems } },
    });

    // Remove specific item from cart using the items UUID
    store.dispatch(clearItem(realUuid1));

    const state = store.getState().cart;

    // Verify only targeted item was removed
    expect(state.items).toHaveLength(1);
    expect(state.items[0].itemId).toBe(realUuid2);
    expect(state.items[0].title).toBe("Dune"); // Only Dune remains
    expect(state.items[0].author).toBe("Frank Herbert");
  });

  //Test 4: Check that "empty cart" removes all cart items
  test("clearCart action removes all items from cart", () => {
    // Generate UUIDs for test items
    const realUuid1 = uuidv4();
    const realUuid2 = uuidv4();

    // Populate cart with test items
    const mockItems = [
      {
        itemId: realUuid1,
        bookId: booksData[7].id, // The Fellowship of the Ring
        title: booksData[7].title,
        author: booksData[7].author,
        color: "green",
        image: images[0],
        quantity: 1,
        unitPrice: booksData[7].price,
        total: booksData[7].price,
      },
      {
        itemId: realUuid2,
        bookId: booksData[4].id, // Dune
        title: booksData[4].title,
        author: booksData[4].author,
        color: "brown",
        image: images[2],
        quantity: 1,
        unitPrice: booksData[4].price,
        total: booksData[4].price,
      },
    ];

    // Initialize store with pre-populated cart state
    store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: { cart: { items: mockItems } },
    });

    // Clear entire cart
    store.dispatch(clearCart());

    const state = store.getState().cart;

    // Verify cart is empty after clear operation
    expect(state.items).toEqual([]);
  });

  // Test 5: Test quantity update action from Cart
  test("updateItemQuantity modifies quantity and recalculates total", () => {
    // Generate UUID for test item
    const realUuid = uuidv4();

    // Populate cart with test item
    const mockItems = [
      {
        itemId: realUuid,
        bookId: booksData[7].id, // The Fellowship of the Ring
        title: booksData[7].title,
        author: booksData[7].author,
        color: "green",
        image: images[0],
        quantity: 1,
        unitPrice: booksData[7].price,
        total: booksData[7].price,
      },
    ];

    // Initialize store with pre-populated cart state
    store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: { cart: { items: mockItems } },
    });

    // Update item quantity using UUID
    store.dispatch(updateItemQuantity({ itemId: realUuid, quantity: 3 }));

    const state = store.getState().cart;
    const updatedItem = state.items[0];

    // Verify quantity and total were updated correctly
    expect(updatedItem.quantity).toBe(3);
    expect(updatedItem.total).toBe(1800); // 3 * 600
  });

  // Test 6: Test if selected item quantity is < 1 (Not possible under normal use of website)
  test("updateItemQuantity ignores invalid quantities less than 1", () => {
    // Generate UUID for test item
    const realUuid = uuidv4();

    // Populate cart with test item using real book data
    const mockItems = [
      {
        itemId: realUuid,
        bookId: booksData[7].id, // The Fellowship of the Ring
        title: booksData[7].title,
        author: booksData[7].author,
        color: "green",
        image: images[0],
        quantity: 2,
        unitPrice: booksData[7].price,
        total: 1200, // 2 * 600
      },
    ];

    // Initialize store with pre-populated cart state
    store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: { cart: { items: mockItems } },
    });
    const initialState = store.getState().cart;

    // Attempt to update with invalid quantity using UUID
    store.dispatch(updateItemQuantity({ itemId: realUuid, quantity: 0 }));

    const finalState = store.getState().cart;

    // Verify state remains unchanged with invalid quantity
    expect(finalState).toEqual(initialState);
  });

  // Test 7: Test if non-existed item Id is referenced for dispatch (Not possible under normal use of website)
  test("updateItemQuantity ignores non-existent itemId", () => {
    const initialState = store.getState().cart;

    // Generate a UUID that doesn't exist in the cart
    const nonExistentUuid = uuidv4();

    // Attempt to update non-existent item
    store.dispatch(
      updateItemQuantity({ itemId: nonExistentUuid, quantity: 5 })
    );

    const finalState = store.getState().cart;

    // Verify state remains unchanged
    expect(finalState).toEqual(initialState);
  });
});

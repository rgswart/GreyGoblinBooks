// src/tests/routes/Products.test.js

// Imports //

import { render, screen, fireEvent, within } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Products from "../../routes/Products.js";
import booksReducer from "../../store/booksSlice.js";
import cartReducer from "../../store/cartSlice.js";
import { booksData } from "../../data/BooksData.js";

// Describe a test suite
describe("Products", () => {
  // Assign priors
  let store;

  // Prior to each test execute the following
  beforeEach(() => {
    // Convert Book instances to plain objects for Redux store
    const plainBooksData = booksData.map((book) => ({ ...book }));

    // Configure store
    store = configureStore({
      reducer: {
        books: booksReducer,
        cart: cartReducer,
      },
      preloadedState: {
        books: plainBooksData,
      },
    });
  });

  // Define tests //

  // Test 1: Test that handleBuy adds item to cart
  test("handleBuy adds item to cart", () => {
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    // Helper function to assist finding "The Fellowship of the Ring"
    const fellowshipBook = booksData.find(
      (book) => book.title === "The Fellowship of the Ring"
    );

    // Find the add to cart dropdown using test ID
    const fellowshipDropdown = screen.getByTestId(
      `cart-dropdown-${fellowshipBook.id}`
    );
    const dropdownWithin = within(fellowshipDropdown);
    const dropdownToggle = dropdownWithin.getByRole("button");

    // Execute click on dropdown toggle
    fireEvent.click(dropdownToggle);

    // Execute select quantity 2
    const quantityOption = screen.getByText("2");
    fireEvent.click(quantityOption);

    const state = store.getState().cart;
    const cartItem = state.items.find(
      (item) => item.bookId === fellowshipBook.id
    );

    // Define expected values
    expect(cartItem).toBeDefined();
    expect(cartItem.quantity).toBe(2);
    expect(cartItem.total).toBe(fellowshipBook.price * 2);
  });

  // Test 2: Test that handleColorChange updates book color
  test("handleColorChange updates book color", () => {
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    const duneBook = booksData.find((book) => book.title === "Dune");

    // Find color dropdown using test ID
    const duneColorDropdown = screen.getByTestId(
      `color-dropdown-${duneBook.id}`
    );
    const colorDropdownWithin = within(duneColorDropdown);
    const colorToggle = colorDropdownWithin.getByRole("button");

    // Execute colorToggle click action
    fireEvent.click(colorToggle);

    // Execute select color purple
    const purpleOption = screen.getByText("Purple");
    fireEvent.click(purpleOption);

    const state = store.getState().books;
    const updatedBook = state.find((book) => book.id === duneBook.id);

    // Define expected values
    expect(updatedBook.colorIndex).toBe(1);
  });

  // Test 3: Test color dropdown displays current book color
  test("color dropdown displays current book color in toggle text", () => {
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    // Helper function to assist finding "The Fellowship of the Ring"
    const fellowshipBook = booksData.find(
      (book) => book.title === "The Fellowship of the Ring"
    );
    // Helper function to assist finding "Dune"
    const duneBook = booksData.find((book) => book.title === "Dune");

    // Find color dropdowns using test IDs
    const fellowshipColorDropdown = screen.getByTestId(
      `color-dropdown-${fellowshipBook.id}`
    );
    const duneColorDropdown = screen.getByTestId(
      `color-dropdown-${duneBook.id}`
    );

    const fellowshipWithin = within(fellowshipColorDropdown);
    const duneWithin = within(duneColorDropdown);

    const fellowshipColorToggle = fellowshipWithin.getByRole("button");
    const duneColorToggle = duneWithin.getByRole("button");

    expect(fellowshipColorToggle).toHaveTextContent("Color: Green");
    expect(duneColorToggle).toHaveTextContent("Color: Brown");
  });
});

// src/tests/components/CheckoutMain.test.js

// Imports //

import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CheckoutMain from "../../components/CheckoutMain.js";
import cartReducer from "../../store/cartSlice.js";
import { booksData, images } from "../../data/BooksData.js";
import { v4 as uuidv4 } from "uuid";

// Describe a test suite
describe("CheckoutMain", () => {
  // Assign priors
  let store;
  let mockItem;

  beforeEach(() => {
    mockItem = {
      itemId: uuidv4(),
      bookId: booksData[7].id,
      title: booksData[7].title,
      author: booksData[7].author,
      color: "green",
      colorIndex: 0,
      image: images[0],
      quantity: 2,
      unitPrice: booksData[7].price,
      total: booksData[7].price * 2,
    };

    store = configureStore({
      reducer: {
        cart: cartReducer,
      },
      preloadedState: {
        cart: {
          items: [mockItem],
        },
      },
    });
  });

  // Test 1: Renders correct item information
  test("renders correct item information", () => {
    render(
      <Provider store={store}>
        <CheckoutMain item={mockItem} windowWidth={800} />
      </Provider>
    );

    // Define expected values
    expect(screen.getByText("The Fellowship of the Ring")).toBeInTheDocument();
    expect(
      screen.getByText("J.R.R. Tolkien", { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText("R600.00", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("R1200.00", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument(); // Current quantity
  });

  // Test 2: Quantity dropdown updates item quantity
  test("quantity dropdown updates item quantity", () => {
    render(
      <Provider store={store}>
        <CheckoutMain item={mockItem} windowWidth={800} />
      </Provider>
    );

    // Find and click the quantity dropdown
    const quantityDropdown = screen.getByLabelText(/Change quantity/);
    fireEvent.click(quantityDropdown);

    // Select quantity 5
    const quantityOption = screen.getByText("5");
    fireEvent.click(quantityOption);

    // Check that quantity was updated in store
    const state = store.getState();
    const updatedItem = state.cart.items.find(
      (item) => item.itemId === mockItem.itemId
    );
    expect(updatedItem.quantity).toBe(5);
    expect(updatedItem.total).toBe(booksData[7].price * 5); // 600 * 5 = 3000
  });

  // Test 3: Delete button removes correct item
  test("delete button removes correct item from cart", () => {
    render(
      <Provider store={store}>
        <CheckoutMain item={mockItem} windowWidth={800} />
      </Provider>
    );

    // Click delete button
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Check that item was removed from store
    const state = store.getState();
    expect(state.cart.items).toHaveLength(0);
  });
});

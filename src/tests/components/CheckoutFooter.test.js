// src/tests/components/CheckoutFooter.test.js

// Imports //

import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CheckoutFooter from "../../components/CheckoutFooter.js";
import cartReducer from "../../store/cartSlice.js";
import loginReducer from "../../store/loginSlice.js";
import { booksData, images } from "../../data/BooksData.js";
import { v4 as uuidv4 } from "uuid";

// Describe a test suite
describe("CheckoutFooter", () => {
  //Assign priors
  let store;
  const mockSetShowLoginWarning = jest.fn();
  const mockSetShowCheckoutModal = jest.fn();

  // Prior to each test execute the following
  beforeEach(() => {
    jest.clearAllMocks();

    // Configure store with cart items
    store = configureStore({
      reducer: {
        cart: cartReducer,
        login: loginReducer,
      },
      preloadedState: {
        cart: {
          items: [
            {
              itemId: uuidv4(),
              bookId: booksData[7].id,
              title: booksData[7].title,
              author: booksData[7].author,
              color: "green",
              image: images[0],
              quantity: 2,
              unitPrice: booksData[7].price,
              total: booksData[7].price * 2, // 600 * 2 = 1200
            },
            {
              itemId: uuidv4(),
              bookId: booksData[4].id,
              title: booksData[4].title,
              author: booksData[4].author,
              color: "brown",
              image: images[2],
              quantity: 1,
              unitPrice: booksData[4].price,
              total: booksData[4].price, // 630
            },
          ],
        },
        login: {
          isLoggedIn: false,
          username: null,
        },
      },
    });
  });

  // Define tests //

  // Test 1: Verify cart total calculation matches the reduce logic from Checkout.js
  test("cart total calculation matches reduce logic from Checkout component", () => {
    const state = store.getState();

    // Simulate the same calculation that happens in Checkout.js
    const calculatedTotal = state.cart.items.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const expectedTotal = 1200 + 630; // 1830

    expect(calculatedTotal).toBe(expectedTotal);

    // Test that CheckoutFooter displays this calculated total correctly
    render(
      <Provider store={store}>
        <CheckoutFooter
          setShowLoginWarning={mockSetShowLoginWarning}
          setShowCheckoutModal={mockSetShowCheckoutModal}
          windowWidth={800}
          cartTotal={calculatedTotal} // Pass the calculated value
        />
      </Provider>
    );

    // Verify the component displays the correct calculated total
    expect(screen.getByText(`Total: R${expectedTotal}.00`)).toBeInTheDocument();
  });

  // Test 2: Shows login warning when not logged in and displays correct total
  test("shows login warning when not logged in and displays correct total", () => {
    const state = store.getState();
    const calculatedTotal = state.cart.items.reduce(
      (sum, item) => sum + item.total,
      0
    );

    render(
      <Provider store={store}>
        <CheckoutFooter
          setShowLoginWarning={mockSetShowLoginWarning}
          setShowCheckoutModal={mockSetShowCheckoutModal}
          windowWidth={800}
          cartTotal={calculatedTotal}
        />
      </Provider>
    );

    // Verify the total is calculated and displayed correctly
    expect(screen.getByText("Total: R1830.00")).toBeInTheDocument();

    const checkoutButton = screen.getByText("Proceed to Checkout");
    fireEvent.click(checkoutButton);

    expect(mockSetShowLoginWarning).toHaveBeenCalledWith(true);
    expect(mockSetShowCheckoutModal).not.toHaveBeenCalled();
  });

  // Test 3: Shows checkout modal when logged in and displays correct total
  test("shows checkout modal when logged in and displays correct total", () => {
    // Update store with logged in user and different cart items
    store = configureStore({
      reducer: {
        cart: cartReducer,
        login: loginReducer,
      },
      preloadedState: {
        cart: {
          items: [
            {
              itemId: uuidv4(),
              bookId: booksData[7].id,
              title: booksData[7].title,
              author: booksData[7].author,
              color: "green",
              image: images[0],
              quantity: 1,
              unitPrice: booksData[7].price,
              total: booksData[7].price, // 600
            },
          ],
        },
        login: {
          isLoggedIn: true,
          username: "testuser",
        },
      },
    });

    const state = store.getState();
    const calculatedTotal = state.cart.items.reduce(
      (sum, item) => sum + item.total,
      0
    );

    render(
      <Provider store={store}>
        <CheckoutFooter
          setShowLoginWarning={mockSetShowLoginWarning}
          setShowCheckoutModal={mockSetShowCheckoutModal}
          windowWidth={800}
          cartTotal={calculatedTotal}
        />
      </Provider>
    );

    // Verify the total is calculated and displayed correctly
    expect(screen.getByText("Total: R600.00")).toBeInTheDocument();

    const checkoutButton = screen.getByText("Proceed to Checkout");
    fireEvent.click(checkoutButton);

    expect(mockSetShowCheckoutModal).toHaveBeenCalledWith(true);
    expect(mockSetShowLoginWarning).not.toHaveBeenCalled();
  });

  // Test 4: Test if empty cart button works and verify total becomes zero
  test("empty cart button clears cart and total becomes zero", () => {
    const state = store.getState();
    const initialTotal = state.cart.items.reduce(
      (sum, item) => sum + item.total,
      0
    );

    render(
      <Provider store={store}>
        <CheckoutFooter
          setShowLoginWarning={mockSetShowLoginWarning}
          setShowCheckoutModal={mockSetShowCheckoutModal}
          windowWidth={800}
          cartTotal={initialTotal}
        />
      </Provider>
    );

    // Verify initial total is displayed
    expect(screen.getByText("Total: R1830.00")).toBeInTheDocument();

    const emptyCartButton = screen.getByText("Empty Cart");
    fireEvent.click(emptyCartButton);

    const newState = store.getState();
    expect(newState.cart.items).toHaveLength(0);

    // Verify that after clearing cart, the calculation would be 0
    const newCalculatedTotal = newState.cart.items.reduce(
      (sum, item) => sum + item.total,
      0
    );
    expect(newCalculatedTotal).toBe(0);
  });
});

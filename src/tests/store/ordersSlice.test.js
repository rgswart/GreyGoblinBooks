// src/tests/store/ordersSlice.test.js

// Imports //

import { configureStore } from "@reduxjs/toolkit";
import ordersReducer, { placeOrder } from "../../store/ordersSlice.js";
import { booksData } from "../../data/BooksData.js";
import { v4 as uuidv4 } from "uuid";

// Describe a test suite
describe("ordersSlice", () => {
  // Assign priors
  let store;

  // Prior to each test execute the following
  beforeEach(() => {
    store = configureStore({
      reducer: { orders: ordersReducer },
    });
  });

  // Define tests //

  // Test 1: Tests placing an order with example data
  test("placeOrder creates order with UUID, date, and correct totals", () => {
    const orderData = {
      items: [
        {
          itemId: uuidv4(),
          title: booksData[0].title,
          author: booksData[0].author,
          color: "green",
          image: "color1Image.png",
          quantity: 2,
          unitPrice: booksData[0].price,
          total: booksData[0].price * 2,
        },
      ],
      total: booksData[0].price * 2,
      shippingMethod: "deliveryExpress",
      shippingCost: 50,
      username: "testuser",
    };

    store.dispatch(placeOrder(orderData));

    const state = store.getState().orders;
    const order = state[0];

    expect(order.orderId).toMatch(/^[0-9a-f-]{36}$/);
    expect(order.date).toBeDefined();
    expect(typeof order.date).toBe("string");
    expect(order.username).toBe("testuser");
    expect(order.shippingMethod).toBe("deliveryExpress");
    expect(order.shippingCost).toBe(50);
    expect(order.total).toBe(booksData[0].price * 2);
    expect(order.items).toHaveLength(1);
    expect(order.items[0].title).toBe(booksData[0].title);
    expect(order.items[0].author).toBe(booksData[0].author);
    expect(order.items[0].total).toBe(booksData[0].price * 2);
  });

  //Test 2: Testing placing order with multiple book items
  test("placeOrder handles multiple items with combined totals", () => {
    const orderData = {
      items: [
        {
          itemId: uuidv4(),
          title: booksData[0].title,
          author: booksData[0].author,
          color: "green",
          image: "color1Image.png",
          quantity: 1,
          unitPrice: booksData[0].price,
          total: booksData[0].price,
        },
        {
          itemId: uuidv4(),
          title: booksData[1].title,
          author: booksData[1].author,
          color: "brown",
          image: "color3Image.png",
          quantity: 1,
          unitPrice: booksData[1].price,
          total: booksData[1].price,
        },
      ],
      total: booksData[0].price + booksData[1].price,
      shippingMethod: "deliveryNormal",
      shippingCost: 25,
      username: "testuser",
    };

    store.dispatch(placeOrder(orderData));

    const state = store.getState().orders;
    const order = state[0];

    expect(order.items).toHaveLength(2);
    expect(order.total).toBe(booksData[0].price + booksData[1].price);
    expect(order.items[0].title).toBe(booksData[0].title);
    expect(order.items[1].title).toBe(booksData[1].title);
  });

  //Test 3: Test for bookdata by booktitle, to test bundled information
  test("placeOrder preserves specific book details when searched by title", () => {
    const targetBook = booksData.find(
      (book) => book.title === "The Fellowship of the Ring"
    );

    const orderData = {
      items: [
        {
          itemId: uuidv4(),
          title: targetBook.title,
          author: targetBook.author,
          color: "green",
          image: "color1Image.png",
          quantity: 1,
          unitPrice: targetBook.price,
          total: targetBook.price,
        },
      ],
      total: targetBook.price,
      shippingMethod: "deliveryNormal",
      shippingCost: 30,
      username: "tolkienfan",
    };

    store.dispatch(placeOrder(orderData));

    const state = store.getState().orders;
    const orderItem = state[0].items[0];

    expect(orderItem.title).toBe("The Fellowship of the Ring");
    expect(orderItem.author).toBe("J.R.R. Tolkien");
    expect(orderItem.unitPrice).toBe(600);
    expect(orderItem.quantity).toBe(1);
    expect(orderItem.total).toBe(600);
  });
});

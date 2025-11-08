// src/tests/store/loginSlice.test.js

// Imports //

import { configureStore } from "@reduxjs/toolkit";
import loginReducer, { login, logout } from "../../store/loginSlice.js";

// Describe a test suite
describe("loginSlice", () => {
  // Assign priors
  let store;

  // Prior to each test execute the following
  beforeEach(() => {
    store = configureStore({
      reducer: { login: loginReducer },
    });
  });

  // Define tests //

  // Test 1: Get default login state
  test("initial state loads login state from session storage", () => {
    const state = store.getState().login;

    // Verify initial state structure matches expected authentication format
    expect(state).toEqual({
      isLoggedIn: false,
      username: "",
    });
  });

  // Test 2: Load test user data and simulate login dispatch
  test("login action updates login state with username", () => {
    const userCredentials = {
      username: "testuser",
    };

    // Dispatch login action with user credentials
    store.dispatch(login(userCredentials));

    const state = store.getState().login;

    // Verify state updated correctly
    expect(state.isLoggedIn).toBe(true);
    expect(state.username).toBe("testuser");
  });

  // Test 3: Tests if logout dispatch resets state to default
  test("logout action resets login state to default", () => {
    // Start a logged in dummy state
    const loginState = {
      isLoggedIn: true,
      username: "existinguser",
    };

    store = configureStore({
      reducer: { login: loginReducer },
      preloadedState: { login: loginState },
    });

    // Dispatch logout action
    store.dispatch(logout());

    const state = store.getState().login;

    // Verify state reset to default state
    expect(state.isLoggedIn).toBe(false);
    expect(state.username).toBe("");
  });

  // Test 4: Test if multiple different login attempts
  test("multiple login-logout cycles maintain state integrity", () => {
    const firstUser = {
      username: "firstuser",
    };

    const secondUser = {
      username: "seconduser",
    };

    // First login cycle
    store.dispatch(login(firstUser));
    let state = store.getState().login;
    expect(state.isLoggedIn).toBe(true);
    expect(state.username).toBe("firstuser");

    // Logout
    store.dispatch(logout());
    state = store.getState().login;
    expect(state.isLoggedIn).toBe(false);
    expect(state.username).toBe("");

    // Second login cycle with different user
    store.dispatch(login(secondUser));
    state = store.getState().login;
    expect(state.isLoggedIn).toBe(true);
    expect(state.username).toBe("seconduser");
  });
});

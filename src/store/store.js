// store/store.js

// Imports //

//import configureStore from redux-toolkit
import { configureStore } from "@reduxjs/toolkit";
//Import reducers
import booksReducer from "./booksSlice";
import loginReducer from "./loginSlice.js";
import usersReducer from "./userSlice.js";
import cartReducer from "./cartSlice.js";
import ordersReducer from "./ordersSlice.js";
import signUpAlertReducer from "./signUpAlertSlice.js";

//Define the store
const store = configureStore({
  reducer: {
    books: booksReducer,
    login: loginReducer,
    users: usersReducer,
    cart: cartReducer,
    orders: ordersReducer,
    signUpAlert: signUpAlertReducer,
  },
});

export default store;

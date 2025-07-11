//Index.js

// Imports //

//Import the custom css style sheet
import "./index.css";
//Import components from React
import React from "react";
//Import components from react-redux
import { Provider } from "react-redux";
//Import components from react-dom
import ReactDOM from "react-dom/client";
//Import components from the react-router-dom
import { HashRouter } from "react-router-dom";
//Import vitals report functionality
import reportWebVitals from "./reportWebVitals";
//Import the App component to wrap the router around
import App from "./App";
//Import the store
import store from "./store/store.js";

// Functionality //

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/*Wrap the App component in a router and provider*/}
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// components/TotalPrice.js

//import components from react-router-dom
import { useLocation } from "react-router-dom";
//import components from react-bootstrap
import { Button } from "react-bootstrap";
//import the custom css styling sheet
import "../css/TotalPrice.css";

//functional component for rendering the total price
//books and clearAllBooks passed as props from App.js to products.js, where they are used as arguments
function TotalPrice({ books, clearAllBooks }) {
  //assign the result of the called function useLocation() to the variable "location"
  const location = useLocation();
  //use a reduce function to assign the total value of all book.total in array "books" to the variable "total"
  const total = books.reduce((acc, book) => acc + book.total, 0);
  //if location.pathname includes /products or /about then showCart=true otherwise !showCart.
  //Either way the result is stored in showCart
  const showCart = ["/products", "/about"].includes(location.pathname);
  //if location.pathname === /products then showClearButton=true otherwise !showClearButton.
  const showClearButton = location.pathname === "/products";

  //here we conditionally render the render section of this functional component
  //if shortCart===false or total===0 return null
  //otherwise render the contents
  if (!showCart || total === 0) return null;

  return (
    <div>
      {/*A custom css className is assigned  "total-price-container" */}
      <div className="total-price-container">
        {/*An h2 div is assigned with css className "total-price-text"
        to illustrate the total cost of ordered items using {total}*/}
        <h2 className="total-price-text">Total price: R{total}</h2>
      </div>
      <div>
        {/*here we conditionally render the "clear all button" if showClearButton (===true)*/}
        {showClearButton && (
          <Button
            //the button is made red with white text using bootstrap style variant="danger"
            variant="danger"
            //the button size is set to small (sm)
            size="sm"
            //a custom css style className of "clear-all-button" is assigned
            className="clear-all-button"
            //onClick the clearAllBooks function is executed
            onClick={clearAllBooks}
            aria-label="Clear cart"
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
}

export default TotalPrice;

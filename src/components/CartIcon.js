// components/CartIcon.js

// Imports //

//Import the css styling sheet for the cart icon in the navbar
import "../css/CartIcon.css";
//Import components from react-bootstrap
import { Stack, Button } from "react-bootstrap";
//Import hooks from react-redux
import { useSelector } from "react-redux";

// Functionality //

//Construct a cart icon render function
const CartIcon = () => {
  //Get cart state from Redux
  const cart = useSelector((state) => state.cart);
  //assign the array of objects "cartItems" as all instances of cart.items objects
  //or if empty []
  const cartItems = cart.items || [];
  //Determine the total number of items in the cart
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Render section //

  //Create a conditional render based on if itemCount is > 0

  //Display cart icon with itemCount and a green button
  if (itemCount > 0) {
    return (
      <div>
        {/*Set the button color to green (variant="success") 
        Set the button size to small (size="sm")*/}
        <Button
          variant="success"
          size="sm"
          className="cart-button"
          aria-label={`Go to cart, ${itemCount} items in cart`}
        >
          {/*Set the stack direction to horizontal to align child elements horizontally*/}
          <Stack direction="horizontal" gap={2}>
            {/*Set the cart image*/}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-cart cart-icon"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            {/*Display the itemCount*/}
            <span className="cart-item">{itemCount}</span>
          </Stack>
        </Button>
      </div>
    );
  }

  //Display just the cart icon
  return (
    //Assign padding of bootstrap size 1
    <div className="p-1">
      {/*Set the cart image*/}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="bi bi-cart cart-icon-empty"
        viewBox="0 0 16 16"
        aria-label="Go to cart, cart empty"
      >
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
      </svg>
    </div>
  );
};

export default CartIcon;

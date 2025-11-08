// src/components/CheckoutEmptyCart.js

// Imports //

//Import components from react-bootstrap
import { Button, Stack } from "react-bootstrap";
//Import the link component from react-router-dom
import { Link } from "react-router-dom";

//Import images
import emptyCartImage from "../images/empty-cart.svg";

// Functionality //

//Function to render an alternative display for the cart page (Checkout)...
//... when the cart is empty
const CheckoutEmptyCart = () => {
  // Render section //

  return (
    //Create a vertical stack with centered text:
    //(text-center)-horizontal center && vertical centering of child element
    //...with align-items-center
    //A bottom margin of bootstrap 5 is also set
    <Stack className="text-center align-items-center mt-5" gap={4}>
      {/*Assign an image*/}
      <img
        src={emptyCartImage}
        alt="Empty Cart"
        width={500}
        //Make the image responsive
        className="img-fluid"
      />
      {/*Set the font size to bootstrap size 4
      Set the text to be white (text-light)*/}
      <p className="fs-4 text-light">Your shopping cart is empty.</p>
      <Button
        //Assign button as link
        as={Link}
        to="/products"
        //Set color as dark blue (variant="primary")
        variant="primary"
        //Assign a font size of 18px to button text
        style={{ fontSize: "18px" }}
        //Assign an onClick event handler, to scroll to the top of page...
        //...after a 100ms delay
        onClick={() => {
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 100);
        }}
      >
        Browse products
      </Button>
    </Stack>
  );
};

export default CheckoutEmptyCart;

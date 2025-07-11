//Checkout.js

// Imports //

//Import custom css style sheet
import "../css/Checkout.css";
//Import components from react-bootstrap
import { Container } from "react-bootstrap";
//Import hooks from react
import { useState, useEffect } from "react";
//Import hooks from react-redux
import { useSelector } from "react-redux";
//Import functional components
import CheckoutModal from "../components/CheckoutModal.js";
import SignInWarningModal from "../components/SignInWarningModal.js";
import CheckoutEmptyCart from "../components/CheckoutEmptyCart.js";
import CheckoutFooter from "../components/CheckoutFooter.js";
import CheckoutMain from "../components/CheckoutMain.js";

// Functionality //

//Function to render the checkout/cart page
const Checkout = () => {
  //Get the items array from the cart Redux state and assign as cartItems
  const cartItems = useSelector((state) => state.cart.items);
  //Assign a variable capturing the total price from the sum of all item arrays totals
  const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  //Assign the showCheckoutModal and showLoginWarning local states:
  // ...to manage visibility of a login warning modal and a checkout modal
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showLoginWarning, setShowLoginWarning] = useState(false);

  //State to track the window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //Update windowWidth when window resizes
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render section //

  //Set a conditional render section
  //If cartItems is empty then render this
  if (cartItems.length === 0) {
    return (
      <div className="checkout-div">
        {/*Assign a container with variable top margins dependent on viewport width
      A top padding of size 4 (pt-4) is also assigned*/}
        <Container className="checkout-container mt-sm-5 mt-2 pt-4">
          <div className="checkout mt-5 pt-5 mb-5 pb-5">
            {/*Render the CheckoutEmptyCart functional component*/}
            <CheckoutEmptyCart />
          </div>
        </Container>
      </div>
    );
  }

  //else render this
  return (
    <div className="checkout-div">
      {/*Assign a container with variable top margins dependent on viewport width
      A top padding of size 4 (pt-4) is also assigned*/}
      <Container className="checkout-container mt-sm-5 mt-2 pt-4">
        <div className="checkout mt-5 pt-5 mb-5 pb-5">
          {/*Make the text light blue (text-info) and... 
          ...center the text (text-center) on the horizontal plane*/}
          <h1 className="text-info mb-4 pb-4 text-center">Shopping cart</h1>
          {/*Assign a CheckoutMain component for each item in cartItems*/}
          {cartItems.map((item) => (
            <CheckoutMain
              //Assign a unique key for each mapped item
              key={item.itemId}
              //Pass the item to provide rendering of its contents
              item={item}
              //Pass prop for screen size based conditional rendering
              windowWidth={windowWidth}
            />
          ))}
        </div>
        {/*Render the cart footer section, used for finalizing to an order
        Pass the props "cartTotal", "windowWidth", "setShowCheckoutModal", "setShowLoginWarning"*/}
        <CheckoutFooter
          cartTotal={cartTotal}
          windowWidth={windowWidth}
          setShowCheckoutModal={setShowCheckoutModal}
          setShowLoginWarning={setShowLoginWarning}
        />
        {/*Assign the CheckoutModal where the shipping method is selected
        This functional component receives showCheckoutModal and onClose props
        to handle visibility*/}
        <CheckoutModal
          show={showCheckoutModal}
          onClose={() => setShowCheckoutModal(false)}
        />
        {/*Assign the SignInWarningModal where the user is directed to sign in if they aren't
        This functional component receives showLoginWarning and onClose props
        to handle visibility*/}
        <SignInWarningModal
          show={showLoginWarning}
          onClose={() => setShowLoginWarning(false)}
        />
      </Container>
    </div>
  );
};

export default Checkout;

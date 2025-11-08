// src/components/CheckoutFooter.js

// Imports //

//Import components from  react-bootstrap
import { Stack, Button } from "react-bootstrap";
//Import hooks from react-redux
import { useSelector, useDispatch } from "react-redux";
//Import functional components
import { clearCart } from "../store/cartSlice.js";

// Functionality //

//A functional component that displays the cart total...
//...allows the user to empty the cart
//...and controls the visibility of the "CheckoutModal" or
//...the "SignInWarningModal" to trigger a conditional render
//...dependent on the login state

//This function receives props "setShowLoginWarning", "setShowCheckoutModal",
//..."windowWidth" (for conditional rendering on smaller screens) and...
//..."cartTotal" (to calculate the total cost of all cart items)
const CheckoutFooter = ({
  setShowLoginWarning,
  setShowCheckoutModal,
  windowWidth,
  cartTotal,
}) => {
  //Initialize Redux dispatch
  const dispatch = useDispatch();
  //Get login state from Redux
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  // Render section //

  return (
    //Set text as black (text-dark)
    //Set the horizontal padding (left and right) to bootstrap size 3 (px-3)
    <div className="checkout-footer px-3 d-flex text-dark">
      {/*Set the stack direction as horizontal to stack child elements horizontally
      Set a bottom padding of size 1 (pb-1)*/}
      <Stack direction="horizontal" className="pb-1" gap={3}>
        {/*Set a header 5 element and remove margins (m-0)*/}
        <h5 className="m-0">
          {/*Create a conditional render for smaller screens or > small [576px] (sm)*/}
          {windowWidth < 576 ? (
            //For small screens (<sm)
            //Convert the cartTotal number to a string with 2 decimal points
            <div>R{cartTotal.toFixed(2)}</div>
          ) : (
            //For screens > sm
            //Convert the cartTotal number to a string with 2 decimal points
            <div>Total: R{cartTotal.toFixed(2)}</div>
          )}
        </h5>
        {/*Assign a button that dependent on the login status
        triggers the SignInWarning modal or the CheckoutModal visibility*/}
        <Button
          onClick={() => {
            if (!isLoggedIn) {
              //Sets the SignInWarningModal visibility to true
              setShowLoginWarning(true);
            } else {
              //Sets the CheckoutModal visibility to true
              setShowCheckoutModal(true);
            }
          }}
        >
          {/*Create a conditional render for smaller screens or > small [576px] (sm)*/}
          {windowWidth < 576 ? (
            //For small screens (<sm)
            <div>Checkout</div>
          ) : (
            //For screens > sm
            <div>Proceed to Checkout</div>
          )}
        </Button>
        {/*Create a button to send a dispatch to empty the cart*/}
        <Button
          //Set the button style to red (variant="danger")
          variant="danger"
          //Set an onClick event handler to dispatch a clearCart reducer action on click
          onClick={() => {
            dispatch(clearCart());
          }}
        >
          Empty Cart
        </Button>
      </Stack>
    </div>
  );
};

export default CheckoutFooter;

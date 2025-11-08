// src/components/CheckoutModal.js

// Imports //

//Import custom css style sheet
import "../css/CheckoutModal.css";
//Import components from react-bootstrap
import { Modal, Button, Form, Stack } from "react-bootstrap";
//Import useState hook from react
import { useState } from "react";
//Import hooks from react-redux
import { useDispatch, useSelector } from "react-redux";
//Import the useNavigate components from react-router-dom
import { useNavigate } from "react-router-dom";
//Import functional components
import HelpShipping from "../components/HelpShipping.js";
//Import redux actions
import { placeOrder } from "../store/ordersSlice";
import { clearCart } from "../store/cartSlice";

// Functionality //

//Function to render the shipping selection option modal
//Props "show" and "onClose" are passed to handle modal visibility
const CheckoutModal = ({ show, onClose }) => {
  //Initialize Redux dispatch
  const dispatch = useDispatch();
  //Declare a navigation hook to allow routing
  const navigate = useNavigate();

  //Declare selectShipping local state to manage shipping method for dropdown
  const [selectedShipping, setSelectedShipping] = useState("pickupStore");
  //Get the items array from the cart Redux state and assign as cartItems
  const cartItems = useSelector((state) => state.cart.items);
  //Assign a variable capturing the total price from the sum of all item arrays totals
  const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  //Get username state from Redux
  const username = useSelector((state) => state.login.username);

  //Determine the shipping cost based on the selectedShipping
  const getShippingCost = (method) => {
    switch (method) {
      case "deliveryStandard":
        return 150;
      case "deliveryExpress":
        return 250;
      case "pickupStore":
      default:
        return 0;
    }
  };

  //Save the shipping cost of the selected shipping method to variable "shippingCost"
  const shippingCost = getShippingCost(selectedShipping);
  //Calculate total cost at checkout including shipping
  const totalWithShipping = cartTotal + shippingCost;

  //Function to handle order checkout and pass cart items to an order
  const handleConfirmOrder = () => {
    //Execute a placeOrder dispatch
    dispatch(
      placeOrder({
        items: cartItems,
        total: totalWithShipping,
        shippingMethod: selectedShipping,
        shippingCost,
        username,
      })
    );
    //Execute a clearCart action as the items have been passed to orders
    dispatch(clearCart());
    //Perform a handleClose function as the checkout modal can now be closed
    handleClose();
    //Redirect to the orders page after a 100ms delay
    setTimeout(() => {
      navigate("/orders");
    }, 100);
  };

  //Reset shipping selection on close
  const handleClose = () => {
    setSelectedShipping("pickupStore");
    onClose();
  };

  //List the available shipping options to use for the radio selection
  const shippingOptions = [
    { value: "pickupStore", label: "In-store pickup (Free)" },
    {
      value: "deliveryStandard",
      label: "Standard delivery (R150) (2-7 business days)",
    },
    {
      value: "deliveryExpress",
      label: "Express delivery (R250) (1-3 business days)",
    },
  ];

  // Render section //

  return (
    //Create a centered modal that is shown when `show` is true
    //and calls `handleClose` when the user attempts to close it
    <Modal show={show} onHide={handleClose} centered>
      {/*Modal header with title, help icon and close button*/}
      <Modal.Header closeButton className="checkout-modal-header">
        {/*Set div as a flex container (d-flex)
        Align the items vertically to the center of the div
        Set the div to the maximum width of its parent (w-100)
        Distribute space between children (justify-content-between)*/}
        <div className="d-flex align-items-center w-100 justify-content-between">
          <Modal.Title>Select Shipping Method</Modal.Title>
          <HelpShipping />
        </div>
      </Modal.Header>
      {/*Modal body with shipping options as radio buttons*/}
      <Modal.Body>
        <Form>
          {/*For each shipping option generate a radio button*/}
          {shippingOptions.map((option) => (
            <Form.Check
              name="shipping"
              //Generate a unique key
              key={option.value}
              //Set type as radio
              type="radio"
              //Select the label as for each option as shippingOptions.option.label
              label={option.label}
              //Each selection has the value of shippingOptions.option.value
              value={option.value}
              //When the option is selected, the selectedShipping value is changed
              onChange={() => setSelectedShipping(option.value)}
              //If selectedShipping and option.value are equal, the option is checked
              checked={selectedShipping === option.value}
              //Assign a bottom margin of 2 (mb-2)
              className="shipping-radio mb-2"
            />
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/*Assign a horizontal stack, to horizontally align child elements*/}
        <Stack
          direction="horizontal"
          gap={3}
          //Set the width of the stack to the full width of the parent (w-100)
          //Ensure the content are horizontally centered (justify-content-between)
          className="w-100 justify-content-between"
        >
          <strong>Total: R{totalWithShipping}</strong>
          <div>
            {/*Assign a dark blue button to confirm shipping and create the order*/}
            <Button
              //Set the button as dark blue (variant="primary")
              variant="primary"
              //on click execute the handleConfirmOrder function
              onClick={handleConfirmOrder}
              //Assign margin on the right of size 2 (me-2)
              className="me-2"
            >
              Confirm
            </Button>{" "}
            {/*Assign a grey (variant="secondary") cancel button, to go back to the cart, 
            by executing the handleClose function (onClick={handleClose})*/}
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;

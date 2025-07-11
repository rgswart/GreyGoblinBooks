//Orders.js

// Imports //

//Import css style sheet
import "../css/Orders.css";
//Import components from react-bootstrap
import { Card, Container, Row, Col, Stack } from "react-bootstrap";
//Import hooks from react
import { useState, useEffect } from "react";
//Import hooks from react-redux
import { useSelector } from "react-redux";
//Import functional components
import OrdersNotLoggedIn from "../components/OrdersNotLoggedIn.js";
import OrdersNotFound from "../components/OrdersNotFound.js";

// Functionality //

//Function to display orders
const Orders = () => {
  //Get Redux states
  const orders = useSelector((state) => state.orders);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const currentUser = useSelector((state) => state.login.username);
  //Filter only this user's orders
  const userOrders = orders.filter((order) => order.username === currentUser);

  //State to track the window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //Update windowWidth when window resizes
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //Convert string shipping method used for order dispatch...
  //to a better displayable string for UI
  const formatShippingMethod = (method) => {
    switch (method) {
      case "deliveryExpress":
        return "Express delivery";
      case "deliveryNormal":
        return "Standard delivery";
      case "pickupStore":
        return "In-store pickup";
      default:
        return method;
    }
  };

  // Render section //

  //Set a conditional renderer

  //If the user is not logged in then render OrdersNotLoggedIn functional component
  if (!isLoggedIn) {
    //Pass windowWidth prop to OrdersNotLoggedIn functional component
    return <OrdersNotLoggedIn windowWidth={windowWidth}></OrdersNotLoggedIn>;
  }

  //If no orders are present then render OrdersNotFound functional component
  if (userOrders.length === 0) {
    return <OrdersNotFound></OrdersNotFound>;
  }

  //If the above conditions are not met, render this
  return (
    <div className="order-div">
      {/*Assign a top margin of bootstrap size 5 (mt-5)*/}
      <Container className="mt-5">
        <h1 className="order-title">Your Order History</h1>
        <Stack gap={3} className="mt-5">
          {/*For every order, render a card*/}
          {userOrders.map((order) => (
            //Assign a unique key for each order, which is the orderId
            //The orderId is uuid generated order number
            //Assign a padding of size 3 (p-3)
            //Apply a small shadow effect to each card (shadow-sm)
            <Card key={order.orderId} className="p-3 shadow-sm">
              <Card.Title>
                {/*Assign a bottom margin of size 2 (mb-2)*/}
                <h5 className="mb-2">
                  Order number:{" "}
                  {/*Set the text to a grey color (text-secondary)*/}
                  <span className="text-secondary">{order.orderId}</span>
                </h5>
                <h5>
                  Order placed on:{" "}
                  {/*Set the text to a dark blue color (text-primary)*/}
                  <span className="text-primary mb-3">
                    {/*Dynamically provide the date the order was made on, in custom local format*/}
                    {new Date(order.date).toLocaleString("en-ZA", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </h5>
              </Card.Title>
              <Row className="mb-2">
                <Col>
                  <strong>Shipping:</strong>{" "}
                  {/*Provide the type of shipping as a properly formatted string for display
                  using the formatShippingMethod function to format order.shippingMethod*/}
                  {formatShippingMethod(order.shippingMethod)}
                </Col>
                <Col>
                  <strong>Shipping Cost:</strong> R{order.shippingCost}
                </Col>
                <Col>
                  <strong>Total:</strong> R{order.total}
                </Col>
              </Row>
              <hr />
              {/*For every order item render this row*/}
              {order.items.map((item) => (
                <Row key={item.itemId} className="align-items-center mb-3">
                  <Col xs={2}>
                    <img
                      src={item.image}
                      //Set the image alt text
                      alt={item.title}
                      //Set the width of the image to 60px
                      width={60}
                      //Set the image to be responsive (img-fluid)
                      //Set the image as rounded to apply slightly rounded borders
                      className="img-fluid rounded"
                    />
                  </Col>
                  {/*Apply columns of variable widths dependent on viewports*/}
                  <Col sm={6} xs={4}>
                    <div>
                      <strong>{item.title}</strong> by {item.author}
                    </div>
                    {/*Set a variable render for different viewports
                    Set a bootstrap top margin of size 2*/}
                    <div className="mt-2 d-sm-block d-none">
                      Color: {/*Ensure the color starts with a capital letter*/}
                      {item.color.charAt(0).toUpperCase() + item.color.slice(1)}
                    </div>
                  </Col>
                  {/*Set a variable render for different viewports*/}
                  <Col sm={2} xs={3}>
                    Qty: {item.quantity}
                  </Col>
                  {/*Set a variable render for different viewports*/}
                  <Col sm={2} xs={3}>
                    R{item.total}
                  </Col>
                </Row>
              ))}
            </Card>
          ))}
        </Stack>
      </Container>
    </div>
  );
};

export default Orders;

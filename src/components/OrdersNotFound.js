//OrdersNotFound.js

// Imports //

//Import components from react-bootstrap
import { Container, Stack, Button } from "react-bootstrap";
//Import useSelector hook from react-redux
import { useSelector } from "react-redux";
//Import the Link component from react-router-dom
import { Link } from "react-router-dom";
//Import images
import noOrdersImage from "../images/no-orders.svg";

// Functionality //

//A function to render for orders page when there are no orders
const OrdersNotFound = () => {
  //Get currentUser state from Redux
  const currentUser = useSelector((state) => state.login.username);

  // Render section //

  return (
    <div className="order-div">
      {/*Set a container with top and bottom margins of size 5 (mt-5, mb-5)
      Center the text (text-center) and 
      set the text color as white (text-light)*/}
      <Container className="mt-5 mb-5 text-center text-light">
        <h2
          //Assign a bottom margin of 5 (mb-5) below the h2 element
          className="mb-5"
          //Assign top padding above the h2 element of 110px
          style={{
            paddingTop: "110px",
          }}
        >
          No orders found for user{" "}
          {/*Set text color as dark blue (text-primary)*/}
          <strong className="no-orders-header">{currentUser}.</strong>
        </h2>
        <img
          src={noOrdersImage}
          alt="No orders found"
          //Set image height and width at 700px
          width={700}
          height={700}
          //Set the image as responsive (img-fluid)
          //Assign a bottom margin of 5 (mb-5) below the image
          className="img-fluid mb-5"
        ></img>
        {/*Set a horizontal stack to stack child elements horizontally
        center contents horizontally (justify-content-center)*/}
        <Stack
          direction="horizontal"
          gap={3}
          className="justify-content-center"
        >
          {/*Set font size of 5 (fs-5)
          Remove margins and padding (m-0, p-0)*/}
          <p className="fs-5 m-0 p-0">See our selection of products</p>
          {/*Provide a link to the products page as a button*/}
          <Link to="/products">
            <Button
              //Set the button style to a yellow button (variant="warning")
              variant="warning"
              //Set the font size as 18px
              style={{ fontSize: "18px" }}
              //Provide an onClick event handler to scroll to the top of the page after a 100ms delay
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo(0, 0);
                }, 100);
              }}
            >
              Products
            </Button>
          </Link>
        </Stack>
      </Container>
    </div>
  );
};

export default OrdersNotFound;

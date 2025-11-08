// src/components/OrdersNotLoggedIn.js

// Imports //

//Import components from react-bootstrap
import { Container, Stack, Button } from "react-bootstrap";
//Import the Link component from react-router-dom
import { Link } from "react-router-dom";
//Import images
import notLoggedInImage from "../images/not-logged-in.svg";

// Functionality //

//Function to display an alternative Orders page render when users are not logged in
//This function accepts windowWidth as a prop to control size based conditional rendering
const OrdersNotLoggedIn = ({ windowWidth }) => {
  // Render section //

  return (
    <div className="order-div">
      {/*Set a top margin of 5 (mt-5)
      Center the text (text-center) and make the text white (text-light)*/}
      <Container className="mt-5 text-center text-light">
        <h2
          //Assign a bottom margin of 5 (mb-5)
          className="mb-5"
          //Assign padding above the h2 element of 110px
          style={{
            paddingTop: "110px",
          }}
        >
          You are not logged in.
        </h2>
        <img
          src={notLoggedInImage}
          alt="User not logged in warning"
          //Set the width and height of the image as 700px
          width={700}
          height={700}
          //Make the image responsive (img-fluid)
          className="img-fluid"
        ></img>
        {/*Set a top margin of 5 and bottom padding of 5 (mt-5, pb-5)*/}
        <div className="mt-5 pb-5">
          {/*Set a stack with dynamic direction based on viewport width */}
          <Stack
            //At >576px child element stack horizontally
            //At < 576px child elements stack vertically
            direction={windowWidth > 576 ? "horizontal" : "vertical"}
            gap={3}
            //Ensure that contents are horizontally centered
            className="justify-content-center"
          >
            {/*Set the font size as bootstrap size 5 (fs-5)
            Remove margins and paddings (m-0, p-0)*/}
            <p className="fs-5 m-0 p-0">
              Please sign in to view your order history.
            </p>
            {/*Provide a link to the user profile so they can sign in to view their orders
            Assign as a button*/}
            <Link to="/profile">
              <Button
                //Set the button as dark blue (variant="primary")
                variant="primary"
                //Assign a font size of 18px for button text
                style={{ fontSize: "18px" }}
                //Assign an onClick event handler to scroll to the top of the page after a 100ms delay
                onClick={() => {
                  setTimeout(() => {
                    window.scrollTo(0, 0);
                  }, 100);
                }}
              >
                Sign In
              </Button>
            </Link>
          </Stack>
        </div>
      </Container>
    </div>
  );
};

export default OrdersNotLoggedIn;

// src/components/HelpShipping.js

// Imports //

//Import components from react-bootstrap
import { Button, Popover, OverlayTrigger } from "react-bootstrap";

// Functionality //

//Function for a help popup to provide extra information on shipping
const HelpShipping = () => {
  // Render section //

  return (
    //Create an overlay
    <OverlayTrigger
      //Trigger the popover on button click
      trigger="click"
      //Display the popover on the right of the button
      placement="right"
      //Closes the popover when the user clicks outside of it
      rootClose
      //Assign the overlay contents that appear when the button is clicked
      overlay={
        <Popover id="shipping-info-popover">
          {/*Assign the popover header as <h3></h3>*/}
          <Popover.Header as="h3">Shipping Info</Popover.Header>
          <Popover.Body>
            {/*Assign an unordered list with a bottom margin of 1
            and font size 16px */}
            <ul className="mb-1" style={{ fontSize: "16px" }}>
              <li>
                <strong>In-store pickup:</strong>
                <br />
                123 Victoria Road, Woodstock, Cape Town, 7925
                <br />
                <em>Operating hours: 8am - 5pm</em>
              </li>
              <li className="mt-2">
                <strong>Standard & express delivery:</strong>
                <br />
                Delivered via DHL
                <br />
                A parcel tracking number will be sent to your email
                <br />
                <em>
                  Standard (R150): 2-7 business days
                  <br />
                  Express (R250): 1-3 business days
                </em>
              </li>
            </ul>
          </Popover.Body>
        </Popover>
      }
    >
      {/*Assign a button with appearance of plain link text which enables
      making the popover visible when clicked*/}
      <Button
        //Remove padding and margin from the button
        //add a right margin of 2 (me-2)
        //assign a white border (border-light)
        className="p-0 m-0 border border-light me-2"
        //Assign the style of the button as a dark blue outline with
        //dark blue text (variant="outline primary")
        variant="outline-primary"
        aria-label="Press for more detailed shipping information"
      >
        Help
      </Button>
    </OverlayTrigger>
  );
};

export default HelpShipping;

//DisclaimerAlert.js

//Imports//

//Import custom css style sheet
import "../css/DisclaimerAlert.css";
//Import Alert component from react-bootstrap
import { Alert } from "react-bootstrap";
//Import useState hook from react
import { useState } from "react";

// Functionality //

//Create function to provide an alert disclaimer to user that this is not a real webstore
const DisclaimerAlert = () => {
  //Assign show state to manage component visibility
  const [show, setShow] = useState(true);

  //Set a conditional render for th rendered section of the DisclaimerAlert component

  if (!show) return null;

  // Render section //

  return (
    <Alert
      //Red alert (variant="danger")
      variant="warning"
      //Assign text to the horizontal center of the parent (text-center)
      //Remove the bottom margin (mb-0)
      className="disclaimer-alert text-center border border-dark border-2 mb-0 text-dark"
      //Place a closebutton
      dismissible
      //With on click event handling to set the show state to false
      onClose={() => setShow(false)}
    >
      This is not a real webstore. This is a demo project to showcase my web
      development skills.
    </Alert>
  );
};

export default DisclaimerAlert;

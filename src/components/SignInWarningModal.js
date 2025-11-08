// src/components/SignInWarningModal.js

// Imports //

//Import components from react-bootstrap
import { Modal, Button } from "react-bootstrap";
//Import Link component from react-router-dom
import { Link } from "react-router-dom";

// Functionality //

//Create a modal that warns user to sign if they try to checkout their order
//This function takes props "show" and "onClose" to...
//manage the conditional display of the modal
const SignInWarningModal = ({ show, onClose }) => {
  return (
    //Render the modal, centered on screen and dismissible via "onClose"
    <Modal show={show} onHide={onClose} centered>
      {/*Modal header with a close button and title*/}
      <Modal.Header closeButton>
        <Modal.Title>Sign In Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You must be signed in to proceed to checkout.</p>
        <p>
          {/*Link to the profile page where user can sign in.
            triggers modal close on click*/}
          <Link to="/profile" onClick={onClose}>
            Go to Sign In
          </Link>
        </p>
      </Modal.Body>
      <Modal.Footer>
        {/*Set the button style to grey (variant="secondary") 
        triggers modal close on click*/}
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignInWarningModal;

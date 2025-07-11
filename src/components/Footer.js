//Footer.js

// Imports //

//Import the custom css style sheet
import "../css/Footer.css";
//Import components from react-bootstrap
import { Container } from "react-bootstrap";

// Functionality //

//Function to render a conditional footer sector 'across all webpages*'
//*Routing handled in App.js
const Footer = () => {
  // Render section //

  return (
    //Create a footer section with
    //White text (text-light) and a black background (bg-dark)
    <footer className="bg-dark text-light footer-div">
      <Container className="footer-container">
        <p className="footer-text">Grey Goblin Books</p>
      </Container>
    </footer>
  );
};

export default Footer;

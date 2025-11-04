// src/routes/NavbarRender.js

// Imports //

//Import the navbar css style sheet
import "../css/NavbarRender.css";
//Import components from react-bootstrap
import { Navbar, Nav, Container, Image, Stack } from "react-bootstrap";
//Import hooks from react
import { useState, useEffect } from "react";
//Import the useSelector hook from react-redux
import { useSelector } from "react-redux";
//Import the Link component from react-router-dom
import { Link } from "react-router-dom";

//Image imports

//Import the logo image.ico for the website
import greyGlobinBooksNavLogo from "../images/goblin-man-with-book-portrait.ico";
import CartIcon from "../components/CartIcon.js";

// Functionality //

//functional component for rendering the navigation bar
function NavbarRender() {
  //Set a state variable "expanded" to  manage the expansion state of the navbar.
  //This is necessary because we aren't using <a></a> for links, we are using as={Link} and react-router
  //So the hamburger menu dropdown will stay open on smaller screens even after clicking a link unless we manage expansion ourselves.
  const [expanded, setExpanded] = useState(false);
  //Get isLoggedIn state from Redux
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  //Get username state from Redux
  const username = useSelector((state) => state.login.username);

  //Create an anonymous function toggle switch to change expanded to its opposite boolean value
  const handleToggle = () => setExpanded(!expanded);
  //Create an anonymous function to set expanded to false, closing the navbar, when a link is clicked
  const handleLinkClick = () => setExpanded(false);

  //Define the windowWidth state to track the window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //Update windowWidth when the window resizes
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render section //

  return (
    <Navbar
      //Set fixed=top to fix the NavBar component on the top of the page
      fixed="top"
      //Set expand = "lg" so that at viewport widths (vw) < lg the hamburger menu appears
      expand="lg"
      //Set custom css style of navbar and bootstrap appearance of bg-body-tertiary
      //A border of 1, black (dark) is also set
      className="bg-body-tertiary navbar border-bottom border-1 border-dark"
      //Set expanded={expanded} to allow for manual toggling of the menu
      expanded={expanded}
    >
      {/*Flex container (d-flex)
      Variable top margins (mt) and bottom margin (mb) dependent on viewport width*/}
      <Container className="mt-md-2 mt-md-1 mb-md-2 mb-0 d-flex">
        {/*Assign as={Link} and to="/" to allow the Brand image element...
         to function as a link to the homepage*/}
        <Stack direction="horizontal" gap={2}>
          {/*Conditional rendering of the icons size based on viewport size
          at <sm (576px) width = 49 otherwise width = 59*/}
          <Link to="/">
            <Image
              alt="Grey goblin books logo"
              src={greyGlobinBooksNavLogo}
              width={windowWidth > 576 ? 59 : 49}
              className="grey-globin-books-nav-logo img-fluid"
            />
          </Link>
          {/*Conditional link rendering of brand text or username...
           as separate links*/}
          {isLoggedIn ? (
            <Link
              //Link to the profile page
              to="/profile"
              //Remove underline
              style={{ textDecoration: "none" }}
              //Make the text grey (text-secondary)
              className="text-secondary grey-globin-books-nav-logo-text"
              aria-label="Link to user profile"
            >
              {username}
            </Link>
          ) : (
            <Link
              //Link to the home page
              to="/"
              style={{ textDecoration: "none" }}
              className="text-secondary grey-globin-books-nav-logo-text"
              aria-label="Link to home page"
            >
              Grey Goblin Books
            </Link>
          )}
        </Stack>
        {/*Set the flex direction to row, to align children horizontally 
        Centrally align the items relative to the parent in the vertical plane (align-items-center)*/}
        <div className="d-flex d-row align-items-center">
          {/*Provide a link to the cart page, which is only visible <lg*/}
          <Nav.Link
            as={Link}
            to="/checkout"
            onClick={handleLinkClick}
            className="d-lg-none d-block m-sm-3 icon-link"
          >
            <CartIcon></CartIcon>
          </Nav.Link>
          {/*The toggle is then assigned*/}
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            //onClick the handleToggle function is called
            onClick={handleToggle}
            className="nav-toggle"
          />
        </div>
        <Navbar.Collapse id="responsive-navbar-nav">
          {/*Assign bootstrap start margin auto (ms-auto), to take up all available space with a left margin and right align the Nav div*/}
          <Nav className="ms-auto nav-links">
            {/*All links supplied with as={Link} for routing and to="" address for each link
            in addition clicking on any link results in execution of the handleLinkClick function*/}
            <Nav.Link as={Link} to="/" onClick={handleLinkClick}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" onClick={handleLinkClick}>
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/orders" onClick={handleLinkClick}>
              Orders
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" onClick={handleLinkClick}>
              Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/*Provide a link to the cart page, which is only visible >lg*/}
        <Nav.Link
          as={Link}
          to="/checkout"
          onClick={handleLinkClick}
          className="d-lg-block d-none mx-2"
        >
          <CartIcon></CartIcon>
        </Nav.Link>
      </Container>
    </Navbar>
  );
}

export default NavbarRender;

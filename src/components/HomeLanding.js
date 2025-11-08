// src/components/HomeLanding.js

// Imports //

//Import the css styling sheet for the landing page main section
import "../css/HomeLanding.css";
//Import components from bootstrap
import { Figure, Container, Button, Stack } from "react-bootstrap";
//Import the Link component from react-router-dom
import { Link } from "react-router-dom";

//Import images

//The Black and white (greyscale) Image was acquired here: https://svg.io/download/c6766021-bdd0-4bf1-ab1c-1e8a8df12383 with prompt (goblin man with book).
//The image was then colored by hand in Inkscape (https://inkscape.org/)
import greyGoblinMainImage from "../images/goblin-and-book-250dpi.png";

// Functionality //

//Function to render the main section of the home/landing page
function HomeLanding() {
  // Render section //
  return (
    <div className="home-landing-div">
      <Container className="home-landing-container">
        <Stack>
          <Figure className="main-image-container">
            <Figure.Image
              //Make the image responsive with img-fluid
              className="main-image img-fluid"
              alt="Grey Goblin Books Main Logo"
              src={greyGoblinMainImage}
            />
            <Figure.Caption className="main-image-caption ">
              Grey Goblin Books is a specialist hardcover bookstore for novels
              with a fantasy, Sci-fi or occult setting. Here you won't only find
              the mainstays such as Tolkien and Frank Herbert, but also the
              obscure such as H.P. Lovecraft, Brian Evenson, and the Strugatsky
              brothers.
            </Figure.Caption>
          </Figure>
          {/*Create a call to action link to the products page
          set x-axis margins to auto, top margin of bootstrap 3*/}
          <div className="mx-auto mt-3">
            <Button
              //Set button to bootstrap yellow
              variant="warning"
              //Set button as a link to the products page
              as={Link}
              to="/products"
              className="products-link p-0 mb-5"
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo(0, 0);
                }, 100);
              }}
            >
              Explore our products
            </Button>
          </div>
        </Stack>
      </Container>
    </div>
  );
}

export default HomeLanding;

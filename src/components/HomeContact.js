// components/HomeContact.js

// Imports //

//Import the css styling sheet for the contact section of the landing page
import "../css/HomeContact.css";

//Import components from bootstrap
import { Figure, Container, Col, Row, Stack, Image } from "react-bootstrap";

//Import images

//Images produced using amuse
import contactImage1 from "../images/genBooksStoreLeft2.png";
import contactImage2 from "../images/genBooksStoreRight2.png";
import contactBackground from "../images/genContactBackground3.png";

// Functionality //

//Function to render the second section (contact) of the landing page
function HomeContact() {
  // Render section //
  return (
    //Set the text as white (text-light)
    <div className="home-contact-div text-light">
      {/*Assign a background image*/}
      <Image
        src={contactBackground}
        //Assign the image the fluid property to make it responsive
        alt="Background image"
        //Assigned display breakpoint of none at <lg and block at >=lg (full width of parent)
        className="background-image d-none d-lg-block img-fluid"
      ></Image>
      {/*Set the container to fluid which increases it to full width
      set the container to be a flex container at >=lg viewports*/}
      <Container fluid className="d-lg-flex">
        {/*Set the row to be the full height of its parent (h-100)*/}
        <Row className="h-100">
          {/*Assign column distributions at different viewport breakpoints
            at xs till lg block, at >=lg it take up 3/12 of the grid, at xxl and larger 4/12 of the grid 
            remove the padding on the column*/}
          <Col xs={12} lg={3} xxl={4} className="p-0">
            <Figure className="h-100">
              <Figure.Image
                src={contactImage1}
                alt="Bookstore image left"
                className="contact-image img-fluid"
              />
            </Figure>
          </Col>
          {/*Assign column distributions at different viewport breakpoints
            at xs till lg block, at >=lg it take up 6/12 (1/2) of the grid, at xxl and larger 4/12 of the grid 
            remove the padding on the column*/}
          <Col
            xs={12}
            lg={6}
            xxl={4}
            //Set variable margins and variable padding at different viewport breakpoints
            className="pb-0 mb-lg-0 mb-4 pb-lg-0 pb-3"
          >
            {/*Set a top margin of bootstrap 4*/}
            <Stack className="mt-4">
              <h1 className="contact-us-header">Contact Us</h1>
              <Stack className="contact-details-items mt-3 mx-2" gap={3}>
                <Row>
                  <Col className="contact-details-header text-end col-sm-3 col-4">
                    Email:
                  </Col>
                  <Col className="contact-details text-break col-sm-9 col-8">
                    <a href="mailto:enquiries@greygoblinbooks.co.za">
                      enquiries@greygoblinbooks.co.za
                    </a>
                  </Col>
                </Row>
                <Row>
                  <Col className="contact-details-header text-end col-sm-3 col-4">
                    Telephone:
                  </Col>
                  <Col className="contact-details col-sm-9 col-8">
                    <a href="tel:+27123456789">+27 213 456 789</a>
                  </Col>
                </Row>
                <Row>
                  <Col className="contact-details-header text-end col-sm-3 col-4">
                    Address:
                  </Col>
                  <Col
                    className="contact-details col-sm-9 col-8"
                    //Assign a custom color to the text to match the color assigned to the contact-details links in the custom css
                    style={{ color: "rgba(255, 255, 255, 1)" }}
                  >
                    123 Victoria Road, Woodstock, Cape Town, 7925
                  </Col>
                </Row>
              </Stack>
            </Stack>
          </Col>
          {/*Assign column distributions at different viewport breakpoints*/}
          <Col className="col-xxl-4 col-lg-3 col-0 p-0">
            <Figure className="h-100">
              <Figure.Image
                className="contact-image img-fluid"
                alt="Bookstore image right"
                src={contactImage2}
              />
            </Figure>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomeContact;

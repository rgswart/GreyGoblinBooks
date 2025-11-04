// src/routes/Products.js

// Imports //

//Import the css style sheet
import "../css/Products.css";
//import components from react bootstrap
import { Card, Container, Dropdown, Row, Col, Stack } from "react-bootstrap";
//Import hooks from react-redux
import { useDispatch, useSelector } from "react-redux";
//Import the arrays "images" and "colors" from the booksData data component
import { colors, images } from "../data/BooksData.js";
//Import redux actions from slices
import { addToCart } from "../store/cartSlice.js";
import { updateColor } from "../store/booksSlice.js";

// Functionality //

//functional component for rendering books products
function Products() {
  //Initialize Redux dispatch
  const dispatch = useDispatch();
  //Get books state from Redux
  const books = useSelector((state) => state.books);

  //Assign event handler function to handle color change selections
  const handleColorChange = (bookId, colorIndex) => {
    //Dispatch the updateColor action, with the bookId and colorIndex as arguments
    dispatch(updateColor({ bookId, colorIndex }));
  };

  //Assign event handler function to handle add to cart operations
  //Assign a default quantity of 1 to "add to cart" operations
  const handleBuy = (bookId, quantity = 1) => {
    //Search for the corresponding book using book id matches and
    //assign it as "book"
    const book = books.find((b) => b.id === bookId);
    //Assign the associated color and images
    const color = colors[book.colorIndex];
    const image = images[book.colorIndex];

    //Dispatch an addToCart
    dispatch(
      addToCart({
        bookId: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        color,
        image,
        quantity,
        price: book.price,
        total: book.price * quantity,
      })
    );
  };

  // Render section //

  //this renders the product items (books) as cards
  return (
    //Assign variable bootstrap top margin and padding of at different viewport sizes
    <div className="product-div mt-sm-5 mt-2 pt-5">
      <Container className="mt-4">
        {/*Assign a top margin of 5 (mt-5), top padding of 4 (pt-4)
        and center the text (text-center) on the horizontal plane*/}
        <h1 className="product-heading mt-5 pt-4 text-center">Products</h1>
        <p className="product-heading-undertext text-center mt-3">
          Please explore our range of books
        </p>
        <Row>
          {/*Withing this arrow function we map a column of variable widths per book.id on the bootstrap grid system
          //the grid system divides each container into rows and columns, with the width of the container being partitioned into 12 equal sized sections (columns).
          at xxl each column takes up 3/12 (1/4) of the container width, at lg 4/12 (1/3), at sm 6/12 (1/2) and at <sm block (12/12)
          we assign key={book.id} so that each col child of the books.map function has a unique key per book object.*/}
          {books.map((book) => (
            <Col key={book.id} xl={3} lg={4} sm={6} className="mt-4 mb-4">
              {/*we then assign a card to each book*/}
              <Card className="cards">
                {/*An image is assigned for each book with the variant="top" positioning the image at the top of the card.
                a className "img-fluid" is assigned to make the image responsive
                the src for the image is assigned based on the "images"array, position [] = to book.colorIndex value. 
                The colorIndex value corresponds to the position of the image in the images array
                colorIndex: 0=green 1=purple 2=brown. 
                colorIndex=0 corresponds to Images[0]
                This features a dynamically generated alt-text*/}
                <Card.Img
                  variant="top"
                  src={images[book.colorIndex]}
                  className="img-fluid"
                  alt={`${colors[book.colorIndex]} hardback cover of ${
                    book.title
                  } by ${book.author}`}
                />
                <Card.Body className="cards-body">
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>
                    By <strong>{book.author}</strong>
                  </Card.Text>
                  <Card.Text className="book-descriptions">
                    {book.description}
                  </Card.Text>
                  {/*The next section of the card is encased in a div with style={{ marginTop: "auto" }}
                  this interacts with cards-body flex-grow: 1 to automatically maximise the space between this div and the contents above it in the container
                  this aligns all cards in a row to have the same height and everything in this div to be aligned across horizontally aligned cards (if >sm)*/}
                  <div style={{ marginTop: "auto" }}>
                    {/* Row 1: Price + Subtotal 
                    align-items-center is used to distribute the child elements in this row centrally on the vertical plane*/}
                    <Row className="align-items-center mb-2">
                      <Col>
                        <strong>Price: R{book.price}</strong>
                      </Col>
                    </Row>
                    {/*The add to cart and color selection button use d-flex (assign as flex-container)
                     and various flex-row flex-column combinations to:
                     align their elements as vertical stacks or horizontal stacks respectively
                     dependent on different viewport breakpoint (sm, md, lg, or xxl)*/}
                    <Stack
                      className="d-flex flex-xxl-row flex-lg-column flex-md-row flex-sm-column flex-row"
                      gap={2}
                      //Use space-between to evenly distribute dropdowns, pushing them to opposite ends of the row
                      style={{ justifyContent: "space-between" }}
                    >
                      {/*A dropdown is rendered for color selection.
                          When a dropdown item is selected, the onSelect handler is triggered.
                          It receives the selected item's `eventKey` (selectedColorIndex) as a string.
                          A handleColorChange function is then executed with arguments:
                          "book.id" and "selectedColorIndex" converted to a number using Number().*/}
                      <Dropdown
                        onSelect={(selectedColorIndex) =>
                          handleColorChange(book.id, Number(selectedColorIndex))
                        }
                      >
                        {/*The toggle element for the dropdown is created here
                          it is styled as bootstrap outline-secondary. (grey text and border) (default color only)
                          The text-color style of the toggle is determined by the corresponding book.colorIndex in the "colors" array. 
                          If the "colorIndex" is updated, by updating "books" with "setBooks", it is updated here too.*/}
                        <Dropdown.Toggle
                          variant="outline-secondary"
                          className="dropdown-toggle-1"
                          style={{ color: colors[book.colorIndex] }}
                          aria-label={`Color selection dropdown for ${
                            book.title
                          }, current color ${colors[book.colorIndex]}`}
                        >
                          Color:{" "}
                          {/*Set the first letter of the string to be uppercase 
                            ```.charAt(0)``` to get first character of string, ```.toUpperCase``` to convert to upper case
                            ```.slice(1)``` to return everything from the second character onwards*/}
                          {colors[book.colorIndex].charAt(0).toUpperCase() +
                            colors[book.colorIndex].slice(1)}
                        </Dropdown.Toggle>
                        {/*Here we create the <Dropdown.Item> for each item in the colors array
                          by using .map with the callback function passing color, and index as arguments. 
                          we create our dropdown item for each color where the key=index (the color array index)
                          and the eventKey is equal to the index. The "eventKey" is passed to the handler when this item is chosen. }*/}
                        <Dropdown.Menu>
                          {colors.map((color, index) => (
                            <Dropdown.Item
                              key={index}
                              eventKey={index}
                              aria-label={`Select color ${color}`}
                            >
                              {/*Print the list of colors
                                Each color must start with an uppercase letter*/}
                              {color.charAt(0).toUpperCase() + color.slice(1)}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      {/*A dropdown is rendered for handling purchases.
                          When a dropdown item is selected, the onSelect handler is triggered.
                          It receives the selected item's `eventKey` as a string.
                          The arrow function takes this string and converts it to a number using Number().
                          It then calls handleBuy with the current book's ID and the selected quantity.*/}
                      <Dropdown
                        onSelect={(quantitySelect) =>
                          handleBuy(book.id, Number(quantitySelect))
                        }
                      >
                        {/*The add to cart toggle is styled as a green dropdown (variant="success")*/}
                        <Dropdown.Toggle
                          variant="success"
                          className="dropdown-toggle-2"
                          aria-label={`Add ${colors[book.colorIndex]} ${
                            book.title
                          } to cart`}
                        >
                          {/*Inset the cart icon with a plus symbol*/}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-cart-plus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                          </svg>{" "}
                          Add to cart
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-2">
                          {/*Render a dropdown item for each quantity (1–10)
                            - Array.from generates an array of numbers from 1 to 10
                            - .map renders a <Dropdown.Item> for each quantity
                            - eventKey is passed to the onSelect handler when clicked*/}
                          {Array.from(
                            //Sets length to 10
                            { length: 10 },
                            //Ensures it starts at 1 instead of 0
                            (_, index) => index + 1
                          ).map((quantitySelect) => (
                            <Dropdown.Item
                              key={quantitySelect}
                              eventKey={quantitySelect}
                              aria-label={`Select quantity ${quantitySelect}`}
                            >
                              {quantitySelect}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Stack>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Products;

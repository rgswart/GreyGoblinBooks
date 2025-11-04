// components/CheckoutMain.js

// Imports //

//Import components from react-bootstrap
import { Button, Card, Stack, Dropdown } from "react-bootstrap";
//Import useDispatch hook from react-redux
import { useDispatch } from "react-redux";
//Import functional components
import { clearItem, updateItemQuantity } from "../store/cartSlice.js";
//Import data components
import { colors } from "../data/BooksData.js";

// Functionality //

const CheckoutMain = ({ item, windowWidth }) => {
  //Initialize Redux dispatch
  const dispatch = useDispatch();

  //Create a function to handle the quantity change action
  //Parameters include itemId and quantity
  const handleQuantityChange = (itemId, quantity) => {
    //If quantity selection is > 1 then perform a dispatch...
    if (quantity >= 1) {
      //...to do an updateItemQuantity action with
      //...itemId and quantity passed as an action payload
      dispatch(updateItemQuantity({ itemId, quantity }));
    }
  };

  // Render section //

  return (
    //Assign as key the item.itemId as a unique ID
    //Assign at larger viewports a right padding of size 5 (pe-lg-5)
    <Card key={item.itemId} className="order-item pe-lg-5">
      <div className="cart-item-stack pe-md-5">
        {/*Conditionally set the variant of Card.Img 
        based on viewport sizes to style differently
        variant start would be left aligned (at >=576px viewport width), 
        variant top would be aligned to the top (at <576px viewport width)*/}
        <Card.Img
          variant={windowWidth < 576 ? "top" : "start"}
          //Render the item image
          src={item.image}
          //Dynamically render alt text as the title
          alt={item.title}
          //Set the height and width at 200px
          height={200}
          width={200}
          //Set the image to be responsible with img-fluid
          className="cart-item-image img-fluid"
        />
        <Card.Body className="order-item-details">
          {/*Remove padding and margins*/}
          <Card.Title className="p-0 m-0">{item.title}</Card.Title>
          {/*Add a top margin of bootstrap size 1 and
          a bottom margin of size 3*/}
          <Card.Text className="p-0 m-0 mt-1 mb-3">
            <strong>Author:</strong> {item.author}
          </Card.Text>
          {/*Use as="div" to alter the Card.Text from:
           type <p></p> to type <div></div> to prevent hydration error
           Assign a variable bottom margin at different viewports*/}
          <Card.Text as="div" className="order-item-price p-0 m-0 mb-sm-1">
            {/*Assign a horizontal stack to ensure child elements are...
            ...horizontally next to each other*/}
            <Stack direction="horizontal" gap={4}>
              <div>
                <strong>Unit Cost:</strong> R{item.unitPrice.toFixed(2)}
              </div>
              <div>
                <strong>Total:</strong> R{item.total.toFixed(2)}
              </div>
            </Stack>
          </Card.Text>
          <Stack
            direction="horizontal"
            gap={2}
            //Assign a variable right padding (pe-lg-5) based on viewport width
            //Assign this stack to take up the full width of the available parent space with (w-100)
            className="pe-lg-5 w-100 cart-quantity-stack"
          >
            <Card.Text as="div" className="cart-item-quantity">
              {/*A dropdown is rendered for handling quantity changes in cart.
              When a dropdown item is selected, the onSelect handler is triggered.
              It receives the selected item's `eventKey` (selectedQuantity) as a string.
              A handleQuantityChange function is then executed with arguments:
              "item.itemId" and "selectedColorIndex" converted to a number using Number().*/}
              <Dropdown
                onSelect={(selectedQuantity) =>
                  handleQuantityChange(item.itemId, Number(selectedQuantity))
                }
              >
                <Dropdown.Toggle
                  variant="outline-secondary"
                  aria-label={`Change quantity of the ${
                    colors[item.colorIndex]
                  } ${item.title} book, current quantity ${item.quantity}`}
                >
                  {item.quantity}
                </Dropdown.Toggle>
                <Dropdown.Menu className="quantity-dropdown-menu">
                  {/*Render a dropdown item for each quantity (1–50)
                    - Array.from generates an array of numbers from 1 to 50
                    - .map renders a <Dropdown.Item> for each quantity
                    - eventKey is passed to the onSelect handler when clicked*/}
                  {Array.from(
                    //Sets length to 50
                    { length: 50 },
                    //Ensures it starts at 1 instead of 0
                    (_, index) => index + 1
                  ).map((quantity) => (
                    <Dropdown.Item
                      key={quantity}
                      eventKey={quantity}
                      aria-label={`Select quantity ${quantity}`}
                    >
                      {quantity}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Card.Text>
            {/*Create a button to send a dispatch to delete the cart item*/}
            <Button
              //Set the button style to red (variant="danger")
              variant="danger"
              className="remove-btn"
              //Set an onClick event handler to dispatch a clearItem reducer action on click
              onClick={() => dispatch(clearItem(item.itemId))}
              aria-label={`Delete item: ${colors[item.colorIndex]} ${
                item.title
              }`}
            >
              Delete
            </Button>
          </Stack>
        </Card.Body>
      </div>
    </Card>
  );
};

export default CheckoutMain;

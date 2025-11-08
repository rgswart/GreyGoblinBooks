// src/components/Logout.js

// Imports //

//Importing Button component from bootstrap
import { Button } from "react-bootstrap";
//Import useDispatch hook from react-redux
import { useDispatch } from "react-redux";
//Import functional components
import { logout } from "../store/loginSlice";

// Functionality //

//Function to render a button to log the user out
const LogoutButton = () => {
  //Initialize Redux dispatch
  const dispatch = useDispatch();

  // Render section //

  return (
    <div>
      {/*Add a logout button*/}
      <Button
        //set button color as light blue (variant="info")
        variant="info"
        //assign a custom style of transform: "translate(+20%, +0%)" to make the reset button appear more centrally aligned relative to the text
        style={{ transform: "translate(+20%, +0%)" }}
        //Assign an onClick event handler to dispatch the logout action
        onClick={() => dispatch(logout())}
      >
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;

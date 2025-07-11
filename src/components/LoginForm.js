//LoginForm.js

// Imports //

//Import the custom css style sheet
import "../css/LoginForm.css";
//Import components from react-bootstrap
import { Form, Button, Stack, Container } from "react-bootstrap";
//Import the useState react hook
import { useState } from "react";
//Import React-Redux hooks
import { useSelector, useDispatch } from "react-redux";
//Import React-router-dom components/hooks
import { Link, useNavigate } from "react-router-dom";
//Import formik
import { useFormik } from "formik";
//Import an encryption/decryption library
import bcrypt from "bcryptjs";
//Import functional components
import LogoutButton from "../components/Logout";
//Import redux actions from slices
import { login } from "../store/loginSlice";

// Form validation //

const validate = (values) => {
  //Assign an errors variable
  const errors = {};
  //Retrieve users who have already sighed up
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  //Identifier validation (can be username or email)
  if (!values.identifier) {
    errors.identifier = "Required";
  } else {
    //Search for a username or email that matches the input
    const userMatch = existingUsers.find(
      (user) =>
        user.email.toLowerCase() === values.identifier.toLowerCase() ||
        user.username === values.identifier
    );
    //If none of them do match, then produce an error
    if (!userMatch) {
      errors.identifier = "Email or username not registered.";
    }
  }

  //Password field validation
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be 8 characters or more";
  }

  return errors;
};

// Functionality //

//Function to render the Login page
const LoginForm = () => {
  //Retrieve users from localStorage
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  //Initialize Redux dispatch
  const dispatch = useDispatch();

  //Declare a navigation hook to allow routing
  const navigate = useNavigate();

  //Get login state and username from Redux
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const username = useSelector((state) => state.login.username);

  //Declare a loginError state to allow for error handling against existingUsers
  const [loginError, setLoginError] = useState("");

  //Initialize Formik for managing form state and validation
  const formik = useFormik({
    //Assign initial formik values
    initialValues: {
      identifier: "",
      password: "",
    },
    //Ensure validation
    validate,
    //Assign onSubmit behavior
    onSubmit: (values, { resetForm }) => {
      //Normalize identifier input to lowercase
      const identifierInput = values.identifier.toLowerCase();

      //Find user matching the identifier (username or email)
      const user = existingUsers.find(
        (user) =>
          user.email.toLowerCase() === identifierInput ||
          user.username === values.identifier
      );

      //Check if password matches stored hashed password using bcrypt
      if (user && bcrypt.compareSync(values.password, user.password)) {
        //Dispatch login with username and email
        dispatch(login({ username: user.username, email: user.email }));

        //Clear error and reset form
        setLoginError("");
        resetForm();

        //Navigate to home page after a 1400ms delay
        setTimeout(() => {
          navigate("/");
        }, 1400);

        //Scroll to top after navigating
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 1500);
      } else {
        //Set error if login fails
        setLoginError("Invalid email or password.");
      }
    },
  });

  //Handle input changes and clear loginError
  //This clears the error when the user starts typing
  const handleInputChange = (event) => {
    formik.handleChange(event);
    setLoginError("");
  };

  // Render section //

  //Display a conditional render if the user is already logged in

  if (isLoggedIn) {
    return (
      <div className="login-form-div">
        <Container className="login-form-container">
          {/*Align child elements of the stack horizontally*/}
          <Stack direction="horizontal">
            {/*Set text color as white (text-light)
                Display a custom welcome message if the user is logged in*/}
            <h1 className="text-light">Welcome {username}</h1>
            {/*Assign the logoutButton functional component if the user is logged in*/}
            <LogoutButton />
          </Stack>
        </Container>
      </div>
    );
  }

  return (
    <div className="login-form-div">
      <Container className="login-form-container">
        {/*Assign formik form and assign handling of the submit to formik*/}
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <div>
              {/*Set text color as light blue (text-blue)
              Set a top margin of bootstrap size 2 and bottom margin of 4*/}
              <h1 className="text-info mt-2 mb-4">
                Log in to Grey Goblin Books
              </h1>
              <Form.Label className="text-light" htmlFor="identifier">
                Email or Username
              </Form.Label>
              <Form.Control
                //Assign the expected input as type text
                type="text"
                name="identifier"
                //Assign placeholder text
                placeholder="Email address or username"
                //Assign onChange behavior event handling through formik
                onChange={handleInputChange}
                //Assign onBlur (opposite of focus) even handling through formik
                onBlur={formik.handleBlur}
                //Assign the input value as a formik value
                value={formik.values.identifier}
                //Assign an aria-label for screen readers
                aria-label="Email or username input for login"
              />{" "}
              {/*Assign a formik error handling message*/}
              {/*Error handling message explanation 1*/}
              {formik.touched.identifier && formik.errors.identifier && (
                //Assign yellow text (warning)
                //Assign a bootstrap top margin of 1
                <div className="text-warning mt-1">
                  {/*Assign a conditional error message*/}
                  {formik.errors.identifier}
                </div>
              )}
              <Form.Label className="text-light mt-2" htmlFor="password">
                Password
              </Form.Label>
              {/*See above 'Form Control explanation 1' as explanation*/}
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                aria-label="Password input for login"
              />
              {/*See above 'Error handling message explanation 1' as explanation*/}
              {formik.touched.password && formik.errors.password && (
                <div className="text-warning mt-1">
                  {formik.errors.password}
                </div>
              )}
              {/*Assign conditional error logging if the entered user does not exist*/}
              {loginError && (
                <div
                  //Assign red text (text-danger)
                  //Set a top margin of bootstrap size 2
                  className="text-danger mt-2"
                  //Set custom text styles of a black text shadow and
                  //A font size of 18px
                  style={{
                    textShadow: "2px 2px 2px black",
                    fontSize: "18px",
                  }}
                >
                  {loginError}
                </div>
              )}
              {/*Assign a horizontal aligned stack*/}
              <Stack direction="horizontal" className="mt-3" gap={3}>
                {/*Create a login button*/}
                <Button
                  //Set the button color to dark blue (variant="primary")
                  variant="primary"
                  //Set the button type to submit
                  type="submit"
                  style={{ fontSize: "18px" }}
                >
                  Login
                </Button>
                {/*Provide a link to the sign-up page*/}
                <Button
                  //Set the button color to green (variant="success")
                  variant="success"
                  //Assign the button as a link to /signup
                  as={Link}
                  to="/signup"
                  style={{ fontSize: "18px" }}
                  aria-label="Link to create new account"
                >
                  Sign up
                </Button>
              </Stack>
            </div>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default LoginForm;

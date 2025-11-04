// src/routes/LoginForm.js

// Imports //

//Import the custom css style sheet
import "../css/LoginForm.css";
//Import components from react-bootstrap
import { Form, Button, Stack, Container, InputGroup } from "react-bootstrap";
//Import the useState react hook
import { useState } from "react";
//Import React-Redux hooks
import { useSelector, useDispatch } from "react-redux";
//Import React-router-dom components/hooks
import { Link, useNavigate } from "react-router-dom";
//Import formik
import { useFormik } from "formik";
//Import Yup for validation
import * as Yup from "yup";
//Import an encryption/decryption library
import bcrypt from "bcryptjs";
//Import functional components
import LogoutButton from "../components/Logout";
//Import redux actions from slices
import { login } from "../store/loginSlice";
//Import username encoding utilities
import { decodeUsername } from "../utils/usernameEncoding";
//Import eye icons for password visibility
import { BsEye, BsEyeSlash } from "react-icons/bs";

// Yup Validation Schema //

const validationSchema = Yup.object({
  // Identifier validation (can be username or email)
  identifier: Yup.string()
    .required("Required")
    .test("user-exists", "Email or username not registered", function (value) {
      if (!value) return true;
      const existingUsers = JSON.parse(sessionStorage.getItem("users")) || [];

      // Check against Base64 encoded usernames and hashed emails
      const userMatch = existingUsers.find((user) => {
        const decodedUsername = decodeUsername(user.username);
        return (
          decodedUsername === value ||
          bcrypt.compareSync(value.toLowerCase(), user.email)
        );
      });

      return !!userMatch;
    }),

  // Password validation
  password: Yup.string()
    .required("Required")
    .min(8, "Must be 8 characters or more"),
});

// Functionality //

//Function to render the Login page
const LoginForm = () => {
  //Initialize Redux dispatch
  const dispatch = useDispatch();

  //Declare a navigation hook to allow routing
  const navigate = useNavigate();

  //Get login state and username from Redux
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const username = useSelector((state) => state.login.username);

  //Password visibility controlling state
  const [showPassword, setShowPassword] = useState(false);

  //Declare a loginError state to allow for error handling against existingUsers
  const [loginError, setLoginError] = useState("");

  //Initialize Formik for managing form state and validation
  const formik = useFormik({
    //Assign initial formik values
    initialValues: {
      identifier: "",
      password: "",
    },
    //Use Yup validation schema
    validationSchema,
    //Assign onSubmit behavior
    onSubmit: (values, { resetForm }) => {
      //Retrieve users from sessionStorage
      const existingUsers = JSON.parse(sessionStorage.getItem("users")) || [];

      //Find user matching the identifier (username or email)
      //Username is Base64 encoded in storage, email is bcrypt hashed
      const user = existingUsers.find((user) => {
        const decodedUsername = decodeUsername(user.username);
        return (
          decodedUsername === values.identifier ||
          bcrypt.compareSync(values.identifier.toLowerCase(), user.email)
        );
      });

      //Check if password matches stored hashed password using bcrypt
      if (user && bcrypt.compareSync(values.password, user.password)) {
        //Get the actual username from the stored Base64 encoded value for display
        const actualUsername = decodeUsername(user.username);

        //Dispatch login with actual username
        dispatch(login({ username: actualUsername }));

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
              {/*Password field with visibility toggle*/}
              <InputGroup>
                {/*See above 'Form Control explanation 1' as explanation*/}
                <Form.Control
                  //Set conditional type of input to allow for visible password
                  //...if eye icon was selected
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  aria-label="Password input for login"
                />
                <Button
                  //Set button style as black text and border
                  variant="outline-dark"
                  //Set custom css class, and a white border and white background
                  className="password-toggle-button border-light bg-light"
                  //on click switch the boolean showPassword state
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {/*if showPassword is true display slashed eye, otherwise show normal eye icon*/}
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </Button>
              </InputGroup>
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

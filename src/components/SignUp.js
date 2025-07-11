//SignUp.js

// Imports //

//Import the custom css style sheet
import "../css/SignUp.css";
//Import components from react-bootstrap
import { Form, Button, Stack, Container, Alert } from "react-bootstrap";
//Import components from react
import { useRef, useEffect, useState } from "react";
//Import the useDispatch react hook
import { useDispatch } from "react-redux";
//Import the useNavigate hook from react-router-dom
import { useNavigate } from "react-router-dom";
//Import formik for form validation handling
import { useFormik } from "formik";
//Import an encryption/decryption library
import bcrypt from "bcryptjs";
//Import redux actions from slices
import { addUser } from "../store/userSlice";

// Form validation //

//Create a form validation function
const validate = (values) => {
  //Assign an errors variable
  const errors = {};
  //Retrieve users who have already sighed up
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  //First name validation
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  //Surname validation
  if (!values.surname) {
    errors.surname = "Required";
  } else if (values.surname.length > 20) {
    errors.surname = "Must be 20 characters or less";
  }

  //Username validation
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length < 7) {
    errors.username = "Must be 7 characters or more";
  } else if (/\s/.test(values.username)) {
    errors.username = "Must be a single word (no spaces)";
  } else if (existingUsers.some((user) => user.username === values.username)) {
    errors.username = "Username already taken. Please choose another.";
  }

  //Email validation
  if (!values.email) {
    errors.email = "Required";
    //Ensures the email has a valid structure (e.g. user@example.com).
    //Must include alphanumeric characters before '@', a domain name, and a 2–4 character top-level domain.
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
    //Ensures the user email does not already exist
  } else if (existingUsers.some((user) => user.email === values.email)) {
    errors.email = "Email already registered. Please use a different email.";
  }

  //Password validation
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be 8 characters or more";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Must contain at least one uppercase letter";
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = "Must contain at least one lowercase letter";
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = "Must contain at least one number";
    // eslint-disable-next-line
  } else if (!/[!@#$%^&*()_+\-={}';:"\\|,.<>/?~\[\]]/.test(values.password)) {
    errors.password = "Must contain at least one special character";
  }

  //Confirm password validation
  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Required";
  } else if (values.passwordConfirm !== values.password) {
    //Ensures both password entries match
    errors.passwordConfirm = "Passwords must match";
  }

  return errors;
};

// Functionality //

//Function to render the Sign-up page
const SignUp = () => {
  //Initialize Redux dispatch
  const dispatch = useDispatch();
  //Declare a navigation hook to allow routing
  const navigate = useNavigate();
  //Declare a useRef to use with auto focus
  const inputRef = useRef();
  //Declare registerShow state to handle alert visibility
  const [registerShow, setRegisterShow] = useState(false);

  //Declare a useEffect to auto focus on first name input
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //Initialize Formik for managing form state and validation
  const formik = useFormik({
    //Assign initial formik values
    initialValues: {
      firstName: "",
      surname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
    },
    //Ensure validation
    validate,
    //Assign onSubmit behavior
    onSubmit: (values) => {
      //Import existingUser from local storage
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      //Hash encrypt the inputted password
      //Suggestion by a friend to hashEncrypt even if I am not implementing a back end database
      //https://www.npmjs.com/package/bcryptjs
      //Auto generate a salt and hash
      const hashedPassword = bcrypt.hashSync(values.password, 10);

      //Assign a newUser object
      const newUser = {
        username: values.username,
        //ensure the email is forced to lowercase
        email: values.email.toLowerCase(),
        firstName: values.firstName,
        surname: values.surname,
        //ensure the stored password is hash encrypted
        password: hashedPassword,
      };

      //Save user to Redux with dispatch addUser action
      dispatch(addUser(newUser));

      //Save user to localStorage
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      //Allow the alert to display
      setRegisterShow(true);
      //After a 800ms delay route the user to the profile page.
      setTimeout(() => {
        navigate("/profile");
      }, 800);
    },
  });

  // Render section //

  return (
    <div className="sign-up-div mt-sm-2 mt-md-4 pt-sm-2 pt-md-4">
      <Container className="sign-up-form-container mt-sm-5 mt-4">
        {/*Assign formik form and assign handling of the submit to formik*/}
        <Form onSubmit={formik.handleSubmit} className="sign-up-form">
          <Stack gap={3}>
            {/*Set text color as light blue (text-info)*/}
            <h1 className="text-info mb-3">Create a new account</h1>
            {/*Align child elements of the stack horizontally*/}
            <Stack direction="horizontal" gap={3}>
              <Stack>
                <Form.Label htmlFor="firstName" className="form-label">
                  First Name
                </Form.Label>
                {/*Form Control explanation 1*/}
                <Form.Control
                  id="firstName"
                  name="firstName"
                  //Assign the expected input as type text
                  type="text"
                  //Assign placeholder text
                  placeholder="First name"
                  //Assign onChange behavior event handling through formik
                  onChange={formik.handleChange}
                  //Assign onBlur (opposite of focus) even handling through formik
                  onBlur={formik.handleBlur}
                  //Assign the input value as a formik value
                  value={formik.values.firstName}
                  //Assign this element as the target of auto focus
                  ref={inputRef}
                  //Assign an aria-label for screen readers
                  aria-label="First name input to create account"
                />
                {/*Assign a formik error handling message*/}
                {/*Error handling message explanation 1*/}
                {formik.touched.firstName && formik.errors.firstName ? (
                  //Assign yellow text (warning)
                  //Assign a bootstrap top margin of 1
                  <div className="text-warning mt-1">
                    {/*Assign a conditional error message*/}
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </Stack>
              <Stack>
                <Form.Label htmlFor="surname" className="form-label">
                  Surname
                </Form.Label>
                {/*See above 'Form Control explanation 1' as explanation*/}
                <Form.Control
                  id="surname"
                  name="surname"
                  type="text"
                  placeholder="Surname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.surname}
                  aria-label="Surname input to create account"
                />
                {/*See above 'Error handling message explanation 1' as explanation*/}
                {formik.touched.surname && formik.errors.surname ? (
                  <div className="text-warning mt-1">
                    {formik.errors.surname}
                  </div>
                ) : null}
              </Stack>
            </Stack>
            <Stack>
              <Form.Label htmlFor="username" className="form-label">
                Username
              </Form.Label>
              {/*See above 'Form Control explanation 1' as explanation*/}
              <Form.Control
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                aria-label="Username input to create account"
              />
              {/*See above 'Error handling message explanation 1' as explanation*/}
              {formik.touched.username && formik.errors.username ? (
                <div className="text-warning mt-1">
                  {formik.errors.username}
                </div>
              ) : null}
            </Stack>
            <Stack>
              <Form.Label htmlFor="email" className="form-label">
                Email Address
              </Form.Label>
              {/*See above 'Form Control explanation 1' as explanation*/}
              <Form.Control
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                aria-label="Email address input to create account"
              />
              {/*See above 'Error handling message explanation 1' as explanation*/}
              {formik.touched.email && formik.errors.email ? (
                <div className="text-warning mt-1">{formik.errors.email}</div>
              ) : null}
            </Stack>
            <Stack>
              <Form.Label htmlFor="password" className="form-label">
                Password
              </Form.Label>
              {/*See above 'Form Control explanation 1' as explanation*/}
              <Form.Control
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                aria-label="Password input to create account"
              />
              {/*See above 'Error handling message explanation 1' as explanation*/}
              {formik.touched.password && formik.errors.password ? (
                <div className="text-warning mt-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </Stack>
            <Stack>
              <Form.Label htmlFor="passwordConfirm" className="form-label">
                Confirm password
              </Form.Label>
              {/*See above 'Form Control explanation 1' as explanation*/}
              <Form.Control
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                placeholder="Confirm password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
                aria-label="Confirm password input to create account"
              />
              {/*See above 'Error handling message explanation 1' as explanation*/}
              {formik.touched.passwordConfirm &&
              formik.errors.passwordConfirm ? (
                <div className="text-warning mt-1">
                  {formik.errors.passwordConfirm}
                </div>
              ) : null}
            </Stack>
          </Stack>
          <Stack direction="horizontal" className="sign-up-section mt-4 ">
            {/*Assign the onSubmit button with custom font size (fs-5)
            and type="submit"*/}
            <Button type="submit" className="submit-button fs-5">
              Sign Up
            </Button>
            {/*Assign a conditional alert based on the state "registerShow"*/}
            <div>
              {registerShow ? (
                //Set an alert, with color green (variant="success")
                <Alert variant="success" className="registration-alert">
                  Sign up successful!
                </Alert>
              ) : null}
            </div>
          </Stack>
        </Form>
        {/*Assign a reset button for testing and convenience to clear localStorage
        In addition reload the page*/}
        <Button
          //Set color of the button to red (variant="danger")
          variant="danger"
          className="reset-button"
          //Assign onClick handler behavior
          onClick={() => {
            //Clear local storage
            localStorage.clear();
            //Refresh the page
            window.location.reload();
          }}
        >
          Reset
        </Button>
      </Container>
    </div>
  );
};

export default SignUp;

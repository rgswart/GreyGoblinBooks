//SignUp.js

// Imports //
import "../css/SignUp.css";
import {
  Form,
  Button,
  Stack,
  Container,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import bcrypt from "bcryptjs";
import { addUser } from "../store/userSlice";
import { BsEye, BsEyeSlash } from "react-icons/bs";
//Import custom components
import { encodeUsername, decodeUsername } from "../utils/usernameEncoding.js";
import SignUpDisclaimerAlert from "../components/SignUpDisclaimerAlert.js";

//Function to retrieve userdata
const getExistingUsers = () => {
  try {
    const users = sessionStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Error reading users:", error);
    return [];
  }
};

//function to save user data
const saveUsers = (users) => {
  try {
    sessionStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users:", error);
  }
};

// Yup Validation Schema //
const validationSchema = Yup.object({
  // First name validation
  firstName: Yup.string()
    .required("Required")
    .max(15, "Must be 15 characters or less"),

  // Surname validation
  surname: Yup.string()
    .required("Required")
    .max(20, "Must be 20 characters or less"),

  // Username validation
  username: Yup.string()
    .required("Required")
    .min(7, "Username must be 7 characters or more")
    .test("no-spaces", "No spaces allowed", (value) => !/\s/.test(value))
    .test("username-taken", "Username already taken", function (value) {
      if (!value) return true;
      const existingUsers = getExistingUsers();
      // Decode stored usernames for comparison
      const decodedUsernames = existingUsers.map((user) =>
        decodeUsername(user.username)
      );
      return !decodedUsernames.includes(value);
    }),

  // Email validation
  email: Yup.string()
    .required("Required")
    .email("Invalid email address")
    .test("email-taken", "Email already registered", function (value) {
      if (!value) return true;
      const existingUsers = getExistingUsers();
      // Hash the input email to compare with stored hashed emails
      const hashedInputEmail = bcrypt.hashSync(value.toLowerCase(), 10);
      return !existingUsers.some((user) => user.email === hashedInputEmail);
    }),

  // Password validation
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be 8 characters or more")
    .max(64, "Password must be 64 characters or less")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      // eslint-disable-next-line
      /[!@#$%^&*()_+\-={}';:"\\|,.<>/?~\[\]]/,
      "Password must contain at least one special character"
    ),

  // Password confirmation validation
  passwordConfirm: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

// Functionality //

//Function to render the Sign-up page
const SignUp = () => {
  //Initialize Redux dispatch
  const dispatch = useDispatch();
  //Declare a navigation hook to allow routing
  const navigate = useNavigate();
  //Declare a useRef to use with auto focus
  const inputRef = useRef();

  //Password visibility controlling states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  //Declare registerShow state to handle alert visibility
  const [registerShow, setRegisterShow] = useState(false);

  //Declare a useEffect to auto focus on first name input
  useEffect(() => {
    inputRef.current?.focus();
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
    //Use Yup validation schema
    validationSchema,
    //Assign onSubmit behavior
    onSubmit: (values) => {
      //Import existingUser from session storage
      const existingUsers = getExistingUsers();

      //Hash encrypt the inputted password
      const hashedPassword = bcrypt.hashSync(values.password, 10);

      //Hash encrypt the email address for storage
      const hashedEmail = bcrypt.hashSync(values.email.toLowerCase(), 10);

      // Data sanitisation //

      // Replaced first and last names with placeholder values, as they aren't necessary. Nice to show I can display it correctly in a form.
      // First name and surname replaced with generic values "J" and "Doe"
      // Username is Base64 encoded, but is easily decodable for display
      // Email and password are properly hashed with bcrypt for security

      //Assign a newUser object with sanitized data
      const newUser = {
        username: encodeUsername(values.username), // Base64 encoded for storage
        email: hashedEmail, // Email is hashed for security
        firstName: "J", // Generic placeholder instead of actual first name
        surname: "Doe", // Generic placeholder instead of actual surname
        password: hashedPassword, // Password is properly hashed
      };

      //Save user to Redux with dispatch addUser action - JUST DISPATCH newUser
      dispatch(addUser(newUser));

      //Save user to sessionStorage
      const updatedUsers = [...existingUsers, newUser];
      saveUsers(updatedUsers);

      //Allow the alert to display
      setRegisterShow(true);
      //After a 1200ms delay route the user to the profile page.
      setTimeout(() => {
        navigate("/profile");
      }, 1200);
    },
  });

  //Custom validation helper for password length
  const passwordTooLong =
    formik.values.password.length > 64
      ? "Password must be 64 characters or less"
      : null;

  // Render section //

  return (
    <div className="sign-up-div mt-sm-2 mt-md-4 pt-sm-2 pt-md-4">
      <Container className="sign-up-form-container mt-sm-5 mt-4">
        {/*Assign formik form and assign handling of the submit to formik*/}
        <Form onSubmit={formik.handleSubmit} className="sign-up-form">
          <Stack gap={3}>
            {/*Set text color as light blue (text-info)*/}
            <h1 className="text-info mb-3">Create a new account</h1>

            {/* Note: We collect first name and surname for form completeness */}
            {/* but they will be replaced with generic values "J" and "Doe" upon submission */}
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
                  //Assign maximum input length
                  maxLength={15}
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
                  //Assign maximum input length
                  maxLength={20}
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
              <Form.Control
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                //Assign maximum input length
                maxLength={30}
                aria-label="Username input to create account"
              />
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
              <Form.Control
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                //Assign maximum input length
                maxLength={254}
                aria-label="Email address input to create account"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-warning mt-1">{formik.errors.email}</div>
              ) : null}
            </Stack>

            {/* Password field with visibility toggle */}
            <Stack>
              <Form.Label htmlFor="password" className="form-label">
                Password
              </Form.Label>
              <InputGroup>
                {/*See above 'Form Control explanation 1' as explanation*/}
                <Form.Control
                  id="password"
                  name="password"
                  //Set conditional type of input to allow for visible password, if eye icon was selected
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  //Set maxLength one above custom 64 limit to allow for immediate feedback message, but still limit input
                  maxLength={65}
                  aria-label="Password input to create account"
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
              {/*Custom immediate feedback message to show user if password is too long*/}
              {passwordTooLong ? (
                <div className="text-warning mt-1">{passwordTooLong}</div>
              ) : (
                formik.touched.password &&
                formik.errors.password && (
                  <div className="text-warning mt-1">
                    {formik.errors.password}
                  </div>
                )
              )}
            </Stack>

            {/* Password confirmation field with visibility toggle */}
            <Stack>
              <Form.Label htmlFor="passwordConfirm" className="form-label">
                Confirm password
              </Form.Label>
              <InputGroup>
                {/*See above 'Form Control explanation 1' as explanation*/}
                <Form.Control
                  id="passwordConfirm"
                  name="passwordConfirm"
                  //Set conditional type of input to allow for visible password, if eye icon was selected
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  //Set maximum input length
                  maxLength={64}
                  aria-label="Confirm password input to create account"
                />
                <Button
                  //Set button style as black text and border
                  variant="outline-dark"
                  //Set custom css class, and a white border and white background
                  className="password-toggle-button border-light bg-light"
                  //on click switch the boolean showConfirm state
                  onClick={() => setShowConfirm((prev) => !prev)}
                >
                  {/*if showConfirm is true display slashed eye, otherwise show normal eye icon*/}
                  {showConfirm ? <BsEyeSlash /> : <BsEye />}
                </Button>
              </InputGroup>
              {formik.touched.passwordConfirm &&
              formik.errors.passwordConfirm ? (
                <div className="text-warning mt-1">
                  {formik.errors.passwordConfirm}
                </div>
              ) : null}
            </Stack>
          </Stack>
          <Stack direction="horizontal" className="sign-up-section mt-4 ">
            {/*Assign the onSubmit button with custom font size
            and type="submit"*/}
            <Button
              type="submit"
              className="submit-button"
              style={{ fontSize: "18px" }}
            >
              Create account
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
        {/*Assign a reset button for testing and convenience to clear sessionStorage
        In addition reload the page*/}
        <Button
          //Set color of the button to red (variant="danger")
          variant="danger"
          className="reset-button mt-3"
          //Assign onClick handler behavior
          onClick={() => {
            //Clear all session storage
            sessionStorage.clear();
            //Refresh the page
            window.location.reload();
          }}
        >
          Reset All Data
        </Button>
        <SignUpDisclaimerAlert></SignUpDisclaimerAlert>
      </Container>
    </div>
  );
};

export default SignUp;

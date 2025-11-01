// components/SignUpDisclaimerAlert.js

// Imports //
import { Alert } from "react-bootstrap";
//Import React-Redux hooks
import { useSelector, useDispatch } from "react-redux";
//Import redux actions from slices
import { dismissSignUpDisclaimer } from "../store/signUpAlertSlice";
import "../css/SignUpDisclaimerAlert.css";

// Functionality //

//Component to render a dismissible alert for the signup page
const SignUpDisclaimerAlert = () => {
  //Initialize Redux dispatch
  const dispatch = useDispatch();

  //Get alert dismissal state from Redux
  const signUpDisclaimerDismissed = useSelector(
    (state) => state.signUpAlert.signUpDisclaimerDismissed
  );

  //Don't render anything if alert has been dismissed
  if (signUpDisclaimerDismissed) {
    return null;
  }

  //Handle dismiss action - dispatch to Redux
  const handleDismiss = () => {
    dispatch(dismissSignUpDisclaimer());
  };

  // Render section //

  return (
    //Set alert color to yellow (variant="warning") and make it dismissible
    <Alert
      className="sign-up-disclaimer-alert text-center border border-dark border-2 mb-0 text-dark"
      dismissible
      //With on click event handling to set the show state to false
      onClose={handleDismiss}
    >
      This data is stored in sessionStorage only. Please enter example data, not
      sensitive data.
    </Alert>
  );
};

export default SignUpDisclaimerAlert;

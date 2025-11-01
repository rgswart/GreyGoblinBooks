//App.js

// Imports //

//Import the bootstrap css style sheet
import "bootstrap/dist/css/bootstrap.min.css";
//Import custom css style sheet
import "./App.css";
//Import the useSelector hook from react-redux
import { useSelector } from "react-redux";
//Import components from react-router-dom
import { Route, Routes } from "react-router-dom";
//Import functional components
import NavbarRender from "./routes/NavbarRender.js";
import Home from "./routes/Home.js";
import LoginForm from "./routes/LoginForm.js";
import SignUp from "./routes/SignUp.js";
import Footer from "./components/Footer.js";
import Products from "./routes/Products.js";
import Checkout from "./routes/Checkout.js";
import Orders from "./routes/Orders.js";
import DisclaimerAlert from "./components/DisclaimerAlert.js";

// Functionality //

//Create a master App component responsible for rendering the main pages and providing routes
function App() {
  //Define isLoggedIn by selecting "isLoggedIn" from the "login" slice of the global Redux store
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  return (
    <div>
      {/*The Navbar component is rendered here, for all routes*/}
      <NavbarRender />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      {/*Create a conditionally rendered footer
      If the user is logged-in the name of the website displays in the footer
      because the name of the website in the header is replaced with the username.*/}
      {isLoggedIn && <Footer />}

      {/*Demo website alert*/}
      <DisclaimerAlert></DisclaimerAlert>
    </div>
  );
}

export default App;

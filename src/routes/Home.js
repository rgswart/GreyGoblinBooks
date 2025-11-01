//Home.js

// Imports //

//Import functional components
import HomeLanding from "../components/HomeLanding.js";
import HomeContact from "../components/HomeContact.js";

// Functionality //

//Function to render the home/landing page
function Home() {
  //This acts as the master render section of the Home functional component

  // Render section //
  return (
    <div>
      <HomeLanding></HomeLanding>
      <HomeContact></HomeContact>
    </div>
  );
}

export default Home;

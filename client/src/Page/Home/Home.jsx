// import Header from "../../Components/Header/Header";
// import ListofDonation from "../../Components/ListofDonation/ListofDonation";
import MainContent from "../../Components/MainContent/MainContent";
import Navbar from "../../Components/Navbar/Narbar";
import "./Home.css";

function Home() {
  return (
    <div className="Home">
      <Navbar appName={"Donate App"} />
      <MainContent />
    </div>
  );
}

export default Home;

import Footer from "../../Components/Footer/Footer";
import MainContent from "../../Components/MainContent/MainContent";
import Navbar from "../../Components/Navbar/Narbar";
import "./Home.css";

function Home() {
  return (
    <div className="Home">
      <Navbar appName={"Donate App"} />
      <MainContent />
      <Footer />
    </div>
  );
}

export default Home;

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="md:py-5 py-3 lg:px-18 md:px-28 px-5">
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

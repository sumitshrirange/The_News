import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <div className="md:py-5 py-3 lg:px-18 md:px-28 px-5">
        <Header />
        <Navbar />
        <Outlet />
        <Footer />
        <ToastContainer position="top-right" theme="light" />
      </div>
    </UserProvider>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";

export default function App() {
  const [selectedPage, setSelectedPage] = useState<string>("Home");

  const renderPage = () => {
    switch (selectedPage) {
      case "Home":
        return (
          <Home selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
        );
      case "About":
        return (
          <About
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        );
      case "Portfolio":
        return (
          <Portfolio
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        );
      case "Contact":
        return (
          <Contact
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        );
      default:
        return <p>Page not found</p>;
    }
  };

  return (
    <>
      <Header selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      {renderPage()}
    </>
  );
}

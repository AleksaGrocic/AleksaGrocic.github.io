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
        return <Home />;
      case "About":
        return <About />;
      case "Portfolio":
        return <Portfolio />;
      case "Contact":
        return <Contact />;
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

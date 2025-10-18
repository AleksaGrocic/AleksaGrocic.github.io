import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";

export default function App() {
  // Helper to capitalize page name
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // Initialize from URL hash (so refresh keeps same page)
  const [selectedPage, setSelectedPage] = useState<string>(() => {
    const pageFromHash = window.location.hash.replace("#", "");
    return pageFromHash ? capitalize(pageFromHash) : "Home";
  });

  // Update URL hash when page changes
  const changePage = (page: string) => {
    setSelectedPage(page);
    window.location.hash = page.toLowerCase();
  };

  // Handle back/forward button
  useEffect(() => {
    const handleHashChange = () => {
      const pageFromHash = window.location.hash.replace("#", "");
      setSelectedPage(pageFromHash ? capitalize(pageFromHash) : "Home");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderPage = () => {
    switch (selectedPage) {
      case "Home":
        return (
          <Home selectedPage={selectedPage} setSelectedPage={changePage} />
        );
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
      <Header selectedPage={selectedPage} setSelectedPage={changePage} />
      {renderPage()}
    </>
  );
}

import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";

export default function App() {
  const [selectedPage, setSelectedPage] = useState<string>("Home");

  return (
    <>
      <Header selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      {selectedPage === "Home" && <Home />}
    </>
  );
}

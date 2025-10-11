import { useState } from "react";
import Button from "./Button";

export default function Header() {
  const [selectedButton, setSelectedButton] = useState<string>("Home");

  const handleClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const buttons = ["Home", "About", "Skills", "Contact"];

  return (
    <div className="header">
      <p className="headerName">Aleksa Gročić</p>
      <div className="headerButtonsContainer">
        {buttons.map((name) => (
          <Button
            key={name}
            name={name}
            className={`headerButton ${
              selectedButton === name ? "selectedButton" : ""
            }`}
            onClick={() => handleClick(name)}
          />
        ))}
      </div>
    </div>
  );
}

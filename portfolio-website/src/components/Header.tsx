import Button from "./Button";

export default function Header({
  selectedPage,
  setSelectedPage,
}: {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
}) {
  const handleClick = (buttonName: string) => {
    setSelectedPage(buttonName);
  };

  const buttons = ["Home", "About", "Portfolio", "Contact"];

  return (
    <div className="header">
      <p className="headerName">Aleksa Gročić</p>
      <div className="headerButtonsContainer">
        {buttons.map((name) => (
          <Button
            key={name}
            name={name}
            className={`headerButton ${
              selectedPage === name ? "selectedButton" : ""
            }`}
            onClick={() => handleClick(name)}
          />
        ))}
      </div>
    </div>
  );
}

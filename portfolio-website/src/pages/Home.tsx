import { useEffect, useState } from "react";

export default function Home({
  selectedPage,
  setSelectedPage,
}: {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
}) {
  const [data, setData] = useState<{ text: string; footer: string } | null>(
    null
  );

  const handleClick = (buttonName: string) => {
    setSelectedPage(buttonName);
  };

  useEffect(() => {
    fetch("/content/home.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return null;

  return (
    <>
      <div className="homeBanner">
        <p>
          Hello! I'm <span className="coloredWord">Aleksa</span>,
          <br />a software engineer and photographer.
        </p>
        <img src="/assets/Me.JPG" alt="Me" />
      </div>

      <div className="bodyContainer">
        <div className="bodyText">
          <p>{data.text}</p>
          <p>
            Feel free to browse my website! The{" "}
            <span
              className="coloredWord clickable"
              onClick={() => handleClick("About")}
            >
              About
            </span>{" "}
            tab will tell you more about me. You can find my work on the{" "}
            <span
              className="coloredWord clickable"
              onClick={() => handleClick("Portfolio")}
            >
              Portfolio
            </span>{" "}
            tab, as well as my contact information on the{" "}
            <span
              className="coloredWord clickable"
              onClick={() => handleClick("Contact")}
            >
              Contact
            </span>{" "}
            tab!
          </p>
        </div>
      </div>
    </>
  );
}

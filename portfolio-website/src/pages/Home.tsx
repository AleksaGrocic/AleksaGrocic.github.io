import { useEffect, useState } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function Home({
  selectedPage,
  setSelectedPage,
}: {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
}) {
  const [data, setData] = useState("");

  const handleClick = (buttonName: string) => {
    setSelectedPage(buttonName);
  };

  useEffect(() => {
    fetch("/content/home.md")
      .then((res) => res.text())
      .then((text) => setData(text));
  }, []);

  const components: Components = {
    span: ({ node, ...props }) => {
      const page = (props as any)["data-page"];
      const isClickable = Boolean(page);

      return (
        <span
          className={`coloredWord ${isClickable ? "clickable" : ""}`}
          onClick={isClickable ? () => handleClick(page) : undefined}
        >
          {props.children}
        </span>
      );
    },
  };

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
          <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
            {data}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}

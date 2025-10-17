import { useEffect, useState } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function Contact({
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
    fetch("/content/contact.md")
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
    <div className="bodyContainer">
      <div className="bodyText">
        <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
          {data}
        </ReactMarkdown>
      </div>
    </div>
  );
}

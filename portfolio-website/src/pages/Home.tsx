import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function Home() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/content/home.md")
      .then((res) => res.text())
      .then((text) => setData(text));
  }, []);

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
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function About() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/content/about.md")
      .then((res) => res.text())
      .then((text) => setData(text));
  }, []);

  return (
    <div className="bodyContainer">
      <div className="bodyText">
        <ReactMarkdown>{data}</ReactMarkdown>
      </div>
    </div>
  );
}

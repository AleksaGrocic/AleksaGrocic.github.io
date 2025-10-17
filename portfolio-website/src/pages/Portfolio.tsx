import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Portfolio() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/content/portfolio.md")
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

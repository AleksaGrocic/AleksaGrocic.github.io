import { useEffect, useState } from "react";
import Body from "../components/Body";

export default function Portfolio() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/content/portfolio.md")
      .then((res) => res.text())
      .then((text) => setData(text));
  }, []);

  return <Body data={data} />;
}

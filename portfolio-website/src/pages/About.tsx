import { useEffect, useState } from "react";
import Body from "../components/Body";

export default function About() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/content/about.md")
      .then((res) => res.text())
      .then((text) => setData(text));
  }, []);

  return <Body data={data} />;
}

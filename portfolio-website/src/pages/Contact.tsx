import { useEffect, useState } from "react";
import Body from "../components/Body";

export default function Contact() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/content/contact.md")
      .then((res) => res.text())
      .then((text) => setData(text));
  }, []);

  return <Body data={data} />;
}

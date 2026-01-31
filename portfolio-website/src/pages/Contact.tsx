import { useEffect, useState } from "react";

interface ContactData {
  email: string;
  linkedin: string;
  instagram: any[];
  cv: string;
}

export default function Contact() {
  const [data, setData] = useState<ContactData | null>(null);

  useEffect(() => {
    fetch("/content/contact.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return null;

  return (
    <div className="bodyContainer">
      <div className="socialMediaContainer">
      {data.instagram.map((instagram, i) => (
        <pre key={i}>
          <p>{instagram.type}</p>
          <img src="/assets/instagram.svg" alt="Instagram icon"/>
          <span className="coloredWord"><a href={instagram.link} target="_blank" rel="noreferrer">
          {instagram.name}
          </a></span>
        </pre>
      ))}
      </div>
    </div>
  );
}

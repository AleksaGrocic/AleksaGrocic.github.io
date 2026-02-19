import { useEffect, useState } from "react";

interface ContactData {
  email: string;
  linkedin: string;
  instagram: any[];
  github: string;
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
        <a href={data.github} target="_blank" rel="noreferrer">
          <img src="/assets/github.png" alt="Github icon"/>
          <span className="coloredWord"> Github</span>
        </a>
        <a href={data.linkedin} target="_blank" rel="noreferrer">
          <img src="/assets/linkedin.png" alt="LinkedIn icon"/>
          <span className="coloredWord"> LinkedIn</span>
        </a>
        <a href={data.cv} target="_blank" rel="noreferrer">
          <img src="/assets/cv.png" alt="CV icon"/>
          <span className="coloredWord"> My CV</span>
        </a>
        <p>Instagram</p>
        {data.instagram.map((instagram, i) => (
          <pre key={i}>
            <a href={instagram.link} target="_blank" rel="noreferrer">
              <img src="/assets/instagram.svg" alt="Instagram icon"/>
              <span className="coloredWord"> {instagram.name}</span> <span className="grayWord">({instagram.type})</span>
            </a>
          </pre>
        ))}
      </div>
    </div>
  );
}

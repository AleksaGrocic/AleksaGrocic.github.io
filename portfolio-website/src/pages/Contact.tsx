import { useEffect, useState } from "react";

export default function Contact() {
  const [data, setData] = useState<{ page: string } | null>(null);

  useEffect(() => {
    fetch("/content/contact.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return null;

  return (
    <div className="bodyContainer">
      <p>{data.page}</p>
    </div>
  );
}

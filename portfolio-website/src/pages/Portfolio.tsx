import { useEffect, useState } from "react";

export default function Portfolio() {
  const [data, setData] = useState<{ page: string } | null>(null);

  useEffect(() => {
    fetch("/content/portfolio.json")
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

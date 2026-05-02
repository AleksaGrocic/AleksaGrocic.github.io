import { useEffect, useState, useCallback } from "react";

interface Photo {
  src: string;
  alt?: string;
}

interface PortfolioData {
  photos: Photo[];
  title?: string;
  subtitle?: string;
}

export default function Portfolio() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  useEffect(() => {
    fetch("/content/portfolio.json")
      .then((res) => res.json())
      .then((json: PortfolioData) => setData(json))
      .catch((err) => console.error("Failed to load portfolio data:", err));
  }, []);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (selectedPhoto === null || !data) return;
      setSelectedPhoto(
        (selectedPhoto + dir + data.photos.length) % data.photos.length,
      );
    },
    [selectedPhoto, data],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  if (!data) return null;

  return (
    <>
      <div className="bodyContainer">
        <div className="photoGrid">
          {data.photos.map((photo, i) => (
            <div
              key={i}
              className="photoItem"
              onClick={() => setSelectedPhoto(i)}
            >
              <img
                src={photo.src}
                alt={photo.alt ?? `Photo ${i + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedPhoto !== null && data.photos[selectedPhoto] && (
        <div
          className="lightboxBackdrop"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="lightboxNav lightboxPrev"
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
          >
            &#8249;
          </button>
          <div className="lightboxContent" onClick={(e) => e.stopPropagation()}>
            <img
              src={data.photos[selectedPhoto].src}
              alt={
                data.photos[selectedPhoto].alt ?? `Photo ${selectedPhoto + 1}`
              }
            />
            {data.photos[selectedPhoto].alt && (
              <p className="aboutCardYears">{data.photos[selectedPhoto].alt}</p>
            )}
          </div>
          <button
            className="lightboxNav lightboxNext"
            onClick={(e) => {
              e.stopPropagation();
              navigate(1);
            }}
          >
            &#8250;
          </button>
          <button className="modalClose" onClick={() => setSelectedPhoto(null)}>
            ⨯
          </button>
          <span className="lightboxCounter">
            {selectedPhoto + 1} / {data.photos.length}
          </span>
        </div>
      )}
    </>
  );
}

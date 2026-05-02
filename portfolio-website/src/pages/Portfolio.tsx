import { useEffect, useState, useCallback } from "react";

interface Photo {
  src: string;
  alt?: string;
}

interface PortfolioData {
  photos: {
    columns: Photo[][];
  };
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

  // Flat list for lightbox navigation
  const allPhotos = data ? data.photos.columns.flat() : [];

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (selectedPhoto === null) return;
      setSelectedPhoto(
        (selectedPhoto + dir + allPhotos.length) % allPhotos.length,
      );
    },
    [selectedPhoto, allPhotos],
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
          {data.photos.columns.map((column, colIndex) => (
            <div key={colIndex} className="photoColumn">
              {column.map((photo, photoIndex) => {
                const flatIndex =
                  data.photos.columns
                    .slice(0, colIndex)
                    .reduce((acc, col) => acc + col.length, 0) + photoIndex;
                return (
                  <div
                    key={photoIndex}
                    className="photoItem"
                    onClick={() => setSelectedPhoto(flatIndex)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt ?? `Photo ${flatIndex + 1}`}
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {selectedPhoto !== null && allPhotos[selectedPhoto] && (
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
              src={allPhotos[selectedPhoto].src}
              alt={allPhotos[selectedPhoto].alt ?? `Photo ${selectedPhoto + 1}`}
            />
            {allPhotos[selectedPhoto].alt && (
              <p className="aboutCardYears">{allPhotos[selectedPhoto].alt}</p>
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
            {selectedPhoto + 1} / {allPhotos.length}
          </span>
        </div>
      )}
    </>
  );
}

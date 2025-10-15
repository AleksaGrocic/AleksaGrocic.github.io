import data from "../content/home.json";

export default function Home() {
  return (
    <>
      <div className="homeContainer">
        <p className="homeAbout">{data.text}</p>
      </div>
    </>
  );
}

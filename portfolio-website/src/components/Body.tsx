import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function Body({ data }: { data: string }) {
  return (
    <div className="bodyContainer">
      <div className="bodyText">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data}</ReactMarkdown>
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";

const FilePage = () => {
  const { filename } = useParams<{ filename: string }>();

  return (
    <div>
      <h1 className="text-lg font-bold mb-2">{filename}</h1>

      <pre>
        {/* code of the file */}
        {filename}
      </pre>
    </div>
  );
};

export default FilePage;

import { useParams } from "react-router-dom";

const FilePage = () => {
  const { filename } = useParams<{ filename: string }>();

  return (
    <div className="h-full flex justify-center items-center">
      <pre className="text-white">
        {/* code of the file */}
        {filename}'s content is written here!
      </pre>
    </div>
  );
};

export default FilePage;

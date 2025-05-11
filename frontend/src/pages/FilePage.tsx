import { useParams } from "react-router-dom";

const FilePage = () => {
  const { filename } = useParams<{ filename: string }>();

  return (
    <div>
      <pre>
        {/* code of the file */}
        {filename}'s content is written here!
      </pre>
    </div>
  );
};

export default FilePage;

import { useParams } from "react-router-dom";
import { useFileStore } from "../stores/fileStore";

const FilePage = () => {
  const { slug } = useParams();
  const files = useFileStore((state) => state.files);

  const fileId = slug?.split("--").pop();
  const file = files.find((f) => f._id === fileId);

  return (
    <div className="h-full flex justify-center items-center">
      <pre className="text-white flex flex-col items-center justify-center">
        {/* code of the file */}
        <div className="w-full pb-5">{file?.name}'s code :</div>
        <div>{file?.code}</div>
      </pre>
    </div>
  );
};

export default FilePage;

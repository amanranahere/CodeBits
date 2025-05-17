import axios from "../../utils/axios.helper";
import { toast } from "react-toastify";

const useRemoveFileFromFolder = () => {
  const removeFile = async (folderId: string, fileId: string) => {
    try {
      const res = await axios.delete(
        `/folder/${folderId}/remove-file/${fileId}`
      );
      return res.data.data;
    } catch (error) {
      toast.error("Failed to remove file!");
      console.error(error);
    }
  };

  return removeFile;
};

export default useRemoveFileFromFolder;

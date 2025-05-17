import axios from "../../utils/axios.helper";
import { toast } from "react-toastify";

const useAddFilesToFolder = () => {
  const addFiles = async (folderId: string, fileIds: string[]) => {
    try {
      const res = await axios.post(`/folder/${folderId}/add-files`, {
        fileIds,
      });
      return res.data.data;
    } catch (error) {
      toast.error("Failed to add file(s) to folder!");
      console.error(error);
    }
  };

  return addFiles;
};

export default useAddFilesToFolder;

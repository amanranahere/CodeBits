import axios from "../../utils/axios.helper";
import { toast } from "react-toastify";

const useRenameFolder = () => {
  const renameFolder = async (folderId: string, newName: string) => {
    try {
      const res = await axios.patch(`/folder/${folderId}`, { name: newName });
      return res.data.data;
    } catch (error) {
      toast.error("Failed to rename folder!");
      console.error(error);
    }
  };

  return renameFolder;
};

export default useRenameFolder;

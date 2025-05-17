import axios from "../../utils/axios.helper";
import { toast } from "react-toastify";

const useDeletefolder = () => {
  const deleteFolder = async (folderId: string) => {
    try {
      const res = await axios.delete(`/folder/${folderId}`);
      return res.data.data;
    } catch (error) {
      toast.error("Failed to delete folder!");
      console.error(error);
    }
  };

  return deleteFolder;
};

export default useDeletefolder;

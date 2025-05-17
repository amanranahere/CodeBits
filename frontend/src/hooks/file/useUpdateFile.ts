import axios from "../../utils/axios.helper";
import { toast } from "react-toastify";

interface FileUpdateData {
  name?: string;
  extension?: string;
  description?: string;
  code?: string;
}

const useUpdateFile = () => {
  const updateFile = async (fileId: string, updates: FileUpdateData) => {
    try {
      const res = await axios.patch(`/file/${fileId}`, updates);
      return res.data.data;
    } catch (error) {
      toast.error("Failed to update file!");
      console.error(error);
    }
  };

  return updateFile;
};

export default useUpdateFile;

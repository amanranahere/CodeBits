import axiosInstance from "../../utils/axios.helper";
import { toast } from "react-toastify";

interface FileInput {
  name: string;
  extension: string;
  description?: string;
  code?: string;
}

const useCreateFile = () => {
  const createFile = async (fileData: FileInput) => {
    try {
      const res = await axiosInstance.post("/file", fileData);
      return res.data.data;
    } catch (error) {
      toast.error("Failed to create file!");
      console.error(error);
    }
  };

  return createFile;
};

export default useCreateFile;

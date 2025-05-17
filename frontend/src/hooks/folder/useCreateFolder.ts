import axiosInstance from "../../utils/axios.helper";
import { toast } from "react-toastify";

const useCreateFolder = () => {
  const createFolder = async (name: string) => {
    try {
      const res = await axiosInstance.post("/folder", { name });
      return res.data.data;
    } catch (error) {
      toast.error("Failed to create folder!");
      console.error(error);
    }
  };

  return createFolder;
};

export default useCreateFolder;

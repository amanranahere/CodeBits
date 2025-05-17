import axiosInstance from "../../utils/axios.helper";
import { toast } from "react-toastify";

const useDeleteFile = () => {
  const deleteFile = async (fileId: string) => {
    try {
      const res = await axiosInstance.delete(`/file/${fileId}`);
      return res.data.data;
    } catch (error) {
      toast.error("Failed to delete file!");
      console.error(error);
    }
  };

  return deleteFile;
};

export default useDeleteFile;

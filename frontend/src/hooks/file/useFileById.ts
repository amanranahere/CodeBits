import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios.helper";
import { toast } from "react-toastify";

interface File {
  _id: string;
  name: string;
  extension: string;
  description?: string;
  code?: string;
  updatedAt: string;
}

const useFileById = (fileId: string) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFile = async () => {
    try {
      const res = await axiosInstance.get(`/file/${fileId}`);
      setFile(res.data.data);
    } catch (error) {
      toast.error("Failed to load file!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fileId) fetchFile();
  }, [fileId]);

  return { file, loading, refresh: fetchFile };
};

export default useFileById;

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

const useUserFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);

    try {
      const res = await axiosInstance.get("/file");
      setFiles(res.data.data.files || res.data.data);
    } catch (error) {
      toast.error("Failed to load files!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return { files, loading, refresh: fetchFiles };
};

export default useUserFiles;

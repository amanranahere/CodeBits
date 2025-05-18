import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios.helper";
import { toast } from "react-toastify";

interface Folder {
  _id: string;
  name: string;
  files: any[];
  updatedAt: string;
}

const useUserFolders = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFolders = async () => {
    setLoading(true);

    try {
      const res = await axiosInstance.get("/folder");
      setFolders(res.data.data);
    } catch (error) {
      toast.error("Failed to load folders!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return { folders, loading, refresh: fetchFolders };
};

export default useUserFolders;

import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios.helper";
import { toast } from "react-toastify";

interface Folder {
  _id: string;
  name: string;
  files: any[];
  updatedAt: string;
}

const useFolderById = (folderId: string) => {
  const [folder, setFolder] = useState<Folder | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchFolder = async () => {
    setLoading(true);

    try {
      const res = await axiosInstance.get(`/folder/${folderId}`);
      setFolder(res.data.data);
    } catch (error) {
      toast.error("Failed to load folder!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (folderId) fetchFolder();
  }, [folderId]);

  return { folder, loading, refresh: fetchFolder };
};

export default useFolderById;

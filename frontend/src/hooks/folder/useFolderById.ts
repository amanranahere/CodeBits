import { useState, useEffect } from "react";
import axios from "../../utils/axios.helper";
import { toast } from "react-toastify";

interface Folder {
  _id: string;
  name: string;
  files: any[];
  updatedAt: string;
}

const useFolderById = (folderId: string) => {
  const [folder, setFolder] = useState<Folder | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFolder = async () => {
    try {
      const res = await axios.get(`/folder/${folderId}`);
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

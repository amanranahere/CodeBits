import { useState } from "react";
import axiosInstance from "../../utils/axios.helper";
import { toast } from "react-toastify";
import type { UserFile } from "../../stores/fileStore";

const useSearchFiles = () => {
  const [results, setResults] = useState<UserFile[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchFiles = async (query: string) => {
    setLoading(true);

    try {
      const res = await axiosInstance.get(
        `/file?search=${encodeURIComponent(query)}`
      );
      setResults(res.data.data.files);
      setCount(res.data.data.count);
    } catch (error) {
      toast.error("Search failed!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { results, count, loading, searchFiles };
};

export default useSearchFiles;

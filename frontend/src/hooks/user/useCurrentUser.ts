import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios.helper";
import { toast } from "react-toastify";

interface User {
  _id: string;
  name: string;
  email: string;
}

const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);

    try {
      const res = await axiosInstance.get("/user/current-user");
      setUser(res.data.data);
    } catch (error) {
      toast.error("Failed to load user!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, refresh: fetchUser };
};

export default useCurrentUser;

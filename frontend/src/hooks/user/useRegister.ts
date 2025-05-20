import { useState } from "react";
import axiosInstance from "../../utils/axios.helper";
import { toast } from "react-toastify";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const registerUser = async (data: RegisterInput) => {
    setLoading(true);

    try {
      const res = await axiosInstance.post("/user/register", data);
      return res.data.data;
    } catch (error) {
      toast.error("Registration failed!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading };
};

export default useRegister;

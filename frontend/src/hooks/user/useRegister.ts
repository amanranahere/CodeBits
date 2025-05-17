import axiosInstance from "../../utils/axios.helper";
import { toast } from "react-toastify";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

const useRegister = () => {
  const register = async (data: RegisterInput) => {
    try {
      const res = await axiosInstance.post("/user/register", data);
      return res.data.data;
    } catch (error) {
      toast.error("Registration failed!");
      console.error(error);
    }
  };

  return register;
};

export default useRegister;

import axiosInstance from "../../utils/axios.helper";
import { toast } from "react-toastify";

interface LoginInput {
  email: string;
  password: string;
}

const useLogin = () => {
  const login = async (credentials: LoginInput) => {
    try {
      const res = await axiosInstance.post("/user/login", credentials);
      return res.data.data;
    } catch (error) {
      toast.error("Login failed!");
      console.error(error);
    }
  };

  return login;
};

export default useLogin;

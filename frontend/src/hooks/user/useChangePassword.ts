import axiosInstance from "../../utils/axios.helper";
import { toast } from "react-toastify";

interface PasswordInput {
  oldPassword: string;
  newPassword: string;
}

const useChangePassword = () => {
  const changePassword = async (data: PasswordInput) => {
    try {
      const res = await axiosInstance.post("/user/change-password", data);

      return res.data.data;
    } catch (error) {
      toast.error("Failed to change password!");
      console.error(error);
    }
  };

  return changePassword;
};

export default useChangePassword;

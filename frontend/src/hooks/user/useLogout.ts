import axiosInstance from "../../utils/axios.helper";
import { toast } from "react-toastify";

const useLogout = () => {
  const logout = async () => {
    try {
      await axiosInstance.post("/user/logout", {});
    } catch (err) {
      toast.error("Logout failed.");
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;

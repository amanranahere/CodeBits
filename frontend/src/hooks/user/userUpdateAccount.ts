import axiosInstance from "../../utils/axios.helper";
import { toast } from "react-toastify";

interface UpdateInput {
  name?: string;
  email?: string;
}

const useUpdateAccount = () => {
  const updateAccount = async (data: UpdateInput) => {
    try {
      const res = await axiosInstance.patch("/user/update-account", data);
      return res.data.data;
    } catch (error) {
      toast.error("Failed to update account!");
      console.error(error);
    }
  };

  return updateAccount;
};

export default useUpdateAccount;

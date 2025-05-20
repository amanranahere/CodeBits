import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../utils/axios.helper";
import { toast } from "react-toastify";

export interface User {
  _id: string;
  name: string;
  email: string;
}

interface UserStore {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      loading: false,

      //   login method
      login: async (email, password) => {
        set({ loading: true });

        try {
          const res = await axiosInstance.post("/user/login", {
            email,
            password,
          });
          set({ user: res.data.data.user });
          toast.success("Logged in");
        } catch (err) {
          console.log("Login error: ", err);
        } finally {
          set({ loading: false });
        }
      },

      //   logout method
      logout: async () => {
        try {
          await axiosInstance.post("/user/logout");
          set({ user: null });
          toast("Logged out");
        } catch (err) {
          console.error("Logout error: ", err);
          toast.error("Logout failed");
        }
      },

      //   refresh user session
      refresh: async () => {
        set({ loading: true });

        try {
          const res = await axiosInstance.post("/user/logout");
          set({ user: res.data.data.user });
        } catch (err) {
          // console.error("Refresh error: ", err);
          // toast.error("Failed to load user");
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-store",
      partialize: (state) => ({ user: state.user }),
      merge: (persistedState, currentState) => {
        const { user = null } = (persistedState as any) ?? {};
        return { ...currentState, user };
      },
    }
  )
);

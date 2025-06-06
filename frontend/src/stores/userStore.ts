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
  theme: "light" | "dark";
  toggleTheme: () => void;
  updateAccountInfo: (updatedData: Partial<User>) => Promise<void>;
  changePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      theme: "dark",

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

      //   theme toggle
      toggleTheme: () => {
        const newTheme = get().theme === "dark" ? "light" : "dark";
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        set({ theme: newTheme });
      },

      //   update account info
      updateAccountInfo: async (updatedData) => {
        set({ loading: true });

        try {
          const res = await axiosInstance.patch(
            "/user/update-account",
            updatedData
          );
          set({ user: res.data.user });
          toast.success("Account info updated");
        } catch (err) {
          console.log("Update failed", err);
          toast.error("Failed to update info");
        } finally {
          set({ loading: false });
        }
      },

      //   change password
      changePassword: async ({ currentPassword, newPassword }) => {
        set({ loading: true });

        try {
          await axiosInstance.post("/user/change-password", {
            currentPassword,
            newPassword,
          });
        } catch (err) {
          console.log("Update failed", err);
          toast.error("Failed to change password");
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-store",
      partialize: (state) => ({ user: state.user, theme: state.theme }),
      merge: (persistedState, currentState) => {
        const { user = null, theme = "dark" } = (persistedState as any) ?? {};
        return { ...currentState, user, theme };
      },
    }
  )
);

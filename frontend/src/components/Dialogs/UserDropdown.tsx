import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function UserDropdown({ onClose }: { onClose: () => void }) {
  const user = useUserStore((state) => state.user);
  const theme = useUserStore((state) => state.theme);
  const toggleTheme = useUserStore((state) => state.toggleTheme);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const isSettingsPage = location.pathname === "/settings";

  const toggleSettingsPage = () => {
    if (isSettingsPage) {
      navigate(-1);
    } else {
      navigate("/settings");
    }
  };

  return (
    <div className="w-64 bg-white dark:bg-[#303030] text-black dark:text-white shadow-xl rounded-xl p-2 space-y-2 z-[999]">
      <div className="text-sm font-semibold truncate">
        {user?.email || "guest@example.com"}
      </div>

      <hr className="border-gray-200 dark:border-[#6a6a6a]" />

      <button
        onClick={toggleSettingsPage}
        className="w-full px-3 py-2 rounded-xl hover:bg-[#4a4a4a]  transition-colors flex items-center gap-x-2"
      >
        <IoSettingsOutline className="w-5 h-5" />
        <p>Settings</p>
      </button>

      <button
        onClick={toggleTheme}
        className="w-full px-3 py-2 rounded-xl hover:bg-[#4a4a4a] transition-colors"
      >
        {theme === "dark" ? (
          <div className="flex items-center gap-x-2">
            <MdLightMode className="w-5 h-5" />
            <span>Switch to Light Mode</span>
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <MdDarkMode className="w-5 h-5" />
            <span>Switch to Dark Mode</span>
          </div>
        )}
      </button>

      <hr className="border-gray-200 dark:border-[#6a6a6a]" />

      <button
        onClick={() => {
          logout();
          onClose();
        }}
        className="w-full px-3 py-2 rounded-xl hover:bg-[#4a4a4a]  transition-colors flex items-center gap-x-2"
      >
        <LuLogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}

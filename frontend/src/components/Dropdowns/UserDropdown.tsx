import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { useUIStore } from "../../stores/uiStore";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { MdLightMode, MdDarkMode, MdOutlineFeedback } from "react-icons/md";
import { RiInformation2Line } from "react-icons/ri";
import { BsKeyboard } from "react-icons/bs";
import { useClickOutside } from "../../utils/useClickOutside";

export default function UserDropdown() {
  const user = useUserStore((state) => state.user);
  const theme = useUserStore((state) => state.theme);
  const toggleTheme = useUserStore((state) => state.toggleTheme);
  const logout = useUserStore((state) => state.logout);
  const {
    toggleKeyboardShortcutsModal,
    toggleAboutModal,
    toggleFeedbackModal,
    toggleUserDropdown,
  } = useUIStore();

  const navigate = useNavigate();
  const location = useLocation();

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, toggleUserDropdown);

  const isSettingsPage = location.pathname === "/settings";

  const toggleSettingsPage = () => {
    if (isSettingsPage) {
      navigate(-1);
    } else {
      navigate("/settings");
    }
  };

  return (
    <div
      ref={ref}
      className="fixed bottom-[70px] left-12 w-72 max-h-max bg-white dark:bg-[#303030] text-black dark:text-white shadow-xl rounded-2xl p-2 z-[900]"
    >
      {user && (
        <>
          <div className="px-3 py-2 text-sm font-semibold truncate">
            {user?.email}
          </div>

          <hr className="my-1 mx-3 border-[#e5e7eb] dark:border-[#4a4a4a]" />
        </>
      )}

      {/* settings */}
      {user && (
        <button
          onClick={() => {
            toggleUserDropdown();
            toggleSettingsPage();
          }}
          className="w-full px-3 py-2 rounded-xl hover:bg-[#4a4a4a]  transition-colors flex items-center gap-x-2"
        >
          <IoSettingsOutline className="w-5 h-5" />
          <p>Settings</p>
        </button>
      )}

      {/* theme toggle */}
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

      {/* keyboard shortcuts */}
      <button
        onClick={() => {
          toggleUserDropdown();
          toggleKeyboardShortcutsModal();
        }}
        className="w-full px-3 py-2 rounded-xl hover:bg-[#4a4a4a]  transition-colors flex items-center gap-x-2"
      >
        <BsKeyboard className="w-5 h-5" />
        <p>Keyboard Shortcuts</p>
      </button>

      {/* about */}
      <button
        onClick={() => {
          toggleUserDropdown();
          toggleAboutModal();
        }}
        className="w-full px-3 py-2 rounded-xl hover:bg-[#4a4a4a]  transition-colors flex items-center gap-x-2"
      >
        <RiInformation2Line className="w-5 h-5" />
        <p>About</p>
      </button>

      {/* send feedback */}
      <button
        onClick={() => {
          toggleUserDropdown();
          toggleFeedbackModal();
        }}
        className="w-full px-3 py-2 rounded-xl hover:bg-[#4a4a4a]  transition-colors flex items-center gap-x-2"
      >
        <MdOutlineFeedback className="w-5 h-5" />
        <p>Send Feedback</p>
      </button>

      {/* logout */}
      {user && (
        <>
          <hr className="my-1 mx-3 border-[#e5e7eb] dark:border-[#4a4a4a]" />

          <button
            onClick={() => {
              logout();
              toggleUserDropdown();
              navigate("/");
            }}
            className="w-full px-3 py-2 rounded-xl hover:bg-[#4a4a4a]  transition-colors flex items-center gap-x-2"
          >
            <LuLogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </>
      )}
    </div>
  );
}

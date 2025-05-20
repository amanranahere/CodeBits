import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../stores/userStore.ts";
import ThemeToggle from "../ThemeToggle.tsx";
import { TbLayoutSidebar, TbLayoutSidebarFilled } from "react-icons/tb";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";

interface IconBoxProps {
  sidebarOpen: boolean;
  infoPanelOpen: boolean;
  toggleSidebar: () => void;
  toggleInfoPanel: () => void;
}

function IconBox({
  sidebarOpen,
  infoPanelOpen,
  toggleSidebar,
  toggleInfoPanel,
}: IconBoxProps) {
  const user = useUserStore((state) => state.user);
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
    <div className="h-14 px-5 flex items-center space-x-2 dark:bg-[#1f1f1f] dark:text-[#f1f1f1] rounded-[1.2rem]">
      <button
        title="Create new file"
        className="cursor-pointer hover:scale-110 text-[#5c5c5c] dark:text-[#bababa] hover:brightness-150 dark:hover:brightness-125 duration-200"
      >
        <VscNewFile className="w-6 h-6" />
      </button>

      <button
        title="Create new folder"
        className="cursor-pointer hover:scale-110 text-[#5c5c5c] dark:text-[#bababa] hover:brightness-150 dark:hover:brightness-125 duration-200"
      >
        <VscNewFolder className="w-6 h-6" />
      </button>

      <ThemeToggle />

      <button
        title="Settings"
        onClick={toggleSettingsPage}
        className="cursor-pointer hover:scale-110 text-[#5c5c5c] dark:text-[#bababa] hover:brightness-150 dark:hover:brightness-125 duration-200"
      >
        {isSettingsPage ? (
          <IoSettings className="w-6 h-6" />
        ) : (
          <IoSettingsOutline className="w-6 h-6" />
        )}
      </button>

      {/*   sidebar and info-panel buttons   */}
      {user && (
        <>
          <button
            title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            onClick={toggleSidebar}
            className="cursor-pointer hover:scale-110 text-[#5c5c5c] dark:text-[#bababa] hover:brightness-150 dark:hover:brightness-125 duration-200"
          >
            {sidebarOpen ? (
              <TbLayoutSidebarFilled className="w-6 h-6" />
            ) : (
              <TbLayoutSidebar className="w-6 h-6" />
            )}
          </button>

          <button
            title={infoPanelOpen ? "Close Info Panel" : "Open Info Panel"}
            onClick={toggleInfoPanel}
            className="cursor-pointer hover:scale-110 text-[#5c5c5c] dark:text-[#bababa] hover:brightness-150 dark:hover:brightness-125 duration-200"
          >
            {infoPanelOpen ? (
              <TbLayoutSidebarFilled className="w-6 h-6" />
            ) : (
              <TbLayoutSidebar className="w-6 h-6" />
            )}
          </button>
        </>
      )}
    </div>
  );
}

export default IconBox;

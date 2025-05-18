import { useLayout } from "../Layout/LayoutContext";
import ThemeToggle from "../ThemeToggle.tsx";
import { TbLayoutSidebarFilled } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { VscNewFile } from "react-icons/vsc";

function NavbarIcons() {
  const { toggleSidebar, toggleInfoPanel } = useLayout();

  return (
    <div className="flex items-center space-x-2">
      <button
        title="Add new snippet"
        className="cursor-pointer text-lg text-[#5c5c5c] dark:text-[#bababa] hover:brightness-150 dark:hover:brightness-125 duration-300"
      >
        <VscNewFile />
      </button>

      <ThemeToggle />

      <button
        title="Settings"
        // onClick={openSettingsTab}
        className="cursor-pointer text-lg text-[#5c5c5c] dark:text-[#bababa]
            hover:brightness-150 dark:hover:brightness-125 duration-300"
      >
        {/* {settingsOpen ? <IoSettings /> : <IoSettingsOutline />} */}
        <IoSettings />
      </button>

      <button
        title="Toggle Sidebar"
        onClick={toggleSidebar}
        className="cursor-pointer text-xl text-[#5c5c5c] dark:text-[#bababa]
            hover:brightness-150 dark:hover:brightness-125 duration-300"
      >
        <TbLayoutSidebarFilled />
      </button>

      <button
        title="Toggle InfoPanel"
        onClick={toggleInfoPanel}
        className="cursor-pointer text-xl text-[#5c5c5c] dark:text-[#bababa]
            hover:brightness-150 dark:hover:brightness-125 duration-300"
      >
        <TbLayoutSidebarFilled />
      </button>
    </div>
  );
}

export default NavbarIcons;

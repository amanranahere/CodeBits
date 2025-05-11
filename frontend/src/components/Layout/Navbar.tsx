import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeToggle.tsx";
import { TbLayoutSidebar, TbLayoutSidebarFilled, TbPlus } from "react-icons/tb";
import { IoSettings, IoSettingsOutline, IoClose } from "react-icons/io5";

type NavbarProps = {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
  tabs: string[];
  setTabs: React.Dispatch<React.SetStateAction<string[]>>;
};

const Navbar = ({ toggleSidebar, sidebarOpen, tabs, setTabs }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const settingsOpen = tabs.includes("Settings");
  const currentPath = location.pathname;

  const activeTab =
    location.pathname === "/settings"
      ? "Settings"
      : location.pathname.startsWith("/file/")
      ? location.pathname.replace("/file/", "")
      : null;

  const openSettingsTab = () => {
    if (!tabs.includes("Settings")) {
      setTabs((prev) => [...prev, "Settings"]);
    }

    navigate("/settings");
  };

  const closeTab = (tab: string) => {
    setTabs((prev) => prev.filter((t) => t !== tab));

    if (
      (tab === "Settings" && currentPath === "/settings") ||
      currentPath === `/file/${tab}`
    ) {
      const remaining = tabs.filter((t) => t !== tab);
      if (remaining.length > 0) {
        const next = remaining[remaining.length - 1];
        navigate(next === "Settings" ? "/settings" : `/file/${next}`);
      } else {
        navigate("/");
      }
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-[#eef2f9] dark:bg-[#3c3c3c] text-white dark:text-black border-b border-[#d6e2fb] dark:border-[#5e5e5e]">
        <div className="flex items-center space-x-4">
          <span className="px-2 py-1 font-bold text-[#5c5c5c] dark:text-[#bababa]">
            CODE-BITS
          </span>

          {/* tabs  */}
          <div className="flex space-x-2 dark:text-white cursor-pointer">
            {tabs.map((tab) => {
              const isActive = tab === activeTab;

              return (
                <div
                  key={tab}
                  onClick={() =>
                    navigate(tab === "Settings" ? "/settings" : `/file/${tab}`)
                  }
                  className={`w-28 pl-2 pr-1 py-1 flex items-center justify-between gap-2 group border-b hover:bg-[#4a4a4a] duration-300 ${
                    isActive ? "border-[#d6e2fb]" : "border-transparent"
                  }`}
                >
                  <span className="text-sm">{tab}</span>

                  <IoClose
                    className="w-4 h-4 invisible group-hover:visible rounded-full hover:backdrop-brightness-150"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* buttons */}
        <div className="flex items-center space-x-2 px-2">
          <button
            title="Add new snippet"
            className="cursor-pointer text-xl text-[#5c5c5c] dark:text-[#bababa] hover:brightness-150 dark:hover:brightness-125 duration-300"
          >
            <TbPlus />
          </button>

          <ThemeToggle />

          <button
            title="Settings"
            onClick={openSettingsTab}
            className="cursor-pointer text-lg text-[#5c5c5c] dark:text-[#bababa]
            hover:brightness-150 dark:hover:brightness-125 duration-300"
          >
            {settingsOpen ? <IoSettings /> : <IoSettingsOutline />}
          </button>

          <button
            title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            onClick={toggleSidebar}
            className="cursor-pointer text-xl text-[#5c5c5c] dark:text-[#bababa]
            hover:brightness-150 dark:hover:brightness-125 duration-300"
          >
            {sidebarOpen ? (
              <TbLayoutSidebarFilled className=" " />
            ) : (
              <TbLayoutSidebar className=" " />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

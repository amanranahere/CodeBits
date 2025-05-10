import ThemeToggle from "../ThemeToggle.tsx";
import { TbLayoutSidebar, TbLayoutSidebarFilled } from "react-icons/tb";

type NavbarProps = {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
};

const Navbar = ({ toggleSidebar, sidebarOpen }: NavbarProps) => {
  return (
    <>
      <nav className="flex items-center justify-between bg-[#eef2f9] dark:bg-[#3c3c3c] text-white dark:text-black border-b border-[#d6e2fb] dark:border-[#5e5e5e]">
        <div className="flex items-center space-x-4">
          <span className="font-bold">CODE-BITS</span>
          {/* TABS placeholder */}
        </div>

        <div className="flex items-center space-x-2 px-2">
          <button className=" bg-[#6a6a6a] text-[#f1f1f1] rounded-xs">
            + CODE
          </button>

          <ThemeToggle />

          <button onClick={toggleSidebar} className="cursor-pointer">
            {sidebarOpen ? (
              <TbLayoutSidebarFilled className="text-[#bababa] text-xl" />
            ) : (
              <TbLayoutSidebar className="text-[#bababa] text-xl" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

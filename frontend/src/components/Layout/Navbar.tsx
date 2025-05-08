import ThemeToggle from "../ThemeToggle.tsx";
import { FiSidebar } from "react-icons/fi";

function Navbar() {
  return (
    <div className="w-full text-white bg-[#282828] border-b border-[#5e5e5e] flex justify-between">
      <div>CODE-BITS</div>

      {/* icons */}
      <div className="flex gap-x-1">
        <ThemeToggle />

        <button className="cursor-pointer">
          <FiSidebar className="text-[#bababa]" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;

import { useRef, useState } from "react";
import { useUserStore } from "../../stores/userStore";
import { useUIStore } from "../../stores/uiStore";
import UserDropdown from "../Dropdowns/UserDropdown";
import { useClickOutside } from "../../utils/useClickOutside";
import { HiOutlineDocumentText, HiDocumentText } from "react-icons/hi";

interface NavbarProps {
  isFilePage: boolean;
}

export default function Navbar({ isFilePage }: NavbarProps) {
  const user = useUserStore((state) => state.user);
  const { filePanelOpen, toggleFilePanel } = useUIStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useClickOutside(boxRef, () => setDropdownOpen(false));

  return (
    <div
      ref={boxRef}
      className="relative p-3 flex items-center gap-x-2 z-[950]"
    >
      {/* file panel toggle button */}
      {isFilePage && (
        <button
          title={filePanelOpen ? "Close File Panel" : "Open File Panel"}
          onClick={toggleFilePanel}
          className="p-2 text-[#bababa] hover:bg-[#3a3a3a] rounded-xl"
        >
          {filePanelOpen ? (
            <HiDocumentText className="w-6 h-6" />
          ) : (
            <HiOutlineDocumentText className="w-6 h-6" />
          )}
        </button>
      )}

      {/* profile icon */}
      <div
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="w-12 h-12 p-[6px] rounded-full hover:bg-[#3a3a3a] cursor-pointer"
      >
        <div className="w-full h-full rounded-full flex justify-center items-center font-mono text-lg text-black dark:text-white bg-[#D4D4D4] dark:bg-[#4a4a4a] select-none">
          {user ? user.name[0]?.toUpperCase() : <span>?</span>}
        </div>
      </div>

      {/* drop down */}
      {dropdownOpen && (
        <div className="fixed right-2 top-14 mt-3">
          <UserDropdown onClose={() => setDropdownOpen(false)} />
        </div>
      )}
    </div>
  );
}

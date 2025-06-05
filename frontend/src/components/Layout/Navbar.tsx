import { useRef, useState } from "react";
import { useUserStore } from "../../stores/userStore";
import UserDropdown from "../Dialogs/UserDropdown";
import { useClickOutside } from "../../utils/useClickOutside";
import { HiOutlineDocumentText, HiDocumentText } from "react-icons/hi";

interface NavbarProps {
  isFilePage: boolean;
  filePanelOpen: boolean;
  toggleFilePanel: () => void;
}

export default function Navbar({
  isFilePage,
  filePanelOpen,
  toggleFilePanel,
}: NavbarProps) {
  const user = useUserStore((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useClickOutside(boxRef, () => setDropdownOpen(false));

  return (
    <div
      ref={boxRef}
      className="fixed top-0 right-0 z-[99] p-3 flex items-center gap-x-2"
    >
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

      <div
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="w-10 h-10 p-1 rounded-full hover:bg-[#3a3a3a] cursor-pointer"
      >
        <div className="w-full h-full rounded-full bg-[#00bfff]"></div>
      </div>

      {dropdownOpen && user && (
        <div className="absolute right-0 top-full mt-3 z-[999]">
          <UserDropdown onClose={() => setDropdownOpen(false)} />
        </div>
      )}
    </div>
  );
}

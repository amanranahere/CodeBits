import { useRef, useState } from "react";
import { useUserStore } from "../../stores/userStore";
import UserDropdown from "../Dropdowns/UserDropdown";
import { useClickOutside } from "../../utils/useClickOutside";

export default function ProfileIcon() {
  const user = useUserStore((state) => state.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useClickOutside(boxRef, () => setDropdownOpen(false));

  return (
    <div ref={boxRef} className="relative flex items-center gap-x-2 z-[950]">
      <div
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="w-12 h-12 p-[6px] rounded-full hover:bg-[#3a3a3a] cursor-pointer"
      >
        <div className="w-full h-full rounded-full flex justify-center items-center font-mono text-lg text-black dark:text-white bg-[#D4D4D4] dark:bg-[#4a4a4a] select-none">
          {user ? user.name[0]?.toUpperCase() : <span>?</span>}
        </div>
      </div>

      <div>{user ? user.name : "Guest User"}</div>

      {/* drop down */}
      {dropdownOpen && (
        <div className="fixed left-8 bottom-12 mt-3">
          <UserDropdown onClose={() => setDropdownOpen(false)} />
        </div>
      )}
    </div>
  );
}

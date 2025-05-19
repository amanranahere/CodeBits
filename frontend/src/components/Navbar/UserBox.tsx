import { useRef, useState } from "react";
import { useUserStore } from "../../stores/userStore";
import UserDropdown from "../Dialogs/UserDropdown";
import { useClickOutside } from "../../utils/useClickOutside";

export default function LogoBox() {
  const user = useUserStore((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useClickOutside(boxRef, () => setDropdownOpen(false));

  return (
    <div
      ref={boxRef}
      onClick={() => setDropdownOpen((prev) => !prev)}
      className="h-14 lg:max-w-60 px-6 flex items-center dark:bg-[#1f1f1f]  duration-300 dark:text-[#f1f1f1] gap-x-2 rounded-2xl select-none"
    >
      <div className="relative px-6 flex items-center gap-x-2">
        {user ? (
          <div className="cursor-pointer">
            <span>{user?.name}</span>

            {/* add profile img here */}
          </div>
        ) : (
          <div className="cursor-pointer">
            <span>GUEST USER</span>

            {/* add profile img here */}
          </div>
        )}

        {dropdownOpen && user && (
          <div className="absolute right-0 top-full mt-3 z-50">
            <UserDropdown onClose={() => setDropdownOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

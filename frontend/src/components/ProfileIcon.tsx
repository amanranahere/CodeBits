import { useUserStore } from "../stores/userStore";
import { useUIStore } from "../stores/uiStore";

export default function ProfileIcon() {
  const user = useUserStore((state) => state.user);
  const { toggleUserDropdown } = useUIStore();

  return (
    <div
      onClick={toggleUserDropdown}
      className="relative w-full flex items-center gap-x-2 z-[950]"
    >
      <div className="w-12 h-12 p-[6px] rounded-full">
        <div className="w-full h-full rounded-full flex justify-center items-center font-mono text-lg text-black dark:text-white bg-[#D4D4D4] dark:bg-[#4a4a4a] select-none">
          {user ? user.name[0]?.toUpperCase() : <span>?</span>}
        </div>
      </div>

      <div className="w-[80%] select-none line-clamp-1">
        {user ? user.name : "Guest User"}
      </div>
    </div>
  );
}

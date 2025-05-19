import { useUserStore } from "../../stores/userStore";
import { LuLogOut } from "react-icons/lu";

export default function UserDropdown({ onClose }: { onClose: () => void }) {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  return (
    <div className="w-64 bg-white dark:bg-[#1f1f1f] text-black dark:text-white shadow-xl rounded-xl p-3 space-y-2">
      <div className="px-3 py-2">
        <p className="text-sm font-semibold truncate">
          {user?.email || "guest@example.com"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Signed in</p>
      </div>

      <hr className="border-gray-200 dark:border-[#333]" />

      <div className="space-y-1">
        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

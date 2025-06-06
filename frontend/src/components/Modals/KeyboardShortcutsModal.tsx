import { useUIStore } from "../../stores/uiStore";
import { IoClose } from "react-icons/io5";

const shortcuts = [
  { combo: "Ctrl + K", action: "Open search modal" },
  { combo: "Ctrl + P", action: "Toggle file panel" },
  { combo: "Ctrl + B", action: "Toggle sidebar" },
  { combo: "Ctrl + N", action: "New file" },
  { combo: "Esc", action: "Close current modal" },
  { combo: "Ctrl + /", action: "Open shortcut modal" },
];

export default function KeyboardShortcutsModal() {
  const { toggleKeyboardShortcutsModal } = useUIStore();

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[60%] max-w-[600px] h-[70%] z-[999] rounded-[20px] shadow-lg dark:bg-[#303030] dark:text-white flex flex-col">
      <div
        onClick={toggleKeyboardShortcutsModal}
        className="absolute top-5 lg:top-6 right-5 lg:right-6 p-1 hover:bg-[#4a4a4a] text-[#9a9a9a] hover:text-[#f1f1f1] rounded-full cursor-pointer z-10 duration-100"
      >
        <IoClose className="w-6 h-6" />
      </div>

      <div className="w-full pl-7 py-6 text-lg lg:text-xl font-semibold">
        Keyboard Shortcuts
      </div>

      <hr className="my-1 mx-3 border-[#e5e7eb] dark:border-[#4a4a4a]" />

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2 custom_scrollbar">
        {shortcuts.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center px-4 py-2 rounded-lg"
          >
            <span className="text-[#e0e0e0]">{item.action}</span>

            <kbd className="text-[#f1f1f1]">{item.combo}</kbd>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { useUIStore } from "../stores/uiStore";

export default function KeyboardShortcutListener() {
  const {
    toggleSearchModal,
    toggleSidebar,
    toggleFilePanel,
    toggleKeyboardShortcutsModal,
    toggleNewFileModal,
  } = useUIStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      if (ctrl && key === "k") {
        e.preventDefault();
        toggleSearchModal();
      } else if (ctrl && key === "p") {
        e.preventDefault();
        toggleFilePanel();
      } else if (ctrl && key === "b") {
        e.preventDefault();
        toggleSidebar();
      } else if (ctrl && key === "/") {
        e.preventDefault();
        toggleNewFileModal();
      } else if (ctrl && key === ";") {
        e.preventDefault();
        toggleKeyboardShortcutsModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    toggleSearchModal,
    toggleFilePanel,
    toggleSidebar,
    toggleKeyboardShortcutsModal,
    toggleNewFileModal,
  ]);

  return null;
}

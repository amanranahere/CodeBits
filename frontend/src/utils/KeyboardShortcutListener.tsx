import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFileStore } from "../stores/fileStore";
import { useUIStore } from "../stores/uiStore";

export default function KeyboardShortcutListener() {
  const location = useLocation();

  const files = useFileStore((state) => state.files);

  const {
    toggleSearchModal,
    toggleSidebar,
    toggleKeyboardShortcutsModal,
    toggleNewFileModal,
    fileInfoModalOpen,
    openFileInfoModal,
    closeFileInfoModal,
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

        if (fileInfoModalOpen) {
          closeFileInfoModal();
        } else {
          const slug = location.pathname.split("/file/")[1];
          const fileId = slug?.split("--").pop();
          const file = files.find((f) => f._id === fileId);
          if (file) {
            openFileInfoModal(file);
          }
        }
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
    openFileInfoModal,
    closeFileInfoModal,
    toggleSidebar,
    toggleKeyboardShortcutsModal,
    toggleNewFileModal,
    location.pathname,
    files,
    fileInfoModalOpen,
  ]);

  return null;
}

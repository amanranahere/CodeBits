import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { useUserStore } from "./stores/userStore";
import { useUIStore } from "./stores/uiStore";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "./components/Sidebar";
import AuthPanel from "./components/Auth/AuthPanel";
import ModalOverlay from "./components/Modals/ModalOverlay";
import NewFileModal from "./components/Modals/NewFileModal";
import SearchModal from "./components/Modals/SearchModal";
import KeyboardShortcutsModal from "./components/Modals/KeyboardShortcutsModal";
import AboutModal from "./components/Modals/AboutModal";
import FeedbackModal from "./components/Modals/FeedbackModal";
import FileInfoModal from "./components/Modals/FileInfoModal";
import KeyboardShortcutListener from "./utils/KeyboardShortcutListener";
import { TbLayoutSidebarFilled } from "react-icons/tb";
import UserDropdown from "./components/Dropdowns/UserDropdown";

function App() {
  const user = useUserStore((state) => state.user);
  const theme = useUserStore((state) => state.theme);
  const refresh = useUserStore((state) => state.refresh);
  const {
    sidebarOpen,
    loginOpen,
    signupOpen,
    fileInfoModalOpen,
    selectedFileForInfo,
    closeFileInfoModal,
    newFileModalOpen,
    searchModalOpen,
    keyboardShortcutsModalOpen,
    aboutModalOpen,
    feedbackModalOpen,
    userDropdownOpen,
    toggleSidebar,
    toggleNewFileModal,
    toggleKeyboardShortcutsModal,
    toggleAboutModal,
    toggleFeedbackModal,
    toggleSearchModal,
  } = useUIStore();

  //   theme ? dark/light
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  //   refresh session if no user
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user) {
        refresh();
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-screen flex overflow-hidden">
      {/*  sidebar  */}
      {user && (
        <>
          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 280 }}
                exit={{ width: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed lg:relative top-0 left-0 h-full overflow-hidden z-[299]"
              >
                <Sidebar />
              </motion.div>
            )}
          </AnimatePresence>

          {!sidebarOpen && (
            <button
              title="Open sidebar"
              onClick={toggleSidebar}
              className="fixed top-2 left-2 p-2 text-[#bababa] hover:bg-[#3a3a3a] rounded-xl z-[200]"
            >
              <TbLayoutSidebarFilled className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          )}
        </>
      )}

      {/*  login/signup panel  */}
      {!user && (loginOpen || signupOpen) && <AuthPanel />}

      {/*   main panel   */}
      <motion.div
        layout
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative flex-1 min-w-0 h-full"
      >
        <main className="w-full h-full bg-black text-white">
          <Outlet />
        </main>
      </motion.div>

      {userDropdownOpen && <UserDropdown />}

      {/*   modals   */}

      {((user && (newFileModalOpen || fileInfoModalOpen || searchModalOpen)) ||
        keyboardShortcutsModalOpen ||
        aboutModalOpen ||
        feedbackModalOpen) && (
        <ModalOverlay
          onClose={() => {
            if (newFileModalOpen) toggleNewFileModal();
            else if (keyboardShortcutsModalOpen) toggleKeyboardShortcutsModal();
            else if (aboutModalOpen) toggleAboutModal();
            else if (feedbackModalOpen) toggleFeedbackModal();
            else if (fileInfoModalOpen) closeFileInfoModal();
            else if (searchModalOpen) toggleSearchModal();
          }}
        >
          {user && newFileModalOpen && <NewFileModal />}
          {keyboardShortcutsModalOpen && <KeyboardShortcutsModal />}
          {aboutModalOpen && <AboutModal />}
          {feedbackModalOpen && <FeedbackModal />}
          {user && fileInfoModalOpen && (
            <FileInfoModal file={selectedFileForInfo ?? undefined} />
          )}
          {user && searchModalOpen && <SearchModal />}
        </ModalOverlay>
      )}

      <KeyboardShortcutListener />

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </div>
  );
}

export default App;

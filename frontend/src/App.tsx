import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { useUserStore } from "./stores/userStore";
import { useUIStore } from "./stores/uiStore";

import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import FilePanel from "./components/Layout/FilePanel";
import LoginBox from "./components/Auth/LoginBox";
import SignupBox from "./components/Auth/SignupBox";
import ModalOverlay from "./components/Modals/ModalOverlay";
import NewFileModal from "./components/Modals/NewFileModal";
import SearchModal from "./components/Modals/SearchModal";
import KeyboardShortcutsModal from "./components/Modals/KeyboardShortcutsModal";
import AboutModal from "./components/Modals/AboutModal";
import FeedbakcModal from "./components/Modals/FeedbackModal";
import KeyboardShortcutListener from "./utils/KeyboardShortcutListener";
import { TbLayoutSidebarFilled } from "react-icons/tb";

function App() {
  const user = useUserStore((state) => state.user);
  const theme = useUserStore((state) => state.theme);
  const refresh = useUserStore((state) => state.refresh);
  const {
    sidebarOpen,
    filePanelOpen,
    newFileModalOpen,
    searchModalOpen,
    keyboardShortcutsModalOpen,
    aboutModalOpen,
    feedbackModalOpen,
    openLogin,
    openSignup,
    toggleSidebar,
    toggleNewFileModal,
    toggleKeyboardShortcutsModal,
    toggleAboutModal,
    toggleFeedbackModal,
    setFilePanelOpen,
  } = useUIStore();

  const location = useLocation();
  const isFilePage = location.pathname.startsWith("/file");

  //   theme ? dark/light
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  //   auto-open file panel if on file page
  useEffect(() => {
    if (isFilePage) {
      setFilePanelOpen(true);
    }
  }, [location.pathname]);

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
    <div className="h-screen flex">
      {user ? (
        sidebarOpen ? (
          <div className="h-full w-[80%] md:w-[300px]">
            <Sidebar />
          </div>
        ) : (
          <button
            title="Open sidebar"
            onClick={toggleSidebar}
            className="fixed top-2 left-2 p-2 text-[#bababa] hover:bg-[#3a3a3a] rounded-xl z-[200]"
          >
            <TbLayoutSidebarFilled className="w-6 h-6" />
          </button>
        )
      ) : (
        <div className="h-full w-[80%] md:w-[400px]">
          {openLogin && <LoginBox />}
          {openSignup && <SignupBox />}
        </div>
      )}

      <div className="relative flex-1 h-full">
        {/* navbar */}

        <div className="fixed top-0 right-0 z-[200]">
          <Navbar isFilePage={isFilePage} />
        </div>

        <main className="w-full h-full bg-[#1E1E1E] overflow-auto">
          <Outlet />
        </main>

        {user && isFilePage && filePanelOpen && (
          <div className="absolute top-[70px] right-5">
            <FilePanel />
          </div>
        )}

        {/* modals */}

        {user && searchModalOpen && <SearchModal />}

        {((user && newFileModalOpen) ||
          keyboardShortcutsModalOpen ||
          aboutModalOpen ||
          feedbackModalOpen) && (
          <ModalOverlay
            onClose={() => {
              if (newFileModalOpen) toggleNewFileModal();
              else if (keyboardShortcutsModalOpen)
                toggleKeyboardShortcutsModal();
              else if (aboutModalOpen) toggleAboutModal();
              else if (feedbackModalOpen) toggleFeedbackModal();
            }}
          >
            {user && newFileModalOpen && <NewFileModal />}
            {keyboardShortcutsModalOpen && <KeyboardShortcutsModal />}
            {aboutModalOpen && <AboutModal />}
            {feedbackModalOpen && <FeedbakcModal />}
          </ModalOverlay>
        )}
      </div>

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

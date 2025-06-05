import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { useUserStore } from "./stores/userStore";
import { useUIStore } from "./stores/uiStore";

import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import FilePanel from "./components/Layout/FilePanel";
import LoginBox from "./components/Auth/LoginBox";
import SignupBox from "./components/Auth/SignupBox";
import NewFileDialog from "./components/Dialogs/NewFileDialog";
import SearchDialog from "./components/Dialogs/SearchDialog";
import { FiSidebar } from "react-icons/fi";

function App() {
  const user = useUserStore((state) => state.user);
  const theme = useUserStore((state) => state.theme);
  const refresh = useUserStore((state) => state.refresh);
  const {
    sidebarOpen,
    filePanelOpen,
    newFileDialogOpen,
    searchDialogOpen,
    openLogin,
    openSignup,
    toggleSidebar,
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
            className="fixed top-2 left-2 p-2 text-[#bababa] hover:bg-[#3a3a3a] rounded-xl z-[999]"
          >
            <FiSidebar className="w-6 h-6" />
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
        {user && (
          <div className="fixed top-0 right-0 z-[99] ">
            <Navbar isFilePage={isFilePage} />
          </div>
        )}

        <main className="w-full h-full bg-[#1E1E1E] overflow-auto">
          <Outlet />
        </main>

        {user && isFilePage && filePanelOpen && (
          <div className="fixed top-[70px] right-5">
            <FilePanel />
          </div>
        )}

        {newFileDialogOpen && (
          <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/40 flex items-center justify-center">
            <NewFileDialog />
          </div>
        )}

        {searchDialogOpen && (
          <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center">
            <SearchDialog />
          </div>
        )}
      </div>

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

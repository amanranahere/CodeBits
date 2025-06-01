import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { useUserStore } from "./stores/userStore";
import LogoBox from "./components/Navbar/LogoBox";
import SearchBar from "./components/Navbar/SearchBar";
import IconBox from "./components/Navbar/IconBox";
import UserBox from "./components/Navbar/UserBox";
import Sidebar from "./components/Layout/Sidebar";
import FilePanel from "./components/Layout/FilePanel";
import LoginBox from "./components/Auth/LoginBox";
import SignupBox from "./components/Auth/SignupBox";
import AuthButtons from "./components/Auth/AuthButtons";
import NewFileDialog from "./components/Dialogs/NewFileDialog";
import SearchDialog from "./components/Dialogs/SearchDialog";

function App() {
  const user = useUserStore((state) => state.user);
  const refresh = useUserStore((state) => state.refresh);
  const location = useLocation();
  const isFilePage = location.pathname.startsWith("/file");

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filePanelOpen, setFilePanelOpen] = useState(false);
  const [loginBoxOpen, setLoginBoxOpen] = useState(true);
  const [signupBoxOpen, setSignupBoxOpen] = useState(false);
  const [newFileDialogOpen, setNewFileDialogOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleFilePanel = () => setFilePanelOpen((prev) => !prev);
  const toggleNewFileDialog = () => setNewFileDialogOpen((prev) => !prev);
  const toggleSearchDialog = () => setSearchDialogOpen((prev) => !prev);

  const handleLoginToggle = () => {
    setLoginBoxOpen((prev) => {
      const newState = !prev;
      if (newState) setSignupBoxOpen(false);
      return newState;
    });
  };

  const handleSignupToggle = () => {
    setSignupBoxOpen((prev) => {
      const newState = !prev;
      if (newState) setLoginBoxOpen(false);
      return newState;
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user) {
        refresh();
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isFilePage) {
      setFilePanelOpen(true);
    }
  }, [location.pathname]);

  return (
    <div className="h-screen flex">
      <div className="">
        {user ? (
          <div className="h-full w-[80%] md:w-[300px]">
            {sidebarOpen && <Sidebar />}
          </div>
        ) : (
          <div className="h-full w-[80%] md:w-[400px]">
            {loginBoxOpen && <LoginBox />}
            {signupBoxOpen && <SignupBox />}
          </div>
        )}
      </div>

      <UserBox />

      {!user && (
        <AuthButtons
          handleLoginToggle={handleLoginToggle}
          handleSignupToggle={handleSignupToggle}
        />
      )}

      <div className="w-full h-full">
        <main className="w-full h-full bg-[#333] overflow-auto">
          <Outlet />
        </main>

        <IconBox
          sidebarOpen={sidebarOpen}
          filePanelOpen={filePanelOpen}
          toggleSidebar={toggleSidebar}
          toggleFilePanel={toggleFilePanel}
          toggleNewFileDialog={toggleNewFileDialog}
          toggleSearchDialog={toggleSearchDialog}
          isFilePage={isFilePage}
        />

        {newFileDialogOpen && (
          <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/40 flex items-center justify-center">
            <NewFileDialog onClose={() => setNewFileDialogOpen(false)} />
          </div>
        )}

        {searchDialogOpen && (
          <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/40 flex items-center justify-center">
            <SearchDialog
              onClose={() => setSearchDialogOpen(false)}
              toggleNewFileDialog={toggleNewFileDialog}
            />
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

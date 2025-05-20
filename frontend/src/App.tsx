import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { useUserStore } from "./stores/userStore";
import LogoBox from "./components/Navbar/LogoBox";
import SearchBar from "./components/Navbar/SearchBar";
import IconBox from "./components/Navbar/IconBox";
import UserBox from "./components/Navbar/UserBox";
import Sidebar from "./components/Layout/Sidebar";
import FileInfoPanel from "./components/Layout/FileInfoPanel";
import LoginBox from "./components/Auth/LoginBox";
import SignupBox from "./components/Auth/SignupBox";
import AuthButtons from "./components/Auth/AuthButtons";

function App() {
  const user = useUserStore((state) => state.user);
  const refresh = useUserStore((state) => state.refresh);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [infoPanelOpen, setInfoPanelOpen] = useState(false);
  const [loginBoxOpen, setLoginBoxOpen] = useState(true);
  const [signupBoxOpen, setSignupBoxOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleInfoPanel = () => setInfoPanelOpen((prev) => !prev);

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

  return (
    <div className="flex flex-col gap-2 lg:h-screen bg-white p-2">
      <div className="flex items-center gap-x-2">
        <LogoBox />

        {user ? (
          <SearchBar />
        ) : (
          <AuthButtons
            handleLoginToggle={handleLoginToggle}
            handleSignupToggle={handleSignupToggle}
          />
        )}

        <UserBox />

        <IconBox
          sidebarOpen={sidebarOpen}
          infoPanelOpen={infoPanelOpen}
          toggleSidebar={toggleSidebar}
          toggleInfoPanel={toggleInfoPanel}
        />
      </div>

      <div className="flex flex-1 gap-2 overflow-hidden">
        {user && sidebarOpen && <Sidebar />}

        <main className="flex-1 bg-[#333] rounded-3xl overflow-auto">
          <Outlet />
        </main>

        {user && infoPanelOpen && <FileInfoPanel />}
        {!user && loginBoxOpen && <LoginBox />}
        {!user && signupBoxOpen && <SignupBox />}
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

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useUserStore } from "./stores/userStore";
import LogoBox from "./components/Navbar/LogoBox";
import SearchBar from "./components/Navbar/SearchBar";
import IconBox from "./components/Navbar/IconBox";
import UserBox from "./components/Navbar/UserBox";
import Sidebar from "./components/Layout/Sidebar";
import FileInfoPanel from "./components/Layout/FileInfoPanel";
import LoginBox from "./components/Auth/LoginBox";
import SignupBox from "./components/Auth/SignupBox";

function App() {
  const user = useUserStore((state) => state.user);
  const refresh = useUserStore((state) => state.refresh);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [infoPanelOpen, setInfoPanelOpen] = useState(true);
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
          <div className="flex-1 flex items-center gap-x-2">
            <button
              onClick={handleLoginToggle}
              className="h-14 flex-grow dark:bg-[#1f1f1f] dark:text-[#f1f1f1] rounded-2xl"
            >
              LOGIN
            </button>

            <button
              onClick={handleSignupToggle}
              className="h-14 flex-grow dark:bg-[#1f1f1f] dark:text-[#f1f1f1] rounded-2xl"
            >
              SIGNUP
            </button>
          </div>
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
        {sidebarOpen && <Sidebar />}

        <main className="flex-1 bg-[#333] rounded-3xl overflow-auto">
          <Outlet />
        </main>

        {user && infoPanelOpen && <FileInfoPanel />}
        {!user && loginBoxOpen && <LoginBox />}
        {!user && signupBoxOpen && <SignupBox />}
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Layout/Navbar.tsx";
import Sidebar from "./components/Layout/Sidebar.tsx";
import LineNumbers from "./components/Layout/LineNumbers.tsx";

function App() {
  const [tabs, setTabs] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const tabName =
      path === "/settings"
        ? "Settings"
        : path.startsWith("/file/")
        ? path.split("/file/")[1]
        : null;

    if (tabName && !tabName.includes(tabName)) {
      setTabs((prev) => [...prev, tabName]);
    }
  }, [location.pathname]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
        tabs={tabs}
        setTabs={setTabs}
      />

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <Sidebar tabs={tabs} setTabs={setTabs} />}
        <LineNumbers />

        <main className="flex-1 overflow-auto bg-[#f1f1f1] dark:bg-[#282828] text-[#f1f1f1] p-4 duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;

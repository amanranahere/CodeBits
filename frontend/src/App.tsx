import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Layout/Navbar.tsx";
import Sidebar from "./components/Layout/Sidebar.tsx";
import LineNumbers from "./components/Layout/LineNumbers.tsx";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex flex-col h-screen">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <Sidebar />}
        <LineNumbers />

        <main className="flex-1 overflow-auto bg-[#f1f1f1] dark:bg-[#282828] text-[#f1f1f1] p-4 duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;

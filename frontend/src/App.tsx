import { Outlet } from "react-router-dom";
import { useLayout } from "./components/Layout/LayoutContext";
import Navbar from "./components/Navbar/NavBar";
import Sidebar from "./components/Layout/Sidebar";
import FileInfoPanel from "./components/Layout/FileInfoPanel";

function App() {
  const { sidebarOpen, infoPanelOpen } = useLayout();

  return (
    <div className="flex flex-col lg:h-screen">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <Sidebar />}

        <main className="flex-1 bg-black overflow-auto">
          <Outlet />
        </main>

        {infoPanelOpen && <FileInfoPanel />}
      </div>
    </div>
  );
}

export default App;

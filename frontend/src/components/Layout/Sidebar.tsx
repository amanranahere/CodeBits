import { useNavigate } from "react-router-dom";

type SidebarProps = {
  setTabs: React.Dispatch<React.SetStateAction<string[]>>;
  tabs: string[];
};

const Sidebar = ({ tabs, setTabs }: SidebarProps) => {
  const navigate = useNavigate();
  const files = ["snippet01", "snippet02", "snippet03"];

  const openFile = (file: string) => {
    if (!tabs.includes(file)) {
      setTabs((prev) => [...prev, file]);
    }

    navigate(`/file/${file}`);
  };

  return (
    <aside className="w-full lg:w-[18%] bg-[#282828] text-[#f1f1f1] p-2 border-r border-[#d6e2fb] dark:border-[#5e5e5e]">
      <h2 className="font-bold mb-2">FILES</h2>

      <ul>
        {files.map((file) => (
          <li key={file}>
            <button
              onClick={() => openFile(file)}
              className="block hover:bg-[#3a3a3a] p-1 rounded-xs"
            >
              {file}.js
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

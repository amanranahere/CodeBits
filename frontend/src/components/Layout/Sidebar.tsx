import { useNavigate } from "react-router-dom";
import { VscNewFile } from "react-icons/vsc";
import { IoSearch } from "react-icons/io5";
import FileOptionsMenu from "../Dialogs/FileOptionsMenu.tsx";
import { getFileIcon } from "../../utils/getFileIcon.tsx";

type SidebarProps = {
  setTabs: React.Dispatch<React.SetStateAction<string[]>>;
  tabs: string[];
};

const Sidebar = ({ tabs, setTabs }: SidebarProps) => {
  const navigate = useNavigate();
  const files = [
    ".gitignore",
    "Dockerfile",
    "alsdkfjwelkjfl;jaksdjflkjpoiweralksdjflkesjlsds.jsx",
    ".env",
    ".env.production",
    "eslint.config.js",
    "prettier.config.js",
    "babel.config.js",
    "vite.config.js",
    "tailwind.config.js",
    "next.config.js",
    "script.js",
    "component.jsx",
    "types.ts",
    "component.tsx",
    "App.vue",
    "index.html",
    "styles.css",
    "styles.scss",
    "theme.sass",
    "config.json",
    "data.json5",
    "settings.yaml",
    "pipeline.yml",
    "README.md",
    "notes.txt",
    "main.py",
    "Program.java",
    "server.go",
    "script.rb",
    "lib.rs",
    "index.php",
    "setup.sh",
    "unknown.xyz",
  ];

  const openFile = (file: string) => {
    if (!tabs.includes(file)) {
      setTabs((prev) => [...prev, file]);
    }

    navigate(`/file/${file}`);
  };

  return (
    <aside className="w-full lg:w-[18%] bg-[#f1f1f1] dark:bg-[#212121] text-[#f1f1f1]  border-r border-[#d6e2fb] dark:border-[#5e5e5e]">
      <div className="w-full flex justify-between items-center text-lg dark:bg-[#191919] p-1">
        <p className="text-sm font-bold">FILES</p>

        <div className="flex gap-x-1 text-lg text-[#5c5c5c] dark:text-[#bababa]">
          <button
            title="Add new file"
            className="cursor-pointer  hover:brightness-150 dark:hover:brightness-125 duration-300"
          >
            <VscNewFile />
          </button>

          <button
            title="Search"
            className="cursor-pointer hover:brightness-150 dark:hover:brightness-125 duration-300"
          >
            <IoSearch />
          </button>
        </div>
      </div>

      {/* snippets list */}
      <ul
        className="max-h-[calc(100vh-4rem)] overflow-y-auto p-1"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {files.map((file) => (
          <li
            key={file}
            className="w-full rounded-md px-2 text-sm leading-tight group flex justify-between items-center text-[#bababa] hover:bg-[#4a4a4a] duration-300"
          >
            <button
              onClick={() => openFile(file)}
              className="w-full flex items-center gap-x-1 text-left p-1 rounded-xs mask-containerEnd overflow-hidden"
            >
              <span>{getFileIcon(file)}</span>
              <span>{file}</span>
            </button>

            <div className="text-sm opacity-0 group-hover:opacity-100 transition-opacity  ">
              <FileOptionsMenu file={file} />
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

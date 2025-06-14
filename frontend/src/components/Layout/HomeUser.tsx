import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { useFileStore } from "../../stores/fileStore";
import { useUIStore } from "../../stores/uiStore";
import type { UserFile } from "../../stores/fileStore";
import TypingTextAnimation from "../Animation/TypingTextAnimation";

export default function HomeUser() {
  const navigate = useNavigate();

  const { toggleNewFileModal } = useUIStore();

  const user = useUserStore((state) => state.user);
  const files = useFileStore((state) => state.files);

  const recentFiles = files.slice(0, 3);
  const allExtensions = files.map((file) => file.extension);
  const uniqueExtensions = [...new Set(allExtensions)];

  const extensionFrequency = allExtensions.reduce(
    (acc: Record<string, number>, ext: string) => {
      acc[ext] = (acc[ext] || 0) + 1;
      return acc;
    },
    {}
  );
  const mostUsedExtension = Object.entries(extensionFrequency).reduce(
    (a, b) => (b[1] > a[1] ? b : a),
    ["", 0]
  )[0];

  const openFile = (file: UserFile) => {
    const slug = `${file.name}--${file._id}`;
    navigate(`/file/${slug}`);
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between overflow-hidden p-8 font-mono">
      <div className="flex justify-between">
        {/*   greeting div   */}
        <div>
          <h1 className="text-2xl lg:text-5xl font-bold dark:text-[#bababa]">
            Welcome back, {user?.name}
          </h1>

          <p className="mt-6 lg:text-lg text-[#a0a0a0]">
            Everything you've saved is right where you left it.
          </p>

          <p className="lg:text-lg text-[#a0a0a0]">
            <TypingTextAnimation
              text="Let's write something worth reusing."
              speed={50}
            />
          </p>
        </div>

        {/*   new file btn   */}
        <button
          onClick={toggleNewFileModal}
          className="flex items-start max-w-max max-h-max justify-start text-lg px-4 py-1 text-[#bababa] hover:text-[#7a7a7a] duration-150 whitespace-nowrap"
        >
          + New File
        </button>
      </div>

      <div className="flex justify-between">
        {/*   user stats   */}
        <div className="flex items-end">
          <div className="flex flex-col text-lg text-[#bababa]">
            <p>
              <span className="text-[#bababa]">Total Snippets:</span>{" "}
              <span className="text-[#a0a0a0]">{files.length}</span>
            </p>
            <p>
              <span className="text-[#bababa]">Languages Used:</span>{" "}
              <span className="text-[#a0a0a0]">{uniqueExtensions.length}</span>
            </p>
            <p>
              <span className="text-[#bababa]">Most Used Type:</span>{" "}
              <span className="text-[#a0a0a0]">.{mostUsedExtension}</span>
            </p>
          </div>
        </div>

        {/*   last edited files */}
        <div className="lg:text-lg px-20">
          <h2 className="text-[#bababa] mb-2">Last Edited</h2>

          <ul className="text-[#a0a0a0]">
            {recentFiles.map((file) => (
              <li
                key={file._id}
                onClick={() => openFile(file)}
                className="hover:text-[#7a7a7a] duration-150 whitespace-nowrap cursor-pointer"
              >
                {file.name}.{file.extension}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

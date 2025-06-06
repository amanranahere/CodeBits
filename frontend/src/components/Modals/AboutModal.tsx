import { IoClose } from "react-icons/io5";
import { useUIStore } from "../../stores/uiStore";

export default function AboutModal() {
  const { toggleAboutModal } = useUIStore();

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[80%] lg:w-[40%] h-[65%] z-[999] rounded-[20px] shadow-lg dark:bg-[#303030] dark:text-white flex flex-col">
      <div
        onClick={toggleAboutModal}
        className="absolute top-5 lg:top-6 right-5 lg:right-6 p-1 hover:bg-[#4a4a4a] text-[#9a9a9a] hover:text-[#f1f1f1] rounded-full cursor-pointer z-10 duration-100"
      >
        <IoClose className="w-6 h-6" />
      </div>

      <div className="w-full pl-7 py-6 text-lg lg:text-xl font-semibold">
        About
      </div>

      <hr className="my-1 mx-3 border-[#e5e7eb] dark:border-[#4a4a4a]" />

      <div className="flex-1 overflow-y-auto p-2 md:p-6 space-y-6 custom_scrollbar">
        <div className="flex justify-between px-4">
          <span className="text-left text-[#bababa]">Project</span>
          <span className="w-[60%] text-right text-[#f1f1f1] font-medium font-mono">
            CodeBits
          </span>
        </div>

        <div className="flex justify-between px-4">
          <span className="text-left text-[#bababa]">Version</span>
          <span className="w-[60%] text-right text-[#f1f1f1] font-mono">
            1.0.0
          </span>
        </div>

        <div className="flex justify-between px-4">
          <span className="text-left text-[#bababa]">Description</span>
          <span className="w-[60%] text-right text-[#f1f1f1] font-mono">
            Minimal, fast code snippet manager
          </span>
        </div>

        <div className="flex justify-between px-4">
          <span className="text-left text-[#bababa]">Developer</span>
          <span className="w-[60%] text-right text-[#f1f1f1] font-medium font-mono">
            Aman Rana
          </span>
        </div>

        <div className="flex justify-between px-4">
          <span className="text-left text-[#bababa]">GitHub Repo</span>
          <a
            href="https://github.com/amanranahere/CodeBits"
            target="_blank"
            className="w-[60%] text-right text-[#f1f1f1] hover:text-[#bababa] transition-colors duration-150 font-mono"
          >
            View on GitHub
          </a>
        </div>

        <div className="flex justify-between items-start px-4">
          <span className="text-left text-[#bababa]">Contact</span>

          <div className="w-[60%] text-right flex flex-wrap justify-end gap-x-6">
            <a
              href="https://amanrana.vercel.app"
              target="_blank"
              className="text-right text-[#f1f1f1] hover:text-[#bababa] transition-colors duration-150 font-mono"
            >
              Portfolio
            </a>

            <a
              href="https://github.com/amanranahere"
              target="_blank"
              className="text-right text-[#f1f1f1] hover:text-[#bababa] transition-colors duration-150 font-mono"
            >
              GitHub
            </a>

            <a
              href="mailto:amanranahere@gmail.com"
              className="text-right text-[#f1f1f1] hover:text-[#bababa] transition-colors duration-150 font-mono"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

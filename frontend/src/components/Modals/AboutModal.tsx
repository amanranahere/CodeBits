import { IoClose } from "react-icons/io5";
import { useUIStore } from "../../stores/uiStore";
import { MdArrowOutward } from "react-icons/md";

export default function AboutModal() {
  const { toggleAboutModal } = useUIStore();

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[75%] lg:w-[60%] max-w-[700px] h-[85%] md:h-[60%] lg:h-[70%] rounded-[20px] shadow-lg dark:bg-[#303030] dark:text-white flex flex-col">
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

      <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-y-8 font-mono custom_scrollbar">
        <div className="flex">
          <div className="w-[60%]">
            <div className="text-gray-700 dark:text-[#8c8c8c] select-none">
              PROJECT
            </div>
            <div className="text-[#f1f1f1]">CodeBits</div>
          </div>

          <div>
            <div className="text-gray-700 dark:text-[#8c8c8c] select-none">
              VERSION
            </div>
            <div className="text-[#f1f1f1]">1.0.0</div>
          </div>
        </div>

        <div>
          <div className="text-gray-700 dark:text-[#8c8c8c] select-none">
            DESCRIPTION
          </div>
          <div className="text-[#f1f1f1]">
            This app is designed to help you save and organize your code
            snippets in one place. It's a simple way to keep track of useful
            pieces of code so you can easily find and reuse them whenever you
            need.
          </div>
        </div>

        <div>
          <div className="text-gray-700 dark:text-[#8c8c8c] select-none">
            GITHUB REPO
          </div>
          <a
            href="https://github.com/amanranahere/CodeBits"
            target="_blank"
            className="flex items-center justify-start gap-x-2 text-[#f1f1f1] hover:text-[#bababa] transition-colors duration-150 font-mono"
          >
            <span>View on GitHub</span>
            <MdArrowOutward />
          </a>
        </div>

        <div className="flex flex-col lg:flex-row gap-y-8 lg:gap-y-0">
          <div className="w-[60%]">
            <div className="text-gray-700 dark:text-[#8c8c8c] select-none">
              DEVELOPER
            </div>
            <a
              href="https://amanrana.vercel.app"
              target="_blank"
              className="flex items-center justify-start gap-x-2 text-[#f1f1f1] hover:text-[#bababa] transition-colors duration-150 font-mono"
            >
              <span>Aman Rana</span>
              <MdArrowOutward />
            </a>
          </div>

          <div>
            <div className="text-gray-700 dark:text-[#8c8c8c] select-none">
              CONTACT
            </div>
            <div className="flex flex-wrap gap-x-6">
              <a
                href="https://www.linkedin.com/in/amanrana-dev/"
                target="_blank"
                className="text-right flex items-center justify-end text-[#f1f1f1] hover:text-[#bababa] transition-colors duration-150 font-mono"
              >
                <span>LinkedIn</span>
                <MdArrowOutward />
              </a>

              <a
                href="https://github.com/amanranahere"
                target="_blank"
                className="text-right flex items-center justify-end text-[#f1f1f1] hover:text-[#bababa] transition-colors duration-150 font-mono"
              >
                <span>GitHub</span>
                <MdArrowOutward />
              </a>

              <a
                href="mailto:amanranahere@gmail.com"
                className="text-right flex items-center justify-end text-[#f1f1f1] hover:text-[#bababa] transition-colors duration-150 font-mono"
              >
                <span>Email</span>
                <MdArrowOutward />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

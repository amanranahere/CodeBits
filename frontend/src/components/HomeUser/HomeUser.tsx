import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { useFileStore } from "../../stores/fileStore";
import { useUIStore } from "../../stores/uiStore";
import type { UserFile } from "../../stores/fileStore";
import { formatDateTime } from "../../utils/formatDateTime";
import { getFileIcon } from "../getFileIcon";
import {
  IoCodeSlash,
  IoDocumentText,
  IoTerminalOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { motion } from "framer-motion";
import Loading from "../Loading";

const extensionToLanguage: Record<string, string> = {
  js: "JavaScript",
  ts: "TypeScript",
  jsx: "React (JSX)",
  tsx: "React (TSX)",
  py: "Python",
  java: "Java",
  cpp: "C++",
  c: "C",
  cs: "C#",
  php: "PHP",
  rb: "Ruby",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  json: "JSON",
  md: "Markdown",
  txt: "Plaintext",
};

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full lg:min-h-screen w-full flex flex-col justify-between overflow-y-auto px-5 py-12 md:px-10 md:py-8">
      <div className="h-full w-full flex flex-col justify-between items-center gap-y-6 lg:gap-y-12">
        {/*   greeting div   */}
        <div className="flex flex-col justify-between items-center gap-y-3">
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "linear", delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl md:text-5xl font-extrabold text-center flex"
          >
            Welcome back,&nbsp;
            <p className="first-letter:capitalize">
              {user?.name.split(" ")[0]}
            </p>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "linear", delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
            className="pl-1 text-[#bababa] text-sm md:text-base font-medium"
          >
            Your snippets, organized and waiting to be reused.
          </motion.p>
        </div>

        {/*  grid  */}
        {loading ? (
          <Loading size={8} />
        ) : (
          <div className="h-full grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 items-stretch justify-stretch w-full">
            {/*  total files box  */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                y: { duration: 0.6, ease: "linear", delay: 0.4 },
                opacity: { duration: 0.6, ease: "linear", delay: 1 },
              }}
              className="relative h-32 md:h-full lg:min-h-44 col-span-1 md:col-span-1 order-1 flex flex-col justify-center items-center gap-y-1 bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.15)] duration-500 overflow-hidden"
            >
              <div className="absolute top-3 right-3 w-7 h-7 md:w-9 md:h-9 flex justify-center items-center rounded-full bg-[#ffffff06] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,.075),_inset_0_0_5vw_hsla(0,0%,100%,.05)]">
                <IoDocumentText className="w-3 h-3 md:w-4 md:h-4 text-[#f1f1f1]" />
              </div>

              <p className="text-2xl lg:text-4xl font-bold">{files.length}</p>
              <p className="text-xs md:text-sm text-[#bababa] font-medium">
                Total Files
              </p>
            </motion.div>

            {/*  languages used box  */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                y: { duration: 0.6, ease: "linear", delay: 0.8 },
                opacity: { duration: 0.6, ease: "linear", delay: 1.4 },
              }}
              className="relative h-32 md:h-full lg:min-h-44 col-span-1 md:col-span-1 order-2 flex flex-col justify-center items-center gap-y-1 bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.15)] duration-500 overflow-hidden"
            >
              <div className="absolute top-3 right-3 w-7 h-7 md:w-9 md:h-9 flex justify-center items-center rounded-full bg-[#ffffff06] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,.075),_inset_0_0_5vw_hsla(0,0%,100%,.05)]">
                <IoCodeSlash className="w-3 h-3 md:w-4 md:h-4 text-[#f1f1f1]" />
              </div>

              <p className="text-2xl lg:text-4xl font-bold">
                {uniqueExtensions.length}
              </p>
              <p className="text-xs md:text-sm text-[#bababa] font-medium flex flex-col md:flex-row items-center">
                Languages Used
              </p>
            </motion.div>

            {/*  most used language box  */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                y: { duration: 0.6, ease: "linear", delay: 1 },
                opacity: { duration: 0.6, ease: "linear", delay: 1.6 },
              }}
              className="relative h-32 md:h-full lg:min-h-44 col-span-2 md:col-span-1 order-3 flex flex-col justify-center items-center gap-y-1 bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.15)] duration-500 overflow-hidden"
            >
              <div className="absolute top-3 right-3 w-7 h-7 md:w-9 md:h-9 flex justify-center items-center rounded-full bg-[#ffffff06] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,.075),_inset_0_0_5vw_hsla(0,0%,100%,.05)]">
                <IoTerminalOutline className="w-3 h-3 md:w-4 md:h-4 text-[#f1f1f1]" />
              </div>

              <p className="text-2xl lg:text-4xl font-bold">
                {recentFiles.length > 0 ? (
                  <span>{extensionToLanguage[mostUsedExtension] || "?"} </span>
                ) : (
                  <span>?</span>
                )}
              </p>
              <p className="text-xs md:text-sm text-[#bababa] font-medium">
                Most Used
              </p>
            </motion.div>

            {/*  recent files  */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                y: { duration: 0.6, ease: "linear", delay: 1.2 },
                opacity: { duration: 0.6, ease: "linear", delay: 1.8 },
              }}
              className="h-full relative col-span-2 md:col-span-3 order-4 p-4 md:p-6 lg:p-8 flex flex-col gap-y-2 lg:gap-y-7 bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.15)] duration-500 overflow-hidden"
            >
              <div
                title="New File"
                onClick={toggleNewFileModal}
                className="absolute top-3 right-14 w-7 h-7 md:w-9 md:h-9 flex justify-center items-center rounded-full bg-[#ffffff06] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,.075),_inset_0_0_5vw_hsla(0,0%,100%,.05)] cursor-pointer"
              >
                <HiMiniPencilSquare className="w-3 h-3 md:w-4 md:h-4 text-[#f1f1f1]" />
              </div>

              <div className="absolute top-3 right-3 w-7 h-7 md:w-9 md:h-9 flex justify-center items-center rounded-full bg-[#ffffff06] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,.075),_inset_0_0_5vw_hsla(0,0%,100%,.05)]">
                <IoTimeOutline className="w-3 h-3 md:w-4 md:h-4 text-[#f1f1f1]" />
              </div>

              <p className="text-xl md:text-3xl text-[#f1f1f1] font-bold">
                Recent Files
              </p>

              {recentFiles.length > 0 ? (
                <ul>
                  {recentFiles.map((file) => {
                    const { relative } = formatDateTime(file.updatedAt);

                    return (
                      <li
                        key={file._id}
                        onClick={() => openFile(file)}
                        className="relative w-full px-5 py-3 flex items-center gap-x-4 hover:bg-[#1a1a1a] rounded-2xl cursor-pointer group"
                      >
                        <div className="px-2">
                          {getFileIcon(file.extension)}
                        </div>

                        <div className="w-full flex flex-col gap-y-1">
                          <div className="flex justify-between">
                            <div>
                              {file.name}.{file.extension}
                            </div>

                            <div className="invisible md:visible text-[#ababab] text-sm">
                              {relative}
                            </div>
                          </div>

                          <div className="w-[70%] text-[#aaa] text-sm line-clamp-1 select-none">
                            {file.description ? (
                              <div>{file.description}</div>
                            ) : (
                              <div className="italic">No description</div>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-[#7a7a7a] italic">No Recent Files</p>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

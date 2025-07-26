import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSearchFiles from "../../hooks/file/useSearchFiles";
import { getFileIcon } from "../getFileIcon";
import { formatDateTime } from "../../utils/formatDateTime";
import type { UserFile } from "../../stores/fileStore";
import { useFileStore } from "../../stores/fileStore";
import { useUIStore } from "../../stores/uiStore";
import { IoClose } from "react-icons/io5";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Loading from "../Loading";

function SearchModal() {
  const ref = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { searchFiles, loading, results } = useSearchFiles();
  const { toggleSearchModal, toggleNewFileModal } = useUIStore();

  const files = useFileStore((state) => state.files);
  const recentFiles = files.slice(0, 5);

  const openFile = (file: UserFile) => {
    const slug = `${file.name}--${file._id}`;
    navigate(`/file/${slug}`);
    toggleSearchModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      searchFiles(value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        toggleSearchModal();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        toggleSearchModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="w-[90%] lg:w-[48%] h-[65%] fixed inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[950] rounded-[20px] shadow-lg dark:bg-[#303030] dark:text-white flex flex-col"
    >
      <div
        onClick={() => toggleSearchModal()}
        className="absolute top-5 right-5 p-1 hover:bg-[#4a4a4a] text-[#9a9a9a] hover:text-[#f1f1f1] rounded-full cursor-pointer z-10 duration-100"
      >
        <IoClose className="w-6 h-6" />
      </div>

      <input
        type="text"
        placeholder="Search file..."
        autoFocus
        value={query}
        onChange={handleChange}
        className="w-full pl-7 pr-20 py-6 lg:text-lg bg-[#303030] rounded-t-[20px] outline-none"
      />

      <div className="border-b border-[#6a6a6a]"></div>

      <div className="h-full p-2 rounded-b-[20px] overflow-y-auto">
        {query ? (
          <div className="h-full w-full">
            {loading ? (
              <div className="h-full w-full flex justify-center items-center">
                <Loading size={8} />
              </div>
            ) : results.length > 0 ? (
              <ul>
                {results.map((file) => {
                  const { relative } = formatDateTime(file.updatedAt);

                  return (
                    <li
                      key={file._id}
                      onClick={() => openFile(file)}
                      className="relative w-full px-5 py-3 flex items-center gap-x-4 hover:bg-[#3a3a3a] rounded-2xl cursor-pointer group"
                    >
                      <div className="px-2">{getFileIcon(file.extension)}</div>

                      <div className="w-full flex flex-col gap-y-1">
                        <div className="flex justify-between">
                          <div>
                            {file.name}.{file.extension}
                          </div>

                          <div className="invisible group-hover:visible text-[#ababab] text-sm">
                            {relative}
                          </div>
                        </div>

                        <div className="text-[#aaa] text-sm line-clamp-1 select-none">
                          {file.description && <div>{file.description}</div>}{" "}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-center text-[#aaa] py-5">
                No file found with that name
              </p>
            )}
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                toggleSearchModal();
                toggleNewFileModal();
              }}
              className="w-full px-5 py-3 flex items-center gap-x-4 hover:bg-[#3a3a3a] rounded-2xl"
            >
              <HiMiniPencilSquare className="w-5 h-5" />
              <p>New file</p>
            </button>

            <div className="p-3 text-[#aaa]">Last Edited</div>

            <ul>
              {recentFiles.map((file) => {
                const { relative } = formatDateTime(file.updatedAt);

                return (
                  <li
                    key={file._id}
                    onClick={() => openFile(file)}
                    className="relative w-full px-5 py-3 flex items-center gap-x-4 hover:bg-[#3a3a3a] rounded-2xl cursor-pointer group"
                  >
                    <div className="px-1">{getFileIcon(file.extension)}</div>

                    <div className="w-full flex flex-col gap-y-1">
                      <div className="flex justify-between">
                        <div>
                          {file.name}.{file.extension}
                        </div>

                        <div className="invisible group-hover:visible text-[#ababab] text-sm">
                          {relative}
                        </div>
                      </div>

                      <div className="text-[#aaa] text-sm line-clamp-1 select-none">
                        {file.description && <div>{file.description}</div>}{" "}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchModal;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileOptionsMenu from "../Dropdowns/FileOptionsMenuDropdown.tsx";
import { getFileIcon } from "../getFileIcon.tsx";
import { useFileStore } from "../../stores/fileStore.ts";
import { useUIStore } from "../../stores/uiStore.ts";
import type { UserFile } from "../../stores/fileStore.ts";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal.tsx";
import ProfileIcon from "./ProfileIcon.tsx";
import { TbLayoutSidebar } from "react-icons/tb";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";

const Sidebar = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const activeFileId = slug?.split("--").pop();

  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [fileToDelete, setFileToDelete] = useState<UserFile | null>(null);
  const [fileInfo, setFileInfo] = useState<UserFile | null>(null);
  const [renameInput, setRenameInput] = useState("");

  const files = useFileStore((state) => state.files);
  const fetchFiles = useFileStore((state) => state.fetchFiles);
  const updateFile = useFileStore((state) => state.updateFile);
  const deleteFile = useFileStore((state) => state.deleteFile);

  const {
    toggleSidebar,
    toggleSearchModal,
    toggleNewFileModal,
    openFileInfoModal,
  } = useUIStore();

  const openFile = (file: UserFile) => {
    const slug = `${file.name}--${file._id}`;
    navigate(`/file/${slug}`);
  };

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  useEffect(() => {
    if (editingFileId) {
      const file = files.find((f) => f._id === editingFileId);
      if (file) {
        setRenameInput(file.name);
      }
    }
  }, [editingFileId, files]);

  return (
    <>
      <aside className="relative h-screen w-full flex flex-col bg-[#f1f1f1] dark:bg-[#151515] text-[#f1f1f1] overflow-hidden overflow-y-auto custom_scrollbar">
        {/* top - logo and sidebar toggle btn */}
        <div className="sticky top-0 w-full p-1 flex justify-between bg-inherit z-10">
          <div
            onClick={() => navigate("/")}
            className="p-2 text-lg font-mono cursor-pointer"
          >
            CodeBits
          </div>

          <button
            title="Close sidebar"
            onClick={toggleSidebar}
            className="p-2 text-[#bababa] hover:bg-[#3a3a3a] rounded-xl"
          >
            <TbLayoutSidebar className="w-6 h-6" />
          </button>
        </div>

        {/* middle - new-file btn, search-files btn and all files */}
        <div className="flex-1">
          {/* snippets list */}
          <div className="h-full p-1">
            <div className="flex flex-col">
              <button
                onClick={toggleNewFileModal}
                className="flex items-center p-2 rounded-xl hover:bg-[#2A2A2A] "
              >
                <HiMiniPencilSquare className="w-5 h-5 mx-2" />
                <span>New file</span>
              </button>

              <button
                onClick={toggleSearchModal}
                className="flex items-center p-2 rounded-xl hover:bg-[#2A2A2A] "
              >
                <IoSearch className="w-5 h-5 mx-2" />
                <span>Search files</span>
              </button>
            </div>

            <div className="p-3 text-[#8a8a8a]">Files</div>

            <ul className="pb-32">
              {files.map((file) => {
                const isActive = file._id === activeFileId;
                const isEditing = editingFileId === file._id;
                const sanitizedInput = renameInput.trim().replace(/\s+/g, "");

                const isDuplicateName =
                  isEditing &&
                  files.some(
                    (f) => f._id !== file._id && f.name === sanitizedInput
                  );

                return (
                  <li
                    key={file._id}
                    className={`w-full rounded-md px-2 text-sm leading-tight group flex justify-between items-center duration-300 ${
                      isActive
                        ? "bg-[#222] text-[#fff]"
                        : "text-[#bababa] hover:bg-[#2A2A2A]"
                    }`}
                  >
                    <button
                      onClick={() => openFile(file)}
                      className="w-full flex items-center gap-x-1 text-left p-1 rounded-xs overflow-hidden"
                    >
                      <span>{getFileIcon(file.extension)}</span>

                      {isEditing ? (
                        <div className="flex flex-col">
                          <input
                            type="text"
                            value={renameInput}
                            autoFocus
                            onChange={(e) => setRenameInput(e.target.value)}
                            onBlur={async () => {
                              if (
                                sanitizedInput &&
                                sanitizedInput !== file.name &&
                                !isDuplicateName
                              ) {
                                await updateFile(file._id, {
                                  name: sanitizedInput,
                                });

                                if (activeFileId === file._id) {
                                  const newSlug = `${sanitizedInput}--${file._id}`;
                                  navigate(`/file/${newSlug}`, {
                                    replace: true,
                                  });
                                }
                              }

                              setRenameInput("");
                              setEditingFileId(null);
                            }}
                            onKeyDown={async (e) => {
                              if (e.key === "Enter") {
                                if (
                                  sanitizedInput &&
                                  sanitizedInput !== file.name &&
                                  !isDuplicateName
                                ) {
                                  await updateFile(file._id, {
                                    name: sanitizedInput,
                                  });

                                  if (activeFileId === file._id) {
                                    const newSlug = `${sanitizedInput}--${file._id}`;
                                    navigate(`/file/${newSlug}`, {
                                      replace: true,
                                    });
                                  }
                                }
                                setRenameInput("");
                                setEditingFileId(null);
                              } else if (e.key === "Escape") {
                                setRenameInput("");
                                setEditingFileId(null);
                              }
                            }}
                            className="w-full bg-transparent text-white outline-none border border-gray-300 rounded px-1"
                          />

                          {isDuplicateName && (
                            <div className="text-xs leading-tight text-red-300 px-1 mt-1 text-center">
                              A file with this name already exists.
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="w-full mask-containerRight overflow-hidden">
                          {file.name}.{file.extension}
                        </span>
                      )}
                    </button>

                    <div className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <FileOptionsMenu
                        onRename={() => setEditingFileId(file._id)}
                        onDelete={() => setFileToDelete(file)}
                        onFileInfo={() => openFileInfoModal(file)}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* bottom - profile icon */}
        <div className="sticky bottom-0 w-full h-32 p-2 pt-10 flex justify-between items-end bg-inherit z-10 mask-containerTop">
          <div className="w-full py-1 px-2 rounded-xl flex justify-between bg-inherit hover:bg-[#2a2a2a] cursor-pointer">
            <ProfileIcon />
          </div>
        </div>
      </aside>

      <ConfirmDeleteModal
        open={!!fileToDelete}
        title={`Delete "${fileToDelete?.name}.${fileToDelete?.extension}" ?`}
        onCancel={() => setFileToDelete(null)}
        onConfirm={async () => {
          if (fileToDelete) {
            await deleteFile(fileToDelete._id);
            setFileToDelete(null);
          }
        }}
      />
    </>
  );
};

export default Sidebar;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileOptionsMenu from "../Dialogs/FileOptionsMenu.tsx";
import { getFileIcon } from "../getFileIcon.tsx";
import { useFileStore } from "../../stores/fileStore.ts";
import type { UserFile } from "../../stores/fileStore.ts";
import ConfirmDeleteDialog from "../Dialogs/ConfirmDeleteDialog.tsx";
import { FiSidebar } from "react-icons/fi";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  toggleSearchDialog: () => void;
  toggleNewFileDialog: () => void;
}

const Sidebar = ({
  sidebarOpen,
  toggleSidebar,
  toggleSearchDialog,
  toggleNewFileDialog,
}: SidebarProps) => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const activeFileId = slug?.split("--").pop();

  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [fileToDelete, setFileToDelete] = useState<UserFile | null>(null);
  const [renameInput, setRenameInput] = useState("");

  const files = useFileStore((state) => state.files);
  const fetchFiles = useFileStore((state) => state.fetchFiles);
  const updateFile = useFileStore((state) => state.updateFile);
  const deleteFile = useFileStore((state) => state.deleteFile);

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
      <aside className="h-full w-full p-2 bg-[#f1f1f1] dark:bg-[#151515] text-[#f1f1f1]">
        <div className="w-full flex justify-between">
          <div className="p-1">logo</div>

          <button
            title="Close sidebar"
            onClick={toggleSidebar}
            className="p-2 text-[#bababa] hover:bg-[#3a3a3a] rounded-xl"
          >
            <FiSidebar className="w-6 h-6" />
          </button>
        </div>

        <div className="h-full">
          {/* snippets list */}
          <div
            className="max-h-[calc(100vh-4rem)] overflow-y-auto mask-containerBottom"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="py-3 flex flex-col">
              <button
                onClick={toggleNewFileDialog}
                className="flex items-center p-2 rounded-xl hover:bg-[#2A2A2A] "
              >
                <HiMiniPencilSquare className="w-5 h-5 mx-2" />
                <span>New file</span>
              </button>

              <button
                onClick={toggleSearchDialog}
                className="flex items-center p-2 rounded-xl hover:bg-[#2A2A2A] "
              >
                <IoSearch className="w-5 h-5 mx-2" />
                <span>Search files</span>
              </button>
            </div>

            <div className="p-3 text-[#8a8a8a]">Files</div>

            <ul className="pb-40">
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
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>

      <ConfirmDeleteDialog
        open={!!fileToDelete}
        title={`Delete "${fileToDelete?.name}"?`}
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

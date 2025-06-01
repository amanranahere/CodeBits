import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileOptionsMenu from "../Dialogs/FileOptionsMenu.tsx";
import { getFileIcon } from "../getFileIcon.tsx";
import { useFileStore } from "../../stores/fileStore.ts";
import type { UserFile } from "../../stores/fileStore.ts";
import ConfirmDeleteDialog from "../Dialogs/ConfirmDeleteDialog.tsx";

const Sidebar = () => {
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
      <aside className="w-full lg:w-[20%] bg-[#f1f1f1] dark:bg-[#212121] text-[#f1f1f1] rounded-3xl">
        <div className="h-full mask-containerBottom">
          <div className="w-full text-lg dark:bg-[#191919] p-2 rounded-t-3xl">
            <p className="text-sm text-center font-bold">FILES</p>
          </div>

          {/* snippets list */}
          <div
            className="max-h-[calc(100vh-4rem)] overflow-y-auto p-1"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <ul className="p-1 pb-40">
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
                        ? "bg-[#6a6a6a] text-white"
                        : "text-[#bababa] hover:bg-[#4a4a4a]"
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

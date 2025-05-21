import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileOptionsMenu from "../Dialogs/FileOptionsMenu.tsx";
import { getFileIcon } from "../getFileIcon.tsx";
import { useFileStore } from "../../stores/fileStore.ts";
import type { UserFile } from "../../stores/fileStore.ts";
import ConfirmDeleteDialog from "../Dialogs/ConfirmDeleteDialog.tsx";

const Sidebar = () => {
  const navigate = useNavigate();
  const { filename } = useParams();

  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [fileToDelete, setFileToDelete] = useState<UserFile | null>(null);

  const files = useFileStore((state) => state.files);
  const fetchFiles = useFileStore((state) => state.fetchFiles);
  const updateFile = useFileStore((state) => state.updateFile);
  const deleteFile = useFileStore((state) => state.deleteFile);

  const openFile = (file: string) => {
    navigate(`/file/${file}`);
  };

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

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
                const isActive = file.name === filename;

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
                      onClick={() => openFile(file.name)}
                      className="w-full flex items-center gap-x-1 text-left p-1 rounded-xs overflow-hidden"
                    >
                      <span>{getFileIcon(file.extension)}</span>

                      {editingFileId === file._id ? (
                        <input
                          type="text"
                          defaultValue={file.name}
                          autoFocus
                          onBlur={async (e) => {
                            const newName = e.target.value.trim();
                            if (newName && newName !== file.name) {
                              await updateFile(file._id, { name: newName });
                            }
                            setEditingFileId(null);
                          }}
                          onKeyDown={async (e) => {
                            if (e.key === "Enter") {
                              const newName = (
                                e.target as HTMLInputElement
                              ).value.trim();
                              if (newName && newName !== file.name) {
                                await updateFile(file._id, { name: newName });
                              }
                              setEditingFileId(null);
                            } else if (e.key === "Escape") {
                              setEditingFileId(null);
                            }
                          }}
                          className="w-full bg-transparent text-white outline-none border border-gray-300 rounded px-1"
                        />
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

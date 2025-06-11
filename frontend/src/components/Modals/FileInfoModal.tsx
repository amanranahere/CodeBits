import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFileStore, type UserFile } from "../../stores/fileStore.ts";
import { useUIStore } from "../../stores/uiStore.ts";
import { MdModeEdit } from "react-icons/md";
import { formatDateTime } from "../../utils/formatDateTime.tsx";
import { IoClose } from "react-icons/io5";

const FileInfoModal = ({ file: passedFile }: { file?: UserFile }) => {
  const { slug } = useParams();
  const { closeFileInfoModal } = useUIStore();

  const files = useFileStore((state) => state.files);
  const updateFile = useFileStore((state) => state.updateFile);
  const navigate = useNavigate();

  const fileIdFromSlug = slug?.split("--").pop();
  const fallbackFile = files.find((f) => f._id === fileIdFromSlug);

  const file = passedFile || fallbackFile;

  const [editingTitle, setEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(file?.name || "");

  const [editingExtension, setEditingExtension] = useState(false);
  const [extensionInput, setExtensionInput] = useState(file?.extension || "");

  const [editingDescription, setEditingDescription] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState(
    file?.description || ""
  );

  if (!file) {
    return (
      <div className="w-full md:w-[250px] text-gray-500 dark:text-gray-400 bg-[#f1f1f1] dark:bg-[#212121] rounded-3xl flex justify-center items-center italic">
        Open a file to view its details...
      </div>
    );
  }

  const isDuplicateName = files.some(
    (f) =>
      f._id !== file._id && f.name === titleInput.trim().replace(/\s+/g, "")
  );

  const handleTitleUpdate = async () => {
    const newName = titleInput.trim();
    if (newName && newName !== file.name && !isDuplicateName) {
      await updateFile(file._id, { name: newName });
      const newSlug = `${newName}--${file._id}`;
      navigate(`/file/${newSlug}`, { replace: true });
    }
    setEditingTitle(false);
  };

  const { full, relative } = formatDateTime(file.updatedAt);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[60%] max-w-[600px] h-[80%] rounded-[20px] shadow-lg dark:bg-[#303030] dark:text-white flex flex-col overflow-hidden">
      <div
        onClick={closeFileInfoModal}
        className="absolute top-5 lg:top-6 right-5 lg:right-6 p-1 hover:bg-[#4a4a4a] text-[#9a9a9a] hover:text-[#f1f1f1] rounded-full cursor-pointer z-10 duration-100"
      >
        <IoClose className="w-6 h-6" />
      </div>

      <div className="w-full pl-7 py-6 text-lg lg:text-xl font-semibold">
        File Info
      </div>

      <hr className="my-1 mx-3 border-[#e5e7eb] dark:border-[#4a4a4a]" />

      <div className="p-4 md:p-6 flex flex-col gap-y-8 font-mono">
        {/*   title   */}
        <div className="relative group">
          <div
            title="Edit"
            onClick={() => {
              setEditingTitle(true);
              setTitleInput(file.name);
            }}
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity dark:text-[#fff] cursor-pointer z-10"
          >
            <MdModeEdit className="w-4 h-4" />
          </div>

          <div className="text-gray-700 dark:text-[#8c8c8c] font-bold select-none">
            TITLE
          </div>

          {editingTitle ? (
            <>
              <input
                type="text"
                value={titleInput}
                autoFocus
                onChange={(e) => setTitleInput(e.target.value)}
                onBlur={handleTitleUpdate}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    await handleTitleUpdate();
                  } else if (e.key === "Escape") {
                    setEditingTitle(false);
                  }
                }}
                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 text-black dark:text-white px-1 rounded outline-none"
              />

              {editingTitle && isDuplicateName && (
                <div className="text-xs leading-tight text-red-600 px-1 mt-1 text-center">
                  A file with this name already exists.
                </div>
              )}
            </>
          ) : (
            <div>{file.name}</div>
          )}
        </div>

        {/*   file type   */}
        <div className="relative group">
          <div
            title="Edit"
            onClick={() => {
              setEditingExtension(true);
              setExtensionInput(file.extension);
            }}
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity dark:text-[#fff] cursor-pointer z-10"
          >
            <MdModeEdit className="w-4 h-4" />
          </div>

          <div className="text-gray-700 dark:text-[#8c8c8c] font-bold select-none">
            FILE TYPE
          </div>

          {editingExtension ? (
            <>
              <input
                type="text"
                value={extensionInput}
                autoFocus
                onChange={(e) => setExtensionInput(e.target.value)}
                onBlur={async () => {
                  const newExt = extensionInput.trim();
                  if (newExt && newExt !== file.extension) {
                    await updateFile(file._id, { extension: newExt });
                  }
                  setEditingExtension(false);
                }}
                onKeyDown={async (e) => {
                  if (e.key === "Enter" && !isDuplicateName) {
                    const newExt = extensionInput.trim().toLowerCase();
                    if (newExt && newExt !== file.extension) {
                      await updateFile(file._id, { extension: newExt });
                    }
                    setEditingExtension(false);
                  } else if (e.key === "Escape") {
                    setEditingExtension(false);
                  }
                }}
                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 text-black dark:text-white px-1 rounded outline-none"
              />

              {editingTitle && isDuplicateName && (
                <div className="text-xs leading-tight text-red-600 px-1 mt-1 text-center">
                  A file with this name already exists.
                </div>
              )}
            </>
          ) : (
            <div>{file.extension}</div>
          )}
        </div>

        {/*   description   */}
        <div className="relative group">
          <div
            title="Edit"
            onClick={() => {
              setEditingDescription(true);
              setDescriptionInput(file.description || "");
            }}
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity dark:text-[#fff] cursor-pointer z-10"
          >
            <MdModeEdit className="w-4 h-4" />
          </div>

          <div className="text-gray-700 dark:text-[#8c8c8c] font-bold select-none">
            DESCRIPTION
          </div>

          {editingDescription ? (
            <textarea
              value={descriptionInput}
              autoFocus
              rows={5}
              onChange={(e) => setDescriptionInput(e.target.value)}
              onBlur={async () => {
                const newDesc = descriptionInput.trim();
                if (newDesc !== file.description) {
                  await updateFile(file._id, { description: newDesc });
                }
                setEditingDescription(false);
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const newDesc = descriptionInput.trim();
                  if (newDesc !== file.description) {
                    await updateFile(file._id, { description: newDesc });
                  }
                  setEditingDescription(false);
                } else if (e.key === "Escape") {
                  setEditingDescription(false);
                }
              }}
              className="w-full bg-transparent border border-gray-300 dark:border-gray-600 text-black dark:text-white px-1 rounded outline-none resize-none"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            />
          ) : (
            <div
              className="max-h-[7.5rem] overflow-y-auto"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {file.description || (
                <span className="italic text-gray-500">
                  No file description
                </span>
              )}
            </div>
          )}
        </div>

        {/*   last edited   */}
        <div>
          <div className="text-gray-700 dark:text-[#8c8c8c] font-bold select-none">
            LAST EDITED
          </div>
          <div>
            <div>{full}</div>
            <div className="italic">({relative})</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileInfoModal;

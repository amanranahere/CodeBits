import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFileStore } from "../../stores/fileStore.ts";
import { MdModeEdit } from "react-icons/md";
import { formatDateTime } from "../../utils/formatDateTime.tsx";

const FilePanel = () => {
  const { filename } = useParams();
  const files = useFileStore((state) => state.files);
  const updateFile = useFileStore((state) => state.updateFile);

  const file = files.find((f) => f.name === filename);

  const [editingTitle, setEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(file?.name || "");

  const [editingExtension, setEditingExtension] = useState(false);
  const [extensionInput, setExtensionInput] = useState(file?.extension || "");

  const [editingDescription, setEditingDescription] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState(
    file?.description || ""
  );

  if (!filename || !file) {
    return (
      <div className="lg:w-[20%] text-gray-500 dark:text-gray-400 bg-[#f1f1f1] dark:bg-[#212121] rounded-3xl flex justify-center items-center italic">
        Open a file to view its details...
      </div>
    );
  }

  const isDuplicateName = files.some(
    (f) =>
      f._id !== file._id && f.name === titleInput.trim().replace(/\s+/g, "")
  );

  const { full, relative } = formatDateTime(file.updatedAt);

  return (
    <div className="relative lg:w-[20%] bg-[#f1f1f1] dark:bg-[#212121] text-[#f1f1f1] rounded-3xl">
      <div className="p-4 flex flex-col gap-y-8 font-mono">
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
                onBlur={async () => {
                  const newName = titleInput.trim();
                  if (newName && newName !== file.name && !isDuplicateName) {
                    await updateFile(file._id, { name: newName });
                  }
                  setEditingTitle(false);
                }}
                onKeyDown={async (e) => {
                  if (e.key === "Enter" && !isDuplicateName) {
                    const newName = titleInput.trim();
                    if (newName && newName !== file.name) {
                      await updateFile(file._id, { name: newName });
                    }
                    setEditingTitle(false);
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
              rows={8}
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
              className="max-h-[10rem] overflow-y-auto"
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

      <div className="absolute -bottom-8 -translate-x-3  tracking-tighter leading-none text-[clamp(7rem,12.5vw,12.5rem)] font-extrabold text-[#ffffff14] oswald-text select-none">
        INFO
      </div>
    </div>
  );
};

export default FilePanel;

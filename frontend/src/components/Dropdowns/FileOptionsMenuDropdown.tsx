import { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { MdModeEdit, MdDeleteOutline } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useClickOutside } from "../../utils/useClickOutside";

const FileOptionsMenuDropdown = ({
  onRename,
  onDelete,
  onFileInfo,
}: {
  onRename: () => void;
  onDelete: () => void;
  onFileInfo: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-[#bababa] hover:brightness-150"
      >
        <PiDotsThreeOutlineFill />
      </button>

      {open && (
        <div className="absolute -right-1 w-32 p-1 bg-white dark:bg-[#303030] shadow-md rounded-xl flex flex-col text-sm z-[500]">
          <button
            onClick={() => {
              onFileInfo();
              setOpen(false);
            }}
            className="px-3 py-2 rounded-xl hover:bg-[#4a4a4a] active:brightness-110  text-left flex items-center gap-x-2"
          >
            <IoInformationCircleOutline className="w-5 h-5" />
            <span>Info</span>
          </button>

          <button
            onClick={() => {
              onRename();
              setOpen(false);
            }}
            className="px-3 py-2 rounded-xl hover:bg-[#4a4a4a] active:brightness-110  text-left flex items-center gap-x-2"
          >
            <MdModeEdit className="w-4 h-4" />
            <span>Rename</span>
          </button>

          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="px-3 py-2 rounded-xl text-red-300 hover:bg-red-200/25 active:brightness-110 text-left flex items-center gap-x-2"
          >
            <MdDeleteOutline className="w-5 h-5" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FileOptionsMenuDropdown;

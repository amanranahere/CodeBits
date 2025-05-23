import { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

const FileOptionsMenu = ({
  onRename,
  onDelete,
}: {
  onRename: () => void;
  onDelete: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-[#bababa] hover:brightness-150"
      >
        <PiDotsThreeOutlineFill />
      </button>

      {open && (
        <div className="absolute -right-3 w-32 p-1 bg-white dark:bg-[#191919] shadow-md rounded-md flex flex-col text-sm z-50">
          <button
            onClick={() => {
              onRename();
              setOpen(false);
            }}
            className="px-3 py-1 rounded-md hover:bg-gray-100 active:brightness-110 dark:hover:bg-[#2a2a2a] text-left"
          >
            Rename
          </button>

          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="px-3 py-1 rounded-md hover:bg-gray-100 active:brightness-110 dark:hover:bg-[#2a2a2a] text-left"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default FileOptionsMenu;

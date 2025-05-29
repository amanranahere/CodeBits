import { useEffect, useRef, useState } from "react";
import useSearchFiles from "../../hooks/file/useSearchFiles";
import { IoClose } from "react-icons/io5";
import { VscNewFile } from "react-icons/vsc";

function SearchDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const { searchFiles, loading, results } = useSearchFiles();

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
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="w-[50%] h-[65%] fixed inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[99] rounded-[20px] shadow-lg dark:bg-[#2a2a2a] dark:text-white"
    >
      <div
        onClick={() => onClose()}
        className="absolute top-5 right-5 p-1 hover:bg-[#6a6a6a] text-[#7a7a7a] hover:text-[#f1f1f1] rounded-full cursor-pointer z-10"
      >
        <IoClose className="w-6 h-6" />
      </div>

      <input
        type="text"
        placeholder="Search file..."
        className="w-full pl-7 pr-20 py-6 lg:text-lg bg-[#2a2a2a] rounded-t-[20px] outline-none"
      />

      <div className="border-b border-[#6a6a6a]"></div>

      <div className="p-2">
        <button className="w-full px-5 py-3 flex items-center gap-x-4 hover:bg-[#3a3a3a] rounded-2xl">
          <VscNewFile className="w-5 h-5" />
          <p>New File</p>
        </button>
      </div>
    </div>
  );
}

export default SearchDialog;

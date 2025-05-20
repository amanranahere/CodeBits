import { IoSearch } from "react-icons/io5";

function SearchBar() {
  return (
    <div className="relative flex-1 dark:bg-[#1f1f1f] rounded-[1.2rem] flex group">
      <div className="py-4 pl-4 flex items-center justify-center  dark:text-[#ffffff6a] dark:group-hover:text-[#ffffff79] dark:group-focus-within:text-[#ffffff79] text-2xl">
        <IoSearch />
      </div>

      <input
        type="text"
        // placeholder="Search..."
        className="h-14 w-full px-4 dark:bg-[#1f1f1f] duration-300 dark:text-[#f1f1f1] text-white rounded-[1.2rem] outline-none"
      />

      <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[5rem] font-extrabold oswald-text z-0 pointer-events-none select-none leading-none tracking-tighter text-[#1f1f1f09] group-hover:text-[#1f1f1f14] group-hover-within:text-[#1f1f1f14] dark:text-[#ffffff09] dark:group-hover:text-[#ffffff14] dark:group-focus-within:text-[#ffffff14] transition duration-300 ease-in-out">
        SEARCH
      </div>
    </div>
  );
}

export default SearchBar;

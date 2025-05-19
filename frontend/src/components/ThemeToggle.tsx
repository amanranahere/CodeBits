import { useState, useEffect } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <button
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="text-[#5c5c5c] dark:text-[#bababa] cursor-pointer hover:brightness-150 dark:hover:brightness-125 duration-200 hover:scale-110"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? (
        <MdLightMode className="w-6 h-6" />
      ) : (
        <MdDarkMode className="w-6 h-6" />
      )}
    </button>
  );
}

export default DarkModeToggle;

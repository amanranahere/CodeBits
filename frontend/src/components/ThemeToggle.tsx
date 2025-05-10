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
      className="text-[#5c5c5c] dark:text-[#bababa] cursor-pointer text-lg  hover:brightness-150 dark:hover:brightness-125 duration-300"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? <MdLightMode /> : <MdDarkMode />}
    </button>
  );
}

export default DarkModeToggle;

import { useState, useEffect } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <button
      className="text-[#bababa] cursor-pointer"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
}

export default DarkModeToggle;

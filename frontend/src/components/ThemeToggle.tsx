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
      className="text-[#bababa] cursor-pointer text-lg"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? <MdLightMode /> : <MdDarkMode />}
    </button>
  );
}

export default DarkModeToggle;

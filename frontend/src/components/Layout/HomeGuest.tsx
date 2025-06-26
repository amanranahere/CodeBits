import { useUIStore } from "../../stores/uiStore";
import { IoFingerPrintOutline } from "react-icons/io5";
import ShortcutSection from "../Home/ShortcutSection";
import LandingSection from "../Home/LandingSection";
import SignupSection from "../Home/SignupSection";

export default function HomeGuest() {
  const { toggleLogin } = useUIStore();
  return (
    <div className="w-full">
      <div className="sticky top-0 left-0 w-full bg-yellow-300 text-zinc-900 text-sm text-center font-mono font-medium py-1">
        Designing the homepage — updates soon.
      </div>

      <div
        onClick={toggleLogin}
        className="fixed top-1 right-1 md:top-8 md:right-10 py-2 px-4 flex justify-center items-center gap-x-1 md:gap-x-2 rounded-full hover:bg-[#2a2a2a] active:bg-[#3a3a3a] duration-150 cursor-pointer select-none hover:brightness-150"
      >
        <IoFingerPrintOutline className="w-4 h-4 md:w-5 md:h-5 " />
        <span className="text-sm md:text-base">Login</span>
      </div>

      <LandingSection />

      <ShortcutSection />

      <SignupSection />
    </div>
  );
}

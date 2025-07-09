import { useUIStore } from "../../stores/uiStore";
import { IoFingerPrintOutline } from "react-icons/io5";
import KeyboardShortcutSection from "./KeyboardShortcutSection";
import LandingSection from "./LandingSection";
import SignupSection from "./SignupSection";
import LanguageSupportSection from "./LanguageSupportSection";
import UsageSection from "./UsageSection";
import TypingTextAnimation from "../Animation/TypingTextAnimation";
import { motion } from "framer-motion";

export default function HomeGuest() {
  const { toggleLogin, loginOpen, signupOpen } = useUIStore();

  return (
    <div className="w-full min-w-[300px]">
      <div className="sticky top-0 left-0 z-[9999] w-full bg-yellow-300 text-zinc-900 text-sm text-center font-mono font-medium py-1">
        Designing the homepage — updates soon.
      </div>

      {(window.innerWidth > 640 || (!loginOpen && !signupOpen)) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
          onClick={toggleLogin}
          className="fixed top-1 right-1 md:top-8 md:right-12 z-[99] py-2 px-4 flex justify-center items-center gap-x-1 md:gap-x-2 rounded-full bg-[#151515] hover:bg-[#2a2a2a] active:bg-[#3a3a3a] duration-150 cursor-pointer select-none hover:brightness-150"
        >
          <IoFingerPrintOutline className="w-4 h-4 md:w-5 md:h-5 " />
          <span className="text-sm md:text-base">Login</span>
        </motion.div>
      )}

      <div className="relative h-[200vh]">
        <div className="sticky top-0 h-screen z-0">
          <LandingSection />
        </div>

        {/* video */}
        <div className="relative top-0 left-0 z-10 w-full h-screen flex justify-center items-center">
          <video className="w-[90%] md:w-[70%] h-auto" autoPlay loop muted>
            <source src="/CodeBitsVid.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <LanguageSupportSection />

      <KeyboardShortcutSection />

      <UsageSection />

      <SignupSection />

      {/* footer */}
      <div className="w-full flex justify-center items-center text-[#bababa] font-semibold">
        <TypingTextAnimation text="Developed by amanrana" />
      </div>
    </div>
  );
}

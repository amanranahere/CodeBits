import { useUIStore } from "../../stores/uiStore";
import { IoFingerPrintOutline } from "react-icons/io5";
import HeroSection from "./Hero/HeroSection";
import IntroSection from "./Intro/IntroSection";
import FeatureSection from "./Features/FeaturesSection";
import SnippetsShowcase from "./SnippetShowcase/SnippetShowcaseSection";
import SignupCTASection from "./SignupCTA/SignupCTASection";
import Footer from "./Footer/Footer";
import { motion } from "framer-motion";

export default function HomeGuest() {
  const { toggleLogin, loginOpen, signupOpen } = useUIStore();

  return (
    <div className="h-full w-full min-w-[300px] overflow-auto no-scrollbar ">
      <div className="sticky top-0 left-0 z-[9999] w-full bg-yellow-300 text-zinc-900 text-sm text-center font-mono font-medium py-1">
        Designing the homepage — updates soon.
      </div>

      {/*  login btn  */}
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

      <HeroSection />

      <IntroSection />

      <FeatureSection />

      <SnippetsShowcase />

      <SignupCTASection />

      <Footer />
    </div>
  );
}

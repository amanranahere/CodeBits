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
      {/*  login btn  */}
      {(window.innerWidth > 640 || (!loginOpen && !signupOpen)) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          viewport={{ once: true }}
          onClick={toggleLogin}
          className="fixed top-1 right-1 md:top-8 md:right-12 z-[99] py-2 px-4 flex justify-center items-center gap-x-1 md:gap-x-2 rounded-full bg-[#ffffff06] backdrop-blur-sm shadow-[inset_0_0_8vw_hsla(0,0%,100%,0.05)] cursor-pointer transition-shadow duration-300 hover:shadow-[inset_0_0_8vw_hsla(0,0%,100%,0.15)] select-none"
        >
          <IoFingerPrintOutline className="w-4 h-4 md:w-5 md:h-5 " />
          <span className="text-sm md:text-base">Login</span>
        </motion.div>
      )}

      <div id="hero">
        <HeroSection />
      </div>

      <div id="intro">
        <IntroSection />
      </div>

      <div id="features">
        <FeatureSection />
      </div>

      <div className="relative h-[250vh]">
        <div className="sticky top-0 h-screen z-0">
          <SignupCTASection />
        </div>

        <div id="showcase" className="absolute top-0 left-0 w-full z-10">
          <SnippetsShowcase />

          <div className="absolute bottom-[-4rem] left-0 w-full h-24 blur-3xl bg-white/20 pointer-events-none"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

import { motion } from "framer-motion";
import { IoArrowForwardCircleSharp } from "react-icons/io5";

export default function LandingSection() {
  const scrollToSection = () => {
    const section = document.getElementById("intro");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center gap-y-5 px-4 md:px-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        viewport={{ once: true }}
        className="text-center text-white/90"
      >
        <span className="font-mono text-white md:text-2xl font-bold select-none">
          <span className="text-neutral-100">Code</span>
          <span className="text-[#bababa]">{"{"}</span>
          <span className="text-neutral-100">Bits</span>
          <span className="text-[#bababa]">{"}"}</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl lg:text-7xl font-extrabold flex flex-col justify-center items-center text-center bg-gradient-to-br from-white via-white to-[#222] bg-clip-text text-transparent pb-3"
      >
        The organized home <br className="hidden md:block" /> for your code
        snippets
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        viewport={{ once: true }}
        className="w-full lg:w-[40%] lg:min-w-[630px] text-sm md:text-lg text-[#bababa] font-semibold text-center leading-snug"
      >
        No more digging through old projects or scattered files. Save snippets
        once, find them instantly, and keep building without interruptions.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        viewport={{ once: true }}
        onClick={scrollToSection}
        className="select-none rounded-full text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)]
        hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] backdrop-blur-md transition-all duration-300 ease-out h-10 mt-3 flex justify-center items-center gap-x-2 pl-5 pr-1 outline-none group"
      >
        <span>See More</span>
        <IoArrowForwardCircleSharp className="w-8 h-8 text-[#f1f1f1] -rotate-45 group-hover:rotate-90 duration-500" />
      </motion.button>
    </div>
  );
}

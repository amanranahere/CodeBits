import { motion } from "framer-motion";

export default function LandingSection() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center gap-y-8 px-4 md:px-10 overflow-hidden">
      <div className="absolute top-[-150px] right-[-150px] w-[700px] h-[700px] bg-white opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl lg:text-7xl font-extrabold flex flex-col justify-center items-center text-center"
      >
        <span>The organized home</span>
        <span>for your code snippets</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        viewport={{ once: true }}
        className="w-full lg:w-[40%] lg:min-w-[630px] md:text-lg text-[#bababa] font-semibold text-center leading-tight"
      >
        No more digging through old projects or scattered files. Save snippets
        once, find them instantly, and keep building without interruptions.
      </motion.p>
    </div>
  );
}

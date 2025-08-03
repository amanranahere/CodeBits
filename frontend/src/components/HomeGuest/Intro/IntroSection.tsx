import { IoPlayCircleOutline } from "react-icons/io5";
import { motion } from "framer-motion";

export default function IntroSection() {
  return (
    <section className="relative w-full bg-black text-white md:py-20 flex flex-col items-center justify-center gap-y-2 lg:gap-y-6 ">
      <div className="w-full flex flex-col justify-center items-center px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "linear", delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex items-center justify-center gap-x-1 px-3 py-1 text-xs lg:text-sm text-[#ffffff80] rounded-full shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),_inset_0_0_1vw_hsla(0,0%,100%,0.2)] select-none"
        >
          <IoPlayCircleOutline className="w-3 h-3 lg:w-4 lg:h-4" />
          <span>Overview</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "linear" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl md:text-5xl font-extrabold text-center bg-gradient-to-br from-white via-white to-[#666] bg-clip-text text-transparent py-2 md:py-3"
        >
          One place for every <br /> snippet you care about
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "linear", delay: 0.4 }}
          viewport={{ once: true, amount: 0.2 }}
          className="w-full lg:w-[50%] text-[#bababa] text-sm md:text-lg font-medium text-center leading-tight mt-4"
        >
          See how CodeBits keeps your snippets organized, searchable and ready
          to use exactly when you need them.
        </motion.p>
      </div>

      {/*  video  */}
      <div className="w-full relative z-10 mt-6 md:mt-10">
        <div className="absolute top-0 left-0 w-full h-24 blur-3xl bg-white/30"></div>

        <video
          className="relative w-full h-auto"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/CodeBitsSampleVideo.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

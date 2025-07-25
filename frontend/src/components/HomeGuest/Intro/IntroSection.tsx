import { IoPlayCircleOutline } from "react-icons/io5";
import { motion } from "framer-motion";

export default function IntroSection() {
  return (
    <section className="relative w-full bg-black text-white py-16 md:py-24 lg:py-28 px-4 md:px-10 flex flex-col items-center justify-center gap-y-2 lg:gap-y-6 overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-y-3">
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
          className="text-3xl md:text-5xl font-extrabold text-center"
        >
          One place for every <br /> snippet you care about
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "linear", delay: 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full lg:w-[45%] text-[#bababa] text-lg font-medium text-center leading-tight"
      >
        See how CodeBits keeps your snippets organized, searchable and ready to
        use exactly when you need them.
      </motion.p>

      {/*  video  */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
          type: "tween",
        }}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full lg:w-[80%] relative z-10 p-2 lg:p-3 mt-4  flex justify-center items-center perspective-[1200px] border-2 border-[#d6ebfd30] rounded-[25px]"
      >
        <video
          className="w-full h-full rounded-[25px] shadow-lg"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/CodeBitsVid.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </section>
  );
}

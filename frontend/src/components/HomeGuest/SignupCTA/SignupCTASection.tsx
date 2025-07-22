import { useUIStore } from "../../../stores/uiStore";
import { motion } from "framer-motion";

export default function SignupCTASection() {
  const { toggleSignup, toggleLogin } = useUIStore();

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-6 md:gap-y-10">
      <div className="text-2xl md:text-5xl font-extrabold text-center flex flex-col justify-center items-center md:gap-y-2">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 1 }}
        >
          If it's good enough to reuse,
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 1 }}
        >
          it's good enough to save.
        </motion.h1>
      </div>

      <div className="flex justify-center items-center gap-x-4 md:gap-x-8">
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
          viewport={{ once: true, amount: 1 }}
          onClick={toggleSignup}
          className="px-10 md:px-16 py-2 flex justify-center items-center gap-x-1 md:gap-x-2 rounded-full bg-[#ffffff06] backdrop-blur-sm shadow-[inset_0_0_8vw_hsla(0,0%,100%,0.05)] cursor-pointer transition-shadow duration-300 hover:shadow-[inset_0_0_8vw_hsla(0,0%,100%,0.15)] font-semibold"
        >
          Sign Up
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
          viewport={{ once: true, amount: 1 }}
          onClick={toggleLogin}
          className="px-10 md:px-16 py-2 flex justify-center items-center gap-x-1 md:gap-x-2 rounded-full bg-[#ffffff06] backdrop-blur-sm shadow-[inset_0_0_8vw_hsla(0,0%,100%,0.05)] cursor-pointer transition-shadow duration-300 hover:shadow-[inset_0_0_8vw_hsla(0,0%,100%,0.15)] font-semibold"
        >
          Log In
        </motion.button>
      </div>
    </div>
  );
}

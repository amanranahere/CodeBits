import { useUIStore } from "../../stores/uiStore";
import { motion } from "framer-motion";

export default function SignupSection() {
  const { toggleSignup, toggleLogin } = useUIStore();

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-6 md:gap-y-10">
      <div className="text-2xl md:text-5xl font-bold text-center flex flex-col justify-center items-center md:gap-y-2">
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
          className="px-10 md:px-16 py-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] active:bg-[#3a3a3a] rounded-full whitespace-nowrap"
        >
          Sign Up
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
          viewport={{ once: true, amount: 1 }}
          onClick={toggleLogin}
          className="px-10 md:px-16 py-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] active:bg-[#3a3a3a] rounded-full whitespace-nowrap"
        >
          Log In
        </motion.button>
      </div>
    </div>
  );
}

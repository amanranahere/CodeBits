import { useUIStore } from "../../../stores/uiStore";
import { motion } from "framer-motion";

export default function SignupCTASection() {
  const { toggleSignup, toggleLogin } = useUIStore();

  return (
    <section className="flex flex-col justify-center items-center gap-y-6 md:gap-y-10 py-16 mb-20 lg:mb-16 md:py-24 lg:py-28 px-4 md:px-10">
      <div className="flex flex-col justify-center items-center gap-y-3  md:gap-y-6 text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "linear" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-2xl md:text-5xl font-extrabold"
        >
          If it's good enough to reuse,
          <br />
          it's good enough to save.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "linear", delay: 0.4 }}
          viewport={{ once: true, amount: 0.2 }}
          className="w-full lg:w-[45%] text-[#bababa] text-lg font-medium text-center leading-tight"
        >
          Some snippets are worth saving because you use them everywhere. Store
          them once in CodeBits and they'll always be ready when you need them
          again.
        </motion.p>

        {/*  login/signup buttons  */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "linear", delay: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex justify-center items-center gap-x-3 md:gap-x-8"
        >
          <button
            onClick={toggleSignup}
            className="select-none rounded-2xl text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)]
            hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] backdrop-blur-md transition-all duration-300 ease-out h-10 lg:h-12 px-10 md:px-16"
          >
            Sign Up
          </button>

          <button
            onClick={toggleLogin}
            className="select-none rounded-2xl text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)]
            hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] backdrop-blur-md transition-all duration-300 ease-out h-10 lg:h-12 px-10 md:px-16"
          >
            Log In
          </button>
        </motion.div>
      </div>
    </section>
  );
}

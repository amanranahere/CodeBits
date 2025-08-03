import { useUIStore } from "../../../stores/uiStore";
import { motion } from "framer-motion";
import { IoPersonCircleOutline, IoFingerPrintOutline } from "react-icons/io5";

export default function SignupCTASection() {
  const { toggleSignup, toggleLogin } = useUIStore();

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center  py-16 mb-20 lg:mb-16 md:py-24 lg:py-28 px-4 md:px-10 bg-black">
      <div className="flex flex-col justify-center items-center text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "linear" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl md:text-5xl font-extrabold bg-gradient-to-br from-white via-white to-[#666] bg-clip-text text-transparent py-3 md:py-6"
        >
          If it's good enough to reuse,&nbsp;
          <br className="hidden md:block" />
          it's good enough to save.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "linear", delay: 0.4 }}
          viewport={{ once: true, amount: 0.2 }}
          className="w-full lg:w-[52%] text-[#bababa] text-sm md:text-lg font-medium text-center leading-tight"
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
          className="flex justify-center items-center gap-x-3 md:gap-x-8 mt-6"
        >
          <button
            onClick={toggleSignup}
            className="select-none rounded-full text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)]
            hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] backdrop-blur-md transition-all duration-300 ease-out h-10 flex justify-center items-center gap-x-3 pr-6 pl-2 outline-none group"
          >
            <IoPersonCircleOutline className="w-6 h-6 text-[#f1f1f1]  duration-500" />
            <span>Sign Up</span>
          </button>

          <button
            onClick={toggleLogin}
            className="select-none rounded-full text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)]
            hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] backdrop-blur-md transition-all duration-300 ease-out h-10 flex justify-center items-center gap-x-3 pr-8 pl-2 outline-none group"
          >
            <IoFingerPrintOutline className="w-6 h-6 text-[#f1f1f1]  duration-500" />
            <span>Log In</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

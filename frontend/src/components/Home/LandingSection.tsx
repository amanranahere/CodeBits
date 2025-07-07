import { motion } from "framer-motion";

export default function LandingSection() {
  return (
    <motion.div className="h-full flex flex-col justify-center items-center gap-y-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold flex flex-col justify-center items-center text-center"
      >
        <span>The definitive hub</span>
        <span>for your code snippets</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
        className="w-[90%] md:w-[70%] lg:w-[40%] md:text-lg text-[#bababa] font-semibold text-center"
      >
        Store and label snippets as you code. Find exactly what you need with
        one click. All your snippets live in a single reliable place so you can
        spend more time building and less time searching.
      </motion.p>
    </motion.div>
  );
}

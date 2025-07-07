import {
  DiJavascript1,
  DiReact,
  DiPython,
  DiNodejsSmall,
  DiJava,
  DiPhp,
  DiGo,
  DiMarkdown,
} from "react-icons/di";
import { SiRust, SiGnubash, SiTypescript } from "react-icons/si";
import { motion } from "framer-motion";

const SlideLeftAnimation = ({
  delay,
  children,
}: {
  delay: number;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4 }}
    viewport={{ once: true, amount: 1 }}
  >
    {children}
  </motion.div>
);

const SlideRightAnimation = ({
  delay,
  children,
}: {
  delay: number;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4 }}
    viewport={{ once: true, amount: 1 }}
  >
    {children}
  </motion.div>
);

export default function LanguageSupportSection() {
  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center gap-y-10">
      {/* title and subtext */}
      <div className="flex flex-col justify-center items-center px-3 md:px-0 w-full md:max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 1 }}
          className="text-3xl md:text-5xl font-bold pb-3 md:pb-5"
        >
          Built for your language
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true, amount: 1 }}
          className="w-[92%] md:text-lg text-[#bababa] font-semibold text-center"
        >
          CodeBits is built to support the languages you work with, offering
          accurate syntax highlighting and a consistent editing experience that
          adapts to your workflow.
        </motion.p>
      </div>

      {/* icons */}
      <div className="relative">
        <div className="flex flex-wrap justify-center items-center gap-6 pt-4">
          <SlideLeftAnimation delay={0.7}>
            <SiGnubash className="text-gray-300 text-3xl md:text-5xl" />
          </SlideLeftAnimation>

          <SlideLeftAnimation delay={0.6}>
            <DiPhp className="text-indigo-400 text-3xl md:text-5xl" />
          </SlideLeftAnimation>

          <SlideLeftAnimation delay={0.5}>
            <SiTypescript className="text-blue-500 text-2xl md:text-4xl" />
          </SlideLeftAnimation>

          <SlideLeftAnimation delay={0.4}>
            <DiNodejsSmall className="text-green-500 text-3xl md:text-5xl" />
          </SlideLeftAnimation>

          <SlideLeftAnimation delay={0.3}>
            <DiJava className="text-red-500 text-3xl md:text-5xl" />
          </SlideLeftAnimation>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true, amount: 1 }}
          >
            <DiJavascript1 className="text-yellow-400 text-3xl md:text-5xl" />
          </motion.div>

          <SlideRightAnimation delay={0.3}>
            <DiReact className="text-cyan-300 text-3xl md:text-5xl" />
          </SlideRightAnimation>

          <SlideRightAnimation delay={0.4}>
            <DiPython className="text-yellow-300 text-3xl md:text-5xl" />
          </SlideRightAnimation>

          <SlideRightAnimation delay={0.5}>
            <DiGo className="text-sky-400 text-3xl md:text-5xl" />
          </SlideRightAnimation>

          <SlideRightAnimation delay={0.6}>
            <DiMarkdown className="text-yellow-700 text-3xl md:text-5xl" />
          </SlideRightAnimation>

          <SlideRightAnimation delay={0.7}>
            <SiRust className="text-orange-400 text-3xl md:text-5xl" />
          </SlideRightAnimation>
        </div>

        <div className="absolute inset-y-0 left-0 w-[30%] pointer-events-none bg-gradient-to-r from-[#151515] to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-[30%] pointer-events-none bg-gradient-to-l from-[#151515] to-transparent"></div>
      </div>
    </div>
  );
}

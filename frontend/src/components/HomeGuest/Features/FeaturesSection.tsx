import SearchSnippetsBox from "./SearchSnippetsBox";
import KeyboardShortcutsBox from "./KeyboardShortcutsBox";
import ShareBox from "./ShareBox";
import FileInfoBox from "./FileInfoBox";
import LanguageSupportBox from "./LanguageSupportBox";
import { IoConstructOutline } from "react-icons/io5";
import { motion, easeOut } from "framer-motion";

const featuresBoxes = [
  {
    id: 1,
    component: <SearchSnippetsBox />,
    className:
      "pl-8 lg:pl-10 pt-8 lg:pt-10 md:col-span-2 md:order-1 lg:order-1 max-h-max lg:min-h-[470px] lg:h-[470px]",
  },
  {
    id: 2,
    component: <KeyboardShortcutsBox />,
    className:
      "pl-8 lg:pl-10 pb-8 md:col-span-2 md:order-2 lg:order-2 max-h-max lg:min-h-[470px] lg:h-[470px]",
  },
  {
    id: 3,
    component: <ShareBox />,
    className:
      "md:col-span-2 md:order-4 lg:col-span-1 lg:order-3 max-h-max lg:min-h-[470px]",
  },
  {
    id: 4,
    component: <FileInfoBox />,
    className:
      "md:col-span-4 md:order-3 lg:col-span-2 lg:order-4 max-h-max lg:min-h-[470px]",
  },
  {
    id: 5,
    component: <LanguageSupportBox />,
    className:
      "md:col-span-2 md:order-5 lg:col-span-1 lg:order-5 max-h-max min-h-[400px] lg:min-h-[450px]",
  },
];

const containerVariant = {
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const listVariant = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      y: { duration: 0.8, ease: easeOut },
      opacity: { duration: 0.8, delay: 0.8, ease: easeOut },
    },
  },
};

export default function FeaturesSection() {
  return (
    <section className="relative w-full bg-black text-white flex flex-col items-center justify-center overflow-hidden px-2 md:px-0 py-40 md:py-20">
      <div className="flex flex-col justify-center items-center px-2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "linear", delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex justify-center items-center gap-x-1 px-3 py-1 text-sm text-[#ffffff80] rounded-full shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),_inset_0_0_1vw_hsla(0,0%,100%,0.2)] select-none"
        >
          <IoConstructOutline className="w-3 h-3 lg:w-4 lg:h-4" />
          <span>Features</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "linear" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-white via-white to-[#666] bg-clip-text text-transparent py-3 md:py-4"
        >
          Built for how developers actually work
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "linear", delay: 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full lg:w-[50%] lg:min-w-[630px] px-2 text-sm md:text-lg text-[#bababa] font-semibold text-center leading-tight"
      >
        From quick search to keyboard shortcuts, every detail in CodeBits is
        designed to save time and keep you focused on writing code.
      </motion.p>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={containerVariant}
        className="w-full grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-6 md:p-4 lg:p-6  mt-4 md:mt-6"
      >
        {featuresBoxes.map((box) => (
          <motion.li
            variants={listVariant}
            key={box.id}
            className={`${box.className} bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.15)] duration-500 overflow-hidden`}
          >
            {box.component}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

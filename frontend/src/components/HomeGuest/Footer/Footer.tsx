import { useUIStore } from "../../../stores/uiStore";
import { motion } from "framer-motion";
import { IoConstruct, IoHome, IoPlayCircle } from "react-icons/io5";
import { BiCodeBlock } from "react-icons/bi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdMail } from "react-icons/md";

export default function Footer() {
  const { toggleLogin, toggleSignup } = useUIStore();

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true, amount: 1 }}
        className="text-[clamp(5rem,18vw,16rem)] text-[#0e0e0e]  font-extrabold leading-none md:leading-none lg:leading-none translate-y-[18%] z-0 select-none"
      >
        CodeBits
      </motion.div>

      <div className="relative w-full bg-black z-50">
        {/*  horizontal line  */}
        <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

        {/*  radial glow  */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 
          w-[80%] h-[50%] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none"
        ></div>

        {/*  lower footer  */}
        <div className="relative w-full min-h-min md:min-h-[30vh] lg:min-h-[50vh] font-medium px-4 pt-8 pb-8 lg:px-14 lg:pt-14 lg:pb-10 text-[#f1f1f1] text-sm flex flex-col justify-between gap-y-20 md:gap-y-0">
          <div className="flex flex-col md:flex-row gap-y-14 md:gap-x-10 lg:gap-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 1 }}
              className="w-full lg:w-[40%] text-center md:text-start font-mono font-medium flex flex-col gap-y-4"
            >
              <span className="font-mono text-white text-3xl font-bold leading-none select-none">
                Code<span className="text-cyan-400">{"{"}</span>Bits
                <span className="text-cyan-400">{"}"}</span>
              </span>

              <p>
                Made for developers who hate déjà vu. Save your best code once,
                find it instantly, and keep building without repeating yourself.
              </p>
              <p className="hidden md:flex items-center">
                Built with React, Node.js, and a lot of ☕
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 1 }}
              className="w-full lg:w-1/2 px-3 md:px-0 flex gap-x-16 md:gap-x-0 md:pb-10"
            >
              {/*  sitemap  */}
              <div className="w-1/2 flex justify-start md:justify-center">
                <div className="flex flex-col items-start gap-y-2">
                  <p className="text-[#6a6a6a] font-bold pb-4">SITEMAP</p>

                  <button
                    onClick={() => scrollToSection("hero")}
                    className="hover:text-[#bababa] duration-150 transition-colors flex justify-center items-center gap-x-2"
                  >
                    <span>
                      <IoHome className="w-4 h-4" />
                    </span>
                    Home
                  </button>

                  <button
                    onClick={() => scrollToSection("intro")}
                    className="hover:text-[#bababa] duration-150 transition-colors flex justify-center items-center gap-x-2"
                  >
                    <span>
                      <IoPlayCircle className="w-4 h-4" />
                    </span>
                    Overview
                  </button>

                  <button
                    onClick={() => scrollToSection("features")}
                    className="hover:text-[#bababa] duration-150 transition-colors flex justify-center items-center gap-x-2"
                  >
                    <span>
                      <IoConstruct className="w-4 h-4" />
                    </span>
                    Features
                  </button>

                  <button
                    onClick={() => scrollToSection("showcase")}
                    className="hover:text-[#bababa] duration-150 transition-colors flex justify-center items-center gap-x-2 whitespace-nowrap"
                  >
                    <span>
                      <BiCodeBlock className="w-4 h-4" />
                    </span>
                    Example Snippets
                  </button>
                </div>
              </div>

              {/*  contacts  */}
              <div className="w-1/2 flex justify-center">
                <div className="flex flex-col items-start gap-y-2">
                  <p className="text-[#6a6a6a] font-bold pb-4">SOCIALS</p>

                  <a
                    href="https://github.com/amanranahere/CodeBits"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#bababa] duration-150 transition-colors flex justify-center items-center gap-x-2"
                  >
                    <span>
                      <FaGithub className="w-4 h-4" />
                    </span>
                    Github
                  </a>

                  <a
                    href="https://www.linkedin.com/in/amanrana-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#bababa] duration-150 transition-colors flex justify-center items-center gap-x-2"
                  >
                    <span>
                      <FaLinkedin className="w-4 h-4" />
                    </span>
                    Linkedin
                  </a>

                  <a
                    href="mailto:amanranahere@gmail.com"
                    className="hover:text-[#bababa] duration-150 transition-colors flex justify-center items-center gap-x-2"
                  >
                    <span>
                      <MdMail className="w-4 h-4" />
                    </span>
                    Mail
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 1 }}
            className="w-full px-3 md:px-0 flex flex-col md:flex-row justify-between items-center font-bold gap-y-4 md:gap-y-0"
          >
            <p className="uppercase font-mono order-3 md:order-1 md:pr-20">
              © 2025 CodeBits. All rights reserved.
            </p>

            {/* buttons */}
            <div className="w-full md:w-1/2 flex flex-row justify-between items-center order-1 md:order-2">
              <div className="flex gap-x-2 font-mono lg:-translate-x-1/2">
                <button
                  onClick={toggleLogin}
                  className="hover:text-[#bababa] duration-150 transition-colors uppercase"
                >
                  Login,
                </button>

                <button
                  onClick={toggleSignup}
                  className="hover:text-[#bababa] duration-150 transition-colors uppercase"
                >
                  Signup
                </button>
              </div>

              <p className="flex items-center uppercase font-mono">
                <span className="ml-2 whitespace-nowrap">A thing by&nbsp;</span>
                <a
                  href="https://amanrana.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#bababa] duration-150 transition-colors"
                >
                  Aman_Rana
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

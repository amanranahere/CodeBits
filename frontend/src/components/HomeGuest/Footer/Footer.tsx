import { useUIStore } from "../../../stores/uiStore";
import { motion } from "framer-motion";

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
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true, amount: 1 }}
        className="text-[clamp(4rem,18vw,16rem)] text-[#0b0b0b]  font-extrabold leading-none md:leading-none lg:leading-none translate-y-[18%] z-0"
      >
        CodeBits
      </motion.div>

      <div className="relative w-full bg-black z-50">
        {/*  horizontal line  */}
        <div className="relative w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

        {/*  radial glow  */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 
          w-[80%] h-[50%] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none"
        ></div>

        {/*  lower footer  */}
        <div className="relative w-full min-h-min md:min-h-[30vh] lg:min-h-[50vh] font-medium px-8 pt-8 pb-8 lg:px-14 lg:pt-14 lg:pb-10 text-[#f1f1f1] text-sm flex flex-col justify-between gap-y-20 md:gap-y-0">
          <div className="flex flex-col md:flex-row gap-y-14 md:gap-x-10 lg:gap-y-0">
            <div className="w-full lg:w-1/2 uppercase text-center md:text-start font-mono font-medium">
              Made for developers who hate copy-pasting the{" "}
              <br className="hidden lg:visible" /> same thing twice.
            </div>

            <div className="w-full lg:w-1/2 flex gap-x-16 md:gap-x-0">
              {/*  sitemap  */}
              <div className="w-1/2 flex justify-center">
                <div className="flex flex-col items-start gap-y-1">
                  <p className="text-[#6a6a6a] font-bold pb-4">SITEMAP</p>

                  <button
                    onClick={() => scrollToSection("hero")}
                    className="hover:text-[#bababa] duration-150 transition-colors"
                  >
                    Home
                  </button>

                  <button
                    onClick={() => scrollToSection("intro")}
                    className="hover:text-[#bababa] duration-150 transition-colors"
                  >
                    How it works
                  </button>

                  <button
                    onClick={() => scrollToSection("features")}
                    className="hover:text-[#bababa] duration-150 transition-colors"
                  >
                    Features
                  </button>

                  <button
                    onClick={() => scrollToSection("showcase")}
                    className="hover:text-[#bababa] duration-150 transition-colors"
                  >
                    Snippets Showcase
                  </button>
                </div>
              </div>

              {/*  contacts  */}
              <div className="w-1/2 flex justify-center">
                <div className="flex flex-col items-start gap-y-1">
                  <p className="text-[#6a6a6a] font-bold pb-4">SOCIALS</p>

                  <a
                    href="https://github.com/amanranahere/CodeBits"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#bababa] duration-150 transition-colors"
                  >
                    Github
                  </a>

                  <a
                    href="https://www.linkedin.com/in/amanrana-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#bababa] duration-150 transition-colors"
                  >
                    Linkedin
                  </a>

                  <a
                    href="mailto:amanranahere@gmail.com"
                    className="hover:text-[#bababa] duration-150 transition-colors"
                  >
                    Mail
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-y-2 font-bold">
            <p className="order-3 md:order-1 uppercase font-mono flex justify-center md:justify-start">
              © 2025 CodeBits. All rights reserved.
            </p>

            <div className="order-1 md:order-2 pb-4 md:pb-0 flex justify-center gap-x-4 font-mono">
              <button
                onClick={toggleLogin}
                className="hover:text-[#bababa] duration-150 transition-colors uppercase"
              >
                Login
              </button>

              <button
                onClick={toggleSignup}
                className="hover:text-[#bababa] duration-150 transition-colors uppercase"
              >
                Signup
              </button>
            </div>

            <p className="order-2 md:order-3 flex justify-center md:justify-end uppercase font-mono hover:">
              A thing by&nbsp;
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
        </div>
      </div>
    </div>
  );
}

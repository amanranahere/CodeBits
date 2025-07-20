import { motion } from "framer-motion";

export default function Footer() {
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
        <div className="relative w-full min-h-[40vh] mt-10 px-6 pb-8 text-sm text-[#bababa]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Left - Tagline + Copyright (60% → col-span-3) */}
            <div className="md:col-span-3 flex flex-col gap-y-2">
              <p className="text-[#d4d4d4] font-medium max-w-md">
                A clean way to store, organize, and share reusable code
                snippets.
              </p>
              <p className="text-xs text-[#8a8a8a]">
                © 2025 CodeBits. All rights reserved.
              </p>
              <p className="text-xs text-[#8a8a8a]">
                Made by{" "}
                <span className="text-white font-semibold">AmanRana</span>
              </p>
            </div>

            {/* Middle - Quick Links (20% → col-span-1) */}
            <div className="md:col-span-1 flex flex-col gap-y-1">
              <a
                href="#features"
                className="hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#snippets"
                className="hover:text-white transition-colors"
              >
                Snippets Showcase
              </a>
              <a href="#signup" className="hover:text-white transition-colors">
                Sign Up / Login
              </a>
              <a href="#about" className="hover:text-white transition-colors">
                About
              </a>
            </div>

            {/* Right - Social Links (20% → col-span-1) */}
            <div className="md:col-span-1 flex flex-col gap-y-1">
              <a
                href="https://github.com/"
                target="_blank"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:support@codebits.dev"
                className="hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  DiJavascript1,
  DiReact,
  DiPython,
  DiNodejsSmall,
  DiJava,
  DiPhp,
  DiGo,
} from "react-icons/di";
import { SiRust, SiGnubash } from "react-icons/si";

export default function LanguageSupportSection() {
  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center gap-y-8">
      {/* title and subtext */}
      <div className="flex flex-col justify-center items-center px-3 md:px-0 w-full md:max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold pb-3 md:pb-5">
          Built for your language
        </h1>
        <p className="w-[92%] md:text-lg text-[#bababa] font-semibold text-center">
          CodeBits is built to support the languages you work with, offering
          accurate syntax highlighting and a consistent editing experience that
          adapts to your workflow.
        </p>
      </div>

      {/* icons */}
      <div className="relative">
        <div className="flex flex-wrap justify-center items-center gap-6 pt-4">
          <DiPhp className="text-indigo-400 text-3xl md:text-5xl" />
          <SiGnubash className="text-gray-300 text-3xl md:text-5xl" />
          <DiJava className="text-red-500 text-3xl md:text-5xl" />
          <DiNodejsSmall className="text-green-500 text-3xl md:text-5xl" />
          <DiPython className="text-yellow-300 text-3xl md:text-5xl" />
          <DiReact className="text-cyan-300 text-3xl md:text-5xl" />
          <DiJavascript1 className="text-yellow-400 text-3xl md:text-5xl" />
          <DiGo className="text-sky-400 text-3xl md:text-5xl opacity-0 md:opacity-100" />
          <SiRust className="text-orange-400 text-3xl md:text-5xl opacity-0 md:opacity-100" />
        </div>

        <div className="absolute inset-y-0 left-0 w-[30%] pointer-events-none bg-gradient-to-r from-[#151515] to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-[30%] pointer-events-none bg-gradient-to-l from-[#151515] to-transparent"></div>
      </div>
    </div>
  );
}

import {
  DiJavascript1,
  DiReact,
  DiPython,
  DiJava,
  DiPhp,
  DiGo,
  DiMarkdown,
  DiHtml5,
  DiCss3,
} from "react-icons/di";
import { SiRust, SiGnubash, SiTypescript } from "react-icons/si";

const languages01 = [
  {
    label: "GNUBASH",
    icon: <SiGnubash className="text-gray-300 text-lg lg:text-xl" />,
  },
  {
    label: "PHP",
    icon: <DiPhp className="text-indigo-400 text-xl lg:text-2xl" />,
  },
  {
    label: "JAVASCRIPT",
    icon: <DiJavascript1 className="text-yellow-400 text-lg lg:text-xl" />,
  },

  {
    label: "TYPESCRIPT",
    icon: <SiTypescript className="text-blue-500 text-lg lg:text-xl" />,
  },

  {
    label: "JAVA",
    icon: <DiJava className="text-red-500 text-xl lg:text-2xl" />,
  },
  {
    label: "HTML",
    icon: <DiHtml5 className="text-orange-500 text-lg lg:text-xl" />,
  },
];

const languages02 = [
  {
    label: "GO",
    icon: <DiGo className="text-sky-400 text-xl lg:text-2xl" />,
  },
  {
    label: "MARKDOWN",
    icon: <DiMarkdown className="text-yellow-700 text-xl lg:text-2xl" />,
  },
  {
    label: "PYTHON",
    icon: <DiPython className="text-yellow-300 text-xl lg:text-2xl" />,
  },
  {
    label: "REACT",
    icon: <DiReact className="text-cyan-300 text-xl lg:text-2xl" />,
  },
  {
    label: "RUST",
    icon: <SiRust className="text-orange-400 text-lg lg:text-xl" />,
  },
  {
    label: "CSS",
    icon: <DiCss3 className="text-blue-500 text-lg lg:text-xl" />,
  },
];

const Card = ({ label, icon }: { label: string; icon: React.ReactNode }) => {
  return (
    <div className="relative h-24 w-20 bg-[#131313] hover:bg-[#191919] active:scale-95 duration-150 border border-[#2c2c2c] p-2 flex flex-col justify-center items-center rounded-md select-none">
      <span className="-translate-y-2">{icon}</span>
      <p className="absolute bottom-3 text-[0.5rem] text-[#efeeec] font-medium">
        {label}
      </p>
    </div>
  );
};

export default function LanguageSupport() {
  return (
    <div className="relative h-full flex flex-col justify-between items-center overflow-hidden group">
      {/*  icons  */}

      <div className="absolute top-6 rotate-[20deg] -skew-y-[10deg] flex flex-col">
        <div className="flex flex-row justify-center items-center gap-x-2 p-2 pr-20 transition-transform group-hover:-translate-x-14 ease-out duration-700">
          {languages01.map((lang) => (
            <Card icon={lang.icon} label={lang.label} />
          ))}
        </div>

        <div className="flex flex-row justify-center items-center gap-x-2 px-2 pl-6 pb-2 transition-transform group-hover:translate-x-14 ease-out duration-700">
          {languages02.map((lang) => (
            <Card icon={lang.icon} label={lang.label} />
          ))}
        </div>
      </div>

      {/*  title and subtext  */}
      <div className="w-full h-full flex flex-col justify-end gap-y-2 px-6 pb-10">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight z-10">
          Built for your lang
        </h1>

        <p className="text-xs md:text-[0.9rem] text-[#bababa] font-semibold tracking-tight leading-tight md:leading-tight lg:leading-tight z-10">
          CodeBits is built to support the languages you work with, offering
          accurate syntax highlighting and a consistent editing experience that
          adapts to your workflow.
        </p>
      </div>
    </div>
  );
}

import type { JSX } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiHtml5,
  SiCss3,
  SiSass,
  SiVuedotjs,
  SiJson,
  SiPython,
  SiGo,
  SiRuby,
  SiRust,
  SiPhp,
  SiMarkdown,
  SiDocker,
  SiYaml,
  SiBabel,
  SiEslint,
  SiPrettier,
  SiVite,
  SiTailwindcss,
  SiNextdotjs,
  SiGit,
  SiLinux,
  SiDotenv,
} from "react-icons/si";
import { BsFiletypeTxt } from "react-icons/bs";
import { FaJava, FaFileAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

// use this when you have set up the backend!

// export const getFileIcon = (ext: string): JSX.Element => {
//   const normalizedExt = ext.toLowerCase();

//   switch (normalizedExt) {
//     case "js":
//       return <SiJavascript className="text-yellow-400" />;
//     case "jsx":
//       return <SiReact className="text-cyan-400" />;
//     case "ts":
//       return <SiTypescript className="text-blue-500" />;
//     case "tsx":
//       return <SiReact className="text-blue-400" />;
//     case "vue":
//       return <SiVuedotjs className="text-green-400" />;
//     case "html":
//       return <SiHtml5 className="text-orange-500" />;
//     case "css":
//       return <SiCss3 className="text-blue-500" />;
//     case "scss":
//     case "sass":
//       return <SiSass className="text-pink-400" />;
//     case "json":
//     case "json5":
//       return <SiJson className="text-green-400" />;
//     case "yml":
//     case "yaml":
//       return <SiYaml className="text-yellow-500" />;
//     case "md":
//       return <SiMarkdown className="text-yellow-700" />;
//     case "txt":
//       return <BsFiletypeTxt className="text-gray-400" />;
//     case "py":
//       return <SiPython className="text-yellow-300" />;
//     case "java":
//       return <FaJava className="text-red-600" />;
//     case "go":
//       return <SiGo className="text-sky-500" />;
//     case "rb":
//       return <SiRuby className="text-red-400" />;
//     case "rs":
//       return <SiRust className="text-orange-500" />;
//     case "php":
//       return <SiPhp className="text-indigo-500" />;
//     case "sh":
//       return <SiLinux className="text-gray-300" />;
//     default:
//       return <FaFileAlt className="text-white" />;
//   }
// };

export const getFileIcon = (filename: string): JSX.Element => {
  const name = filename.toLowerCase();
  const ext = filename.split(".").pop()?.toLowerCase();

  if (name === "settings") return <IoSettingsOutline />;
  if (name === ".gitignore") return <SiGit className="text-pink-500" />;
  if (name === "dockerfile") return <SiDocker className="text-blue-400" />;
  if (name === ".env" || name.startsWith(".env."))
    return <SiDotenv className="text-green-600" />;
  if (name.includes("eslint")) return <SiEslint className="text-purple-500" />;
  if (name.includes("prettier"))
    return <SiPrettier className="text-pink-400" />;
  if (name.includes("babel")) return <SiBabel className="text-yellow-400" />;
  if (name.includes("vite")) return <SiVite className="text-yellow-300" />;
  if (name.includes("tailwind"))
    return <SiTailwindcss className="text-sky-400" />;
  if (name.includes("next")) return <SiNextdotjs className="text-white" />;

  switch (ext) {
    case "js":
      return <SiJavascript className="text-yellow-400" />;
    case "jsx":
      return <SiReact className="text-cyan-400" />;
    case "ts":
      return <SiTypescript className="text-blue-500" />;
    case "tsx":
      return <SiReact className="text-blue-400" />;
    case "vue":
      return <SiVuedotjs className="text-green-400" />;
    case "html":
      return <SiHtml5 className="text-orange-500" />;
    case "css":
      return <SiCss3 className="text-blue-500" />;
    case "scss":
    case "sass":
      return <SiSass className="text-pink-400" />;
    case "json":
    case "json5":
      return <SiJson className="text-green-400" />;
    case "yml":
    case "yaml":
      return <SiYaml className="text-yellow-500" />;
    case "md":
      return <SiMarkdown className="text-yellow-700" />;
    case "txt":
      return <BsFiletypeTxt className="text-gray-400" />;
    case "py":
      return <SiPython className="text-yellow-300" />;
    case "java":
      return <FaJava className="text-red-600" />;
    case "go":
      return <SiGo className="text-sky-500" />;
    case "rb":
      return <SiRuby className="text-red-400" />;
    case "rs":
      return <SiRust className="text-orange-500" />;
    case "php":
      return <SiPhp className="text-indigo-500" />;
    case "sh":
      return <SiLinux className="text-gray-300" />;
    default:
      return <FaFileAlt className="text-white" />;
  }
};

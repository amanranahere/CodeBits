import { useState } from "react";
import { IoShareOutline, IoLink, IoImage } from "react-icons/io5";
import { SiMarkdown } from "react-icons/si";
import { VscJson } from "react-icons/vsc";

export default function ShareBox() {
  const [selectedItem, setSelectedItem] = useState("Markdown");

  const items = [
    { label: "Sharable Link", icon: <IoLink className="w-5 h-5" /> },
    { label: "Markdown", icon: <SiMarkdown className="w-5 h-5" /> },
    { label: "JSON", icon: <VscJson className="w-5 h-5" /> },
    { label: "Image (PNG)", icon: <IoImage className="w-5 h-5" /> },
  ];

  return (
    <div className="relative h-full pb-10 pl-10 flex flex-col justify-between items-center gap-y-10 overflow-hidden select-none">
      <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-yellow-300 rounded-full group">
        {/* Tooltip */}
        <div className="absolute top-[30px] right-0 opacity-0 group-hover:opacity-100 bg-[#333] text-white text-[10px] px-2 py-1 rounded-md shadow-md transition-opacity duration-200">
          Coming soon...
        </div>
      </div>

      {/*  export dropdown  */}
      <div className="w-full pt-5 pl-5 flex flex-col">
        <div className="max-w-max py-1 px-4 bg-white/10 backdrop-blur-md  rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] flex justify-center items-center gap-x-2 font-bold text-lg transition-colors duration-300">
          <IoShareOutline className="w-5 h-5" />
          <span>Export</span>
        </div>

        <div
          onMouseLeave={() => setSelectedItem("Markdown")}
          className="ml-10 mt-2 p-2 max-w-max bg-[#303030] shadow-md rounded-xl flex flex-col text-sm"
        >
          {items.map((item) => (
            <div
              onMouseEnter={() => setSelectedItem(item.label)}
              className={`px-3 py-2 pr-5 rounded-[0.6rem] active:scale-95 duration-150 text-left flex items-center gap-x-2 ${
                selectedItem === item.label
                  ? "bg-[#4a4a4a]"
                  : "hover:bg-[#4a4a4a]"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/*  title and subtext  */}
      <div className="flex flex-col gap-y-2 w-full pr-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Share Your Snippets Anywhere
        </h1>

        <p className="text-xs md:text-base text-[#bababa] font-semibold tracking-tight leading-tight md:leading-tight lg:leading-tight">
          Export snippets as a shareable link, Markdown, JSON, or even a styled
          image — perfect for documentation, backups, or sharing with your team.
        </p>
      </div>
    </div>
  );
}

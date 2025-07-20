import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";

export default function FileInfoBox() {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!panelRef.current) return;
    panelRef.current.scrollTo({
      top: panelRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleMouseLeave = () => {
    if (!panelRef.current) return;
    panelRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="h-full flex flex-col justify-between items-center gap-y-10 overflow-hidden"
    >
      {/*  title and subtext  */}
      <div className="flex flex-col gap-y-2 w-full pr-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Your Snippets, Fully Documented
        </h1>

        <p className="text-xs md:text-base text-[#bababa] font-semibold tracking-tight leading-tight md:leading-tight lg:leading-tight">
          Every snippet you save comes with its own file panel. Add a clear
          title, choose the correct file type, and write a detailed description
          so you'll never forget what the snippet does. The panel automatically
          tracks the last edited time and updates instantly as you make changes,
          keeping your library organized and always up to date.
        </p>
      </div>

      {/*  file info modal  */}
      <div className="w-full h-full lg:px-10 overflow-hidden select-none">
        <div className="relative h-full dark:bg-[#303030] rounded-t-[25px] p">
          <div className="absolute top-3 lg:top-4 right-4 lg:right-6 p-1 hover:bg-[#4a4a4a] text-[#9a9a9a] hover:text-[#f1f1f1] rounded-full z-10 duration-100">
            <IoClose className="w-4 h-4 lg:w-5 lg:h-5" />
          </div>

          <div className="w-full pl-6 py-3 lg:py-4 lg:text-xl font-semibold">
            File Info
          </div>

          <hr className="mx-3 border-[#e5e7eb] dark:border-[#4a4a4a]" />

          <div
            ref={panelRef}
            className="w-full h-full px-6 pt-3 lg:pt-4 flex flex-col gap-y-3 lg:gap-y-4 overflow-y-auto no-scrollbar"
          >
            <div className="relative flex flex-col font-mono group">
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity dark:text-[#fff]  z-10">
                <MdModeEdit className="w-4 h-4" />
              </div>
              <span className="text-sm lg:text-base text-[#8c8c8c] font-bold">
                TITLE
              </span>
              <span className="text-sm lg:text-base">Axios Configuration</span>
            </div>

            <div className="relative flex flex-col font-mono group">
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity dark:text-[#fff]  z-10">
                <MdModeEdit className="w-4 h-4" />
              </div>
              <span className="text-sm lg:text-base text-[#8c8c8c] font-bold">
                FILE TYPE
              </span>
              <span className="text-sm lg:text-base">js</span>
            </div>

            <div className="relative flex flex-col font-mono group">
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity dark:text-[#fff]  z-10">
                <MdModeEdit className="w-4 h-4" />
              </div>
              <span className="text-sm lg:text-base text-[#8c8c8c] font-bold">
                DESCRIPTION
              </span>
              <span className="text-sm lg:text-base">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa
                assumenda cupiditate obcaecati itaque minus voluptas corporis
                libero, aliquid sapiente incidunt iusto explicabo expedita,
                numquam facere nulla suscipit, pariatur recusandae laboriosam.
              </span>
            </div>

            <div className="flex flex-col font-mono pb-20">
              <span className="text-sm lg:text-base text-[#8c8c8c] font-bold">
                LAST EDITED
              </span>
              <span className="text-sm lg:text-base">
                19/07/2025, 05:06:58 AM
                <br />
                <p className="text-sm lg:text-base italic">(4 days ago)</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

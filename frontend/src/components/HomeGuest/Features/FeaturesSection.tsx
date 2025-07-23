import SearchSnippetsBox from "./SearchSnippetsBox";
import KeyboardShortcutsBox from "./KeyboardShortcutsBox";
import ShareBox from "./ShareBox";
import FileInfoBox from "./FileInfoBox";
import LanguageSupportBox from "./LanguageSupportBox";
import { IoConstructOutline } from "react-icons/io5";

export default function FeaturesSection() {
  return (
    <section className="relative w-full bg-black text-white flex flex-col items-center justify-center gap-y-3 lg:gap-y-6 overflow-hidden px-4 py-16 md:py-24 lg:py-28">
      <div className="flex flex-col justify-center items-center gap-y-3">
        <div className="flex justify-center items-center gap-x-1 px-3 py-1 text-sm text-[#ffffff80] rounded-full shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),_inset_0_0_1vw_hsla(0,0%,100%,0.2)] select-none">
          <IoConstructOutline className="w-3 h-3 lg:w-4 lg:h-4" />
          <span>Features</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-center">
          Built for how developers actually work
        </h2>
      </div>

      <p className="w-full lg:w-[50%] lg:min-w-[630px] md:text-lg text-[#bababa] font-semibold text-center leading-tight">
        From quick search to keyboard shortcuts, every detail in CodeBits is
        designed to save time and keep you focused on writing code.
      </p>

      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-6 md:p-4 lg:p-6">
        {/*  keyboard shorcuts  */}
        <div className="pl-8 lg:pl-10 pt-8 lg:pt-10 md:col-span-2 md:order-1 lg:order-1 max-h-max lg:min-h-[470px] lg:h-[470px] bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)] overflow-hidden">
          <SearchSnippetsBox />
        </div>

        {/*  2nd box  */}
        <div className="pl-8 lg:pl-10 pb-8 md:col-span-2 md:order-2 lg:order-2 max-h-max lg:min-h-[470px] lg:h-[470px] bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)] overflow-hidden">
          <KeyboardShortcutsBox />
        </div>

        {/*  4th box  */}
        <div className="md:col-span-4 md:order-3 lg:col-span-2 lg:order-4 max-h-max lg:min-h-[470px] bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)] overflow-hidden">
          <FileInfoBox />
        </div>

        {/*  3rd box  */}
        <div className="md:col-span-2 md:order-4 lg:col-span-1 lg:order-3 max-h-max lg:min-h-[470px] bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)] overflow-hidden">
          <ShareBox />
        </div>

        {/*  language support  */}
        <div className=" md:col-span-2 md:order-5 lg:col-span-1 lg:order-5 max-h-max min-h-[400px] lg:min-h-[450px] bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)] overflow-hidden">
          <LanguageSupportBox />
        </div>
      </div>
    </section>
  );
}

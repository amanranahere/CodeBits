import KeyboardShortcuts from "./KeyboardShortcuts";

export default function FeaturesSection() {
  return (
    <section className="relative w-full bg-black text-white py-20 flex flex-col items-center justify-center gap-y-6 overflow-hidden px-4">
      <h2 className="text-3xl md:text-5xl font-extrabold text-center">
        Why Developers Choose CodeBits
      </h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-6 md:p-4 lg:p-6">
        {/*  keyboard shorcuts  */}
        <div className="pl-5 lg:pl-10 md:col-span-2 md:order-1 lg:order-1 max-h-max lg:h-[470px] bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)]"></div>

        {/*  2nd box  */}
        <div className="pl-8 lg:pl-10 pb-8 md:col-span-2 md:order-2 lg:order-2 max-h-max lg:h-[470px] bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)]">
          <KeyboardShortcuts />
        </div>

        {/*  4th box  */}
        <div className="p-10 md:col-span-4 md:order-3 lg:col-span-2 lg:order-4 h-[450px] bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)]"></div>

        {/*  3rd box  */}
        <div className="p-10 md:col-span-2 md:order-4 lg:col-span-1 lg:order-3 h-[450px] bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)]"></div>

        {/*  language support  */}
        <div className="p-10 md:col-span-2 md:order-5 lg:col-span-1 lg:order-5 h-[450px] bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)]"></div>
      </div>
    </section>
  );
}

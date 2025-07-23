export default function LandingSection() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center gap-y-8 px-4 md:px-10 overflow-hidden">
      <div className="absolute top-[-150px] right-[-150px] w-[700px] h-[700px] bg-white opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="text-4xl md:text-6xl lg:text-7xl font-extrabold flex flex-col justify-center items-center text-center">
        <span>The organized home</span>
        <span>for your code snippets</span>
      </div>

      <p className="w-full lg:w-[40%] lg:min-w-[630px] md:text-lg text-[#bababa] font-semibold text-center leading-tight">
        No more digging through old projects or scattered files. Save snippets
        once, find them instantly, and keep building without interruptions.
      </p>
    </div>
  );
}

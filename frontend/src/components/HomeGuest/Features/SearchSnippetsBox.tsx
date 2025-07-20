export default function SearchSnippetsBox() {
  return (
    <div className="h-full flex flex-col justify-between items-center overflow-hidden">
      {/*  title and subtext  */}
      <div className="flex flex-col gap-y-2 w-full pr-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Find Your Snippets in Seconds
        </h1>

        <p className="pr-6 md:pr-3 lg:pr-10 text-xs md:text-base text-[#bababa] font-semibold tracking-tight leading-tight md:leading-tight lg:leading-tight">
          Stop scrolling endlessly. Instantly locate any snippet by searching
          its name or file type. Results update as you type, so you always find
          what you need—right when you need it.
        </p>
      </div>

      {/*  gif  */}
      <div className="w-full h-full rounded-tl-[25px] rounded-br-[25px] bg-black overflow-hidden translate-y-12 translate-x-[7%]">
        <video className="w-[150%] h-auto" autoPlay loop muted playsInline>
          <source src="/SearchFile.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

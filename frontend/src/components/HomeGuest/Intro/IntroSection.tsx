export default function IntroSection() {
  return (
    <section className="relative w-full bg-black text-white py-20 px-4 flex flex-col items-center justify-center gap-y-6 overflow-hidden">
      <h2 className="text-3xl md:text-5xl font-extrabold text-center">
        Your organized snippet library
      </h2>

      <p className="w-[90%] md:w-[70%] lg:w-[45%] text-[#bababa] text-lg font-medium text-center leading-relaxed">
        Your best snippets deserve more than scattered files and forgotten
        repos. With CodeBits, everything lives in one organized, searchable
        space.
      </p>

      {/*  video  */}
      <div className="relative z-10 mt-4 w-full flex justify-center items-center perspective-[1200px]">
        <video
          className="w-[90%] md:w-[70%] lg:w-[60%] rounded-xl shadow-lg"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/CodeBitsVid.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

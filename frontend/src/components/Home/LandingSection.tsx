export default function LandingSection() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-8">
      <div className="text-4xl md:text-6xl lg:text-7xl font-bold flex flex-col justify-center items-center text-center">
        <span>The definitive hub</span>
        <span>for your code snippets</span>
      </div>

      <p className="w-[90%] md:w-[70%] lg:w-[40%] md:text-lg text-[#bababa] font-semibold text-center">
        Store and label snippets as you code. Find exactly what you need with
        one click. All your snippets live in a single reliable place so you can
        spend more time building and less time searching.
      </p>
    </div>
  );
}

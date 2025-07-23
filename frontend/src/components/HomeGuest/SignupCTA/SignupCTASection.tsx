import { useUIStore } from "../../../stores/uiStore";

export default function SignupCTASection() {
  const { toggleSignup, toggleLogin } = useUIStore();

  return (
    <section className="flex flex-col justify-center items-center gap-y-6 md:gap-y-10 py-16 mb-20 lg:mb-16 md:py-24 lg:py-28 px-4 md:px-10">
      <div className="flex flex-col justify-center items-center gap-y-3  md:gap-y-6 text-center">
        <h1 className="text-2xl md:text-5xl font-extrabold">
          If it's good enough to reuse,
          <br />
          it's good enough to save.
        </h1>

        <p className="w-full lg:w-[45%] text-[#bababa] text-lg font-medium text-center leading-tight">
          Some snippets are worth saving because you use them everywhere. Store
          them once in CodeBits and they'll always be ready when you need them
          again.
        </p>

        <div className="flex justify-center items-center gap-x-3 md:gap-x-8">
          <button
            onClick={toggleSignup}
            className="select-none rounded-2xl text-white border border-white/20 bg-[rgba(255,255,255,0.06)] backdrop-blur-md
            shadow-[inset_0_0_8px_rgba(255,255,255,0.2),0_0_4px_rgba(255,255,255,0.1)] hover:shadow-[inset_0_0_18px_rgba(255,255,255,0.25),0_0_6px_rgba(255,255,255,0.2)] transition-all duration-300 ease-out text-base h-10 lg:h-12 px-10 md:px-16 font-semibold"
          >
            Sign Up
          </button>

          <button
            onClick={toggleLogin}
            className="select-none rounded-2xl text-white border border-white/20 bg-[rgba(255,255,255,0.06)] backdrop-blur-md
            shadow-[inset_0_0_8px_rgba(255,255,255,0.2),0_0_4px_rgba(255,255,255,0.1)] hover:shadow-[inset_0_0_18px_rgba(255,255,255,0.25),0_0_6px_rgba(255,255,255,0.2)] transition-all duration-300 ease-out text-base h-10 lg:h-12 px-10 md:px-16 font-semibold"
          >
            Log In
          </button>
        </div>
      </div>
    </section>
  );
}

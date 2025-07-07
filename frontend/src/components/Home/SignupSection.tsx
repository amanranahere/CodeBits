import { useUIStore } from "../../stores/uiStore";

export default function SignupSection() {
  const { toggleSignup, toggleLogin } = useUIStore();

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-6 md:gap-y-10">
      <div className="text-2xl md:text-5xl font-bold text-center flex flex-col justify-center items-center md:gap-y-2">
        <h1>If it's good enough to reuse,</h1>
        <h1>it's good enough to save.</h1>
      </div>

      <div className="flex justify-center items-center gap-x-4 md:gap-x-8">
        <button
          onClick={toggleSignup}
          className="px-10 md:px-16 py-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] active:bg-[#3a3a3a] rounded-full whitespace-nowrap"
        >
          Sign Up
        </button>
        <button
          onClick={toggleLogin}
          className="px-10 md:px-16 py-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] active:bg-[#3a3a3a] rounded-full whitespace-nowrap"
        >
          Log In
        </button>
      </div>
    </div>
  );
}

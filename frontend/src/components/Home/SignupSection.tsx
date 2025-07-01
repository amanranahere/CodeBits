import { useUIStore } from "../../stores/uiStore";

export default function SignupSection() {
  const { toggleSignup, toggleLogin } = useUIStore();

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-10">
      <div className="text-3xl md:text-5xl font-bold text-center flex flex-col justify-center items-center gap-y-2">
        <h1>If it's good enough to reuse,</h1>
        <h1>it's good enough to save.</h1>
      </div>

      <div className="flex justify-center items-center gap-x-8">
        <button
          onClick={toggleSignup}
          className="px-16 py-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] active:bg-[#1a1a1a] rounded-full"
        >
          Sign Up
        </button>
        <button
          onClick={toggleLogin}
          className="px-16 py-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] active:bg-[#1a1a1a] rounded-full"
        >
          Log In
        </button>
      </div>
    </div>
  );
}

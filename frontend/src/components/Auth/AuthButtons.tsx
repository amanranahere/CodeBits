interface LoginBtnProp {
  handleLoginToggle: () => void;
  handleSignupToggle: () => void;
}

export default function AuthButtons({
  handleLoginToggle,
  handleSignupToggle,
}: LoginBtnProp) {
  return (
    <div className="flex-1 flex items-center gap-x-2">
      {[
        { label: "LOGIN", watermark: "CONTINUE" },
        { label: "SIGNUP", watermark: "REGISTER" },
      ].map(({ label, watermark }) => (
        <button
          key={label}
          onClick={label === "LOGIN" ? handleLoginToggle : handleSignupToggle}
          className="relative h-14 flex-grow bg-white text-[#1f1f1f] dark:bg-[#1f1f1f] dark:text-[#f1f1f1] rounded-[1.2rem] overflow-hidden group"
        >
          <div className="relative z-10">{label}</div>

          <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[5rem] font-extrabold  oswald-text z-0 pointer-events-none select-none leading-none tracking-tighter  text-[#1f1f1f09] group-hover:text-[#1f1f1f14] dark:text-[#ffffff09] dark:group-hover:text-[#ffffff14] transition duration-300 ease-in-out">
            {watermark}
          </div>
        </button>
      ))}
    </div>
  );
}

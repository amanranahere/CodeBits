import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../stores/userStore";
import { useUIStore } from "../../stores/uiStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

interface LoginInput {
  email: string;
  password: string;
}

function LoginBox() {
  const login = useUserStore((state) => state.login);
  const loading = useUserStore((state) => state.loading);
  const { toggleSignup, toggleLogin } = useUIStore();

  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data.email, data.password);
      setError("");
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Login Failed!";
      setError(errorMsg);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full w-full text-white relative overflow-hidden py-12 lg:py-16 px-6 flex flex-col gap-y-5 bg-black/65 backdrop-blur-lg rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.15)] hover:shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.25)] duration-500"
    >
      <button
        onClick={toggleLogin}
        className="absolute top-3 right-2 text-white/50 hover:text-white/90 duration-500 p-2 z-50"
      >
        <IoClose className="w-5 h-5" />
      </button>

      <h1 className="text-center text-lg font-bold text-white/90 px-4 pb-3 lg:pb-6">
        Everything's right where you left it
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-full w-full">
          <div className="floating-input-wrapper">
            {/* email input */}
            <input
              className="w-full p-2 bg-inherit border-b border-[#6b6b6c] hover:border-[#ffffff84] focus:border-[#f7f7f7] text-[#f7f7f7] outline-none transition-colors duration-500"
              type="email"
              placeholder="Email"
              required
              {...register("email", {
                required: "Email required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            {typeof errors.email?.message === "string" && (
              <p className="text-sm leading-none text-red-600 px-2 pb-2">
                {errors.email.message}
              </p>
            )}

            {/* password input */}
            <label className="relative">
              <input
                className="w-full p-2 lg:pr-10 bg-inherit border-b border-[#6b6b6c] hover:border-[#ffffff84] focus:border-[#f7f7f7] text-[#f7f7f7] outline-none transition-colors duration-500 peer"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                required
                {...register("password", {
                  required: "Password required",
                })}
              />

              <div className="absolute inset-y-0 right-2 flex items-center text-[#6b6b6c] peer-hover:text-[#ffffff84] peer-focus:text-[#f7f7f7] duration-300">
                {passwordVisible ? (
                  <FaEye
                    className="cursor-pointer"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                ) : (
                  <FaEyeSlash
                    className="cursor-pointer"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                )}
              </div>
            </label>

            {typeof errors.password?.message === "string" && (
              <p className="text-sm leading-none text-red-600 px-2 pb-2">
                {errors.password.message}
              </p>
            )}

            {error && (
              <p className="leading-tight text-red-600 px-1 text-center">
                {error}
              </p>
            )}

            {/* submit button */}
            <button
              className="h-11 mt-5 select-none rounded-2xl text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)]
              hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] backdrop-blur-md transition-all duration-300 ease-out"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="w-full h-full flex justify-center items-center">
                  Loading...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </div>
      </form>

      <div className="text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <button
          onClick={toggleSignup}
          className="text-[#f1f1f1] hover:underline"
        >
          Sign up
        </button>
      </div>

      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 pr-3 tracking-tighter leading-none text-[10.5rem] font-extrabold text-[#ffffff14] oswald-text select-none">
        LOGIN
      </div>
    </motion.div>
  );
}

export default LoginBox;

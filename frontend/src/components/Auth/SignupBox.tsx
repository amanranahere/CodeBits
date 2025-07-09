import { useState } from "react";
import { useForm } from "react-hook-form";
import useRegister from "../../hooks/user/useRegister";
import { useUIStore } from "../../stores/uiStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";
import TypingTextAnimation from "../Animation/TypingTextAnimation";

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

function SignupBox() {
  const { registerUser, loading } = useRegister();
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { toggleLogin, toggleSignup } = useUIStore();

  const onSubmit = async (data: SignupInput) => {
    try {
      const registered = await registerUser(data);

      if (registered) {
        setError("");
        toast.success("Account created!");

        reset();
        toggleLogin();
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Login Failed!";
      setError(errorMsg);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupInput>();

  return (
    <div className="h-full w-[300px] md:w-[350px] lg:w-[400px] bg-black dark:text-white relative overflow-hidden">
      <button
        onClick={toggleSignup}
        className="absolute top-2 right-2 text-white text-2xl p-2 rounded-full hover:bg-[#2a2a2a] z-50 block lg:hidden"
      >
        <MdKeyboardArrowLeft />
      </button>

      <div className="h-16 md:h-20 lg:h-24 px-5 md:px-8 pt-5 md:pt-10 text-lg font-mono dark:text-[#ffffffb3]">
        <TypingTextAnimation
          text="Sign up now to enjoy complete access to all features."
          speed={40}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-7 bg-black">
        <div className="h-full w-full mt-20 lg:mt-6">
          <div className="floating-input-wrapper">
            {/* name input */}
            <label>
              <input
                className="floating-label-input"
                type="text"
                placeholder=""
                required
                {...register("name", {
                  required: "Name required",
                })}
              />
              <span>Name</span>
            </label>

            {typeof errors.name?.message === "string" && (
              <p className="text-sm leading-none text-red-600 px-2 pb-2">
                {errors.name.message}
              </p>
            )}

            {/* email input */}
            <label>
              <input
                className="floating-label-input"
                type="email"
                placeholder=""
                required
                {...register("email", {
                  required: "Email required",
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <span>Email</span>
            </label>

            {typeof errors.email?.message === "string" && (
              <p className="text-sm leading-none text-red-600 px-2 pb-2">
                {errors.email.message}
              </p>
            )}

            {/* password input */}
            <label className="relative">
              <input
                className="floating-label-input"
                type={passwordVisible ? "text" : "password"}
                placeholder=""
                required
                {...register("password", {
                  required: "Password required",
                })}
              />
              <span>Password</span>

              <div className="absolute inset-y-0 right-2 flex items-center">
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
              className="p-[10px] bg-[#00bfff] hover:bg-[#00bfff96] active:bg-[#00bfff63] rounded-[10px] duration-200 select-none outline-none border-none"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="w-full h-full flex justify-center items-center">
                  Loading...
                </span>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <button
          onClick={toggleLogin}
          className="text-[#00bfff] hover:underline hover:text-[#00bfff]/90"
        >
          Login
        </button>
      </div>

      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 pl-20 tracking-tighter leading-none text-[12.5rem] font-extrabold text-[#ffffff14] oswald-text select-none">
        SIGNUP
      </div>
    </div>
  );
}

export default SignupBox;

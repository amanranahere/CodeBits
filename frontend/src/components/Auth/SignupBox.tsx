import { useState } from "react";
import { useForm } from "react-hook-form";
import useRegister from "../../hooks/user/useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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

  const onSubmit = async (data: SignupInput) => {
    try {
      const registered = await registerUser(data);

      if (registered) {
        setError("");
        toast.success("Account created!");
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Login Failed!";
      setError(errorMsg);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>();

  return (
    <div className="w-[25%] dark:bg-[#121212] dark:text-white rounded-3xl relative overflow-hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-7 bg-[#121212] rounded-3xl"
      >
        <div className="h-20 text-lg font-mono dark:text-[#ffffffb3]">
          <TypingTextAnimation
            text="  Sign up now to enjoy complete access to all features."
            speed={40}
          />
        </div>

        <div className="h-full w-full mt-6">
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
              className="p-[10px] bg-[#00bfff] hover:bg-[#00bfff96] active:bg-[#00bfff63] rounded-lg duration-200 select-none outline-none border-none"
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

      <div className="absolute -bottom-2 -translate-x-4 tracking-tighter leading-none text-[clamp(7rem,9.5vw,9.5rem)] font-extrabold text-[#282828] oswald-text select-none">
        SIGNUP
      </div>
    </div>
  );
}

export default SignupBox;

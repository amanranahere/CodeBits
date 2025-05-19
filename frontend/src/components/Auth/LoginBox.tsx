import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../stores/userStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginInput {
  email: string;
  password: string;
}

function LoginBox() {
  const login = useUserStore((state) => state.login);
  const loading = useUserStore((state) => state.loading);
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
    <div className="w-[25%] dark:bg-[#121212] dark:text-white rounded-3xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 bg-[#1a1a1a] rounded-[20px] border border-[#333]"
      >
        <p className="signup-title">Login</p>
        <p className="signup-message">
          Great to see you again! Ready to dive in?{" "}
        </p>

        {error && <p className="text-red-600 mt-3 text-center">{error}</p>}

        <div className="h-full w-full mt-6">
          <div className="signup-form">
            {/* email input */}
            <label>
              <input
                className="signup-input"
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
              <p className="text-red-600 px-2 mt-1">{errors.email.message}</p>
            )}

            {/* password input */}
            <label className="relative">
              <input
                className="signup-input pr-10"
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
              <p className="text-red-600 px-2 mt-1">
                {errors.password.message}
              </p>
            )}

            {/* submit button */}
            <button
              className="signup-submit select-none"
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
    </div>
  );
}

export default LoginBox;

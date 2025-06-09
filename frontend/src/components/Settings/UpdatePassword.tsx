import { useState } from "react";
import { useUserStore } from "../../stores/userStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function UpdatePassword() {
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confPasswordInput, setConfPasswordInput] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const updatePassword = useUserStore((state) => state.changePassword);
  const loading = useUserStore((state) => state.loading);

  const handleSubmit = async () => {
    if (
      !currentPasswordInput.trim() ||
      !newPasswordInput.trim() ||
      !confPasswordInput.trim()
    ) {
      setError("All fields required");
      return;
    }

    if (newPasswordInput.trim().length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    if (newPasswordInput !== confPasswordInput) {
      setError("Confirm password doesn't match new password");
      return;
    }

    await updatePassword({
      oldPassword: currentPasswordInput,
      newPassword: newPasswordInput,
    });

    setCurrentPasswordInput("");
    setNewPasswordInput("");
    setConfPasswordInput("");
    setError("");
  };

  return (
    <div className="flex flex-col gap-y-6 md:gap-y-8">
      {/* current password input */}
      <div className="w-full">
        <label
          htmlFor="curr-pwd"
          className="text-gray-700 dark:text-[#8c8c8c] select-none px-2
          "
        >
          Current Password
        </label>

        <input
          id="curr-pwd"
          type="text"
          value={currentPasswordInput}
          placeholder="Enter your current password"
          onChange={(e) => setCurrentPasswordInput(e.target.value)}
          required
          className="w-full p-3 bg-[#3a3a3a] hover:bg-[#3a3a3a]/80 focus:bg-[#3a3a3a]/80 text-white outline-none rounded-[16px] duration-300"
        />
      </div>

      {/* new password input */}
      <div className="relative w-full">
        <label
          htmlFor="new-pwd"
          className="text-gray-700 dark:text-[#8c8c8c] select-none px-2
          "
        >
          New Password
        </label>

        <input
          id="new-pwd"
          type={newPasswordVisible ? "text" : "password"}
          value={newPasswordInput}
          placeholder="Use at least 8 characters"
          onChange={(e) => setNewPasswordInput(e.target.value)}
          required
          className="w-full p-3 bg-[#3a3a3a] hover:bg-[#3a3a3a]/80 focus:bg-[#3a3a3a]/80 text-white outline-none rounded-[16px] duration-300"
        />

        <div className="absolute inset-y-0 right-6 top-7 flex items-center">
          {newPasswordVisible ? (
            <FaEye
              className="cursor-pointer"
              onClick={() => setNewPasswordVisible(!newPasswordVisible)}
            />
          ) : (
            <FaEyeSlash
              className="cursor-pointer"
              onClick={() => setNewPasswordVisible(!newPasswordVisible)}
            />
          )}
        </div>
      </div>

      {/* confirm password input */}
      <div className="relative w-full">
        <label
          htmlFor="conf-pwd"
          className="text-gray-700 dark:text-[#8c8c8c] select-none px-2
          "
        >
          Confirm Password
        </label>

        <input
          id="conf-pwd"
          type={confPasswordVisible ? "text" : "password"}
          value={confPasswordInput}
          placeholder="Re-enter new password"
          onChange={(e) => setConfPasswordInput(e.target.value)}
          required
          className="w-full p-3 bg-[#3a3a3a] hover:bg-[#3a3a3a]/80 focus:bg-[#3a3a3a]/80 text-white outline-none rounded-[16px] duration-300"
        />

        <div className="absolute inset-y-0 right-6 top-7 flex items-center">
          {confPasswordVisible ? (
            <FaEye
              className="cursor-pointer"
              onClick={() => setConfPasswordVisible(!confPasswordVisible)}
            />
          ) : (
            <FaEyeSlash
              className="cursor-pointer"
              onClick={() => setConfPasswordVisible(!confPasswordVisible)}
            />
          )}
        </div>
      </div>

      {error && (
        <div className="text-sm leading-none text-red-600 px-2">{error}</div>
      )}

      {/* submit button */}
      <div className="">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-[50%] p-[10px] rounded-[16px] duration-150 select-none outline-none border-none ${
            loading
              ? "bg-[#00bfff96] cursor-not-allowed"
              : "bg-[#00bfff] hover:bg-[#00bfff96] active:bg-[#00bfff63]"
          }`}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
}

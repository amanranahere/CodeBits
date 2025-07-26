import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { MdModeEdit } from "react-icons/md";
import Loading from "../Loading";

export default function AccountInfo() {
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const loading = useUserStore((state) => state.loading);
  const updateAccountInfo = useUserStore((state) => state.updateAccountInfo);

  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);

  const [nameInput, setNameInput] = useState(user?.name || "");
  const [emailInput, setEmailInput] = useState(user?.email || "");

  const [error, setError] = useState("");

  useEffect(() => {
    setNameInput(user?.name || "");
    setEmailInput(user?.email || "");
  }, [user]);

  const handleSubmit = async () => {
    if (!nameInput.trim() || !emailInput.trim()) {
      setError("Name and Email cannot be empty");
      return;
    }

    updateAccountInfo({
      name: nameInput,
      email: emailInput,
    });

    setEditingName(false);
    setEditingEmail(false);

    navigate("/");
  };

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-8">
      {/* name */}
      <div className="relative group">
        <div
          title="Edit name"
          onClick={() => {
            setEditingName(true);
            setNameInput(user?.name || "");
          }}
          className={`absolute top-1/3 right-0 dark:text-[#f1f1f1] dark:hover:text-[#bababa] duration-150 cursor-pointer z-10 ${
            editingName ? "opacity-0" : ""
          }`}
        >
          <MdModeEdit className="w-4 h-4" />
        </div>

        <div
          className="text-gray-700 dark:text-[#8c8c8c] select-none px-2
          "
        >
          Name
        </div>

        {editingName ? (
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="w-full p-3 bg-[#3a3a3a] hover:bg-[#3a3a3a]/80 focus:bg-[#3a3a3a]/80 text-white outline-none rounded-[16px] duration-300"
          />
        ) : (
          <div className="px-2">{user?.name}</div>
        )}
      </div>

      {/* email */}
      <div className="relative group">
        <div
          title="Edit email"
          onClick={() => {
            setEditingEmail(true);
            setEmailInput(user?.email || "");
          }}
          className={`absolute top-1/3 right-0 dark:text-[#f1f1f1] dark:hover:text-[#bababa] duration-150 cursor-pointer z-10 ${
            editingEmail ? "opacity-0" : ""
          }`}
        >
          <MdModeEdit className="w-4 h-4" />
        </div>

        <div className="text-gray-700 dark:text-[#8c8c8c] select-none px-2">
          Email
        </div>

        {editingEmail ? (
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full p-3 bg-[#3a3a3a] hover:bg-[#3a3a3a]/80 focus:bg-[#3a3a3a]/80 text-white outline-none rounded-[16px] duration-300"
          />
        ) : (
          <div className="px-2">{user?.email}</div>
        )}
      </div>

      {/* submit button */}
      <div className="">
        {(editingName || editingEmail) && (
          <>
            <p className="text-sm text-amber-400 px-1 pb-4">
              Changing name/email will log you out. You'll need to log in again.
            </p>

            {error && (
              <div className="text-sm leading-none text-red-600 px-1 pb-2">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-[50%] p-[10px] rounded-[16px] mt-4 duration-150 select-none outline-none border-none font-medium ${
                loading
                  ? "bg-[#444] text-[#888] cursor-not-allowed"
                  : "bg-white text-black hover:bg-[#dcdcdc] active:bg-[#c8c8c8]"
              }`}
            >
              <div className="h-5 flex justify-center items-center">
                {loading ? <Loading size={6} /> : "Update"}
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

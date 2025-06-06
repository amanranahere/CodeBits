import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/userStore";
import { MdModeEdit } from "react-icons/md";

export default function AccountInfo() {
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

    await updateAccountInfo({
      name: nameInput,
      email: emailInput,
    });

    setEditingName(false);
    setEditingEmail(false);
  };

  return (
    <div className="space-y-10">
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
          className={`text-gray-700 dark:text-[#8c8c8c] select-none ${
            editingName ? "px-3" : ""
          }`}
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
          <div>{user?.name}</div>
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

        <div
          className={`text-gray-700 dark:text-[#8c8c8c] select-none ${
            editingEmail ? "px-3" : ""
          }`}
        >
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
          <div>{user?.email}</div>
        )}
      </div>

      {/* submit button */}
      <div className="pt-6">
        {(editingName || editingEmail) && (
          <>
            {error && (
              <div className="text-sm leading-none text-red-600 p-2">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-[50%] p-[10px] rounded-[16px] duration-150 select-none outline-none border-none ${
                loading
                  ? "bg-[#00bfff96] cursor-not-allowed"
                  : "bg-[#00bfff] hover:bg-[#00bfff96] active:bg-[#00bfff63]"
              }`}
            >
              {loading ? "Updating..." : "Submit"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

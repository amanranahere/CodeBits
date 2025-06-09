import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import AccountInfo from "../Settings/AccountInfo";
import UpdatePassword from "../Settings/UpdatePassword";
import DeleteAccount from "../Settings/DeleteAccount";

function SettingsModal() {
  const navigate = useNavigate();
  const [optActive, setOptActive] = useState("info");

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[90%] max-w-[800px] h-[95%] md:h-[80%] z-[999] rounded-[20px] shadow-lg dark:bg-[#303030] dark:text-white flex flex-col">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="absolute top-5 lg:top-6 right-5 lg:right-6 p-1 hover:bg-[#4a4a4a] text-[#9a9a9a] hover:text-[#f1f1f1] rounded-full cursor-pointer z-10 duration-100"
      >
        <IoClose className="w-6 h-6" />
      </div>

      <div className="w-full pl-7 py-6 text-lg lg:text-xl font-semibold">
        Settings
      </div>

      <hr className="my-1 mx-3 border-[#e5e7eb] dark:border-[#4a4a4a]" />

      <div className="flex flex-col md:flex-row flex-grow overflow-hidden pb-2">
        <div className="md:w-[30%] m-2 md:m-0 p-2 md:p-4 flex flex-wrap md:flex-col bg-[#2a2a2a] md:bg-[#303030] rounded-xl">
          <button
            onClick={() => setOptActive("info")}
            className={`w-full text-center md:text-left p-2 text-[#e0e0e0] hover:bg-[#3a3a3a] duration-150 rounded-xl ${
              optActive === "info" && "bg-[#4a4a4a]"
            } `}
          >
            Account Info
          </button>

          <button
            onClick={() => setOptActive("password")}
            className={`w-full text-center md:text-left p-2 text-[#e0e0e0] hover:bg-[#3a3a3a] duration-150 rounded-xl whitespace-nowrap ${
              optActive === "password" && "bg-[#4a4a4a]"
            } `}
          >
            Update Password
          </button>

          <button
            onClick={() => setOptActive("delete")}
            className={`w-full text-center md:text-left p-2 text-[#e0e0e0] hover:bg-[#3a3a3a] duration-150 rounded-xl ${
              optActive === "delete" && "bg-[#4a4a4a]"
            } `}
          >
            Delete Account
          </button>
        </div>

        <div className="w-full md:w-[70%] p-2 mt-2 md:mt-0 md:p-4 overflow-hidden overflow-y-auto">
          {optActive === "info" && <AccountInfo />}
          {optActive === "password" && <UpdatePassword />}
          {optActive === "delete" && <DeleteAccount />}
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;

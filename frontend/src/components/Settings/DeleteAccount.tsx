import { useState } from "react";
import { useUserStore } from "../../stores/userStore";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const deleteAccount = useUserStore((state) => state.deleteAccount);
  const loading = useUserStore((state) => state.loading);

  return (
    <div className="border border-red-400 p-4 md:p-6 rounded-2xl">
      <p className="mb-8">
        <strong className="text-red-400">Warning:</strong> Deleting your account
        will permanently erase all your files and personal data.{" "}
        <strong>This action is irreversible and cannot be undone.</strong>
      </p>

      <div className="w-full flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          disabled={loading}
          className={`w-[50%] p-[10px] rounded-[16px] duration-150 select-none outline-none border-none ${
            loading
              ? "bg-red-500 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-500/80 active:bg-[#00bfff63]"
          }`}
        >
          {loading ? "Deleting..." : "Delete Account"}
        </button>
      </div>

      <ConfirmDeleteModal
        open={showModal}
        title="Delete Account"
        description="This action is permanent and cannot be undone."
        onCancel={() => setShowModal(false)}
        onConfirm={async () => {
          await deleteAccount();
          setShowModal(false);
          navigate("/");
        }}
      />
    </div>
  );
}

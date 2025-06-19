interface ConfirmDeleteModalProps {
  title?: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
  open: boolean;
}

const ConfirmDeleteModal = ({
  title = "Delete File",
  description = "Are you sure you want to delete this file? This action cannot be undone.",
  onCancel,
  onConfirm,
  open,
}: ConfirmDeleteModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="dark:bg-[#303030] dark:text-white p-6 rounded-3xl shadow-lg max-w-sm w-full">
        <p className="text-lg font-semibold mb-2 text-black dark:text-white overflow-hidden">
          {title}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>

        <div className="flex justify-between gap-2 mt-6">
          <button
            onClick={onCancel}
            className="w-full px-4 py-2 rounded-xl text-white bg-[#3a3a3a] hover:bg-[#4a4a4a] active:bg-[#3a3a3a]"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-full px-4 py-2 rounded-xl bg-red-400 hover:bg-red-400/80 active:bg-red-400/60 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

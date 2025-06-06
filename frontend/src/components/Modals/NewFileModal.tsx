import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFileStore } from "../../stores/fileStore";
import { useUIStore } from "../../stores/uiStore";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

interface NewFileInput {
  name: string;
  extension: string;
  description?: string;
}

const NewFileModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<NewFileInput>();

  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const createFile = useFileStore((state) => state.createFile);
  const files = useFileStore((state) => state.files);
  const { toggleNewFileModal } = useUIStore();

  const nameInput = watch("name")?.trim().replace(/\s+/g, "");
  const isDuplicate = files.some((f) => f.name === nameInput);

  const onSubmit = async (data: NewFileInput) => {
    const sanitizedName = data.name.trim().replace(/\s+/g, "");
    const sanitizedExtension = data.extension.trim();

    if (!sanitizedName || !sanitizedExtension || isDuplicate) return;

    setCreating(true);
    try {
      const file = await createFile({
        name: sanitizedName,
        extension: sanitizedExtension,
        description: data.description?.trim(),
      });

      if (!file) return;

      navigate(`/file/${file.name}--${file._id}`);
      reset();
      toggleNewFileModal();
    } catch (err) {
      console.error("Failed to create file:", err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[80%] lg:w-[40%] z-[999] rounded-[20px] shadow-lg dark:bg-[#303030] dark:text-white flex flex-col">
      <div
        onClick={toggleNewFileModal}
        className="absolute top-5 lg:top-6 right-5 lg:right-6 p-1 hover:bg-[#4a4a4a] text-[#9a9a9a] hover:text-[#f1f1f1] rounded-full cursor-pointer z-10 duration-100"
      >
        <IoClose className="w-6 h-6" />
      </div>

      <div className="w-full pl-7 py-6 text-lg lg:text-xl font-semibold">
        Create New file
      </div>

      <hr className="my-1 mx-3 border-[#e5e7eb] dark:border-[#4a4a4a]" />

      <div className="flex-1 overflow-y-auto p-2 md:p-6 space-y-6 custom_scrollbar">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-3 bg-[#3a3a3a] hover:bg-[#3a3a3a]/80 focus:bg-[#3a3a3a]/80 text-white outline-none rounded-[16px] duration-300"
              {...register("name", { required: "Filename is required" })}
            />

            {errors.name && (
              <p className="text-sm leading-none text-red-600 p-2">
                {errors.name.message}
              </p>
            )}

            {isDuplicate && (
              <p className="text-sm leading-none text-red-600 p-2">
                A file with this name already exists.
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="File type (e.g., js)"
              className="w-full p-3 bg-[#3a3a3a] hover:bg-[#3a3a3a]/80 focus:bg-[#3a3a3a]/80 text-white outline-none rounded-[16px] duration-300"
              {...register("extension", { required: "Extension is required" })}
            />

            {errors.extension && (
              <p className="text-sm leading-none text-red-600 p-2">
                {errors.extension.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Description"
              className="w-full h-[10rem] p-3 bg-[#3a3a3a] hover:bg-[#3a3a3a]/80 focus:bg-[#3a3a3a]/80 text-white outline-none resize-none rounded-[16px] duration-300"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              {...register("description")}
            />
          </div>

          <div className="flex justify-between gap-3 mt-2">
            <button
              type="button"
              onClick={toggleNewFileModal}
              className="w-[50%] border-none outline-none py-2 bg-red-400 hover:bg-red-400/60 active:bg-red-400/60 border rounded-[16px] select-none duration-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={creating || isDuplicate}
              className={`w-[50%] p-[10px] rounded-[16px] duration-200 select-none outline-none border-none ${
                creating || isDuplicate
                  ? "bg-[#00bfff96] cursor-not-allowed"
                  : "bg-[#00bfff] hover:bg-[#00bfff96] active:bg-[#00bfff63]"
              }`}
            >
              {creating ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFileModal;

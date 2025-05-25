import { useForm } from "react-hook-form";
import { useFileStore } from "../../stores/fileStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface NewFileInput {
  name: string;
  extension: string;
  description?: string;
}

const NewFileDialog = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<NewFileInput>();

  const [creating, setCreating] = useState(false);
  const createFile = useFileStore((state) => state.createFile);
  const files = useFileStore((state) => state.files);
  const navigate = useNavigate();

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
      onClose();
    } catch (err) {
      console.error("Failed to create file:", err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dark:bg-[#121212] dark:text-white px-10 py-8 rounded-[40px] shadow-lg w-[90%] max-w-2xl overflow-hidden">
      <h2 className="text-2xl text-center font-bold mb-8 font-mono">
        Create New File
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-3 bg-[#333] hover:bg-[#333]/80 focus:bg-[#333]/80 text-white outline-none rounded-[16px] duration-300"
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
            className="w-full p-3 bg-[#333] hover:bg-[#333]/80 focus:bg-[#333]/80 text-white outline-none rounded-[16px] duration-300"
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
            className="w-full h-[10rem] p-3 bg-[#333] hover:bg-[#333]/80 focus:bg-[#333]/80 text-white outline-none resize-none rounded-[16px] duration-300"
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
            onClick={onClose}
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
  );
};

export default NewFileDialog;

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useUIStore } from "../../stores/uiStore";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

type FeedbackData = {
  name: string;
  email: string;
  message: string;
};

export default function FeedbackModal() {
  const [sending, setSending] = useState(false);
  const { toggleFeedbackModal } = useUIStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackData>();

  const onSubmit = async (data: FeedbackData) => {
    try {
      setSending(true);
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        data,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success("Feedback sent successfully!");
      reset();
      toggleFeedbackModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send feedback.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[60%] max-w-[600px] max-h-[80%] rounded-[20px] shadow-lg dark:bg-[#303030] dark:text-white flex flex-col">
      <div
        onClick={toggleFeedbackModal}
        className="absolute top-5 lg:top-6 right-5 lg:right-6 p-1 hover:bg-[#4a4a4a] text-[#9a9a9a] hover:text-[#f1f1f1] rounded-full cursor-pointer z-10 duration-100"
      >
        <IoClose className="w-6 h-6" />
      </div>

      <div className="w-full pl-7 py-6 text-lg lg:text-xl font-semibold">
        Send Feedback
      </div>

      <hr className="my-1 mx-3 border-[#e5e7eb] dark:border-[#4a4a4a]" />

      <div className="flex-1 overflow-y-auto p-2 md:p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div>
            <input
              type="text"
              placeholder="Your name"
              className="w-full p-3 bg-[#3a3a3a] hover:bg-[#3a3a3a]/80 focus:bg-[#3a3a3a]/80 text-white outline-none rounded-[16px] duration-300"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-sm leading-none text-red-500 p-2">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-3 bg-[#3a3a3a] hover:bg-[#3a3a3a]/80 focus:bg-[#3a3a3a]/80 text-white outline-none rounded-[16px] duration-300"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm leading-none text-red-500 p-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Your message"
              className="w-full h-[10rem] p-3 bg-[#3a3a3a] hover:bg-[#3a3a3a]/80 focus:bg-[#3a3a3a]/80 text-white outline-none resize-none rounded-[16px] duration-300"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && (
              <p className="text-sm leading-none text-red-500 p-2">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="flex justify-between gap-3 mt-2">
            <button
              type="button"
              onClick={toggleFeedbackModal}
              className="w-[50%] border-none outline-none py-2 bg-red-400 hover:bg-red-400/60 active:bg-red-400/60 rounded-[16px] select-none duration-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={sending}
              className={`w-[50%] p-[10px] rounded-[16px] duration-200 select-none outline-none border-none ${
                sending
                  ? "bg-[#00bfff96] cursor-not-allowed"
                  : "bg-[#00bfff] hover:bg-[#00bfff96] active:bg-[#00bfff63]"
              }`}
            >
              {sending ? "Sending..." : "Send Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

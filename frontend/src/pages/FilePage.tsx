import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFileStore } from "../stores/fileStore";
import { useUIStore } from "../stores/uiStore";
import CodeEditor from "../components/Editor/CodeEditor";
import { getFileIcon } from "../components/getFileIcon";
import { IoInformationCircleOutline } from "react-icons/io5";

const extensionToLanguageMap: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  jsx: "javascript",
  tsx: "typescript",
  py: "python",
  java: "java",
  cpp: "cpp",
  json: "json",
  html: "html",
  css: "css",
  md: "markdown",
  sh: "shell",
  yml: "yaml",
  yaml: "yaml",
  go: "go",
  php: "php",
  rb: "ruby",
  rs: "rust",
  txt: "plaintext",
};

export default function FilePage() {
  const { slug } = useParams();
  const files = useFileStore((state) => state.files);
  const { updateFile } = useFileStore();

  const fileId = slug?.split("--").pop();
  const file = files.find((f) => f._id === fileId);

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("plaintext");
  const [isChanged, setIsChanged] = useState(false);
  const [prevFileId, setPrevFileId] = useState<string | null>(null);

  const { openFileInfoModal } = useUIStore();

  useEffect(() => {
    //   auto-save on file change
    if (prevFileId && prevFileId !== fileId && isChanged) {
      const prevFile = files.find((f) => f._id === prevFileId);
      if (prevFile) {
        updateFile(prevFile._id, { code });
      }
    }

    if (file) {
      setCode(file.code || "");
      const ext = file.extension;
      const detectedLang = extensionToLanguageMap[ext ?? ""] || "plaintext";
      setLanguage(detectedLang);
      setIsChanged(false);
      setPrevFileId(fileId ?? null);
    }
  }, [file]);

  useEffect(() => {
    setIsChanged(false);
  }, [file?._id]);

  const handleCodeChange = (newCode: string | undefined) => {
    setCode(newCode || "");
    setIsChanged(newCode !== file?.code);
  };

  const handleSave = async () => {
    if (!file) return;

    await updateFile(file._id, { code });
    setIsChanged(false);
    console.log("FILE SAVED!!!");
  };

  if (!file) {
    return (
      <div className="h-full w-full flex justify-center items-center text-white">
        File not found
      </div>
    );
  }

  return (
    <div className="h-full text-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-x-2">
          <span className="text-xl">{getFileIcon(file.extension)}</span>
          <h1 className="text-xl font-bold">
            {file.name}.{file.extension}
          </h1>
        </div>

        {/* buttons */}
        <div className="flex items-center gap-x-4">
          {file && (
            <button
              onClick={() => openFileInfoModal(file)}
              className="hover:bg-[#5a5a5a] rounded-xl px-2 py-1 flex items-center gap-x-1 border-2 border-[#5a5a5a] duration-150"
            >
              <IoInformationCircleOutline className="w-5 h-5" />
              <span className="hidden lg:inline">File Info</span>
            </button>
          )}

          <span
            className={`rounded-xl px-2 py-1 border-2 border-[#5a5a5a] duration-150 ${
              isChanged ? "text-yellow-400" : "text-green-400"
            }`}
          >
            {isChanged ? "Unsaved changes" : "Saved"}
          </span>

          <button
            onClick={handleSave}
            disabled={!isChanged}
            className={`px-4 py-1 rounded-xl font-medium transition-all ${
              isChanged
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-[#3a3a3a] cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>
      </div>

      <hr className="my-4 border-[#e5e7eb] dark:border-[#4a4a4a]" />

      <div className="flex-1 overflow-hidden h-0">
        <CodeEditor
          code={code}
          language={language}
          onChange={handleCodeChange}
        />
      </div>
    </div>
  );
}

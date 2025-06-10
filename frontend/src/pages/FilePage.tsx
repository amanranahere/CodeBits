import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFileStore } from "../stores/fileStore";
import CodeEditor from "../components/Editor/CodeEditor";

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

  useEffect(() => {
    if (file) {
      setCode(file.code || "");

      const ext = file.name.split(".").pop()?.toLowerCase();
      setLanguage(extensionToLanguageMap[ext ?? ""] || "palintext");
    }
  }, [file]);

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
    <div className="h-full p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">
          {file.name}.{file.extension}
        </h1>

        <div className="fixed top-2 left-[50%] flex items-center gap-4">
          <span
            className={`text-sm ${
              isChanged ? "text-yellow-400" : "text-green-400"
            }`}
          >
            {isChanged ? "Unsaved changes" : "Saved"}
          </span>

          <button
            onClick={handleSave}
            disabled={!isChanged}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              isChanged
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-700 cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>
      </div>

      <CodeEditor code={code} language={language} onChange={handleCodeChange} />
    </div>
  );
}

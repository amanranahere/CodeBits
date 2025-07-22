import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFileStore } from "../stores/fileStore";
import { useUIStore } from "../stores/uiStore";
import CodeEditor from "../components/Editor/CodeEditor";
import { getFileIcon } from "../components/getFileIcon";
import {
  IoInformationCircleOutline,
  IoCopyOutline,
  IoSaveOutline,
  IoSave,
} from "react-icons/io5";
import { TiTick } from "react-icons/ti";

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
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const { openFileInfoModal, sidebarOpen } = useUIStore();

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
    setIsSaving(true);

    try {
      await updateFile(file._id, { code });
      setIsChanged(false);
      console.log("FILE SAVED!!!");
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
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
      <div className="flex items-center justify-between px-2 lg:px-4 py-2 pb-2">
        <div
          className={`flex items-center gap-x-2 w-[65vw] md:w-full mask-containerRight overflow-hidden ${
            sidebarOpen ? "" : "pl-12 lg:pl-11"
          }`}
        >
          <span className="text-xl">{getFileIcon(file.extension)}</span>
          <h1 className="text-xl font-bold">
            {file.name}.{file.extension}
          </h1>
        </div>

        {/* buttons */}
        <div className="flex items-center">
          <button
            onClick={handleCopy}
            className="hover:bg-[#3a3a3a] font-bold rounded-full px-2 lg:px-4 py-2 flex items-center gap-x-2 duration-150"
          >
            {copied ? (
              <>
                <TiTick className="w-4 h-4 text-green-400" />
                <span className="hidden lg:inline">Copied</span>
              </>
            ) : (
              <>
                <IoCopyOutline className="w-4 h-4" />
                <span className="hidden lg:inline">Copy</span>
              </>
            )}
          </button>

          <button
            onClick={() => openFileInfoModal(file)}
            className="hover:bg-[#3a3a3a] font-bold rounded-full px-2 lg:px-4 py-2 flex items-center gap-x-1 duration-150"
          >
            <IoInformationCircleOutline className="w-5 h-5" />
            <span className="hidden lg:inline whitespace-nowrap">
              File Info
            </span>
          </button>

          <button
            onClick={handleSave}
            disabled={!isChanged}
            title={isChanged ? "Save changes" : "No changes to save"}
            className={`px-2 lg:px-4 py-2 rounded-full transition-all duration-150 flex items-center gap-x-2 font-bold 
            ${
              isChanged && !isSaving
                ? " hover:bg-[#3a3a3a] text-white"
                : "bg-inherit text-[#9a9a9a] cursor-not-allowed"
            }`}
          >
            {isSaving ? (
              <>
                <IoSave className="w-5 h-5" />
                <span className="hidden lg:inline">Saving</span>
              </>
            ) : (
              <>
                <IoSaveOutline className="w-5 h-5" />
                <span className="hidden lg:inline">Save</span>
              </>
            )}
          </button>
        </div>
      </div>

      <hr className=" border-[#e5e7eb] dark:border-[#2a2a2a]" />

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

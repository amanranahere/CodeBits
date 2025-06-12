import Editor from "@monaco-editor/react";
import { useUserStore } from "../../stores/userStore";

type CodeEditorProps = {
  code: string;
  language: string;
  onChange: (value: string | undefined) => void;
};

export default function CodeEditor({
  code,
  language,
  onChange,
}: CodeEditorProps) {
  const themeMode = useUserStore((state) => state.theme);
  const monacoTheme = themeMode === "dark" ? "vs-dark" : "vs";

  const handleBeforeMount = (monaco: any) => {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    monaco.editor.onDidCreateModel((model: any) => {
      monaco.editor.setModelMarkers(model, "owner", []);

      const listener = monaco.editor.onDidChangeMarkers((uris: any) => {
        for (const uri of uris) {
          if (uri.toString() === model.uri.toString()) {
            monaco.editor.setModelMarkers(model, "owner", []);
          }
        }
      });

      model.onWillDispose(() => {
        listener.dispose();
      });
    });
  };

  return (
    <Editor
      height="100%"
      width="100%"
      defaultLanguage={language}
      value={code}
      onChange={onChange}
      beforeMount={handleBeforeMount}
      theme={monacoTheme}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        quickSuggestions: false,
        suggestOnTriggerCharacters: false,
        parameterHints: { enabled: false },
        contextmenu: false,
        formatOnType: false,
        formatOnPaste: false,
      }}
    />
  );
}

import React, { useEffect, useRef } from "react";
import { Editor, useMonaco } from "@monaco-editor/react";
import "monaco-themes/themes/Night Owl.json";
import { data } from "autoprefixer";

const CodeEditor = ({ language, value, setVal }) => {
  const monaco = useMonaco();

  const handleValueChange = (newVal) => {
    setVal(newVal);
  };
  const editorRef = useRef();

  const handleMount = (editor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (monaco) {
      import("monaco-themes/themes/Night Owl.json")
        .then((data) => {
          monaco.editor.defineTheme("night-owl", data);
        })
        .then(() => monaco.editor.setTheme("night-owl"));
    }
  });

  return (
    <Editor
      language={language}
      value={value}
      height="100vh"
      onChange={handleValueChange}
      onMount={handleMount}
      options={{
        minimap: { enabled: false },
        wordWrap: "on",
      }}
    />
  );
};

export default CodeEditor;

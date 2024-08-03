import React, { useEffect, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import { SAMPLE_CODE } from "../utils/constants";
import Preview from "../components/Preview";
import LangSwitch from "../components/LangSwitch";
import PreviewSwitch from "../components/PreviewSwitch";

const EditorWindow = () => {
  const [html, setHtml] = useState(SAMPLE_CODE.html);
  const [css, setCss] = useState(SAMPLE_CODE.css);
  const [javascript, setJavascript] = useState(SAMPLE_CODE.javascript);

  const [active, setActive] = useState("html");
  const [preview, setPreview] = useState(false);

  const [code, setCode] = useState(`
      <html>
        <style>
          ${css}
        </style>
        <body>
          ${html}
        </body>
        <script>
          ${javascript}
        </script>
      </html>
    `);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCode(`
              <html>
                <style>
                  ${css}
                </style>
                <body>
                  ${html}
                </body>
                <script>
                  ${javascript}
                </script>
              </html>
        `);
    }, 250);
    return () => clearTimeout(timer);
  }, [html, css, javascript]);

  return (
    <div>
      <div className="hidden w-full lg:grid-cols-2 lg:grid">
        <div className="flex flex-col">
          <div className="w-full bg-gradient-to-r from-slate-900 to-slate-700">
            <LangSwitch setActive={setActive} active={active} />
          </div>
          {(active == "html" && (
            <CodeEditor language="html" value={html} setVal={setHtml} />
          )) ||
            (active == "css" && (
              <CodeEditor language="css" value={css} setVal={setCss} />
            )) ||
            (active == "javascript" && (
              <CodeEditor
                language="javascript"
                value={javascript}
                setVal={setJavascript}
              />
            ))}
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className="w-full bg-gradient-to-r from-slate-900 to-slate-700">
            <h3 className="p-1 w-fit text-sm bg-[#011627] hover:bg-slate-600 ">
              Preview
            </h3>
          </div>
          <Preview code={code} />
        </div>
      </div>
      {!preview ? (
        <div className="grid w-full grid-cols-1 lg:hidden">
          <div className="flex flex-col">
            <div className="w-full bg-gradient-to-r from-slate-900 to-slate-700">
              <LangSwitch setActive={setActive} active={active} />
            </div>
            {(active == "html" && (
              <CodeEditor language="html" value={html} setVal={setHtml} />
            )) ||
              (active == "css" && (
                <CodeEditor language="css" value={css} setVal={setCss} />
              )) ||
              (active == "javascript" && (
                <CodeEditor
                  language="javascript"
                  value={javascript}
                  setVal={setJavascript}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen overflow-hidden lg:hidden">
          <div className="w-full bg-gradient-to-r from-slate-900 to-slate-700">
            <h3 className="p-1 w-fit text-sm bg-[#011627] hover:bg-slate-600 ">
              Preview
            </h3>
          </div>
          <Preview code={code} />
        </div>
      )}

      <PreviewSwitch preview={preview} setPreview={setPreview} />
    </div>
  );
};

export default EditorWindow;

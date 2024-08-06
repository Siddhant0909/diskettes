import React, { useEffect, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Preview from "../components/Preview";
import LangSwitch from "../components/LangSwitch";
import PreviewSwitch from "../components/PreviewSwitch";
import Loader from "../components/Loader";
import { getDisk, updateDisk } from "../redux/features/diskSlice";

const EditorWindow = () => {
  const userId = JSON.parse(localStorage.getItem("user")).$id;
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [javascript, setJavascript] = useState("");

  const [active, setActive] = useState("html");
  const [preview, setPreview] = useState(false);

  const [isReadOnly, setIsReadOnly] = useState(true);

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

  const dispatch = useDispatch();
  const { documentId } = useParams();
  const { loading } = useSelector((state) => state.disk);

  useEffect(() => {
    dispatch(getDisk(documentId)).then((res) => {
      setHtml(res.payload.html);
      setCss(res.payload.css);
      setJavascript(res.payload.javascript);
      if (userId === res.payload.userId) {
        setIsReadOnly(false);
      }
    });
  }, []);

  const data = {
    html: html,
    css: css,
    javascript: javascript,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isReadOnly) {
        dispatch(updateDisk({ documentId, data }));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [html, css, javascript]);

  const getEditorProps = () => {
    switch (active) {
      case "html":
        return { language: "html", value: html, setVal: setHtml };
      case "css":
        return { language: "css", value: css, setVal: setCss };
      case "javascript":
        return {
          language: "javascript",
          value: javascript,
          setVal: setJavascript,
        };
      default:
        return { language: "html", value: html, setVal: setHtml };
    }
  };

  const editorProps = getEditorProps();

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="hidden w-full lg:grid-cols-2 lg:grid shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
        <div className="flex flex-col">
          <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800">
            <LangSwitch setActive={setActive} active={active} />
          </div>
          <CodeEditor {...editorProps} />
          {/* {(active === "html" && (
            <CodeEditor
              language="html"
              value={html}
              setVal={setHtml}
            />
          )) ||
            (active === "css" && (
              <CodeEditor
                language="css"
                value={css}
                setVal={setCss}
              />
            )) ||
            (active === "javascript" && (
              <CodeEditor
                language="javascript"
                value={javascript}
                setVal={setJavascript}
              
              />
            ))} */}
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className="w-full bg-gradient-to-r from-slate-800 to-slate-700">
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
            <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800">
              <LangSwitch setActive={setActive} active={active} />
            </div>
            <CodeEditor {...editorProps} />
            {/* {(active === "html" && (
              <CodeEditor
                language="html"
                value={html}
                setVal={setHtml}
              />
            )) ||
              (active === "css" && (
                <CodeEditor
                  language="css"
                  value={css}
                  setVal={setCss}
                />
              )) ||
              (active === "javascript" && (
                <CodeEditor
                  language="javascript"
                  value={javascript}
                  setVal={setJavascript}
                
                />
              ))} */}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen overflow-hidden lg:hidden">
          <div className="w-full bg-gradient-to-r from-slate-800 to-slate-700">
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

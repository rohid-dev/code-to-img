import type { Extension } from "@codemirror/state";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useEditor } from "../contexts/EditorContext";
import Editor from "./Editor/Editor";
import { getTheme } from "./Editor/themes";

import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { rust } from "@codemirror/lang-rust";
import { css } from "@codemirror/lang-css";
import { markdown } from "@codemirror/lang-markdown";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";

const Preview = () => {
  const [bgWidth, setBgWidth] = useState(0);
  const [bgHeight, setBgHeight] = useState(0);
  const { settings, setSettings, canvasRef } = useEditor();
  const [extentions, setExtentions] = useState<Extension[] | undefined>([]);

  const onCodeChange = useCallback(
    (value: string) => {
      setSettings({
        ...settings,
        code: value,
      });
    },
    [setSettings]
  );

  useEffect(() => {
    switch (settings.language) {
      case "json":
        setExtentions([json()]);
        break;
      case "javascript":
        setExtentions([javascript()]);
        break;
      case "coffeescript":
        setExtentions([javascript()]);
        break;
      case "jsx":
        setExtentions([javascript({ jsx: true, typescript: true })]);
        break;
      case "typescript":
        setExtentions([javascript({ typescript: true })]);
        break;
      case "python":
        setExtentions([python()]);
        break;
      case "html":
        setExtentions([html()]);
        break;
      case "markdown":
        setExtentions([markdown()]);
        break;
      case "css":
        setExtentions([css()]);
        break;
      case "scss":
        setExtentions([css()]);
        break;
      case "rust":
        setExtentions([rust()]);
        break;
      case "c++":
        setExtentions([cpp()]);
        break;
      case "c":
        setExtentions([cpp()]);
        break;
      case "c#":
        setExtentions([cpp()]);
        break;
      case "java":
        setExtentions([java()]);
        break;
      case "xml":
        setExtentions([xml()]);
        break;
      default:
        setExtentions(undefined);
        break;
    }
  }, [settings.language]);

  useEffect(() => {
    if (canvasRef.current) {
      setBgWidth(canvasRef.current.clientWidth);
      setBgHeight(canvasRef.current.clientHeight);
    }
  }, [settings.padding, settings.code, settings.title, canvasRef.current]);

  const padding = useMemo(
    () =>
      `${
        settings.padding === "small"
          ? 36
          : settings.padding === "medium"
          ? 48
          : settings.padding === "large"
          ? 64
          : 96
      }px`,
    [settings.padding]
  );

  return (
    <div
      className={`w-full overflow-x-auto p-16 mb-40 ${
        settings.darkMode ? "dark" : ""
      }`}
    >
      <div
        className="mx-auto overflow-hidden w-fit bg-repeat bg-center rounded-xl relative"
        style={{
          backgroundImage: "url(/transparent-bg-pattern.png)",
        }}
      >
        <div
          ref={canvasRef}
          className="bg-no-repeat bg-cover bg-center relative"
          style={{
            padding,
            backgroundImage: settings.backgroundImage,
            backgroundColor: settings.backgroundColor,
          }}
        >
          {settings.showWaterMark && (
            <div className="absolute left-4 bottom-2 mix-blend-overlay opacity-50 text-white">
              codetoimg.com
            </div>
          )}
          <div
            className="dark:bg-gray-800 rounded-2xl bg-white text-gray-800 dark:text-gray-100 shadow-2xl border-black/30 border dark:border-white/30 relative overflow-hidden"
            style={{
              boxShadow: `0 0 0 1px ${
                settings.darkMode
                  ? "rgba(0, 0, 0, 0.3)"
                  : "rgba(255, 255, 255, 0.3)"
              } ${
                settings.dropShadow
                  ? ", 0px 12px 30px -3px rgba(0, 0, 0, 0.4)"
                  : ""
              }`,
              zIndex: 10,
            }}
          >
            <div
              style={{
                backgroundImage: settings.backgroundThumb,
                backgroundColor: settings.backgroundColor,
                width: bgWidth,
                height: bgHeight,
                left: `-${padding}`,
                top: `-${padding}`,
                zIndex: -5,
                opacity: settings.bgBlur ? 0.3 : 0,
                filter: `blur(${settings.bgBlur ? 60 : 0}px)`,
              }}
              className="w-full h-full absolute inset-0 bg-no-repeat bg-cover bg-center"
            />
            <WindowTitleBar />
            <Editor
              value={settings.code}
              onChange={onCodeChange}
              extensions={extentions}
              theme={getTheme({
                darkMode: settings.darkMode,
                showLineNumber: settings.showLineNumber,
                fontSize: settings.fontSize,
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;

const WindowTitleBar = () => {
  const { settings, setSettings } = useEditor();
  return (
    <div className="px-4 h-12 flex items-center gap-8 z-20">
      <div className="flex items-center gap-2 h-full">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <input
        value={settings.title}
        translate="no"
        autoCorrect="off"
        onChange={(e) => {
          setSettings({
            ...settings,
            title: e.target.value,
          });
        }}
        className="w-auto min-w-0 bg-transparent outline-none p-0 border-0 text-center text-gray-600 dark:text-gray-300 flex-1"
      />
      <div className="flex items-center gap-2.5 opacity-0">
        <div className="w-3" />
        <div className="w-3" />
        <div className="w-3" />
      </div>
    </div>
  );
};

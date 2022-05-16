import type { Extension } from "@codemirror/state";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useEditor } from "../contexts/EditorContext";
import Editor from "./Editor/Editor";
import { getTheme } from "./Editor/themes";
import { isDark } from "../utils";
import { getExtentions } from "./Editor/get-extentions";

const Preview = () => {
  const { settings, canvasRef, getPadding } = useEditor();

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
            padding: getPadding(),
            backgroundImage: settings.backgroundImage,
            backgroundColor: settings.backgroundColor,
          }}
        >
          <TitleField />
          <Window />
          <WatterMark />
        </div>
      </div>
    </div>
  );
};

export default Preview;

const Window = () => {
  const [bgWidth, setBgWidth] = useState(0);
  const [bgHeight, setBgHeight] = useState(0);
  const [extentions, setExtentions] = useState<Extension[] | undefined>([]);
  const { settings, setSettings, canvasRef, getPadding } = useEditor();

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
    setExtentions(getExtentions(settings.language));
  }, [settings.language]);

  useEffect(() => {
    if (canvasRef.current) {
      setBgWidth(canvasRef.current.clientWidth);
      setBgHeight(canvasRef.current.clientHeight);
    }
  }, [settings.padding, settings.code, settings.title, canvasRef.current]);

  return (
    <div
      className="dark:bg-gray-800 rounded-2xl bg-white text-gray-800 dark:text-gray-100 shadow-2xl border-black/30 border dark:border-white/30 relative overflow-hidden"
      style={{
        boxShadow: `0 0 0 1px ${
          settings.darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)"
        } ${
          settings.dropShadow ? ", 0px 12px 30px -3px rgba(0, 0, 0, 0.4)" : ""
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
          left: `-${getPadding()}`,
          top: `-${getPadding()}`,
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
  );
};

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
        value={settings.filename}
        translate="no"
        autoCorrect="off"
        onChange={(e) => {
          setSettings({
            ...settings,
            filename: e.target.value,
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

const TitleField = () => {
  const { settings, setSettings, getPadding } = useEditor();

  if (!settings.showTitle) return null;

  const largestLine = useMemo(() => {
    const lines = settings.title.split("\n");
    return Math.max(...lines.map((line) => line.length));
  }, [settings.title]);

  const totalLines = useMemo(() => {
    const lines = settings.title.split("\n");
    return lines.length;
  }, [settings.title]);

  return (
    <div
      className="flex items-center justify-center w-full"
      style={{
        paddingBottom: getPadding(),
      }}
    >
      <textarea
        placeholder="Title Text"
        className="w-full text-3xl bg-transparent outline-none border-none text-center placeholder-white/50 p-0 font-bold resize-none selection:bg-blue-500 inline-block"
        style={{
          color: settings.backgroundImage
            ? "#fff"
            : isDark(settings.backgroundColor)
            ? "#fff"
            : "#000",
          // 2.25 is the lineheight of the textarea
          height: `${2.25 * totalLines}rem`,
          width: `max(300px, ${largestLine}ch)`,
          textShadow: "0 0 0.35rem rgba(0, 0, 0, 0.2)",
        }}
        spellCheck="false"
        value={settings.title}
        onChange={(e) =>
          setSettings({
            ...settings,
            title: e.target.value,
          })
        }
        rows={1}
      />
    </div>
  );
};

const WatterMark = () => {
  const { settings } = useEditor();
  if (!settings.showWaterMark) return null;
  return (
    <div className="absolute left-4 bottom-2 mix-blend-overlay opacity-50 text-white">
      codetoimg.com
    </div>
  );
};

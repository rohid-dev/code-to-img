import { javascript } from "@codemirror/lang-javascript";
import { useCallback } from "react";
import { useEditor } from "../contexts/EditorContext";
import Editor from "./Editor/Editor";
import { getTheme } from "./Editor/themes";
import * as Popover from "@radix-ui/react-popover";

const Preview = () => {
  const { settings, setSettings } = useEditor();

  const onCodeChange = useCallback(
    (value: string) => {
      setSettings({
        ...settings,
        code: value,
      });
    },
    [setSettings]
  );

  return (
    <div
      className={`"w-full overflow-x-auto px-16" ${
        settings.darkMode ? "dark" : ""
      }`}
    >
      <div
        className="mx-auto overflow-hidden w-fit mt-16 mb-40 bg-repeat bg-center rounded-xl"
        style={{
          backgroundImage: "url(/transparent-bg-pattern.png)",
        }}
      >
        <div
          className="bg-no-repeat bg-cover bg-center"
          style={{
            padding: `${64}px`,
            backgroundImage: settings.backgroundImage,
            backgroundColor: settings.backgroundColor,
          }}
        >
          <div
            className="dark:bg-gray-900/60 rounded-2xl backdrop-blur-2xl bg-white/60 text-gray-800 dark:text-gray-100 shadow-2xl border-black/30 border dark:border-white/30"
            style={{
              transitionProperty: "box-shadow, background-color, border-color",
              transitionDuration: "300ms",
              transitionTimingFunction: "ease-in-out",
              boxShadow: `0 0 0 1px ${
                settings.darkMode
                  ? "rgba(0, 0, 0, 0.3)"
                  : "rgba(255, 255, 255, 0.3)"
              } ${
                settings.dropShadow
                  ? ", 0px 12px 30px -3px rgba(0, 0, 0, 0.4)"
                  : ""
              }`,
            }}
          >
            <WindowTitleBar />
            <Editor
              value={settings.code}
              onChange={onCodeChange}
              extensions={[javascript({ jsx: true, typescript: true })]}
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
    <div className="px-4 h-12 flex items-center gap-8">
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

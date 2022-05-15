import classNames from "classnames";
import { MdArrowDropDown } from "react-icons/md";
import { useEditor } from "../contexts/EditorContext";
import { BackgroundPicker } from "./BackgroundPicker";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const ToolBar = () => {
  const {
    setSettings,
    settings,
    onExport,
    onCopyAsLink,
    onCopyAsImage,
    onReset,
  } = useEditor();

  return (
    <div className="fixed bottom-0 w-full left-0 right-0 p-4 md:p-8 z-20 pointer-events-none">
      <div className="mx-auto max-w-fit min-w-0 pointer-events-auto">
        <div className="bg-gray-900/60 ring-offset-white/20 ring-offset-1 rounded-2xl backdrop-blur-xl ring-1 ring-black/40 shadow-2xl">
          <div className="flex gap-4 p-4 overflow-x-auto items-center">
            <BackgroundPicker />
            <SwitchItem
              label="Background Blur"
              value={settings.bgBlur}
              onChange={() =>
                setSettings({
                  ...settings,
                  bgBlur: !settings.bgBlur,
                })
              }
            />
            <SwitchItem
              label="Drop Shadow"
              value={settings.dropShadow}
              onChange={() =>
                setSettings({ ...settings, dropShadow: !settings.dropShadow })
              }
            />
            <SwitchItem
              label="Dark Mode"
              value={settings.darkMode}
              onChange={() =>
                setSettings({ ...settings, darkMode: !settings.darkMode })
              }
            />
            <SwitchItem
              label="Line Number"
              value={settings.showLineNumber}
              onChange={() =>
                setSettings({
                  ...settings,
                  showLineNumber: !settings.showLineNumber,
                })
              }
            />
            <SwitchItem
              label="Title Text"
              value={settings.showTitle}
              onChange={() =>
                setSettings({
                  ...settings,
                  showTitle: !settings.showTitle,
                })
              }
            />
            <SelectItem
              label="Font Size"
              options={[
                "12px",
                "14px",
                "16px",
                "18px",
                "20px",
                "22px",
                "24px",
                "28px",
                "32px",
              ]}
              value={settings.fontSize}
              onChange={(value) => {
                setSettings({
                  ...settings,
                  fontSize: value,
                });
              }}
            />
            <SelectItem
              label="Padding"
              options={["small", "medium", "large", "extra-large"]}
              value={settings.padding}
              onChange={(value) => {
                setSettings({
                  ...settings,
                  padding: value,
                });
              }}
            />
            <SelectItem
              label="Language"
              options={[
                "javascript",
                "typescript",
                "jsx",
                "rust",
                "python",
                "c",
                "c++",
                "c#",
                "html",
                "markdown",
                "css",
                "scss",
                "java",
                "json",
                "xml",
                "text",
                "wast",
                "lezer",
                "sql",
                "php",
                "swift",
              ].sort((a, b) => (a < b ? -1 : 1))}
              value={settings.language}
              onChange={(value) => {
                setSettings({
                  ...settings,
                  language: value,
                });
              }}
            />
            <div className="w-px min-w-[1px] bg-white/10 h-12" />
            <SelectItem
              label="Format"
              options={["png", "jpeg", "svg"]}
              value={settings.renderFormat}
              onChange={(value) => {
                setSettings({
                  ...settings,
                  renderFormat: value,
                });
              }}
            />
            <SelectItem
              disabled={settings.renderFormat === "svg"}
              label="Scale"
              options={["1x", "2x", "3x"]}
              value={settings.renderScale}
              onChange={(value) => {
                setSettings({
                  ...settings,
                  renderScale: value,
                });
              }}
            />
            <SwitchItem
              label="Show Watermark"
              value={settings.showWaterMark}
              onChange={() =>
                setSettings({
                  ...settings,
                  showWaterMark: !settings.showWaterMark,
                })
              }
            />
            <div className="flex h-10 rounded-md">
              <button
                onClick={() => onExport()}
                className="bg-primary-500 hover:bg-primary-600 px-4 flex items-center justify-center h-full border-r border-r-primary-600 truncate rounded-l-md"
              >
                Export
              </button>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="bg-primary-500 hover:bg-primary-600 w-10 flex items-center justify-center h-full truncate rounded-r-md">
                    <MdArrowDropDown className="text-2xl" />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  sideOffset={10}
                  align="center"
                  side="top"
                  className="bg-gray-900 ring-offset-white/20 ring-offset-1 rounded-lg backdrop-blur-xl ring-1 ring-black/40 shadow-2xl w-screen max-w-[180px] overflow-y-auto relative p-2"
                >
                  <DropdownMenu.Item
                    className="outline-none cursor-pointer px-4 h-8 rounded focus:bg-primary-500 focus:text-white flex items-center gap-2"
                    onClick={() => onCopyAsLink()}
                  >
                    Copy URL
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    className="outline-none cursor-pointer px-4 h-8 rounded focus:bg-primary-500 focus:text-white flex items-center gap-2"
                    onClick={() => onCopyAsImage()}
                  >
                    Copy Image
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
            <button
              onClick={() => onReset()}
              className="bg-gray-500/10 hover:bg-gray-500/20 px-4 flex items-center justify-center rounded-md h-10"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;

const SwitchItem = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={`${label}-input`}
        className="text-xs text-white/30 truncate"
      >
        {label}
      </label>
      <button
        id={`${label}-input`}
        className="h-7 w-12 rounded-full ring-1 ring-white/20 relative"
        onClick={() => onChange(!value)}
      >
        <div
          className={classNames(
            "absolute h-5 w-5 rounded-full top-1 transition-all",
            {
              "left-1 bg-white/30": !value,
              "left-6 bg-indigo-500": value,
            }
          )}
        ></div>
      </button>
    </div>
  );
};

const SelectItem = ({
  label,
  value,
  onChange,
  options,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`${label}-input`} className="text-xs text-white/30">
        {label}
      </label>
      <select
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none h-7 rounded-md ring-1 ring-white/20 relative px-3 text-sm flex gap-2 items-center text-white/50 hover:text-white/90 overflow-hidden bg-transparent cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
      >
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

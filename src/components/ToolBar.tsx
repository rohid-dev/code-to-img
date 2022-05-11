import classNames from "classnames";
import { MdArrowDropDown, MdArrowDropUp, MdCheck } from "react-icons/md";
import { useEditor } from "../contexts/EditorContext";
import { BackgroundPicker } from "./BackgroundPicker";
import * as Select from "@radix-ui/react-select";

const ToolBar = () => {
  const { setSettings, settings } = useEditor();
  return (
    <div className="fixed bottom-0 w-full left-0 right-0 p-4 md:p-8 z-20 pointer-events-none">
      <div className="mx-auto max-w-fit min-w-0 pointer-events-auto">
        <div className="bg-gray-900/60 ring-offset-white/20 ring-offset-1 rounded-2xl backdrop-blur-xl ring-1 ring-black/40 shadow-2xl">
          <div className="flex gap-4 p-4 overflow-x-auto items-center">
            <BackgroundPicker />
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
              ].sort((a, b) => (a < b ? -1 : 1))}
              value={settings.language}
              onChange={(value) => {
                setSettings({
                  ...settings,
                  language: value,
                });
              }}
            />
            <div className="w-px bg-white/10 h-12" />
            <SelectItem
              label="Format"
              options={["PNG", "JPEG", "SVG", "GIF"]}
              value={settings.renderFormat}
              onChange={(value) => {
                setSettings({
                  ...settings,
                  renderFormat: value,
                });
              }}
            />
            <SelectItem
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
            <div className="flex ring-1 ring-white/20 h-10 rounded-md">
              <button className="bg-primary-500 hover:bg-primary-600 px-4 flex items-center justify-center h-full border-r border-r-primary-600 truncate rounded-l-md">
                Export
              </button>
              <button className="bg-primary-500 hover:bg-primary-600 w-10 flex items-center justify-center h-full truncate rounded-r-md">
                <MdArrowDropDown className="text-2xl" />
              </button>
            </div>
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`${label}-input`} className="text-xs text-white/30">
        {label}
      </label>
      <Select.Root onValueChange={onChange} value={value}>
        <Select.Trigger
          id={`${label}-input`}
          className="h-7 rounded-md ring-1 ring-white/20 relative px-3 text-sm flex gap-2 items-center text-white/50 hover:text-white/90 appearance-none"
        >
          <Select.Value>{value}</Select.Value>
          <Select.Icon>
            <MdArrowDropDown className="text-xl" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Content className="bg-gray-900/0 backdrop-blur-xl ring-1 ring-white/20 shadow-2xl rounded-md">
          <Select.ScrollUpButton className="h-4 flex items-center justify-center w-full">
            <MdArrowDropUp className="text-xl" />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1">
            <Select.Group>
              {options.map((option, i) => (
                <Select.Item
                  value={option}
                  key={i}
                  className="px-2 h-7 rounded text-sm outline-none focus:bg-primary-500 focus:text-white flex items-center cursor-pointer overflow-hidden gap-3 justify-between"
                >
                  <Select.ItemText className="flex-1 truncate">
                    {option}
                  </Select.ItemText>
                  <Select.ItemIndicator>
                    <MdCheck className="text-md" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="h-4 flex items-center justify-center w-full">
            <MdArrowDropDown className="text-xl" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

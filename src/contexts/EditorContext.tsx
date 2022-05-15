import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gradients } from "../data/gradients";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { toPng, toJpeg, toSvg, toBlob } from "html-to-image";
import { Options } from "html-to-image/lib/options";
import axios from "axios";
import { useRouter } from "next/router";

export type EditorSettings = {
  filename: string;
  title: string;
  code: string;
  darkMode: boolean;
  dropShadow: boolean;
  showTitle: boolean;
  bgBlur: boolean;
  showWaterMark: boolean;
  fontSize: string;
  padding: string;
  language: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundThumb?: string;
  showLineNumber: boolean;
  renderScale: string;
  renderFormat: string;
};

const DEFAULT_JS_VALUE = `import React from "react";

const App = () => {
  return (
    <div>Hello, World!</div>
  )
}

export default App;`;

const defaultSettings: EditorSettings = {
  filename: "Untitled",
  darkMode: true,
  dropShadow: true,
  showTitle: false,
  showLineNumber: true,
  showWaterMark: true,
  bgBlur: true,
  fontSize: "16px",
  language: "jsx",
  padding: "medium",
  title: "Title Text",
  code: DEFAULT_JS_VALUE,
  backgroundImage: gradients[0].gradient,
  backgroundThumb: gradients[0].gradient,
  backgroundColor: gradients[0].color,
  renderScale: "1x",
  renderFormat: "png",
};

export type EditorContextType = {
  settings: EditorSettings;
  setSettings: (newState: EditorSettings) => void;
  canvasRef: React.RefObject<HTMLDivElement>;
  onExport: () => void;
  onReset: () => void;
  onCopyAsLink: () => void;
  onCopyAsImage: () => void;
  getPadding: () => string;
};
export const EditorContext = createContext<EditorContextType | null>(null);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useLocalStorage<EditorSettings>({
    key: "editor-settings",
    value: defaultSettings,
  });

  const router = useRouter();

  const getSettings = useCallback(async () => {
    const { token } = router.query;
    if (token) {
      setIsLoading(true);
      const { data } = await axios.get(`/api/hash-object?token=${token}`);
      setSettings(data);
      setIsLoading(false);
      router.push("/");
    }
  }, [setIsLoading, router]);

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  const canvasRef = useRef<HTMLDivElement>(null);

  const getConvertOptions = (settings: EditorSettings) => {
    const scale =
      settings.renderScale === "3x" ? 3 : settings.renderScale === "2x" ? 2 : 1;
    console.log(scale);

    const options: Options = {
      canvasWidth: canvasRef.current.clientWidth * scale,
      canvasHeight: canvasRef.current.clientHeight * scale,
      quality: 0.95,
    };
    return options;
  };

  const onExport: EditorContextType["onExport"] = useCallback(async () => {
    if (!canvasRef.current) return;

    const options = getConvertOptions(settings);

    var imgUrl: string | null = null;

    const fileExtension = `.${settings.renderFormat.toLowerCase()}`;

    switch (fileExtension) {
      case ".png":
        imgUrl = await toPng(canvasRef.current, options);
        break;
      case ".jpeg":
        imgUrl = await toJpeg(canvasRef.current, options);
        break;
      case ".svg":
        imgUrl = await toSvg(canvasRef.current, options);
        break;
      default:
        imgUrl = await toPng(canvasRef.current, options);
        break;
    }

    if (!imgUrl) return;

    const link = document.createElement("a");
    link.download = `${settings.filename || "Untitled"}${fileExtension}`;
    link.href = imgUrl;
    link.click();
  }, [settings, canvasRef]);

  const onCopyAsLink: EditorContextType["onCopyAsLink"] =
    useCallback(async () => {
      const origin = window.location.origin;
      const { data } = await axios.post(`/api/hash-object`, settings);
      const link = `${origin}?token=${data.token}`;
      window.navigator.clipboard.writeText(link);
    }, [settings]);

  const onCopyAsImage: EditorContextType["onCopyAsImage"] =
    useCallback(async () => {
      if (!canvasRef.current) return;
      const options = getConvertOptions(settings);
      const blog = await toBlob(canvasRef.current, options);
      window.navigator.clipboard.write([
        new ClipboardItem({ "image/png": blog }),
      ]);
      console.log("Copied");
    }, [settings]);

  const onReset = () => {
    setSettings(defaultSettings);
  };

  const getPadding = useCallback(() => {
    return `${
      settings.padding === "small"
        ? 36
        : settings.padding === "medium"
        ? 48
        : settings.padding === "large"
        ? 64
        : 96
    }px`;
  }, [settings.padding]);

  if (isLoading) return null;

  return (
    <EditorContext.Provider
      value={{
        settings,
        setSettings,
        canvasRef,
        onExport,
        onCopyAsLink,
        onCopyAsImage,
        onReset,
        getPadding,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw "Editor context is not initialized!";
  }
  return context;
};

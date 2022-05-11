import { tags } from "@lezer/highlight";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { EditorView } from "@uiw/react-codemirror";

const customStyles = ({ darkMode, showLineNumber, fontSize }: ThemeProps) =>
  EditorView.theme(
    {
      "& .cm-content, & .cm-gutter": {
        minHeight: "100px",
      },
      "& .cm-scroller": {
        paddingTop: "8px",
        paddingBottom: "16px",
        paddingInline: "16px",
        fontFamily: "'Roboto Mono', monospace",
        fontSize,
      },
      "&.cm-editor.cm-focused": {
        outline: "none",
      },
      "&.cm-focused .cm-cursor": {
        borderLeftColor: "#FACC15",
      },
      "& .cm-selectionBackground": {
        background: "transparent",
      },
      "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "rgba(255,255,255,0.2)",
      },
      "& .cm-gutters": {
        backgroundColor: "transparent",
        border: "none",
        display: !showLineNumber ? "none" : null,
      },
      "& .cm-lineNumbers .cm-gutterElement": {
        padding: "0 10px 0 2px",
      },
      "& .cm-foldGutter": {
        display: "none !important",
      },
      "& .cm-activeLine, & .cm-activeLineGutter": {
        backgroundColor: "transparent",
      },
    },
    { dark: darkMode }
  );

const darkHighlightStyle = HighlightStyle.define(
  [
    { tag: tags.keyword, color: "#4ff0ff" },
    {
      tag: tags.comment,
      color: "rgba(255, 255, 255, 0.3)",
      fontStyle: "italic",
    },
    { tag: tags.bracket, color: "#ffc248" },
    { tag: tags.attributeName, color: "#d47dff" },
    { tag: tags.angleBracket, color: "#ffffff" },
    { tag: tags.variableName, color: "#ffffff" },
    { tag: tags.string, color: "#c0ff5b" },
    { tag: tags.number, color: "#ff808a" },
    { tag: tags.bool, color: "#ff808a" },
    { tag: tags.punctuation, color: "#4ff0ff" },
    { tag: tags.tagName, color: "#ff808a" },
    { tag: tags.squareBracket, color: "#ff808a" },
    { tag: tags.propertyName, color: "#d47dff" },
    { tag: tags.typeName, color: "#5cabff" },
  ],
  { themeType: "dark" }
);

const lightHighlightStyle = HighlightStyle.define(
  [
    { tag: tags.keyword, color: "#1a6eff" },
    {
      tag: tags.comment,
      color: "rgba(0, 0, 0, 0.3)",
      fontStyle: "italic",
    },
    { tag: tags.bracket, color: "#FB923C" },
    { tag: tags.angleBracket, color: "#334155" },
    { tag: tags.variableName, color: "#334155" },
    { tag: tags.string, color: "#379d6c" },
    { tag: tags.number, color: "#ff4656" },
    { tag: tags.punctuation, color: "#1a6eff" },
    { tag: tags.squareBracket, color: "#ff9f46" },
    { tag: tags.tagName, color: "#ff4656" },
    { tag: tags.attributeName, color: "#a327e2" },
    { tag: tags.propertyName, color: "#a327e2" },
    { tag: tags.typeName, color: "#5cabff" },
    { tag: tags.bool, color: "#ff4656" },
  ],
  { themeType: "light" }
);

export type ThemeProps = {
  darkMode: boolean;
  showLineNumber: boolean;
  fontSize: string | number | null;
};

export const getTheme = (props: ThemeProps) => [
  customStyles(props),
  syntaxHighlighting(props.darkMode ? darkHighlightStyle : lightHighlightStyle),
];

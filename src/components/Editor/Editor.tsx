import CodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";

export type EditorProps = {} & ReactCodeMirrorProps;

const Editor = ({ ...rest }: EditorProps) => {
  return <CodeMirror {...rest} />;
};

export default Editor;

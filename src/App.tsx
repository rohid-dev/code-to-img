import Header from "./components/Header";
import Preview from "./components/Preview";
import ToolBar from "./components/ToolBar";
import { EditorProvider, useEditor } from "./contexts/EditorContext";

function App() {
  return (
    <EditorProvider>
      <Backgorund />
      <Header />
      <Preview />
      <ToolBar />
    </EditorProvider>
  );
}

export default App;

const Backgorund = () => {
  const { settings } = useEditor();
  return (
    <div
      className="fixed w-full h-full inset-0 -z-10 bg-no-repeat bg-cover"
      style={{
        backgroundImage: settings.backgroundImage,
        backgroundColor: settings.backgroundColor,
      }}
    >
      <div className="absolute inset-0 backdrop-blur-3xl bg-gray-900/95"></div>
    </div>
  );
};

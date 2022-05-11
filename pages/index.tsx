import Header from "../src/components/Header";
import Preview from "../src/components/Preview";
import ToolBar from "../src/components/ToolBar";
import { useEditor } from "../src/contexts/EditorContext";

function IndexPage() {
  return (
    <>
      <Backgorund />
      <Header />
      <Preview />
      <ToolBar />
    </>
  );
}

export default IndexPage;

const Backgorund = () => {
  const { settings } = useEditor();
  return (
    <div
      className="fixed w-full h-full inset-0 -z-10 bg-no-repeat bg-cover"
      style={{
        backgroundImage: settings.backgroundThumb || settings.backgroundImage,
        backgroundColor: settings.backgroundColor,
      }}
    >
      <div className="absolute w-full h-full inset-0 backdrop-blur-3xl bg-gray-900/95"></div>
    </div>
  );
};

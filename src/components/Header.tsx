import { FaGithub } from "react-icons/fa";
const Header = () => {
  return (
    <div className="w-full h-14 flex items-center px-4 gap-2">
      <p className="text-gray-300">
        Built by -{" "}
        <a
          target="_blank"
          href="https://rohid.dev"
          className="text-white hover:underline underline-offset-2"
        >
          Rohid
        </a>
      </p>
      <div className="flex-1"></div>
      {/* <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 active:bg-white/20 rounded-full">
        <FaCog className="text-2xl" />
      </button> */}
      <a
        href="https://github.com/rohidisdev/code-to-img"
        target="_blank"
        className="w-10 h-10 flex items-center justify-center hover:bg-white/10 active:bg-white/20 rounded-full"
      >
        <FaGithub className="text-2xl" />
      </a>
    </div>
  );
};

export default Header;

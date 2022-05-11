import { FaCog, FaGithub } from "react-icons/fa";
const Header = () => {
  return (
    <div className="w-full h-14 flex items-center px-4 gap-2">
      <div className="flex-1"></div>
      {/* <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 active:bg-white/20 rounded-full">
        <FaCog className="text-2xl" />
      </button> */}
      <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 active:bg-white/20 rounded-full">
        <FaGithub className="text-2xl" />
      </button>
    </div>
  );
};

export default Header;

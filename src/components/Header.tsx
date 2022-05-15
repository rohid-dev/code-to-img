import { FaGithub } from "react-icons/fa";
const Header = () => {
  return (
    <div className="w-full py-4 flex items-center px-4 gap-4">
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
      <ProductHuntBadge />
    </div>
  );
};

export default Header;

export const ProductHuntBadge = () => (
  // <a
  //   href="https://www.producthunt.com/posts/code-to-image-converter?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-code&#0045;to&#0045;image&#0045;converter"
  //   target="_blank"
  // >
  //   <img
  //     src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=346242&theme=dark"
  //     alt="Code&#0032;to&#0032;Image&#0032;Converter - Convert&#0032;your&#0032;code&#0032;snippets&#0032;to&#0032;beautiful&#0032;images | Product Hunt"
  //     className="h-12"
  //   />
  // </a>

  <a
    href="https://www.producthunt.com/posts/code-to-image-converter?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-code&#0045;to&#0045;image&#0045;converter"
    target="_blank"
  >
    <img
      src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=346242&theme=light&period=daily"
      alt="Code&#0032;to&#0032;Image&#0032;Converter - Convert&#0032;your&#0032;code&#0032;snippets&#0032;to&#0032;beautiful&#0032;images | Product Hunt"
      className="h-12"
    />
  </a>
);

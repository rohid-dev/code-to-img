import * as Popover from "@radix-ui/react-popover";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useEditor } from "../contexts/EditorContext";
import { colors } from "../data/colors";
import { gradients } from "../data/gradients";

export const backgroundWindowTabs = [
  {
    id: "colors",
    label: "Colors",
  },
  {
    id: "gradients",
    label: "Gradients",
  },
  {
    id: "unsplash",
    label: "Unsplash",
  },
];

export const BackgroundPicker = () => {
  const [tab, setTab] = useState(backgroundWindowTabs[0].id);
  const { settings } = useEditor();
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-white/30" htmlFor="background-input">
        Background
      </label>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            id="background-input"
            className="h-7 w-12 rounded-md ring-1 ring-white/20 bg-no-repeat bg-cover"
            style={{
              backgroundColor: settings.backgroundColor,
              backgroundImage:
                settings.backgroundColor === "transparent"
                  ? "url(/transparent-bg-pattern.png)"
                  : settings.backgroundThumb,
            }}
          />
        </Popover.Trigger>
        <Popover.Content sideOffset={10} align="center" side="top">
          <div className="bg-gray-900 ring-offset-white/20 ring-offset-1 rounded-2xl backdrop-blur-xl ring-1 ring-black/40 shadow-2xl w-screen max-w-xs max-h-[500px] h-[70vh] overflow-y-auto relative">
            <div className="px-4 h-12 sticky top-0 z-10 bg-gray-900/60 backdrop-blur-xl border-b border-white/10">
              <ul className="flex gap-4 items-center h-full">
                {backgroundWindowTabs.map((item) => (
                  <li key={item.id}>
                    <button
                      className={item.id === tab ? "opacity-100" : "opacity-50"}
                      onClick={() => setTab(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {tab === "colors" ? (
              <ColorsPanel />
            ) : tab === "gradients" ? (
              <GradientsPanel />
            ) : (
              <UnsplashPanel />
            )}
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};

const ColorsPanel = () => {
  const { settings, setSettings } = useEditor();
  const setColor = useCallback(
    (color: string) => {
      setSettings({
        ...settings,
        backgroundImage: undefined,
        backgroundThumb: undefined,
        backgroundColor: color,
      });
    },
    [settings, setSettings]
  );
  return (
    <ul className="grid grid-cols-3 gap-4 p-4">
      {colors.map((color, i) => (
        <li key={i} className="w-full">
          <button
            className="w-full aspect-video rounded-md ring-1 ring-gray-700 bg-no-repeat bg-cover"
            style={{
              backgroundColor: color,
              backgroundImage:
                color === "transparent"
                  ? "url(/transparent-bg-pattern.png)"
                  : undefined,
            }}
            onClick={() => setColor(color)}
          ></button>
        </li>
      ))}
    </ul>
  );
};

const GradientsPanel = () => {
  const { settings, setSettings } = useEditor();
  return (
    <ul className="grid grid-cols-2 gap-4 p-4">
      {gradients.map((gradient, i) => (
        <li className="w-full" key={i}>
          <button
            className="w-full aspect-video rounded-md ring-1 ring-gray-700 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundColor: gradient.color,
              backgroundImage: gradient.gradient,
            }}
            onClick={() =>
              setSettings({
                ...settings,
                backgroundColor: gradient.color,
                backgroundImage: gradient.gradient,
                backgroundThumb: gradient.gradient,
              })
            }
          ></button>
        </li>
      ))}
    </ul>
  );
};

type UnsplashImageType = {
  id: string;
  color: string;
  alt_description: string;
  links: {
    download: string;
  };
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
  };
  width: number;
};

const UnsplashPanel = () => {
  const { settings, setSettings } = useEditor();
  const [images, setImages] = useState<UnsplashImageType[]>([]);
  const [searchKey, setSearchKey] = useState("");

  const getPhotos = useCallback(async () => {
    const { data }: { data: UnsplashImageType[] } = await axios.get(
      `${process.env.NEXT_PUBLIC_UNSPLASH_API}/photos?per_page=20`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    setImages(data);
  }, []);

  useEffect(() => {
    getPhotos();
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!searchKey) return;
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_UNSPLASH_API}/search/photos?query=${searchKey}&per_page=20`,
        {
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
          },
        }
      );
      console.log(data);
      setImages(data.results);
    },
    [searchKey]
  );
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="sticky top-12 z-10 w-full bg-gray-900/60 px-4 flex items-center h-10 backdrop-blur-xl border-b border-white/10"
      >
        <input
          type="search"
          className="bg-transparent border-none outline-none w-full flex-1 h-full"
          placeholder="Search..."
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </form>
      <ul className="grid grid-cols-2 gap-4 p-4">
        {images.map((image, i) => (
          <li className="w-full" key={i}>
            <button
              className="w-full aspect-video rounded-md ring-1 ring-gray-700 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundColor: image.color,
                backgroundImage: `url(${image.urls.thumb})`,
              }}
              onClick={() =>
                setSettings({
                  ...settings,
                  backgroundColor: image.color,
                  backgroundImage: `url(${image.urls.small})`,
                  backgroundThumb: `url(${image.urls.thumb})`,
                })
              }
            ></button>
          </li>
        ))}
      </ul>
    </>
  );
};

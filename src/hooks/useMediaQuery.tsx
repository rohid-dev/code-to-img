import { useEffect, useState } from "react";

const useMediaQuery = (
  query: string,
  onChange?: (event: MediaQueryListEvent) => void
) => {
  const [state, setState] = useState(window.matchMedia(query).matches);

  const onMediaChange = (ev: MediaQueryListEvent) => {
    setState(ev.matches);
    onChange && onChange(ev);
  };

  useEffect(() => {
    const media = window.matchMedia(query);
    media.addEventListener("change", onMediaChange);
    return () => {
      media.removeEventListener("change", onMediaChange);
    };
  }, [query]);

  return state;
};

export default useMediaQuery;

import { useEffect, useLayoutEffect, useState } from "react";

export type UseLocalStorageProps<T> = {
  key: string;
  value: T;
};

export type UseLocalStorageReturn<T> = [
  state: T,
  setState: (newState: T) => void
];

export function useLocalStorage<T>({
  key,
  value,
}: UseLocalStorageProps<T>): UseLocalStorageReturn<T> {
  const [state, setState] = useState<T>(value);

  useLayoutEffect(() => {
    const lsstate = localStorage.getItem(key);
    setState(lsstate ? JSON.parse(lsstate) : value);
  }, [key, value]);

  const onStateChange = (newState: T) => {
    setState(newState);
    localStorage.setItem(key, JSON.stringify(newState));
  };
  return [state, onStateChange];
}

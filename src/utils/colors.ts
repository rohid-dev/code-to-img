import Color from "color";

export const isDark = (color: string): boolean => {
  const c = Color(color);
  return c.isDark();
};

const themes = ["amethyst-haze", "default", "shadcn-rose"] as const;

export type Theme = (typeof themes)[number];

export const THEME_LIST = [...themes].sort((a, b) =>
  a.localeCompare(b),
) as Theme[];

export const THEME_LIST_OBJ = themes.reduce(
  (acc, theme) => {
    acc[theme] = theme;
    return acc;
  },
  {} as Record<Theme, Theme>,
);

const THEME_STORAGE_KEY = "app-theme";
const DEFAULT_THEME: Theme = "default";

export const setTheme = (theme: Theme): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
};

export const getTheme = (): Theme => {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const isValidTheme = themes.some((t) => t === savedTheme);
  return isValidTheme ? (savedTheme as Theme) : DEFAULT_THEME;
};

export const initTheme = (): void => {
  const theme = getTheme();
  setTheme(theme);
};

"use client";

import {
  Check,
  Import,
  Laptop,
  Loader2,
  Moon,
  Palette,
  Search,
  Shuffle,
  Sun,
  Trash2,
  X
} from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { hashIdString } from "@/lib/hashIdString";
import { fetchTheme, fetchThemes, type Theme } from "@/lib/tweakcn";
import { CUSTOM_THEME_URLS } from "@/lib/tweakcn-custom-default";
import { cn } from "@/lib/utils";
import { useTweakCNThemes } from "@/providers/tweakcn-theme-provider";

interface SavedThemeEntry {
  url: string;
  theme: Theme;
}

interface ThemePickerProps {
  themes?: Theme[];
  className?: string;
}

const SAVED_THEMES_KEY = "tweakcn-saved-themes";

function getSavedThemes(): SavedThemeEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(SAVED_THEMES_KEY);
    if (!saved) return CUSTOM_THEME_URLS as unknown as SavedThemeEntry[]; // Return default themes if no saved themes
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

function saveSavedThemes(themes: SavedThemeEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SAVED_THEMES_KEY, JSON.stringify(themes));
}

function formatThemeName(name: string): string {
  return name.replace(/-/g, " ").replace(/^\w/, (char) => char.toUpperCase());
}

function ThemeColorDots({ theme }: { theme: Theme }) {
  const colors = [
    theme.cssVars.light.primary || "oklch(0.5 0.2 250)",
    theme.cssVars.light.secondary || "oklch(0.9 0.02 250)",
    theme.cssVars.light.accent || "oklch(0.95 0.02 250)",
    theme.cssVars.light.muted || "oklch(0.95 0.01 250)"
  ];

  return (
    <div className="flex items-center gap-0.5">
      {colors.map((color, i) => (
        <div
          key={hashIdString(color, { length: 8, seed: i })}
          className="h-3 w-3 rounded-full border border-border/50"
          style={{ background: color }}
        />
      ))}
    </div>
  );
}

export function ThemePicker({
  themes: additionalThemes = [],
  className
}: ThemePickerProps) {
  const { currentTheme, setTheme: setTweakCNTheme } = useTweakCNThemes();
  const { theme: themeMode, setTheme: setThemeMode } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showImport, setShowImport] = React.useState(false);
  const [importUrl, setImportUrl] = React.useState("");
  const [isImporting, setIsImporting] = React.useState(false);
  const [importError, setImportError] = React.useState<string | null>(null);
  const [savedThemes, setSavedThemes] = React.useState<SavedThemeEntry[]>([]);
  const [fetchedThemes, setFetchedThemes] = React.useState<Theme[]>([]);
  const [isLoadingThemes, setIsLoadingThemes] = React.useState(true);

  React.useEffect(() => {
    setMounted(true);
    setSavedThemes(getSavedThemes());

    // Fetch themes internally
    fetchThemes()
      .then(setFetchedThemes)
      .catch((error) => {
        console.error("Failed to load themes:", error);
        setFetchedThemes([]);
      })
      .finally(() => {
        setIsLoadingThemes(false);
      });
  }, []);

  // Combine fetched themes with additional themes provided by user
  const themes = React.useMemo(() => {
    const allThemes = [...fetchedThemes, ...additionalThemes];
    // Remove duplicates based on theme name
    const uniqueThemes = allThemes.reduce((acc, theme) => {
      if (!acc.find((t) => t.name === theme.name)) {
        acc.push(theme);
      }
      return acc;
    }, [] as Theme[]);
    return uniqueThemes;
  }, [fetchedThemes, additionalThemes]);

  const handleThemeSelect = (theme: Theme) => {
    setTweakCNTheme(theme);
  };

  const handleRandomTheme = () => {
    const allThemes = [...themes, ...savedThemes.map((s) => s.theme)];
    if (allThemes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * allThemes.length);
    setTweakCNTheme(allThemes[randomIndex]);
  };

  const handleClearTheme = () => {
    setTweakCNTheme(null);
  };

  const handleImportTheme = async () => {
    if (!importUrl.trim()) return;

    setIsImporting(true);
    setImportError(null);

    try {
      const url = new URL(importUrl.trim());
      if (!url.hostname.includes("tweakcn.com")) {
        throw new Error("Only tweakcn.com URLs are supported");
      }

      if (savedThemes.some((s) => s.url === importUrl.trim())) {
        throw new Error("Theme already imported");
      }

      const theme = await fetchTheme(importUrl.trim());
      const newEntry: SavedThemeEntry = { url: importUrl.trim(), theme };
      const updated = [...savedThemes, newEntry];
      setSavedThemes(updated);
      saveSavedThemes(updated);
      setImportUrl("");
      setShowImport(false);
    } catch (err) {
      setImportError(
        err instanceof Error ? err.message : "Failed to import theme"
      );
    } finally {
      setIsImporting(false);
    }
  };

  const handleDeleteSavedTheme = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedThemes.filter((s) => s.url !== url);
    setSavedThemes(updated);
    saveSavedThemes(updated);
  };

  const filteredThemes = themes.filter((theme) =>
    theme.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSavedThemes = savedThemes.filter((entry) =>
    entry.theme.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalThemes = filteredThemes.length + filteredSavedThemes.length;
  const normalizedThemeMode =
    themeMode === "light" || themeMode === "dark" || themeMode === "system"
      ? themeMode
      : "system";

  const nextThemeMode =
    normalizedThemeMode === "system"
      ? "light"
      : normalizedThemeMode === "light"
        ? "dark"
        : "system";

  const themeModeLabel =
    normalizedThemeMode === "system"
      ? "System"
      : normalizedThemeMode === "light"
        ? "Light"
        : "Dark";

  if (!mounted || isLoadingThemes) {
    return (
      <Button
        variant="outline"
        size="sm"
        className={cn("gap-2", className)}
        disabled
      >
        <Palette className="h-4 w-4" />
        Loading...
      </Button>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={cn("gap-2", className)}>
          <Palette className="h-4 w-4" />
          <span className="max-w-[120px] truncate">
            {currentTheme ? formatThemeName(currentTheme.name) : "Theme"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[280px] p-0">
        {/* Search Input */}
        <div className="border-border border-b p-2">
          <div className="relative">
            <Search className="-translate-y-1/2 absolute top-1/2 left-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search themes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 pl-8 text-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>

        {/* Header with count and random button */}
        <div className="flex items-center justify-between border-border border-b px-3 py-2">
          <span className="text-muted-foreground text-sm">
            {totalThemes} themes
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setThemeMode(nextThemeMode);
              }}
              className="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              title={`Theme: ${themeModeLabel} (click to switch)`}
              aria-label={`Theme: ${themeModeLabel}. Click to switch.`}
              type="button"
            >
              {normalizedThemeMode === "dark" ? (
                <Moon className="h-4 w-4" />
              ) : normalizedThemeMode === "light" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Laptop className="h-4 w-4" />
              )}
            </button>
            {currentTheme && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearTheme();
                }}
                className="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                title="Clear theme"
                aria-label="Clear current theme"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRandomTheme();
              }}
              className="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              title="Random theme"
              aria-label="Randomize theme"
              type="button"
            >
              <Shuffle className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Saved Themes Section */}
        <div className="border-border border-b px-3 py-2">
          {!showImport ? (
            <div className="flex items-center justify-between">
              {savedThemes.length === 0 ? (
                <p className="text-muted-foreground text-xs">
                  <a
                    href="https://tweakcn.com/editor/theme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Import
                  </a>{" "}
                  a theme to find it here.
                </p>
              ) : (
                <p className="font-medium text-muted-foreground text-xs">
                  Saved Themes
                </p>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowImport(true);
                  setImportError(null);
                }}
                className="flex items-center gap-1 rounded px-2 py-1 text-muted-foreground text-xs transition-colors hover:bg-accent hover:text-foreground"
              >
                <Import className="h-3 w-3" />
                Import
              </button>
            </div>
          ) : (
            // biome-ignore lint/a11y/useKeyWithClickEvents: default lib installation
            // biome-ignore lint/a11y/noStaticElementInteractions: default lib installation
            <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <p className="font-medium text-muted-foreground text-xs">
                  Import Theme URL
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowImport(false);
                    setImportUrl("");
                    setImportError(null);
                  }}
                  className="rounded p-0.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <Input
                placeholder="https://tweakcn.com/r/themes/..."
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                className="h-7 text-xs"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleImportTheme();
                  }
                }}
              />
              {importError && (
                <p className="text-destructive text-xs">{importError}</p>
              )}
              <Button
                size="sm"
                className="h-7 w-full text-xs"
                onClick={handleImportTheme}
                disabled={isImporting || !importUrl.trim()}
              >
                {isImporting ? (
                  <>
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    Importing...
                  </>
                ) : (
                  "Import Theme"
                )}
              </Button>
            </div>
          )}

          {/* Saved Themes List */}
          {savedThemes.length > 0 && !showImport && (
            <div className="mt-2 space-y-0.5">
              {filteredSavedThemes.map((entry) => {
                const isSelected = currentTheme?.name === entry.theme.name;
                return (
                  // biome-ignore lint/a11y/noStaticElementInteractions: default lib installation
                  // biome-ignore lint/a11y/useKeyWithClickEvents: default lib installation
                  <div
                    key={entry.url}
                    onClick={() => handleThemeSelect(entry.theme)}
                    className={cn(
                      "group relative flex cursor-pointer items-center gap-2 rounded-sm px-1 py-1.5 text-sm",
                      "transition-colors hover:bg-secondary/50",
                      isSelected && "bg-accent text-accent-foreground"
                    )}
                  >
                    <ThemeColorDots theme={entry.theme} />
                    <span className="flex-1 truncate text-xs">
                      {formatThemeName(entry.theme.name)}
                    </span>
                    {isSelected ? (
                      <Check className="h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => handleDeleteSavedTheme(entry.url, e)}
                        className="rounded p-0.5 text-muted-foreground opacity-0 transition-all hover:bg-destructive/20 hover:text-destructive group-hover:opacity-100"
                        title="Remove theme"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Built-in Themes Section */}
        <div className="px-2 py-1.5">
          <p className="mb-1 px-1 font-medium text-muted-foreground text-xs">
            Built-in Themes
          </p>
        </div>

        <div className="max-h-[300px] overflow-y-auto pb-1">
          {filteredThemes.map((theme) => {
            const isSelected = currentTheme?.name === theme.name;
            return (
              // biome-ignore lint/a11y/noStaticElementInteractions: default lib installation
              // biome-ignore lint/a11y/useKeyWithClickEvents: default lib installation
              <div
                key={theme.name}
                onClick={() => handleThemeSelect(theme)}
                className={cn(
                  "relative mx-1 flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm",
                  "transition-colors hover:bg-secondary/50",
                  isSelected && "bg-accent text-accent-foreground"
                )}
              >
                <ThemeColorDots theme={theme} />
                <span className="flex-1 truncate">
                  {formatThemeName(theme.name)}
                </span>
                {isSelected && <Check className="h-4 w-4 shrink-0" />}
              </div>
            );
          })}

          {filteredThemes.length === 0 && filteredSavedThemes.length === 0 && (
            <div className="py-6 text-center text-muted-foreground text-sm">
              No themes found
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

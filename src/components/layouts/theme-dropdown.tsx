"use client";

import { PaletteIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  getTheme,
  initTheme,
  setTheme,
  THEME_LIST,
  type Theme
} from "@/lib/themes";

export function ThemeDropdown() {
  const [themeState, setThemeState] = useState<Theme>();

  useEffect(() => {
    initTheme();
    setThemeState(getTheme());
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-sm">
          <PaletteIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={themeState}
            onValueChange={(value) => {
              setThemeState(value as Theme);
              setTheme(value as Theme);
            }}
          >
            {THEME_LIST.map((theme) => (
              <DropdownMenuRadioItem
                key={theme}
                value={theme}
                onSelect={(e) => e.preventDefault()}
              >
                {theme
                  .split("-")
                  .map((part) => part[0].toUpperCase() + part.slice(1))
                  .join(" ")}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

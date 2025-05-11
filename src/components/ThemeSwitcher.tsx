"use client";

import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleToggleTheme = (isSelected: boolean) => {
    setTheme(isSelected ? "dark" : "light");
  };

  return (
    <Switch
      color="primary"
      size="sm"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <Moon className={className} />
        ) : (
          <Sun className={className} />
        )
      }
      onValueChange={handleToggleTheme}
    />
  );
}

import { useEffect, useState } from "react";

export function useColorScheme() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        const colorScheme = e.matches ? "dark" : "light";
        setMode(colorScheme);
      });
  }, []);

  return {
    colorScheme: mode,
  };
}

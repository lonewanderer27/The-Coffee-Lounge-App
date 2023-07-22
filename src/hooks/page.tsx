import { useEffect, useState } from "react";

import { RefresherEventDetail } from "@ionic/react";

export function useRefresh(refreshers: { (): void }[]) {
  const handleRefresh = (e: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      refreshers.forEach((refresher) => {
        refresher();
      });
      e.detail.complete();
    }, 2000);
  };

  return handleRefresh;
}

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

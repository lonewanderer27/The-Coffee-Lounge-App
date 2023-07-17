import { useEffect, useLayoutEffect } from "react";

import { useIonLoading } from "@ionic/react";

export default function useLoading(state: "loading" | "success" | "error") {
  const [present, dismiss] = useIonLoading();

  useLayoutEffect(() => {
    if (state === "loading") {
      present();
    } else {
      dismiss();
    }
  }, [state]);

  if (state == "loading") {
    return <></>;
  }
}

"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";
import { tagAsAdmin } from "@/lib/onesignal";

export function OneSignalProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initializeOneSignal = async () => {
      try {
        await OneSignal.init({
          appId: "6fddc9f5-0f91-4460-8283-c6ef206f2c7e",
          allowLocalhostAsSecureOrigin: true,
        });
        OneSignal.Slidedown.promptPush();

        try {
          const meResponse = await fetch("/api/auth/me");
          if (meResponse.ok) {
            const user = await meResponse.json();
            if (user.is_admin) {
              await tagAsAdmin();
            }
          }
        } catch (error) {
          console.debug("Could not fetch user session for OneSignal tagging:", error);
        }
      } catch (error) {
        console.error("OneSignal initialization failed:", error);
      }
    };

    initializeOneSignal();
  }, []);

  return <>{children}</>;
}

import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { getUser } from "@/storage/user";

export const useInitialRoute = () => {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const prepareInitialRoute = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        const user = await getUser();

        setInitialRoute(user ? "AppStack" : "IntroStack");
      } catch (error) {
        console.error("Error determining initial route:", error);
        setInitialRoute("IntroStack");
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepareInitialRoute();
  }, []);

  return { isReady, initialRoute };
};

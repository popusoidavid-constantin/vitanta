import { Redirect, Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";
import useMood from "@/hooks/useMood";
import useUser from "@/hooks/useUser";
import { useAppSelector } from "@/store/hooks";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const user = useAppSelector((state) => state.user);
  const { getUser } = useUser();
  const { getMyRegisteredMoods } = useMood();
  const isAuth = useAppSelector((state) => state.authState.isAuth);
  const backgroundAppColor = useThemeColor({}, "background");
  const navi = useRouter();

  useEffect(() => {
    getUser();
    getMyRegisteredMoods();
  }, []);

  useEffect(() => {
    if (!isAuth) {
      navi.push("/(auth)");
    }
  }, [isAuth]);

  if (!isAuth) {
    return <Redirect href={"/(auth)"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved Days",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

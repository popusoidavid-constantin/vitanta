import { useThemeColor } from "@/hooks/use-theme-color";
import { Stack } from "expo-router";
import React from "react";

const SettingsLayout = () => {
  const headerBackgroundColor = useThemeColor({}, "tint");

  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: headerBackgroundColor } }}>
      <Stack.Screen name="index" options={{ title: "Settings", headerShown: false }} />
    </Stack>
  );
};

export default SettingsLayout;

import MyMainButton from "@/components/MyMainButton";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import useAuth from "@/hooks/useAuth";
import globalStyles from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Settings = () => {
  const [toggleNotifications, setToggleNotifications] = useState<boolean>(false);
  const textColor = useThemeColor({}, "text");
  const navi = useRouter();
  const { signOut } = useAuth();

  const accountSettings = [
    {
      id: 0,
      title: "Edit profile",
      action: () => navi.push("/"),
    },
    {
      id: 1,
      title: "Subscriptions",
      action: () => navi.push("/"),
    },
    {
      id: 2,
      title: "Notifications",
      action: () => {
        setToggleNotifications(!toggleNotifications);
      },
      isToggle: true,
    },
  ];

  const moreOptions = [
    {
      id: 0,
      title: "About us",
      action: () => {},
    },
    {
      id: 1,
      title: "Privacy policy",
      action: () => {},
    },
    {
      id: 2,
      title: "Terms and conditions",
      action: () => {},
    },
  ];

  return (
    <ThemedView style={globalStyles.body}>
      <SafeAreaProvider style={[globalStyles.safeView, { paddingTop: Platform.OS === "ios" ? 40 : 0 }]}>
        <View style={[globalStyles.mainContainer, { justifyContent: "space-between", marginVertical: Platform.OS === "ios" ? 65 : 10 }]}>
          <MyMainButton action={signOut} name="Logout" isDisabled={false} />
        </View>
      </SafeAreaProvider>
    </ThemedView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  decoline: {
    height: 1,
    opacity: 0.2,
    marginVertical: 10,
  },
});

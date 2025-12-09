import { ThemedView } from "@/components/themed-view";
import globalStyles from "@/styles/globalStyles";
import React from "react";
import { Platform, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const saved = () => {
  return (
    <ThemedView style={globalStyles.body}>
      <SafeAreaView style={[globalStyles.safeView, { paddingTop: Platform.OS === "ios" ? 40 : 0 }]}>
        <Text>Home Page</Text>
      </SafeAreaView>
    </ThemedView>
  );
};

export default saved;

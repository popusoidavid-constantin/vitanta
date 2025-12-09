import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loading = () => {
  const textColor = useThemeColor({}, "text");
  return (
    <View style={styles.body}>
      <ActivityIndicator size={"large"} color={textColor} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

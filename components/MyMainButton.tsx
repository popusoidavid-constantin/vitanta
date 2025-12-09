import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  name: string;
  action: () => void;
  isDisabled: boolean;
}

const MyMainButton: React.FC<Props> = ({ name, action, isDisabled }) => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  return (
    <TouchableOpacity disabled={isDisabled} style={[styles.body, { backgroundColor, borderColor: textColor }]} onPress={action}>
      <View>
        <Text style={{ color: textColor, fontSize: 25, fontWeight: 900 }}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyMainButton;

const styles = StyleSheet.create({
  body: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 100,
    paddingVertical: 15,
    borderWidth: 3,
  },
});

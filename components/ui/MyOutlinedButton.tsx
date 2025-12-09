import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  action: () => void;
  name: string;
  isDisabled: boolean;
}

const MyOutlinedButton: React.FC<Props> = ({ action, name, isDisabled }) => {
  return (
    <TouchableOpacity onPress={action} disabled={isDisabled} style={styles.button}>
      <View>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyOutlinedButton;

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 15,
  },
  button: {
    borderColor: "white",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
});

import { useThemeColor } from "@/hooks/use-theme-color";
import colors from "@/utils/colors";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

const UploadUserPreview = ({ image }: { image: string | null }) => {
  const textColor = useThemeColor({}, "text");
  return (
    <View style={[styles.mainContainer, { borderColor: image ? colors.GREEN : textColor }]}>
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.image} />
        </>
      ) : (
        <Feather name="camera" size={60} color={textColor} />
      )}
    </View>
  );
};

export default UploadUserPreview;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
  },
});

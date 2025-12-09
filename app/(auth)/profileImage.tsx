import { USER_PROFILE_IMAGES_BUCKET_ID } from "@/appwrite";
import Loading from "@/components/Loading";
import MyMainButton from "@/components/MyMainButton";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import UploadUserPreview from "@/components/ui/UploadUserPreview";
import { useThemeColor } from "@/hooks/use-theme-color";
import useStorage from "@/hooks/useStorage";
import useUser from "@/hooks/useUser";
import globalStyles from "@/styles/globalStyles";
import colors from "@/utils/colors";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileImage = () => {
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const ghostColor = useThemeColor({}, "ghostText");
  const { uploadFile } = useStorage();
  const { updateUserData } = useUser();
  const navi = useRouter();

  const handleSelectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUploadPhoto = async () => {
    if (!image) {
      Alert.alert("You don't upload an image. Try uploading one in the app settings. ");
      navi.push("/(tabs)");
      return;
    }
    try {
      setLoading(true);
      const imageUploadRes = await uploadFile(USER_PROFILE_IMAGES_BUCKET_ID, image);

      if (!imageUploadRes.success) {
        Alert.alert("Failed to load your avatar, try again!");
        setLoading(false);
        return;
      }

      const updateUserRes = await updateUserData({ imageId: imageUploadRes.data });

      if (!updateUserRes.success) {
        Alert.alert("Failed to load your avatar, try again!");
        setLoading(false);
        return;
      }

      navi.push("/(tabs)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={globalStyles.body}>
      <SafeAreaView style={globalStyles.safeView}>
        {loading ? (
          <Loading />
        ) : (
          <View style={[globalStyles.mainContainer, styles.mainContainer]}>
            <View style={styles.infoContainer}>
              <View style={{ gap: 30 }}>
                <ThemedText style={{ fontSize: 25, fontWeight: 900, textAlign: "center", lineHeight: 35 }}>
                  Upload your profile photo
                </ThemedText>
                <ThemedText style={{ color: ghostColor, fontSize: 15, fontWeight: 800, textAlign: "center" }}>
                  Used when you’ll recive customized stats{" "}
                </ThemedText>
              </View>
            </View>

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.photoPreview} onPress={handleSelectPhoto}>
                <UploadUserPreview image={image} />
              </TouchableOpacity>
              {image && (
                <View style={{ marginTop: 10 }}>
                  <ThemedText style={{ fontSize: 20, fontWeight: 900, textAlign: "center", lineHeight: 35, color: colors.GREEN }}>
                    Photo added!
                  </ThemedText>
                  <TouchableOpacity onPress={handleSelectPhoto}>
                    <ThemedText style={{ fontSize: 15, fontWeight: 800, textAlign: "center", lineHeight: 35, color: ghostColor }}>
                      Change photo
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <MyMainButton name={"Continue"} isDisabled={false} action={handleUploadPhoto} />
            </View>
          </View>
        )}
      </SafeAreaView>
    </ThemedView>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  logoContianer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },

  infoContainer: {
    flex: 0.3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  photoPreview: {
    width: 200,
    height: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.33)",
    borderRadius: "50%",
  },
});

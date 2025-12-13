import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { ThemedView } from "../themed-view";

import { USER_PROFILE_IMAGES_BUCKET_ID } from "@/appwrite";
import { useThemeColor } from "@/hooks/use-theme-color";
import useStorage from "@/hooks/useStorage";
import { useAppSelector } from "@/store/hooks";

const TopBar = () => {
  const hasNotification = true; // schimbă în funcție de starea reală
  const [image, setImage] = useState(null);
  const { getImageView } = useStorage();
  const user = useAppSelector((state) => state.user);
  const bgColor = useThemeColor({}, "background");

  useEffect(() => {
    if (user && user.imageId) {
      imageGetter();
    }
  }, [user]);

  const imageGetter = async () => {
    try {
      if (!user.imageId) {
        return;
      }
      const imageRes = await getImageView(USER_PROFILE_IMAGES_BUCKET_ID, user.imageId);

      if (!imageRes.success) {
        Alert.alert("Error", "Could not get your avatar");
        return;
      }

      setImage(imageRes.data);
    } finally {
    }
  };

  return (
    <ThemedView style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <Image source={require("@/assets/images/VitantaLogo.png")} style={styles.logo} />
      </View>

      <View style={styles.rightContainer}>
        <View style={[styles.notificationsContainer, { backgroundColor: bgColor === "#00062B" ? "#1B1B1B" : "#7D7D7D" }]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("@/assets/images/NotificationsBell.png")}
              style={{
                width: 30,
                height: 30,
                resizeMode: "contain",
                marginRight: -10,
              }}
            />

            <View
              style={[
                styles.notificationsIndicator,
                {
                  backgroundColor: hasNotification ? "#00ED4F" : "transparent",
                  borderColor: hasNotification ? "#1B1B1B" : "transparent",
                },
              ]}
            />
          </View>
        </View>

        <View style={[styles.userIconContainer, { backgroundColor: bgColor === "#00062B" ? "#1B1B1B" : "#7D7D7D" }]}>
          <Image
            source={image ? { uri: image } : require("@/assets/images/DefaultUserAvatar.png")}
            style={{
              padding: image ? 0 : 10,
              width: image ? "100%" : "90%",
              height: image ? "100%" : "100%",
              resizeMode: image ? "cover" : "contain",
            }}
          />
        </View>
      </View>
    </ThemedView>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 12,
  },
  logo: {
    width: 60,
    height: 60,
    paddingTop: 10,
    borderRadius: 30,
    resizeMode: "contain",
    shadowColor: "#ffffff",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  leftContainer: { flex: 0.4, alignItems: "center", justifyContent: "center" },
  rightContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    alignItems: "center",
    paddingHorizontal: 16,
  },

  notificationsContainer: {
    borderRadius: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },

  notificationsIndicator: {
    borderRadius: 5,
    width: 10,
    height: 10,
    borderWidth: 1,
    marginTop: -1,
  },

  userIconContainer: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});

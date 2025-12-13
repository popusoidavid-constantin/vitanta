import Loading from "@/components/Loading";
import MyMainButton from "@/components/MyMainButton";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppSelector } from "@/store/hooks";
import globalStyles from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Welcome() {
  const [loading, setLoading] = useState(false);
  const navi = useRouter();
  const ghostColor = useThemeColor({}, "ghostText");
  const isAuth = useAppSelector((state) => state.authState.isAuth);

  useEffect(() => {
    setLoading(true);
    if (isAuth) {
      navi.replace("/(tabs)");
      setLoading(false);
    }
  }, [isAuth]);

  if (loading) {
    return <Loading />;
  }

  if (isAuth) {
    return null;
  }

  return (
    <ThemedView style={[globalStyles.body]}>
      <SafeAreaView style={globalStyles.safeView}>
        <View style={[globalStyles.mainContainer]}>
          <View style={styles.logoContianer}>
            <Image source={require("@/assets/images/VitantaLogo.png")}></Image>
          </View>

          <View style={styles.infoContainer}>
            <View style={{ gap: 30 }}>
              <ThemedText style={{ fontSize: 35, fontWeight: 900, textAlign: "center", lineHeight: 35 }}>
                Start your journey to emotional clarity !
              </ThemedText>
              <ThemedText style={{ color: ghostColor, fontSize: 20, fontWeight: 800, textAlign: "center" }}>
                Track your mood, express yourself, and become the best version of you.
              </ThemedText>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <MyMainButton
              name={"Get started"}
              isDisabled={false}
              action={() => {
                navi.push("/(auth)");
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "re",
  },
});

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import globalStyles from "@/styles/globalStyles";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";

const Otp: React.FC = () => {
  const textColor = useThemeColor({}, "text");
  const ghostColor = useThemeColor({}, "text");
  const navi = useRouter();
  const { userID, userEmail } = useLocalSearchParams();
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { validateOtp } = useAuth();
  const { getUser } = useUser();

  useEffect(() => {
    if (secret.length === 6) {
      handleValidateOtp();
    }
  }, [secret]);

  const handleValidateOtp = async () => {
    try {
      setLoading(true);
      const result = await validateOtp(userID as string, secret);

      if (!result.success) {
        Alert.alert("Error", result.message);
        return;
      }

      const userResult = await getUser();

      if (userResult.success) {
        navi.push("/(tabs)");
        return;
      }
      navi.push("/(auth)/name");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {};

  return (
    <ThemedView style={globalStyles.body}>
      <SafeAreaView style={globalStyles.safeView}>
        <View style={[globalStyles.mainContainer, styles.mainContainer]}>
          <View style={styles.titleContainer}>
            <ThemedText type="title" style={{ textAlign: "center" }}>
              Please enter the code
            </ThemedText>
            <ThemedText type="subtitle" style={{ textAlign: "center", color: ghostColor, opacity: 0.8 }}>
              {userEmail}
            </ThemedText>
          </View>
          <View style={styles.form}>
            <OtpInput
              numberOfDigits={6}
              onTextChange={(text) => setSecret(text)}
              placeholder="------"
              autoFocus={true}
              type="numeric"
              focusColor={textColor}
              theme={{
                containerStyle: styles.textInputContainer,
                pinCodeContainerStyle: styles.pinCodeContainer,
                placeholderTextStyle: { color: textColor },
                pinCodeTextStyle: { color: textColor },
              }}
            />
            <ThemedText type="default" style={{ textAlign: "center", color: ghostColor }}>
              Didn&apos;t receive the code?
              <Text style={{ color: textColor, textDecorationLine: "underline" }} onPress={handleResendOtp}>
                Resend it
              </Text>
            </ThemedText>
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

export default Otp;

const styles = StyleSheet.create({
  mainContainer: {
    gap: 60,
  },
  titleContainer: {
    marginTop: 35,
    flex: 0.2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  form: {
    gap: 60,
  },
  textInputContainer: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    paddingVertical: 5,
  },
  pinCodeContainer: {
    borderWidth: 0,
  },
  placeHolder: {},
});

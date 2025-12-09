import MyMainButton from "@/components/MyMainButton";
import MyTextInput from "@/components/MyTextInput";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import useAuth from "@/hooks/useAuth";
import globalStyles from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login: React.FC = () => {
  const ghostColor = useThemeColor({}, "text");
  const [loading, setLoading] = useState(false);
  const { sendOtp } = useAuth();
  const navi = useRouter();

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      email: "david.popusoi52@gmail.com",
    },
  });

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const { email } = getValues();

      const result = await sendOtp(email);

      if (!result.success) {
        Alert.alert("Error", result.message);
        return;
      }

      navi.push({ pathname: "/otp/[userID]", params: { userID: result.data, userEmail: email } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedView style={globalStyles.body}>
        <SafeAreaView style={globalStyles.safeView}>
          <View style={globalStyles.mainContainer}>
            <View style={styles.titleContainer}>
              <ThemedText type="title" style={{ textAlign: "center" }}>
                Let&apos;s get started
              </ThemedText>
              <ThemedText type="subtitle" style={{ textAlign: "center", opacity: 0.8, color: ghostColor }}>
                Please add your email to continue
              </ThemedText>
            </View>
            <View style={styles.formContainer}>
              <MyTextInput label="E-mail adress" control={control} name="email" rules={{ required: "This field is required" }} />
              <MyMainButton action={handleSubmit(handleSendOtp)} isDisabled={false} name="Continue" />
            </View>
          </View>
          <View style={styles.termsContainer}>
            <ThemedText type="defaultSemiBold" style={{ textAlign: "center", color: ghostColor, fontSize: 15 }}>
              By creating an account using email your account to accept our,{" "}
              <ThemedText type="default" style={{ textAlign: "center", textDecorationLine: "underline", fontSize: 15 }}>
                Terms of use &{" "}
              </ThemedText>
              <ThemedText type="default" style={{ textAlign: "center", textDecorationLine: "underline", fontSize: 15 }}>
                Privacy policy
              </ThemedText>
            </ThemedText>
          </View>
        </SafeAreaView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  formContainer: {
    flex: 0.6,
    flexDirection: "column",
    justifyContent: "center",
    gap: 40,
  },
  titleContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 80,
  },
  termsContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
});

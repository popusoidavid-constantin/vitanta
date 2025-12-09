import MyMainButton from "@/components/MyMainButton";
import MyTextInput from "@/components/MyTextInput";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import useUser from "@/hooks/useUser";
import { User_DB } from "@/models/types";
import globalStyles from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateUserScreen: React.FC = () => {
  const { control, getValues, handleSubmit } = useForm({
    defaultValues: {
      username: "",
    },
  });
  const navi = useRouter();
  const [loading, setLoading] = useState(false);
  const { createUser } = useUser();
  const ghostText = useThemeColor({}, "ghostText");

  const handleCreateUser = async () => {
    try {
      setLoading(true);

      const { username } = getValues();

      const user: User_DB = {
        username,
        email: "",
        imageId: "",
      };

      const result = await createUser(user);

      if (!result.success) {
        Alert.alert("Error", result.message);
        return;
      }
      navi.push("/profileImage");
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
              <ThemedText style={{ fontSize: 25, fontWeight: 900, textAlign: "center", lineHeight: 35 }}>
                Please eneter your username
              </ThemedText>
              <ThemedText style={{ color: ghostText, fontSize: 20, fontWeight: 800, textAlign: "center" }}>
                Used when your register your progress
              </ThemedText>
            </View>
            <View style={styles.form}>
              <MyTextInput label="Username" name="username" control={control} />
            </View>
            <View style={styles.buttonContainer}>
              <MyMainButton action={handleSubmit(handleCreateUser)} isDisabled={false} name="Continue" />
            </View>
          </View>
        </SafeAreaView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default CreateUserScreen;

const styles = StyleSheet.create({
  mainContainer: {},
  titleContainer: {
    marginTop: 70,
    flex: 0.3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  form: {
    marginTop: 70,
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "center",
    gap: 20,
  },
  buttonContainer: {
    flex: 0.9,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});

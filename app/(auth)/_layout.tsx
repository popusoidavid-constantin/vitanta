import { useThemeColor } from "@/hooks/use-theme-color";
import { Stack } from "expo-router";

const AuthLayout = () => {
  const headerBackgroundColor = useThemeColor({}, "tint");

  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: headerBackgroundColor } }}>
      <Stack.Screen name="index" options={{ title: "Verify Email", headerShown: false }} />
      <Stack.Screen name="otp/[userID]" options={{ title: "Verify Recived Code", headerShown: false }} />
      <Stack.Screen name="name" options={{ title: "Add your full name", headerShown: false }} />
      <Stack.Screen name="profileImage" options={{ title: "Add your photo", headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;

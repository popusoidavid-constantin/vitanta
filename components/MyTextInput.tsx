import { useThemeColor } from "@/hooks/use-theme-color";
import { Control, Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { ThemedText } from "./themed-text";

interface Props extends TextInputProps {
  label: string;
  name: string;
  rules?: object;
  errorMessage?: string;
  control: Control<any>;
}

const MyTextInput: React.FC<Props> = ({ label, name, rules, errorMessage, control, ...textInputProps }) => {
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  return (
    <View>
      <ThemedText type="defaultSemiBold">{label}</ThemedText>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={[
                styles.input,
                error && styles.errorInput,
                { color: textColor, backgroundColor: backgroundColor, borderColor: textColor },
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...textInputProps}
            />
            {error && <Text style={styles.errorText}>{error.message || errorMessage}</Text>}
          </>
        )}
      ></Controller>
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
  input: {
    borderRadius: 8,
    borderWidth: 2,
    height: 48,
    paddingHorizontal: 20,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

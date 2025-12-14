import Loading from "@/components/Loading";
import MyTextInput from "@/components/MyTextInput";
import ActionCard from "@/components/tracker/ActionCard";
import SelectMoodPtg from "@/components/tracker/SelectMoodPtg";
import MyOutlinedButton from "@/components/ui/MyOutlinedButton";
import { Mood_Register } from "@/models/types";
import colors from "@/utils/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Control } from "react-hook-form";

interface Props {
  loading: boolean;
  handleSelectMoodPtg: (value: number) => void;
  todayMood: Mood_Register;
  handleEditMood: () => void;
  control: Control<any>;
}

const EditTodayMood: React.FC<Props> = ({ loading, handleEditMood, control, handleSelectMoodPtg, todayMood }) => {
  return (
    <ActionCard dimension={2} height={2} color={"#7820f4ff"}>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.noteContainer}>
          <Text style={[styles.title, { width: "90%", marginTop: 20, fontSize: 20 }]}>
            Edit your mood today if your day starts to feel different!
          </Text>

          <SelectMoodPtg value={todayMood.score} onSelect={handleSelectMoodPtg} />

          <MyTextInput
            style={{
              borderColor: colors.GRAY,
              borderWidth: 1,
              borderRadius: 10,
              marginVertical: 5,
              paddingVertical: 12,
              paddingHorizontal: 15,
              textAlignVertical: "top",
              color: "white",
            }}
            control={control}
            name={"moodMessage"}
            label="What you shared about your day..."
          />
          <MyOutlinedButton name={"Submit"} action={handleEditMood} isDisabled={false} />
        </View>
      )}
    </ActionCard>
  );
};

export default EditTodayMood;

const styles = StyleSheet.create({
  mainContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 5,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 15,
    width: "100%",
    textAlign: "center",
  },
  para: {
    color: "#FFFFFF",
    fontSize: 12,
    paddingHorizontal: 5,
    lineHeight: 0,
  },
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  percentageContainer: {
    marginTop: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  ringContainer: {
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  percentageText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
  },
  noteContainer: {
    paddingHorizontal: 10,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100%",
  },
});

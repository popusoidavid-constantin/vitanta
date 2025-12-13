import { ThemedText } from "@/components/themed-text";
import ActionCard from "@/components/tracker/ActionCard";
import MyOutlinedButton from "@/components/ui/MyOutlinedButton";
import { Mood_Register } from "@/models/types";
import React from "react";
import { UseFormReset } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  todayMood: Mood_Register;
  setMoodPtg: (value: number) => void;
  reset: UseFormReset<{ moodMessage: string }>;
  setEditMode: (value: boolean) => void;
}

const TodayMoodNote: React.FC<Props> = ({ todayMood, setMoodPtg, reset, setEditMode }) => {
  return (
    <ActionCard dimension={1} height={1} color={"#2075A3"}>
      <View style={styles.noteContainer}>
        <Text style={styles.title}>Today Mood Note</Text>
        <ThemedText style={styles.para}>{todayMood.note}</ThemedText>
        <MyOutlinedButton
          name="Edit"
          action={() => {
            setMoodPtg(todayMood.score);
            reset({ moodMessage: todayMood.note });
            setEditMode(true);
          }}
          isDisabled={false}
        />
      </View>
    </ActionCard>
  );
};

export default TodayMoodNote;

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

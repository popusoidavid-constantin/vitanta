import { ThemedText } from "@/components/themed-text";
import ActionCard from "@/components/tracker/ActionCard";
import MyOutlinedButton from "@/components/ui/MyOutlinedButton";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  setMoodCard: () => void;
}

const AddTodayMoodCard: React.FC<Props> = ({ setMoodCard }) => {
  return (
    <ActionCard dimension={2} height={1} color={"#FF4747"}>
      <View style={styles.noteContainer}>
        <Text style={[styles.title, { marginTop: 20, fontSize: 12 }]}>Looks like you don’t registered any mood for today?</Text>
        <ThemedText style={[styles.para, { fontSize: 11, marginBottom: 30 }]}>
          Try to be sincerelly about today by clicking the button below.
        </ThemedText>
        <MyOutlinedButton name={"Register Mood"} action={setMoodCard} isDisabled={false} />
      </View>
    </ActionCard>
  );
};

export default AddTodayMoodCard;

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

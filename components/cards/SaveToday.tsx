import { ThemedText } from "@/components/themed-text";
import ActionCard from "@/components/tracker/ActionCard";
import MyOutlinedButton from "@/components/ui/MyOutlinedButton";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SaveToday = ({ openSheet }: { openSheet: () => void }) => {
  return (
    <ActionCard dimension={1} height={1} color={"#8717BF"}>
      <View style={styles.noteContainer}>
        <Text style={styles.title}>Excellent Day</Text>
        <ThemedText style={styles.para}>Mark this day as one of your favourites days ever!</ThemedText>
        <MyOutlinedButton name={"Save"} action={openSheet} isDisabled={false} />
      </View>
    </ActionCard>
  );
};

export default SaveToday;

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

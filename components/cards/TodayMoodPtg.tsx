import ActionCard from "@/components/tracker/ActionCard";
import { Mood_Register } from "@/models/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";

interface Props {
  size: number;
  radius: number;
  circumference: number;
  progress: number;
  strokeWidth: number;
  todayMood: Mood_Register;
}

const TodayMoodPtg: React.FC<Props> = ({ size, radius, circumference, progress, strokeWidth, todayMood }) => {
  return (
    <ActionCard dimension={1} height={1} color={"#0A52E2"}>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={styles.title}>Today Mood Percentage</Text>
        <View style={styles.circleContainer}>
          <Svg width={size} height={size}>
            <Circle stroke="#1E40AF" fill="none" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
            <View style={styles.percentageContainer}>
              <Text style={styles.percentageText}>{todayMood.score}%</Text>
            </View>
            <Circle
              stroke="#FFFFFF"
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
              rotation="-90"
              origin={`${size / 2}, ${size / 2}`}
            />
          </Svg>
        </View>
      </View>
    </ActionCard>
  );
};

export default TodayMoodPtg;

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

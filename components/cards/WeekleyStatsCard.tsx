import { screenWidth } from "@/utils/devices";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

// sus în fișier
const WeekleyStatsCard = () => {
  return (
    <View
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        paddingVertical: 10,
        width: "100%",
        backgroundColor: "#D58719",
        borderRadius: 20,
      }}
    >
      <Text style={[styles.title, { fontSize: 13, marginBottom: 5 }]}>Your Weekly Progress</Text>
      <LineChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              data: [20, 20, 40, 100, 80, 60, 100],
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              strokeWidth: 3,
            },
          ],
        }}
        fromNumber={20}
        width={screenWidth * 0.85}
        height={190}
        yAxisSuffix="%"
        chartConfig={{
          backgroundGradientFrom: "#D58719",
          backgroundGradientTo: "#D58719",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: "#FFFFFF",
          },
          propsForBackgroundLines: {
            strokeWidth: 0, // ascunde liniile de fundal
          },
        }}
        bezier
        style={{
          marginVertical: 10,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default WeekleyStatsCard;

const styles = StyleSheet.create({
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
});

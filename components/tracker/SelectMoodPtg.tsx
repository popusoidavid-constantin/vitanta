import React from "react";
import { Text, View } from "react-native";

const SelectMoodPtg = () => {
  const startingPtg = 10;
  return (
    <View
      style={{
        width: "90%",
        height: 150,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-end",
      }}
    >
      {/* 20 % */}
      <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", gap: 10 }}>
          <View style={{ backgroundColor: "#D64E50", height: startingPtg + 30, borderRadius: "50%", paddingHorizontal: 11 }}></View>
          <View style={{ backgroundColor: "#D64E50", height: startingPtg + 40, borderRadius: "50%", paddingHorizontal: 11 }}></View>
        </View>
        <Text style={{ color: "#D64E50", fontWeight: "700", fontSize: 15 }}>20%</Text>
      </View>

      {/* 40% */}
      <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", gap: 10 }}>
          <View style={{ backgroundColor: "#D6804E", height: startingPtg + 50, borderRadius: "50%", paddingHorizontal: 11 }}></View>
          <View style={{ backgroundColor: "#D6804E", height: startingPtg + 60, borderRadius: "50%", paddingHorizontal: 11 }}></View>
        </View>
        <Text style={{ color: "#D6804E", fontWeight: "700", fontSize: 15 }}>40%</Text>
      </View>

      {/* 60% */}
      <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", gap: 10 }}>
          <View style={{ backgroundColor: "#D6C24E", height: startingPtg + 70, borderRadius: "50%", paddingHorizontal: 11 }}></View>
          <View style={{ backgroundColor: "#D6C24E", height: startingPtg + 80, borderRadius: "50%", paddingHorizontal: 11 }}></View>
        </View>
        <Text style={{ color: "#D6C24E", fontWeight: "700", fontSize: 15 }}>60%</Text>
      </View>

      {/* 80% */}
      <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", gap: 10 }}>
          <View style={{ backgroundColor: "#49D4A4", height: startingPtg + 90, borderRadius: "50%", paddingHorizontal: 11 }}></View>
          <View style={{ backgroundColor: "#49D4A4", height: startingPtg + 100, borderRadius: "50%", paddingHorizontal: 11 }}></View>
        </View>
        <Text style={{ color: "#49D4A4", fontWeight: "700", fontSize: 15 }}>80%</Text>
      </View>

      {/* 100% */}
      <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", gap: 10 }}>
          <View style={{ backgroundColor: "#4ED849", height: startingPtg + 110, borderRadius: "50%", paddingHorizontal: 11 }}></View>
          <View style={{ backgroundColor: "#4ED849", height: startingPtg + 120, borderRadius: "50%", paddingHorizontal: 11 }}></View>
        </View>
        <Text style={{ color: "#4ED849", fontWeight: "700", fontSize: 15 }}>100%</Text>
      </View>
    </View>
  );
};

export default SelectMoodPtg;

import colors from "@/utils/colors";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SelectMoodPtg = ({ onSelect }: { onSelect: (value: number) => void }) => {
  const [selected, setSelected] = useState(0); // 0 = nimic selectat

  const options = [
    { value: 20, color: "#D64E50", heights: [30, 40] },
    { value: 40, color: "#D6804E", heights: [50, 60] },
    { value: 60, color: "#D6C24E", heights: [70, 80] },
    { value: 80, color: "#49D4A4", heights: [90, 100] },
    { value: 100, color: "#4ED849", heights: [110, 120] },
  ];

  const handleSelect = (value: number) => {
    setSelected(value);
    if (onSelect) {
      onSelect(value); // aici faci call la API
    }
  };

  return (
    <View
      style={{
        width: "90%",
        height: 150,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-end",
      }}
    >
      {options.map((option) => (
        <View
          key={option.value}
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            {option.heights.map((h, i) => {
              const isActive = selected >= option.value;
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleSelect(option.value)}
                  style={{
                    backgroundColor: isActive ? option.color : colors.GRAY, // gri daca nu e selectat
                    height: 10 + h,
                    borderRadius: 50,
                    paddingHorizontal: 11,
                  }}
                />
              );
            })}
          </View>
          <Text
            style={{
              color: selected >= option.value ? option.color : "#ccc",
              fontWeight: "700",
              fontSize: 15,
            }}
          >
            {option.value}%
          </Text>
        </View>
      ))}
    </View>
  );
};

export default SelectMoodPtg;

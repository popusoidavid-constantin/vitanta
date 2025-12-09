import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  dimension: 1 | 2;
  height: 1 | 2;
  children: ReactNode;
  color: string;
}

const ActionCard: React.FC<Props> = ({ dimension, children, color, height }) => {
  return (
    <View
      style={[styles.mainContainer, { width: dimension === 1 ? "48%" : "100%", backgroundColor: color, height: height === 1 ? 200 : 500 }]}
    >
      {children}
    </View>
  );
};

export default ActionCard;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    paddingVertical: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 15,
    width: "100%",
    textAlign: "center",
  },
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  percentageContainer: {
    marginTop: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  percentageText: {
    color: "#FFFFFF",
    fontSize: 900,
    fontWeight: "900",
  },
});

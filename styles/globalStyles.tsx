import { StyleSheet } from "react-native";
const globalStyles = StyleSheet.create({
  body: {
    flex: 1,
  },
  safeView: {
    flex: 1,
  },
  mainContainer: {
    display: "flex",
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  headerText: {
    color: "#6486DD",
    fontWeight: 900,
    fontSize: 35,
    textAlign: "center",
  },
  subHeaderText: {
    color: "#4D4D4D",
    fontWeight: 800,
    fontSize: 20,
    textAlign: "center",
  },
});

export default globalStyles;

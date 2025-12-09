import MyTextInput from "@/components/MyTextInput";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import ActionCard from "@/components/tracker/ActionCard";
import SelectMoodPtg from "@/components/tracker/SelectMoodPtg";
import MyOutlinedButton from "@/components/ui/MyOutlinedButton";
import TopBar from "@/components/ui/TopBar";
import globalStyles from "@/styles/globalStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { Circle, Svg } from "react-native-svg";

const HomeScreen = () => {
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const screenWidth = Dimensions.get("window").width;
  const [refreshing, setRefreshing] = useState(false);
  const { getValues, control, handleSubmit } = useForm({
    defaultValues: {
      moodMessage: "",
    },
  });

  const [moodCard, setMoodCard] = useState(false);

  const navi = useRouter();
  // mood data
  const percentage = 80;
  const progress = (percentage / 100) * circumference;
  const todayMood = false;

  const onRefresh = () => {
    setRefreshing(true);

    console.log("REFRESH");
    setRefreshing(false);
  };

  // refactor la componente

  return (
    <ThemedView style={globalStyles.body}>
      <SafeAreaView style={[globalStyles.safeView, { paddingTop: 0 }]}>
        <TopBar />
        <ScrollView
          contentContainerStyle={styles.mainContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}
        >
          {todayMood ? (
            <>
              <ActionCard dimension={1} height={1} color={"#0A52E2"}>
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={styles.title}>Today Mood Percentage</Text>
                  <View style={styles.circleContainer}>
                    <Svg width={size} height={size}>
                      <Circle stroke="#1E40AF" fill="none" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
                      <View style={styles.percentageContainer}>
                        <Text style={styles.percentageText}>{percentage}%</Text>
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

              <ActionCard dimension={1} height={1} color={"#2075A3"}>
                <View style={styles.noteContainer}>
                  <Text style={styles.title}>Today Mood Note</Text>
                  <ThemedText style={styles.para}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</ThemedText>
                  <MyOutlinedButton name={"Edit"} action={() => {}} isDisabled={false} />
                </View>
              </ActionCard>
            </>
          ) : moodCard ? (
            <ActionCard dimension={2} height={2} color={"#2043F4"}>
              <View style={styles.noteContainer}>
                <Text style={[styles.title, { width: "90%", marginTop: 20, fontSize: 20 }]}>
                  Start by selecting your actual mood state percentage
                </Text>

                <SelectMoodPtg />

                <Text style={[styles.title, { width: "90%", marginTop: 20, fontSize: 20 }]}>
                  And let’s write down some insights for today!
                </Text>

                <MyTextInput
                  style={{
                    paddingVertical: 30,
                    paddingHorizontal: 10,
                    borderColor: "white",
                    borderWidth: 2,
                    borderRadius: 10,
                    marginVertical: 5,
                  }}
                  control={control}
                  name={"moodMessage"}
                  label="Describe your day in a few words..."
                />

                <MyOutlinedButton name={"Submit"} action={() => {}} isDisabled={false} />
              </View>
            </ActionCard>
          ) : (
            <ActionCard dimension={2} height={1} color={"#FF4747"}>
              <View style={styles.noteContainer}>
                <Text style={[styles.title, { marginTop: 20, fontSize: 12 }]}>Looks like you don’t registered any mood for today?</Text>
                <ThemedText style={[styles.para, { fontSize: 11, marginBottom: 30 }]}>
                  Try to be sincerelly about today by clicking the button below.
                </ThemedText>
                <MyOutlinedButton name={"Register Mood"} action={() => setMoodCard(true)} isDisabled={false} />
              </View>
            </ActionCard>
          )}

          <ActionCard dimension={1} height={1} color={"#0BAC00"}>
            <TouchableOpacity style={{ paddingHorizontal: 10 }}>
              <Text style={styles.title}>Tap For Mood Boost</Text>
              <View style={styles.circleContainer}>
                <Svg width={size} height={size}>
                  <View style={styles.ringContainer}>
                    <MaterialCommunityIcons name="bell-ring-outline" size={55} color={"white"} />
                  </View>
                  <Circle
                    stroke="#FFFFFF"
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={0}
                    strokeWidth={strokeWidth}
                  />
                </Svg>
              </View>
            </TouchableOpacity>
          </ActionCard>

          <ActionCard dimension={1} height={1} color={"#8717BF"}>
            <View style={styles.noteContainer}>
              <Text style={styles.title}>Excellent Day</Text>
              <ThemedText style={styles.para}>Mark this day as one of your favourites days ever!</ThemedText>
              <MyOutlinedButton name={"Save"} action={() => {}} isDisabled={false} />
            </View>
          </ActionCard>

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
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default HomeScreen;

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

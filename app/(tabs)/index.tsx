import AddTodayMoodCard from "@/components/cards/AddTodayMoodCard";
import EditTodayMood from "@/components/cards/EditTodayMood";
import RegisterMoodCard from "@/components/cards/RegisterMoodCard";
import SaveToday from "@/components/cards/SaveToday";
import TodayMoodNote from "@/components/cards/TodayMoodNote";
import TodayMoodPtg from "@/components/cards/TodayMoodPtg";
import WeekleyStatsCard from "@/components/cards/WeekleyStatsCard";
import { ThemedView } from "@/components/themed-view";
import ActionCard from "@/components/tracker/ActionCard";
import TopBar from "@/components/ui/TopBar";
import { useTodayMood } from "@/helpers/appFunctions";
import useMood from "@/hooks/useMood";
import { Mood_Register_DB } from "@/models/types";
import { useAppSelector } from "@/store/hooks";
import globalStyles from "@/styles/globalStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Circle, Svg } from "react-native-svg";

const MOOD_RING = {
  size: 120,
  strokeWidth: 10,
};

const getRingMetrics = (score = 0) => {
  const radius = (MOOD_RING.size - MOOD_RING.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return { radius, circumference, progress };
};

const HomeScreen = () => {
  const navi = useRouter();
  const user = useAppSelector((state) => state.user);
  //
  const size = 120;
  const strokeWidth = 10;
  const todayMood = useTodayMood();
  const moodScore = todayMood?.score ?? 0;
  const { radius, circumference, progress } = getRingMetrics(moodScore);

  //
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [moodCard, setMoodCard] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [moodPtg, setMoodPtg] = useState<number>(todayMood?.score || 0);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  //
  const { createRegisterMood } = useMood();
  const { getValues, control, handleSubmit, reset } = useForm({
    defaultValues: {
      moodMessage: todayMood?.note || "",
    },
  });

  //
  const onRefresh = () => {
    setRefreshing(true);

    setRefreshing(false);
  };
  //
  const handleSelectMoodPtg = (value: number) => {
    setMoodPtg(value);
  };
  //
  const handleEditMood = () => {};
  //
  const handleRegisterMood = async () => {
    setLoading(true);
    try {
      const { moodMessage } = getValues();
      if (moodPtg === 0) {
        Alert.alert("Whoops!", "Mood percentage must be selected first!");
        return;
      }
      if (moodMessage.trim() === "") {
        Alert.alert("Gotcha!", "You should write a little bit about today :)");
        return;
      }

      const newMoodReg: Mood_Register_DB = {
        score: moodPtg,
        note: moodMessage,
        date: new Date().toISOString(),
        createdBy: user.id,
      };

      const moodRes = await createRegisterMood(newMoodReg);

      if (!moodRes.success) {
        Alert.alert("Error!", "Something went wrong, please try again later:(");
        return;
      }

      Alert.alert("Nice!", "Your mood was successfully registered!");
      reset();
      return;
    } finally {
      setLoading(false);
    }
  };
  //
  const openSheet = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  useEffect(() => {
    if (editMode && todayMood) {
      reset({
        moodMessage: todayMood.note,
      });

      setMoodPtg(todayMood.score);
    }
  }, [editMode, todayMood]);

  return (
    <ThemedView style={globalStyles.body}>
      <SafeAreaView style={[globalStyles.safeView, { paddingTop: 0 }]}>
        <TopBar />
        <ScrollView
          contentContainerStyle={styles.mainContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}
        >
          {todayMood && !editMode ? (
            <>
              <TodayMoodPtg
                size={size}
                radius={radius}
                circumference={circumference}
                progress={progress}
                todayMood={todayMood}
                strokeWidth={strokeWidth}
              />

              <TodayMoodNote todayMood={todayMood} setEditMode={() => setEditMode(true)} setMoodPtg={setMoodPtg} reset={reset} />
            </>
          ) : todayMood && editMode ? (
            <EditTodayMood
              todayMood={todayMood}
              loading={loading}
              handleEditMood={handleEditMood}
              handleSelectMoodPtg={handleSelectMoodPtg}
              control={control}
            />
          ) : moodCard ? (
            <RegisterMoodCard
              control={control}
              handleRegisterMood={handleRegisterMood}
              handleSelectMoodPtg={handleSelectMoodPtg}
              loading={loading}
            />
          ) : (
            <AddTodayMoodCard setMoodCard={() => setMoodCard(true)} />
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

          <SaveToday openSheet={openSheet} />

          <WeekleyStatsCard />
        </ScrollView>
        <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={["50%"]} enablePanDownToClose={true}>
          <BottomSheetView style={{ flex: 1, padding: 36, alignItems: "center" }}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
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

import { Mood_Register } from "@/models/types";

export const getTodayDate = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const hasMoodToday = (moods: Mood_Register[]) => {
  const today = new Date().toISOString().split("T")[0];
  return moods.some((entry) => entry.date === today);
};

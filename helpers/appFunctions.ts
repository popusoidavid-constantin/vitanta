import { useAppSelector } from "@/store/hooks";

export const getTodayDate = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const useTodayMood = () => {
  const moods = useAppSelector((state) => state.moods);

  const today = new Date().toISOString().split("T")[0];

  const todayMood = moods.find((entry) => {
    const entryDate = new Date(entry.date).toISOString().split("T")[0];
    return entryDate === today;
  });

  return todayMood || null;
};

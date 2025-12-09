import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mood_Register } from "./../../models/types";

const initialState: Mood_Register[] = [];

const moodSlice = createSlice({
  name: "moods",
  initialState: initialState,
  reducers: {
    setMoods: (state, action: PayloadAction<Mood_Register[]>) => {
      return action.payload;
    },
    addMood: (state, action: PayloadAction<Mood_Register>) => {
      state.push(action.payload);
    },
    updateMood: (state, action: PayloadAction<Mood_Register>) => {
      const moodIndex = state.findIndex((item) => item.id === action.payload.id);
      if (moodIndex !== -1) {
        state[moodIndex] = action.payload;
      }
    },
    clearMoods: () => {
      return initialState;
    },
  },
});

export const { setMoods, addMood, updateMood, clearMoods } = moodSlice.actions;

export default moodSlice.reducer;

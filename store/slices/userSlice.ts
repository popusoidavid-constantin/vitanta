import { User } from "@/models/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  createdAt: "",
  username: "",
  email: "",
  imageId: "",
};

const userSlice = createSlice({
  name: "userState",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      Object.assign(state, action.payload);
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

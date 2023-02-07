import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";
interface UserData {
  username: string;
  email: string;
}

interface UpdateUserDataPayload {
  username: string;
  email: string;
}

const initialState: UserData = {
  username: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<UpdateUserDataPayload>) => {
      const { username, email } = action.payload;
      state.username = username;
      state.email = email;
    },
  },
});
export const select = (state: RootState) => state.user;
export const { updateUserData } = userSlice.actions;

export default userSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/types/IUser";

interface UserDataState {
  user: IUser | null;
}
const initialState: UserDataState = {
  user: null,
};

export const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //экшн для инициализации юзера:
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    //экшн для обновления данных юзера:
    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
});

export const { setUser, updateUser } = userDataSlice.actions;
export default userDataSlice.reducer;
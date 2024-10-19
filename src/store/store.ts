import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import userDataReducer from "./userDataSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,  //редуктор для сортировки списка юзеров
    user: userDataReducer,  //редуктор для изменения данных конкретного юзера
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
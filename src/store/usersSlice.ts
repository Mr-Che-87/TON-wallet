import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "@/types/IUser";
import { fetchGetUsers } from "@/app/api/apiService";

//асинхронный подгруз списка из API:
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const users = await fetchGetUsers();
  return users;
});

interface UsersState {
  users: IUser[];
  filteredUsers: IUser[];
  searchTerm: string;
}
const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  searchTerm: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //Фильтрация по имени (и name, и username):
    filterByName: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.searchTerm = action.payload;
    
      if (searchTerm.trim() === "") {
        // Если поле ввода пустое, показываем всех пользователей
        state.filteredUsers = state.users;
      } else {
        // Фильтруем по имени или username
        state.filteredUsers = state.users.filter((user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.username.toLowerCase().includes(searchTerm)
        );
      }
    },
    //Сортировка по городу:
    sortByCity: (state) => {
        state.filteredUsers = [...state.filteredUsers].sort((a, b) => 
          (a.address?.city ?? "").localeCompare(b.address?.city ?? "")
        );
      },
    //Сортировка по компании:
    sortByCompany: (state) => {
      state.filteredUsers = [...state.filteredUsers].sort((a, b) =>
        a.company.name.localeCompare(b.company.name)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
      state.filteredUsers = action.payload; //изначально показываем всех
    });
  },
});

export const { filterByName, sortByCity, sortByCompany } = usersSlice.actions;
export default usersSlice.reducer;
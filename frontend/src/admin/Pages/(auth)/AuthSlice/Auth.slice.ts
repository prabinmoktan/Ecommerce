import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../redux/store";


export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: "Male" | "Female";
  role: 'admin' | 'user'
}
interface AuthState {
  isLogged: boolean;
  user: User | null;
  
}
const initialState: AuthState = {
  isLogged: false,
  user: null,
  
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User }>) => {
      state.isLogged = true;
      state.user = action.payload.user;
      
    },
    logout: (state) => {
      state.isLogged = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

export const isLogged = (state: RootState) => state.auth.isLogged;
export const user = (state: RootState) => state.auth.user;

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLogged: false,
    user: null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
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
export const isLogged = (state) => state.auth.isLogged;
export const user = (state) => state.auth.user;

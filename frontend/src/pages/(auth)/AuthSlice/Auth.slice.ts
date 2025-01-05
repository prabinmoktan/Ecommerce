import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
}
interface AuthState{
    isLogged: boolean;
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
}
const initialState: AuthState = {
    isLogged: false,
    user:  null,
    accessToken: null,
    refreshToken: null,

}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
            login:  (state, action: PayloadAction<{accessToken: string, refreshToken: string, user: User}>) => {
                state.isLogged = true;
                state.accessToken = action.payload.accessToken;
                state.user = action.payload.user
            },
            logout: (state) => {
                state.isLogged = false;
                state.accessToken = null;
                state.user = null;
            }
    }
   
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer
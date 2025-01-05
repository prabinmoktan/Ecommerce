import { baseApiSlice } from './../axios/baseApiConfig';
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from './ModalSlice';
import authReducer from '../pages/(auth)/AuthSlice/Auth.slice'

export const store = configureStore({
    reducer:{
        [baseApiSlice.reducerPath]: baseApiSlice.reducer,
        modal: modalReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApiSlice.middleware),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
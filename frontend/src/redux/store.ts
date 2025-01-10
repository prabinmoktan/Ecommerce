import { baseApiSlice } from './../axios/baseApiConfig';
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from './ModalSlice';
import authReducer from '../pages/(auth)/AuthSlice/Auth.slice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage, 
    whiteList: ['auth']
}
const persistedReducer = persistReducer(persistConfig, authReducer);


export const store = configureStore({
    reducer:{
        [baseApiSlice.reducerPath]: baseApiSlice.reducer,
        modal: modalReducer,
        // auth: authReducer,
        auth: persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApiSlice.middleware),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

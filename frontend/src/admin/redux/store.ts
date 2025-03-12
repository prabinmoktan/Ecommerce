import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalReducer from './ModalSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { persistStore } from 'redux-persist';
import { baseApiSlice } from "../../axios/baseApiConfig";
import authReducer from  '../Pages/(auth)/AuthSlice/Auth.slice'
import cartReducer from '../../public/pages/Cart/CartSlice'



const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cart', 'quantity', 'totalPrice', 'totalItems'] // Only persist the 'items' inside cart
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isLogged', 'user'] // Only persist necessary auth data
};
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);


export const store = configureStore({
    reducer:combineReducers({
      [baseApiSlice.reducerPath]: baseApiSlice.reducer,
      modal: modalReducer,
      auth: persistedAuthReducer,  
      cart: persistedCartReducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
      {
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }
    ).concat(baseApiSlice.middleware),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

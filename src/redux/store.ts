import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import postReducer from './postSlice';
import dialogReducer from './dialogsSlice';

const rootReducer = {
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    dialog: dialogReducer
}

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
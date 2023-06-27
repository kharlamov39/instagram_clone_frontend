import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import commentReducer from './commentSlice';
import profileReducer from './profileSlice';
import postReducer from './postSlice';
import dialogReducer from './dialogsSlice';

const rootReducer = {
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    comment: commentReducer,
    dialog: dialogReducer

}

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
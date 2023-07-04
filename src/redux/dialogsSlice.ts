import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DialogsRes, MessageShort } from "../types/resTypes";
import { allMessagesAPI, fetchDialogsAPI } from "../api/dialog-api";

export const fetchDialogs = createAsyncThunk<DialogsRes[], undefined, { rejectValue: string }>(
    'fetchDialogs',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchDialogsAPI()
            return res.data
        } catch(err:any) {
            return rejectWithValue(err.message)
        }   
    } 
)

export const fetchAllChatMessages = createAsyncThunk<MessageShort[], string, {rejectValue: string}>(
    'fetchAllChatMessages',
    async(currentDialog, {rejectWithValue}) => {
        try {
            const res = await allMessagesAPI(currentDialog)
            return res.data
        } catch(err:any) {
            return rejectWithValue(err.message)
        }
    }
)

type State = {
    dialogs: DialogsRes[]
    activeChatData: MessageShort[]
    error: null | string | undefined
    loading: boolean
}

const initialState:State = {
    dialogs: [],
    activeChatData: [],
    error: null,
    loading: false
}

const dialogSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            if(!state.activeChatData.find(el => el._id === action.payload._id)) {
                state.activeChatData.push(action.payload);
            }
            console.log('ADD')
        },
        clearChat: (state) => {
            state.activeChatData = [];
        }
    },
    extraReducers: (builder) => {
        builder
        //--------Загрузка всех диалогов пользователя-----------//
        .addCase( fetchDialogs.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase( fetchDialogs.fulfilled, (state, action) => {
            state.dialogs = action.payload;
            state.loading = false;
        })
        .addCase( fetchDialogs.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false
        })

        // //-------Загрузка сообщений выбранного диалога----------//
        .addCase( fetchAllChatMessages.pending, (state) => {
            state.loading = true;
            state.error = null;
        } )
        .addCase( fetchAllChatMessages.fulfilled, (state, action) => {
            state.activeChatData = action.payload;
        } )
        .addCase( fetchAllChatMessages.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false
        } )
        
    }
})

export const { addMessage, clearChat } = dialogSlice.actions

export default dialogSlice.reducer
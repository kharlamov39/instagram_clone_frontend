import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DialogsRes, MessageShort } from "../types/resTypes";
import { allMessagesAPI, fetchDialogsAPI } from "../api/dialog-api";


export const fetchDialogs = createAsyncThunk(
    'fetchDialogs',
    async () => {
        const res = await fetchDialogsAPI()
        return res.data
    } 
)

export const fetchAllChatMessages = createAsyncThunk(
    'fetchAllChatMessages',
    async(currentDialog:string) => {
        const res = await allMessagesAPI(currentDialog)
        return res.data
    }
)


type State = {
    dialogs: DialogsRes[],
    activeChatData: MessageShort[]
}

const initialState:State = {
    dialogs: [],
    activeChatData: []
}

const dialogSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.activeChatData.push(action.payload)
            console.log(action.payload)
        }
    },
    extraReducers: {
        //--------Загрузка всех диалогов пользователя-----------//
        [fetchDialogs.fulfilled.type]: (state, action) => {
            state.dialogs = action.payload
        },
        //-------Загрузка сообщений выбранного диалога----------//
        [fetchAllChatMessages.fulfilled.type]: (state, action) => {
            state.activeChatData = action.payload
        }
        
    }
})

export const { addMessage } = dialogSlice.actions

export default dialogSlice.reducer
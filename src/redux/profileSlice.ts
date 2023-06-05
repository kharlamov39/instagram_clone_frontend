import { GetProfileRes } from './../types/resTypes';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UpdateProfile, getProfileAPI, updateProfileAPI, deleteProfileAPI } from '../api/profile-api'


export const fetchProfile = createAsyncThunk(
    'fetchProfile',
    async (id:string | undefined) => {
        const response = await getProfileAPI(id)
        return response.data
    }
)

export const fetchUpdateProfile = createAsyncThunk(
    'fetchUpdateProfile',
    async (obj:UpdateProfile) => {
        const response = await updateProfileAPI(obj)
        return response.data
    }
)

export const fetchDeleteProfile = createAsyncThunk(
    'fetchDeleteProfile', 
    async( _id:string | undefined) => {
        const response = await deleteProfileAPI(_id)
        return response.data
    }
)


type State = {
    profile: GetProfileRes | null
}

const initialState: State = {
    profile: null
}

const profileSlice = createSlice({
    name: 'profile', 
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [fetchProfile.fulfilled.type]: (state, action) => {
            state.profile = action.payload
        },
        [fetchUpdateProfile.fulfilled.type]: (state, action) => {
            state.profile = action.payload
        },
        [fetchDeleteProfile.fulfilled.type]: (state, action) => {
            window.localStorage.removeItem('token')
            state.profile = null
        },
    }
})

export default profileSlice.reducer
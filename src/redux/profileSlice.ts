import { GetProfileRes } from './../types/resTypes';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateProfile, getProfileAPI, updateProfileAPI, deleteProfileAPI } from '../api/profile-api';
import { followAPI, getFollowersAPI, getFollowingAPI, unfollowAPI } from '../api/following-api';

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

type Obj = {
    userId:string
    currentId: string | undefined
}

export const followProfile = createAsyncThunk(
    'fetchFollow',
    async(obj:Obj) => {
        const { userId, currentId } = obj
        const response = await followAPI(userId)
        console.log(response)
    }
)

export const unfollowProfile = createAsyncThunk(
    'unfetchFollow',
    async(obj:Obj) => {
        const { userId, currentId } = obj
        const response = await unfollowAPI(userId)
        console.log(response)
    }
)

export const fetchFollowers = createAsyncThunk(
    'fetchFollowers',
    async(userId:string) => {
        const response = await getFollowersAPI(userId)
        return response.data
    }
)

export const fetchFollowing = createAsyncThunk(
    'fetchFollowing',
    async(userId:string) => {
        const response = await getFollowingAPI(userId)
        return response.data
    }
)


type State = {
    profile: GetProfileRes | null
    followers: any[]
    following: any[]
}

const initialState: State = {
    profile: null,
    followers: [],
    following: []
}

const profileSlice = createSlice({
    name: 'profile', 
    initialState,
    reducers: {
        
    },
    extraReducers: {
        //----------Загрузка профиля--------//
        [fetchProfile.fulfilled.type]: (state, action) => {
            state.profile = action.payload
        },

        //-----------Обновление профиля----------//

        [fetchUpdateProfile.fulfilled.type]: (state, action) => {
            state.profile = action.payload
        },

        //---------Удаление профиля--------------//
        [fetchDeleteProfile.fulfilled.type]: (state, action) => {
            window.localStorage.removeItem('token')
            state.profile = null
        },

        //-------------Подписаться на профиль----------//
        [followProfile.fulfilled.type]: (state, action) => {
            if(state.profile?.followers != undefined) {
                state.profile?.followers.push(action.meta.arg.currentId)
            }
        },

        //-----------Отписаться от профиля-------------//
        [unfollowProfile.fulfilled.type]: (state, action) => {
            if(state.profile?.followers != undefined) {
                state.profile.followers = state.profile?.followers.filter( el => el !== action.meta.arg.currentId)
            }
        },

        //--------Получение подписчиков данного профиля------------//
        [ fetchFollowers.fulfilled.type]: (state, action) => {
            state.followers = action.payload
        },

        //--------Получение подписок данного профиля------------//
        [ fetchFollowing.fulfilled.type]: (state, action) => {
            state.following = action.payload
        },
    }
})

export default profileSlice.reducer
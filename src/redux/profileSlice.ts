import { GetProfileRes, UserRes } from './../types/resTypes';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateProfile, getProfileAPI, updateProfileAPI } from '../api/profile-api';
import { followAPI, getFollowersAPI, getFollowingAPI, unfollowAPI } from '../api/following-api';

export const fetchProfile = createAsyncThunk<GetProfileRes, string | undefined, { rejectValue: string }>(
    'profile/fetchProfile',
    async (id, {rejectWithValue}) => {
        try {
            const response = await getProfileAPI(id)
            return response.data
        } catch(err:any) {
            return rejectWithValue(err.message)
        }
    }
)

export const fetchUpdateProfile = createAsyncThunk<GetProfileRes, UpdateProfile, { rejectValue: string }>(
    'profile/fetchUpdateProfile',
    async (obj, { rejectWithValue }) => {
        try {
            const response = await updateProfileAPI(obj)
            return response.data
        } catch(err:any) {
            return rejectWithValue(err.message)
        }
    }
)

type FollowParams = {
    userId:string
    currentId: string
}

export const followProfile = createAsyncThunk<void, FollowParams, { rejectValue: string }>(
    'profile/fetchFollow',
    async(obj, { rejectWithValue }) => {
        try {
            const { userId, currentId } = obj
            await followAPI(userId)
        } catch(err:any) {
            return rejectWithValue(err.message)
        }
    }
)

export const unfollowProfile = createAsyncThunk<void, FollowParams, { rejectValue: string }>(
    'profile/fetchUnfollow',
    async(obj, { rejectWithValue }) => {
        try {
            const { userId, currentId } = obj
            await unfollowAPI(userId)
        } catch(err:any) {
            return rejectWithValue(err.message)
        }
    }
)

export const fetchFollowers = createAsyncThunk<UserRes[], string, { rejectValue: string }>(
    'profile/fetchFollowers',
    async(userId, { rejectWithValue}) => {
        try {
            const response = await getFollowersAPI(userId)
            console.log(response.data)
            return response.data
        } catch(err:any) {
            return rejectWithValue(err.message)
        }
    }
)

export const fetchFollowing = createAsyncThunk<UserRes[], string, {rejectValue: string}>(
    'profile/fetchFollowing',
    async(userId, { rejectWithValue }) => {
        try {
            const response = await getFollowingAPI(userId)
            return response.data
        } catch(err:any) {
            return rejectWithValue(err.message)
        }
    }
)

type State = {
    profile: GetProfileRes | null
    followers: UserRes[]
    following: UserRes[]
    loading: boolean
    error: null | string | undefined
}

const initialState: State = {
    profile: null,
    followers: [],
    following: [],
    loading: false,
    error: null
}

const profileSlice = createSlice({
    name: 'profile', 
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        //----------Загрузка профиля--------//
        .addCase( fetchProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        } )
        .addCase( fetchProfile.fulfilled, (state, action) => {
            state.error = null;
            state.loading = false;
            state.profile = action.payload;
        } )
        .addCase( fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        } )

        //---------Обновление профиля---------//
        .addCase( fetchUpdateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        } )
        .addCase( fetchUpdateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload
        } )
        .addCase( fetchUpdateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        } )

        //---------------Подписаться на профиль-----------//
        .addCase( followProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        } )
        .addCase( followProfile.fulfilled, (state, action) => {
            state.loading = false;
            if(state.profile?.followers != undefined) {
                state.profile?.followers.push(action.meta.arg.currentId)
            }
        } )
        .addCase( followProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        } )

        //---------------Отписаться от профиля-----------//
        .addCase( unfollowProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        } )
        .addCase( unfollowProfile.fulfilled, (state, action) => {
            state.loading = false;
            if(state.profile?.followers != undefined) {
                state.profile.followers = state.profile?.followers.filter( el => el !== action.meta.arg.currentId)
            }
        } )
        .addCase( unfollowProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        } )

        //--------Получение подписчиков данного профиля------------//
        .addCase( fetchFollowers.pending, (state) => {
            state.loading = true;
            state.error = null;
        } )
        .addCase( fetchFollowers.fulfilled, (state, action) => {
            state.loading = false;
            state.followers = action.payload;
        } )
        .addCase( fetchFollowers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        } )

        //--------Получение подписок данного профиля------------//
        .addCase( fetchFollowing.pending, (state) => {
            state.loading = true;
            state.error = null;
        } )
        .addCase( fetchFollowing.fulfilled, (state, action) => {
            state.loading = false;
            state.following = action.payload
        } )
        .addCase( fetchFollowing.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        } )

    },
    // extraReducers: {
    //     //----------Загрузка профиля--------//
    //     [fetchProfile.fulfilled.type]: (state, action) => {
    //         state.profile = action.payload
    //     },

    //     //-----------Обновление профиля----------//

    //     [fetchUpdateProfile.fulfilled.type]: (state, action) => {
    //         state.profile = action.payload
    //     },

    //     //-------------Подписаться на профиль----------//
    //     [followProfile.fulfilled.type]: (state, action) => {
    //         if(state.profile?.followers != undefined) {
    //             state.profile?.followers.push(action.meta.arg.currentId)
    //         }
    //     },

    //     //-----------Отписаться от профиля-------------//
    //     [unfollowProfile.fulfilled.type]: (state, action) => {
    //         if(state.profile?.followers != undefined) {
    //             state.profile.followers = state.profile?.followers.filter( el => el !== action.meta.arg.currentId)
    //         }
    //     },

    //     //--------Получение подписчиков данного профиля------------//
    //     [ fetchFollowers.fulfilled.type]: (state, action) => {
    //         state.followers = action.payload
    //     },

    //     //--------Получение подписок данного профиля------------//
    //     [ fetchFollowing.fulfilled.type]: (state, action) => {
    //         state.following = action.payload
    //     },
    // }
})

export default profileSlice.reducer
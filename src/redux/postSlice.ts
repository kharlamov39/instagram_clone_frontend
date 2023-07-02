import { getAllPostsAPI } from './../api/post-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AllPostsRes, PostsRes } from '../types/resTypes';

export const fetchAllPosts = createAsyncThunk<AllPostsRes, number, {rejectValue: string}>(
    'post/fetchAllPosts',
    async(page, {rejectWithValue}) => {
        try {
            const response = await getAllPostsAPI(page);
            return response.data;
        } catch(err:any) {
            console.log(err);
            return rejectWithValue(err.message)
        }
    }
)

type State = {
    error: null | string | undefined
    loading: boolean
    allPosts: PostsRes[]
    totalPages: number
}

const initialState:State = {
    error: null,
    loading: false,
    allPosts: [],
    totalPages: 0
}

const postSlice = createSlice({
    name: 'posts', 
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        //-----------Получение постов на домашней странице приложения(лента)-----------//
        builder
        .addCase( fetchAllPosts.pending, (state) => {
            state.loading = true
            state.error = null
        } )
        .addCase( fetchAllPosts.fulfilled, (state, action) => {
            if(action.meta.arg === 1) {
                state.allPosts = action.payload.posts
                state.totalPages = action.payload.totalPages
            } else {
                state.allPosts = state.allPosts.concat(action.payload.posts)
                state.totalPages = action.payload.totalPages
            }
            state.loading = false
            state.error = null
        } )
        .addCase( fetchAllPosts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        } )
    }
})

export default postSlice.reducer
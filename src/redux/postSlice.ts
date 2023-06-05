import { CreatePostI, deletePostAPI, getAllPostsAPI } from './../api/post-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPostAPI } from '../api/post-api'
import { PostsRes } from '../types/resTypes';

export const fetchCreatePost = createAsyncThunk(
    'fetchCreatePost',
    async (obj: CreatePostI) => {
        const response = await createPostAPI(obj)
        return response.data
    }
)

export const fetchAllPosts = createAsyncThunk(
    'fetchAllPosts',
    async () => {
        const response = await getAllPostsAPI()
        return response.data
    }
)

type State = {
    allPosts: PostsRes[] | []
}

const initialState:State = {
    allPosts: []
}

const postSlice = createSlice({
    name: 'posts', 
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [fetchCreatePost.fulfilled.type]: (state, action) => {
            alert('Пост создан')
        },
        [fetchAllPosts.fulfilled.type]: (state, action) => {
            state.allPosts = action.payload
        },
    }
})


export default postSlice.reducer
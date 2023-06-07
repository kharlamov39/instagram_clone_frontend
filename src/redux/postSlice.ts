import { getPostCommentsAPI } from './../api/comment-api';
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

export const fetchPostComments = createAsyncThunk(
    'fetchPostComments', 
    async (postId:string) => {
        const response = await getPostCommentsAPI(postId)
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
        [fetchAllPosts.fulfilled.type]: (state, action) => {
            state.allPosts = action.payload
        },
        [fetchPostComments.fulfilled.type]: (state, action) => {
            const post = state.allPosts.filter( el => el._id === action.meta.arg)
            post[0].comments = action.payload
        },

    }
})


export default postSlice.reducer
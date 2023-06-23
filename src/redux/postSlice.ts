import { getPostCommentsAPI } from './../api/comment-api';
import { CreatePostI, getAllPostsAPI } from './../api/post-api';
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
    async (page:number) => {
        const response = await getAllPostsAPI(page)
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
    loading: boolean
    allPosts: PostsRes[]
    totalPage: number
}

const initialState:State = {
    loading: false,
    allPosts: [],
    totalPage: 0
}

const postSlice = createSlice({
    name: 'posts', 
    initialState,
    reducers: {
       
    },
    extraReducers: {
        //------------------AllPosts---------------
        [fetchAllPosts.pending.type]: (state, action) => {
            state.loading = true
        },
        [fetchAllPosts.fulfilled.type]: (state, action) => {
            state.loading = false
            if(action.meta.arg === 1) {
                state.allPosts = action.payload.posts
                state.totalPage = action.payload.totalPage
            } else {
                state.allPosts = state.allPosts.concat(action.payload.posts)
                state.totalPage = action.payload.totalPage
            }
        },
        [fetchAllPosts.rejected.type]: (state, action) => {
            state.loading = false
        },

        // --------------PostComments-----------------

        [fetchPostComments.fulfilled.type]: (state, action) => {
            const post = state.allPosts.filter( el => el._id === action.meta.arg)
            post[0].comments = action.payload
        },

    }
})

export default postSlice.reducer
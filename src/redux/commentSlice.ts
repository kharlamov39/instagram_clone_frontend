// import { GetProfileRes } from './../types/resTypes';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CreateComment, createCommentAPI, getPostCommentsAPI } from '../api/comment-api'
import { PostCommentsRes } from '../types/resTypes'


export const fetchPostComments = createAsyncThunk(
    'fetchPostComments', 
    async (postId:string) => {
        const response = await getPostCommentsAPI(postId)
        return response.data
    }
)

export const fetchCreateComment = createAsyncThunk(
    'fetchCreateComment', 
    async (obj: CreateComment) => {
        const response = await createCommentAPI(obj)
        return response.data
    }
)


type State = {
    comments: PostCommentsRes[]
}

const initialState: State = {
    comments: []
}

const commentSlice = createSlice({
    name: 'comment', 
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [fetchPostComments.fulfilled.type]: (state, action) => {
            state.comments = action.payload
        },
        [fetchCreateComment.fulfilled.type]: (state, action) => {
            state.comments.push(action.payload)
        },
    }
})


export default commentSlice.reducer
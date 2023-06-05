import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { LoginType, RegisterType, authMeAPI, loginAPI, registerAPI } from '../api/auth-api'
import { RegisterRes } from '../types/resTypes'
import { fetchDeleteProfile } from './profileSlice'

export const fetchRegister = createAsyncThunk(
    'fetchRegister',
    async (obj: RegisterType) => {
        const response = await registerAPI(obj)
        return response.data
    }
)

export const fetchLogin = createAsyncThunk(
    'fetchLogin', 
    async (obj: LoginType) => {
        const response = await loginAPI(obj)
        return response.data
    }
)

export const fetchAuthMe = createAsyncThunk(
    'fetchAuthMe', 
    async () => {
        const response = await authMeAPI()
        return response.data
    }
)

type State = {
    isAuth: boolean,
    currentUser: null | RegisterRes
}

const initialState: State = {
    isAuth: false,
    currentUser: null
}

const authSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null
            state.isAuth = false
            localStorage.removeItem('token')
        }
    },
    extraReducers: {
        [fetchRegister.fulfilled.type]: (state, action) => {
            state.currentUser = action.payload
            state.isAuth = true
            localStorage.setItem('token', action.payload.token )
        },
        [fetchLogin.fulfilled.type]: (state, action) => {
            state.currentUser = action.payload
            state.isAuth = true
            localStorage.setItem('token', action.payload.token )
        },
        [fetchAuthMe.fulfilled.type]: (state, action) => {
            state.currentUser = action.payload
            state.isAuth = true
        },
        [fetchDeleteProfile.fulfilled.type]: (state, action) => {
            state.currentUser = null
            state.isAuth = false
        },
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
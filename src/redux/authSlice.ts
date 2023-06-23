import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { LoginType, RegisterType, authMeAPI, loginAPI, registerAPI } from '../api/auth-api'
import { RegisterRes } from '../types/resTypes'
import { fetchDeleteProfile } from './profileSlice'
import { FormValues } from '../components/Register/Login/Login'

export const fetchRegister = createAsyncThunk(
    'fetchRegister',
    async (obj: RegisterType, {rejectWithValue} ) => {
        try {
            const response = await registerAPI(obj)
            if(response.status === 200) {
                return response.data
            }
        } catch(err:any) {
            if (!err.response) {
                throw err
            }
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
)

export const fetchLogin = createAsyncThunk(
    'fetchLogin', 
    async (obj: FormValues, { rejectWithValue }) => {
        try {
            const { email, password } = obj
            const response = await loginAPI({email, password})
            if(response.status === 200) {
                return response.data
            } 
        } catch(err:any) {
            if (!err.response) {
                throw err
            }
            console.log(err)
            return rejectWithValue(err.response.data)
        }
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
    error: null | string
}

const initialState: State = {
    isAuth: false,
    currentUser: null,
    error: null
}

const authSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null
            state.isAuth = false
            localStorage.removeItem('token')
        },
        closeModalError: (state) => {
            state.error = null
        }
    },
    extraReducers: {
        //----------REGISTER--------------
        [fetchRegister.pending.type]: (state) => {
            state.error = null
        },
        [fetchRegister.fulfilled.type]: (state, action) => {
            state.currentUser = action.payload
            state.isAuth = true
            localStorage.setItem('token', action.payload.token )
        },
        [fetchRegister.rejected.type]: (state, action) => {
            state.isAuth = false
            state.error = action.payload.message
        },
        // --------LOGIN------------------
        [fetchLogin.pending.type]: (state, action) => {
            state.error = null
        },
        [fetchLogin.fulfilled.type]: (state, action) => {
            state.error = null
            state.currentUser = action.payload
            state.isAuth = true
            if(action.meta.arg.rememberMe) {
                localStorage.setItem('token', action.payload.token )
            }
        },
        [fetchLogin.rejected.type]: (state, action) => {
            state.isAuth = false
            state.error = action.payload.message
        },
        //----------AUTH----------------
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

export const { logout, closeModalError } = authSlice.actions

export default authSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RegisterType, authMeAPI, loginAPI, registerAPI, deleteProfileAPI } from '../api/auth-api'
import { AuthMeRes, RegisterRes } from '../types/resTypes'
import { ILoginFields } from '../components/Register/Login/Login'

export const fetchRegister = createAsyncThunk<RegisterRes, RegisterType, {rejectValue: string }>(
    'auth/fetchRegister',
    async (obj, {rejectWithValue} ) => {
        try {
            const response = await registerAPI(obj)
            return response.data
        } catch(err:any) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

export const fetchLogin = createAsyncThunk<RegisterRes, ILoginFields, {rejectValue: string}>(
    'auth/fetchLogin', 
    async (obj, { rejectWithValue }) => {
        try{
            const { email, password } = obj
            const response = await loginAPI({email, password})
            return response.data
        } catch(err:any) {
            console.log(err)
            return rejectWithValue(err.response.data.message)
        }
    }
)

export const fetchAuthMe = createAsyncThunk<AuthMeRes, undefined, {rejectValue: string}>(
    'auth/fetchAuthMe', 
    async (_, {rejectWithValue}) => {
        try {
            const response = await authMeAPI()
            return response.data
        } catch(err:any) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }  
    }
)

export const fetchDeleteProfile = createAsyncThunk<void, string | undefined, {rejectValue: string}>(
    'auth/fetchDeleteProfile', 
    async( _id, {rejectWithValue}) => {
        try {
            await deleteProfileAPI(_id)
        } catch(err:any) {
            console.log(err)
            return rejectWithValue(err.message)
        } 
    }
)

type State = {
    loading: boolean
    isAuth: boolean,
    currentUser: null | RegisterRes | AuthMeRes
    error: null | string | undefined
}

const initialState: State = {
    loading: false,
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
    extraReducers: (builder) => {
        //----------REGISTER--------------//
        builder
        .addCase( fetchRegister.pending, (state) => {
            state.error = null;
            state.loading = true;
        })
        .addCase( fetchRegister.fulfilled, (state, action) => {
            state.error = null;
            state.loading = false;
            state.currentUser = action.payload;
            state.isAuth = true;
            localStorage.setItem('token', action.payload.token )
        })
        .addCase( fetchRegister.rejected, (state, action) => {
            state.loading = false;
            state.isAuth = false;
            state.error = action.payload
        })
        //----------LOGIN------------------//
        .addCase( fetchLogin.pending, (state) => {
            state.loading = true
            state.error = null
            state.currentUser = null
            state.isAuth = false
        })
        .addCase( fetchLogin.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.currentUser = action.payload
            state.isAuth = true
            if(action.meta.arg.rememberMe) {
                localStorage.setItem('token', action.payload.token )
            }
        })
        .addCase( fetchLogin.rejected, (state, action) => {
            state.loading = false
            state.isAuth = false
            state.currentUser = null
            state.error = action.payload
        })
        //--------------AUTHME-----------//
        .addCase( fetchAuthMe.pending, (state, action) => {
            state.loading = true
            state.currentUser = null
            state.isAuth = false
            state.error = null
        })
        .addCase( fetchAuthMe.fulfilled, (state, action) => {
            console.log(action.payload)
            state.currentUser = action.payload
            state.isAuth = true
            state.loading = false
            state.error = null
        })
        .addCase( fetchAuthMe.rejected, (state) => {
            state.currentUser = null
            state.isAuth = false
            state.error = 'Error auth'
        })

        // //--------------DELETE PROFILE-------------//
        .addCase( fetchDeleteProfile.pending, (state) => {
            state.loading = true;
        })
        .addCase( fetchDeleteProfile.fulfilled, (state) => {
            state.loading = false;
            state.currentUser = null;
            state.isAuth = false;
            window.localStorage.removeItem('token');
        })
        .addCase( fetchDeleteProfile.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export const { logout, closeModalError } = authSlice.actions

export default authSlice.reducer
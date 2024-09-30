import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { auth, googleProvider } from '../../services/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'

interface User {
    uid: string
    displayName: string | null
    email: string | null
    photoURL: string | null
}

interface AuthState {
    user: User | null
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
}

export const loginWithGoogle = createAsyncThunk(
    'auth/loginWithGoogle',
    async (_, { rejectWithValue }) => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const user = result.user
            return {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await signOut(auth)
        return null
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        builder 
            .addCase(loginWithGoogle.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginWithGoogle.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            .addCase(logout.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false
                state.user = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { setUser } = authSlice.actions

export default authSlice.reducer

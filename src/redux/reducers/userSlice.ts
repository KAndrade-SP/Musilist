import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { db } from '../../services/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { User } from '../../types/UserTypes'
import { uploadAndUpdateUserProfile } from '../../helpers/imgurUpload'

const initialState = {
  profile: null as User | null,
  loading: false,
  error: null as string | null,
}

export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (uid: string, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', uid)
      const userSnap = await getDoc(userRef)
      if (userSnap.exists()) {
        return userSnap.data() as User
      } else {
        throw new Error('User profile not found')
      }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const saveUserProfile = createAsyncThunk(
  'userProfile/saveUserProfile',
  async (user: User, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', user.uid)
      await setDoc(userRef, user, { merge: true })
      return user
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  'userProfile/updateUserProfile',
  async (updatedData: Partial<User> & { profileImageUrl?: string; coverImageUrl?: string }, { rejectWithValue }) => {
    try {
      await uploadAndUpdateUserProfile(updatedData)
      return updatedData
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserProfile.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(saveUserProfile.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(saveUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(saveUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateUserProfile.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<Partial<User>>) => {
        state.loading = false
        if (state.profile) {
          state.profile = { ...state.profile, ...action.payload }
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default userSlice.reducer

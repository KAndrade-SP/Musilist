import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { db } from '../../services/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { User } from '../../types/UserTypes'
import { RootState } from '../store'
import { setUser } from './authSlice'

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

export const updateUserProfile = createAsyncThunk<
  Partial<User>,
  Partial<User> & { photoURL?: string; coverPhotoURL?: string },
  { rejectValue: string }
>('userProfile/updateUserProfile', async (updatedData, { rejectWithValue, getState, dispatch }) => {
  try {
    const { user } = (getState() as RootState).auth

    if (!user) {
      return rejectWithValue('User not found in state')
    }

    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, updatedData)

    dispatch(setUser({ ...user, ...updatedData }))

    return updatedData
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message)
  }
})

export const addToFavorites = createAsyncThunk(
  'userProfile/addToFavorites',
  async (
    { uid, type, id }: { uid: string; type: 'albums' | 'artists' | 'tracks'; id: string },
    { dispatch, getState }
  ) => {
    try {
      const userRef = doc(db, 'users', uid)
      const userSnap = await getDoc(userRef)
      const { user } = (getState() as RootState).auth

      if (!userSnap.exists()) {
        throw new Error('User not found')
      }

      const userData = userSnap.data() as User
      const updatedFavorites = {
        ...userData.favorites,
        [type]: [...(userData.favorites?.[type] || []), id],
      }

      await updateDoc(userRef, { favorites: updatedFavorites })

      if (user) {
        dispatch(
          setUser({
            ...user,
            favorites: {
              albums: updatedFavorites.albums ?? [],
              artists: updatedFavorites.artists ?? [],
              tracks: updatedFavorites.tracks ?? [],
            },
          })
        )
      }

      return { favorites: updatedFavorites }
    } catch (error) {
      console.error('Error adding to favorites:', error)
      throw error
    }
  }
)

export const removeFromFavorites = createAsyncThunk(
  'userProfile/removeFromFavorites',
  async (
    { uid, type, id }: { uid: string; type: 'albums' | 'artists' | 'tracks'; id: string },
    { dispatch, getState }
  ) => {
    const userRef = doc(db, 'users', uid)
    const userSnap = await getDoc(userRef)
    const { user } = (getState() as RootState).auth

    if (!userSnap.exists()) {
      throw new Error('User not found')
    }

    const userData = userSnap.data()
    const updatedFavorites = {
      ...userData.favorites,
      [type]: userData.favorites?.[type]?.filter((favId: string) => favId !== id) || [],
    }

    await updateDoc(userRef, { favorites: updatedFavorites })

    if (user) {
      dispatch(setUser({ ...user, favorites: updatedFavorites }))
    }

    return { favorites: updatedFavorites }
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
      .addCase(addToFavorites.fulfilled, (state, action) => {
        if (state.profile) {
          const { type, id } = action.meta.arg

          if (!state.profile.favorites) {
            state.profile.favorites = { albums: [], artists: [], tracks: [] }
          }

          if (!state.profile.favorites[type].includes(id)) {
            state.profile.favorites[type].push(id)
          }
        }
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        if (state.profile) {
          const { type, id } = action.meta.arg

          if (!state.profile.favorites) return

          state.profile.favorites[type] = state.profile.favorites[type].filter(favId => favId !== id)
        }
      })
  },
})

export default userSlice.reducer

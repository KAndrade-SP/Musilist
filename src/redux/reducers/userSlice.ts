import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { db } from '../../services/firebase'
import { collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { ListItem, User } from '../../types/UserTypes'
import { RootState } from '../store'
import { setUser } from './authSlice'
import { capitalize } from '../../helpers/Capitalize'

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
  Partial<User> & { photoURL?: string; coverPhotoURL?: string | null },
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
    {
      uid,
      type,
      id,
      name,
      image,
    }: { uid: string; type: 'albums' | 'artists' | 'tracks'; id: string; name: string; image: string },
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

      if (!id || !name) {
        throw new Error('Invalid item data')
      }

      const updatedFavorites = {
        ...userData.favorites,
        [type]: [...(userData.favorites?.[type] || []), { id, name, image: image || '' }],
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
      [type]: userData.favorites?.[type]?.filter((fav: { id: string }) => fav.id !== id) || [],
    }

    await updateDoc(userRef, { favorites: updatedFavorites })

    if (user) {
      dispatch(setUser({ ...user, favorites: updatedFavorites }))
    }

    return { favorites: updatedFavorites }
  }
)

export const updateFavoritesOrder = createAsyncThunk(
  'userProfile/updateFavoritesOrder',
  async (
    { uid, type, newOrder }: { uid: string; type: 'albums' | 'artists' | 'tracks'; newOrder: any[] },
    { dispatch, getState }
  ) => {
    try {
      const userRef = doc(db, 'users', uid)
      await updateDoc(userRef, { [`favorites.${type}`]: newOrder })

      const { user } = (getState() as RootState).auth
      if (user) {
        dispatch(
          setUser({
            ...user,
            favorites: {
              albums: user.favorites?.albums ?? [],
              artists: user.favorites?.artists ?? [],
              tracks: user.favorites?.tracks ?? [],
              [type]: newOrder,
            },
          })
        )
      }

      return { type, newOrder }
    } catch (error) {
      console.error('Error updating favorites order:', error)
      throw error
    }
  }
)

export const addToList = createAsyncThunk(
  'userProfile/addToList',
  async (
    { uid, listType, item }: { uid: string; listType: 'planning' | 'completed' | 'dropped'; item: ListItem },
    { dispatch }
  ) => {
    try {
      const userRef = doc(db, 'users', uid)
      const listRef = collection(userRef, 'lists', listType, 'items')
      const itemRef = doc(listRef, item.id)

      const hasImages = (obj: any): obj is { images: { url: string }[] } => 'images' in obj
      const hasAlbumImages = (obj: any): obj is { album: { images: { url: string }[] } } => 'album' in obj
      const hasAlbum = (obj: any): obj is { album: { release_date: string } } => obj?.album?.release_date !== undefined

      const filteredItem: ListItem = {
        id: item.id,
        name: item.name,
        image:
          item.image ||
          (hasImages(item) ? item.images[0]?.url : '') ||
          (hasAlbumImages(item) ? item.album.images[0]?.url : ''),
        score: item.score ?? null,
        review: item.review ?? null,
        type: capitalize(item.type),
        release_date:
          item.type === 'track' && hasAlbum(item)
            ? item.album?.release_date?.split('-')[0] || null
            : item.type === 'artists'
            ? null
            : item.release_date?.split('-')[0] || null,
        album_type: capitalize(item.type === 'album' ? item.album_type || 'album' : item.type),
      }

      const userSnap = await getDoc(userRef)
      const userData = userSnap.exists() ? userSnap.data() : null

      if (!userData) throw new Error('User not found')

      let previousList: 'planning' | 'completed' | 'dropped' | null = null
      for (const key of ['planning', 'completed', 'dropped'] as const) {
        if (key !== listType && userData.lists?.[key]?.some((i: ListItem) => i.id === item.id)) {
          previousList = key
          break
        }
      }

      if (previousList) {
        const prevListRef = doc(db, 'users', uid, 'lists', previousList, 'items', item.id)
        await deleteDoc(prevListRef)

        userData.lists[previousList] = userData.lists[previousList].filter((i: ListItem) => i.id !== item.id)
      }

      await setDoc(itemRef, filteredItem)

      const updatedLists = {
        ...userData.lists,
        [listType]: [...(userData.lists?.[listType] || []), filteredItem],
      }

      await updateDoc(userRef, { lists: updatedLists })

      dispatch(
        setUser({
          uid: userData.uid,
          displayName: userData.displayName,
          email: userData.email,
          photoURL: userData.photoURL,
          coverPhotoURL: userData.coverPhotoURL,
          favorites: userData.favorites || { albums: [], artists: [], tracks: [] },
          lists: updatedLists,
        })
      )

      return { listType, item }
    } catch (error) {
      console.error('Error adding to list:', error)
      throw error
    }
  }
)

export const removeFromList = createAsyncThunk(
  'userProfile/removeFromList',
  async (
    { uid, listType, itemId }: { uid: string; listType: 'planning' | 'completed' | 'dropped'; itemId: string },
    { dispatch }
  ) => {
    try {
      const userRef = doc(db, 'users', uid)
      const itemRef = doc(db, 'users', uid, 'lists', listType, 'items', itemId)

      await deleteDoc(itemRef)

      const userSnap = await getDoc(userRef)
      const userData = userSnap.exists() ? userSnap.data() : null

      if (!userData) throw new Error('User not found')

      const updatedLists = {
        ...userData.lists,
        [listType]: userData.lists?.[listType]?.filter((item: ListItem) => item.id !== itemId) || [],
      }

      await updateDoc(userRef, { lists: updatedLists })

      dispatch(
        setUser({
          uid: userData.uid,
          displayName: userData.displayName,
          email: userData.email,
          photoURL: userData.photoURL,
          coverPhotoURL: userData.coverPhotoURL,
          favorites: userData.favorites || { albums: [], artists: [], tracks: [] },
          lists: updatedLists,
        })
      )

      return { listType, itemId }
    } catch (error) {
      console.error('Error removing from list:', error)
      throw error
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
      .addCase(addToFavorites.fulfilled, (state, action) => {
        if (state.profile) {
          const { type, id, name, image } = action.meta.arg

          if (!state.profile.favorites) {
            state.profile.favorites = { albums: [], artists: [], tracks: [] }
          }

          if (!state.profile.favorites[type].some(fav => fav.id === id)) {
            state.profile.favorites[type].push({ id, name, image })
          }
        }
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        if (state.profile) {
          const { type, id } = action.meta.arg

          if (!state.profile.favorites) return

          state.profile.favorites[type] = state.profile.favorites[type].filter(fav => fav.id !== id)
        }
      })
      .addCase(updateFavoritesOrder.fulfilled, (state, action) => {
        if (state.profile) {
          if (!state.profile.favorites) {
            state.profile.favorites = { albums: [], artists: [], tracks: [] }
          }
          const { type, newOrder } = action.payload
          state.profile.favorites[type] = newOrder
        }
      })
      .addCase(addToList.fulfilled, (state, action) => {
        if (state.profile) {
          const { listType, item } = action.payload

          if (!state.profile.lists) {
            state.profile.lists = { planning: [], completed: [], dropped: [] }
          }

          state.profile.lists[listType].push(item)
        }
      })
      .addCase(removeFromList.fulfilled, (state, action) => {
        if (state.profile) {
          const { listType, itemId } = action.payload

          if (!state.profile.lists) return

          state.profile.lists[listType] = state.profile.lists[listType].filter(item => item.id !== itemId)
        }
      })
  },
})

export default userSlice.reducer

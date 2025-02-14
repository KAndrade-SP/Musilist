import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import userReducer from './reducers/userSlice'
import searchReducer from './reducers/searchSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    search: searchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SearchState = {
  query: string
  type: 'Albums' | 'Artists' | 'Tracks'
  results: any[]
  loading: boolean
  error: string | null
  activeFilter: string
}

const initialState: SearchState = {
  query: '',
  type: 'Albums',
  results: [],
  loading: false,
  error: null,
  activeFilter: 'Albums',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    startSearch: state => {
      state.loading = true
      state.error = null
    },
    setResults: (
      state,
      action: PayloadAction<{ query: string; type: 'Albums' | 'Artists' | 'Tracks'; results: any[] }>
    ) => {
      state.query = action.payload.query
      state.type = action.payload.type
      state.results = action.payload.results
      state.loading = false
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    clearSearch: state => {
      state.query = ''
      state.results = []
      state.error = null
      state.activeFilter = 'Albums'
    },
    setActiveFilter: (state, action: PayloadAction<'Albums' | 'Artists' | 'Tracks'>) => {
      state.activeFilter = action.payload
    },
  },
})

export const { startSearch, setResults, setQuery, setError, clearSearch, setActiveFilter } = searchSlice.actions
export default searchSlice.reducer

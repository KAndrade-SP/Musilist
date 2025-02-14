import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { startSearch, setResults, setError } from '../redux/reducers/searchSlice'

export const useSpotifySearch = () => {
  const dispatch = useDispatch()
  const { results, loading, error, query, type } = useSelector((state: RootState) => state.search)
  const BASE_SPOTIFY_URL = process.env.VITE_BASE_SPOTIFY_URL

  const search = async (newQuery: string, newType: 'Albums' | 'Artists' | 'Tracks') => {
    const searchType = newType.toLowerCase() as 'albums' | 'artists' | 'tracks'

    if (newQuery.trim() === query && searchType === type.toLowerCase()) return

    dispatch(startSearch())

    try {
      const response = await axios.get(`${BASE_SPOTIFY_URL}/${searchType}`, {
        params: { q: newQuery },
      })

      let formattedData = []

      if (searchType === 'tracks') {
        formattedData = response.data.tracks.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.album.images[0]?.url || '',
          artist: item.artists[0]?.name || 'Unknown Artist',
          album: item.album.name,
          duration: item.duration_ms,
        }))
      } else if (searchType === 'albums') {
        formattedData = response.data.albums.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.images[0]?.url || '',
          artist: item.artists[0]?.name || 'Unknown Artist',
          totalTracks: item.total_tracks,
          albumType: item.album_type,
        }))
      } else if (searchType === 'artists') {
        formattedData = response.data.artists.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.images[0]?.url || '',
        }))
      }

      dispatch(setResults({ query: newQuery, type: newType, results: formattedData }))
    } catch (err: any) {
      dispatch(setError(err.response?.data?.message || 'An unexpected error occurred.'))
    }
  }

  return { data: results, loading, error, search, query, type }
}

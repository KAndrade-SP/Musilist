import { useState } from 'react'
import axios from 'axios'

type SpotifyTrack = {
  id: string
  name: string
  image: string
  artist: string
  album: string
  duration: number
}

type SpotifyAlbum = {
  id: string
  name: string
  image: string
  artist: string
  totalTracks: number
  albumType: string
}

type SpotifyArtist = {
  id: string
  name: string
  image?: string
}

type SpotifyHookResult = {
  data: SpotifyTrack[] | SpotifyAlbum[] | SpotifyArtist[] | null
  loading: boolean
  error: string | null
  search: (query: string, type: 'artists' | 'tracks' | 'albums') => void
}

export const useSpotifySearch = (): SpotifyHookResult => {
  const [data, setData] = useState<SpotifyTrack[] | SpotifyAlbum[] | SpotifyArtist[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const BASE_SPOTIFY_URL = process.env.VITE_BASE_SPOTIFY_URL

  const search = async (query: string, type: 'artists' | 'tracks' | 'albums') => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`${BASE_SPOTIFY_URL}/${type}`, {
        params: { q: query },
      })

      let formattedData

      if (type === 'tracks') {
        formattedData = response.data.tracks.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.album.images[0]?.url || '',
          artist: item.artists[0]?.name || 'Unknown Artist',
          album: item.album.name,
          duration: item.duration_ms,
        }))
      } else if (type === 'albums') {
        formattedData = response.data.albums.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.images[0]?.url || '',
          artist: item.artists[0]?.name || 'Unknown Artist',
          totalTracks: item.total_tracks,
          albumType: item.album_type,
        }))
      } else if (type === 'artists') {
        formattedData = response.data.artists.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.images[0]?.url || '',
        }))
      } else {
        throw new Error('Invalid search type.')
      }

      setData(formattedData)
    } catch (err: any) {
      setError(err.response?.data?.message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, search }
}

import { useState, useEffect } from 'react'
import axios from 'axios'

export const useSpotifyDetails = (id: string, type: 'albums' | 'artists' | 'tracks') => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const BASE_SPOTIFY_URL = process.env.VITE_BASE_SPOTIFY_URL

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return

      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(`${BASE_SPOTIFY_URL}/${type}/${id}`)
        setData(response.data)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error fetching details.')
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [id, type])

  return { data, loading, error }
}

import axios from 'axios'
import { getPublicAccessToken } from './authService'
import { CustomError } from '../utils/CustomError'

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1'

const makeSpotifyRequest = async (endpoint: string) => {
  try {
    const accessToken = await getPublicAccessToken()

    const response = await axios.get(`${SPOTIFY_API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error calling Spotify API (${endpoint}):`, error.response?.data || error.message)
      throw new CustomError(
        error.response?.data?.error?.message || 'Failed to fetch data from Spotify API.',
        error.response?.status || 500
      )
    } else if (error instanceof Error) {
      console.error('Unexpected error:', error.message)
      throw new CustomError(error.message, 500)
    } else {
      console.error('Unknown error:', error)
      throw new CustomError('An unexpected error occurred.', 500)
    }
  }
}

export const searchTracks = async (query: string) => {
  return await makeSpotifyRequest(`/search?type=track&q=${encodeURIComponent(query)}`)
}

export const searchArtists = async (query: string) => {
  return await makeSpotifyRequest(`/search?type=artist&q=${encodeURIComponent(query)}`)
}

export const searchAlbums = async (query: string) => {
  return await makeSpotifyRequest(`/search?type=album&q=${encodeURIComponent(query)}`)
}

export const fetchTrackById = async (id: string) => {
  return await makeSpotifyRequest(`/tracks/${id}`)
}

export const fetchArtistById = async (id: string) => {
  return await makeSpotifyRequest(`/artists/${id}`)
}

export const fetchAlbumById = async (id: string) => {
  return await makeSpotifyRequest(`/albums/${id}`)
}

import axios from 'axios'
import qs from 'qs'
import dotenv from 'dotenv'
import { CustomError } from '../utils/CustomError'

dotenv.config()

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const TOKEN_URL = 'https://accounts.spotify.com/api/token'

if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set in .env')
}

let accessToken: string | null = null
let tokenExpiresAt: number | null = null

const getAccessToken = async (): Promise<string> => {
    const currentTime = Date.now()

    if (accessToken && tokenExpiresAt && currentTime < tokenExpiresAt) {
        return accessToken
    }

    try {
        const response = await axios.post(
            TOKEN_URL,
            qs.stringify({ grant_type: 'client_credentials' }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
                },
            }
        )

        accessToken = response.data.access_token
        tokenExpiresAt = currentTime + response.data.expires_in * 1000

        if (!accessToken) {
            throw new Error('Access token was not obtained')
        }
        return accessToken

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to obtain Spotify access token:', error.response?.data || error.message)
            throw new CustomError(error.response?.data?.error?.message || 'Failed to fetch access token from Spotify.', error.response?.status || 500)
        } else if (error instanceof Error) {
            console.error('Failed to obtain Spotify access token:', error.message)
            throw new CustomError(error.message, 500)
        } else {
            console.error('An unexpected error occurred while fetching access token:', error)
            throw new CustomError('An unexpected error occurred while fetching access token.', 500)
        }
    }
}

export const searchTracks = async (query: string) => {

    const token = await getAccessToken()

    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: query,
                type: 'track',
                limit: 20,
            },
        })

        return response.data.tracks.items

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to search tracks:', error.response?.data || error.message)
            throw new CustomError(error.response?.data?.error?.message || 'Failed to fetch tracks from Spotify.', error.response?.status || 500)
        } else if (error instanceof Error) {
            console.error('Failed to search tracks:', error.message)
            throw new CustomError(error.message, 500)
        } else {
            console.error('An unexpected error occurred while fetching tracks:', error)
            throw new CustomError('An unexpected error occurred while fetching tracks.', 500)
        }
    }
}

export const searchArtists = async (query: string) => {

    const token = await getAccessToken()

    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: query,
                type: 'artist',
                limit: 20,
            },
        })

        return response.data.artists.items

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to search artists:', error.response?.data || error.message)
            throw new CustomError(error.response?.data?.error?.message || 'Failed to fetch artists from Spotify.', error.response?.status || 500)
        } else if (error instanceof Error) {
            console.error('Failed to search artists:', error.message)
            throw new CustomError(error.message, 500)
        } else {
            console.error('An unexpected error occurred while fetching artists:', error)
            throw new CustomError('An unexpected error occurred while fetching artists.', 500)
        }
    }
}

export const searchAlbums = async (query: string) => {

    const token = await getAccessToken()

    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: query,
                type: 'album',
                limit: 20,
            },
        })

        return response.data.albums.items

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to search albums:', error.response?.data || error.message)
            throw new CustomError(error.response?.data?.error?.message || 'Failed to fetch albums from Spotify.', error.response?.status || 500)
        } else if (error instanceof Error) {
            console.error('Failed to search albums:', error.message)
            throw new CustomError(error.message, 500)
        } else {
            console.error('An unexpected error occurred while fetching albums:', error)
            throw new CustomError('An unexpected error occurred while fetching albums.', 500)
        }
    }
}

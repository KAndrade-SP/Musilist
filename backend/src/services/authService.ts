import qs from 'qs'
import axios from 'axios'
import dotenv from 'dotenv'
import { CustomError } from '../utils/CustomError'

dotenv.config()

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI
const TOKEN_URL = 'https://accounts.spotify.com/api/token'

if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
  throw new Error('Missing Spotify environment variables (CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)')
}

let publicAccessToken: string | null = null
let publicTokenExpiresAt: number | null = null

export const getSpotifyLoginUrl = (): string => {
  const queryParams = qs.stringify({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: 'user-read-private user-read-email',
  })

  return `https://accounts.spotify.com/authorize?${queryParams}`
}

export const handleSpotifyCallback = async (code: string) => {
  try {
    const response = await axios.post(
      TOKEN_URL,
      qs.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    const { access_token, refresh_token, expires_in } = response.data

    if (!access_token) {
      throw new CustomError('Access token not received from Spotify', 500)
    }

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during Spotify token exchange:', error.response?.data || error.message)
      throw new CustomError(
        error.response?.data?.error_description || 'Failed to exchange token with Spotify',
        error.response?.status || 500
      )
    } else {
      throw new CustomError('An unexpected error occurred during Spotify authentication.', 500)
    }
  }
}

export const getPublicAccessToken = async (): Promise<string> => {
  const currentTime = Date.now()

  if (publicAccessToken && publicTokenExpiresAt && currentTime < publicTokenExpiresAt) {
    return publicAccessToken
  }

  try {
    const response = await axios.post(TOKEN_URL, qs.stringify({ grant_type: 'client_credentials' }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      },
    })

    publicAccessToken = response.data.access_token
    publicTokenExpiresAt = currentTime + response.data.expires_in * 1000

    if (!publicAccessToken) {
      throw new Error('Access token was not obtained')
    }
    return publicAccessToken
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to obtain Spotify access token:', error.response?.data || error.message)
      throw new CustomError(
        error.response?.data?.error?.message || 'Failed to fetch access token from Spotify.',
        error.response?.status || 500
      )
    } else {
      throw new CustomError('An unexpected error occurred while fetching access token.', 500)
    }
  }
}

import { Request, Response, NextFunction } from 'express'
import { searchTracks, searchArtists, searchAlbums } from '../services/spotifyService'
import { getSpotifyLoginUrl, handleSpotifyCallback } from '../services/authService'
import { CustomError } from '../utils/CustomError'

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const spotifyLoginUrl = getSpotifyLoginUrl()
    res.redirect(spotifyLoginUrl)
  } catch (error) {
    if (error instanceof CustomError) {
      next(error)
    } else if (error instanceof Error) {
      next(new CustomError(error.message, 500))
    } else {
      next(new CustomError('An unexpected error occurred during login.', 500))
    }
  }
}

export const callback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.query

    if (!code || typeof code !== 'string') {
      throw new CustomError('Invalid or missing authorization code', 400)
    }

    const tokens = await handleSpotifyCallback(code)
    res.status(200).json(tokens)
  } catch (error) {
    if (error instanceof CustomError) {
      next(error)
    } else if (error instanceof Error) {
      next(new CustomError(error.message, 500))
    } else {
      next(new CustomError('An unexpected error occurred during callback.', 500))
    }
  }
}

export const getTracks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { q } = req.query

  if (!q || typeof q !== 'string') {
    next(new CustomError('Query parameter "q" is required and must be a string.', 400))
    return
  }

  try {
    const tracks = await searchTracks(q)
    res.json(tracks)
  } catch (error) {
    if (error instanceof CustomError) {
      next(error)
    } else if (error instanceof Error) {
      next(new CustomError(error.message, 500))
    } else {
      next(new CustomError('An unexpected error occurred.', 500))
    }
  }
}

export const getArtists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { q } = req.query

  if (!q || typeof q !== 'string') {
    next(new CustomError('Query parameter "q" is required and must be a string.', 400))
    return
  }

  try {
    const artists = await searchArtists(q)
    res.json(artists)
  } catch (error) {
    if (error instanceof CustomError) {
      next(error)
    } else if (error instanceof Error) {
      next(new CustomError(error.message, 500))
    } else {
      next(new CustomError('An unexpected error occurred.', 500))
    }
  }
}

export const getAlbums = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { q } = req.query

  if (!q || typeof q !== 'string') {
    next(new CustomError('Query parameter "q" is required and must be a string.', 400))
    return
  }

  try {
    const albums = await searchAlbums(q)
    res.json(albums)
  } catch (error) {
    if (error instanceof CustomError) {
      next(error)
    } else if (error instanceof Error) {
      next(new CustomError(error.message, 500))
    } else {
      next(new CustomError('An unexpected error occurred.', 500))
    }
  }
}

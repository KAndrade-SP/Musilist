import { Router } from 'express'
import {
  getTracks,
  getArtists,
  getAlbums,
  login,
  callback,
  getTrackById,
  getArtistById,
  getAlbumById,
} from '../controllers/spotifyController'

const router = Router()

router.get('/login', login)
router.get('/callback', callback)

router.get('/tracks', getTracks)
router.get('/artists', getArtists)
router.get('/albums', getAlbums)
router.get('/tracks/:id', getTrackById)
router.get('/artists/:id', getArtistById)
router.get('/albums/:id', getAlbumById)

export default router

import { Router } from 'express'
import { getTracks, getArtists, getAlbums } from '../controllers/spotifyController'

const router = Router()

router.get('/tracks', getTracks)

router.get('/artists', getArtists)

router.get('/albums', getAlbums)

export default router

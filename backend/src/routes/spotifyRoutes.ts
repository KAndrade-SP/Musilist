import { Router } from 'express'
import { getTracks, getArtists, getAlbums, login, callback } from '../controllers/spotifyController'

const router = Router()

router.get('/login', login);
router.get('/callback', callback); 

router.get('/tracks', getTracks)
router.get('/artists', getArtists)
router.get('/albums', getAlbums)

export default router

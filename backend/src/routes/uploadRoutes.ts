import express from 'express'
import multer from 'multer'
import { uploadImage } from '../controllers/uploadController'
import asyncHandler from '../middlewares/asyncHandler'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload', upload.single('image'), asyncHandler(uploadImage))

export default router

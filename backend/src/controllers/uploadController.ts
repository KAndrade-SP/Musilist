import { Request, Response } from 'express'
import axios from 'axios'

const IMGUR_ACCESS_TOKEN = process.env.IMGUR_ACCESS_TOKEN

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: 'No image provided' })
    return
  }

  const imageBase64 = req.file.buffer.toString('base64')

  const response = await axios.post(
    'https://api.imgur.com/3/image',
    { image: imageBase64 },
    {
      headers: {
        Authorization: `Bearer ${IMGUR_ACCESS_TOKEN}`,
      },
    }
  )

  const imgurUrl = response.data.data.link
  res.status(200).json({ url: imgurUrl })
}

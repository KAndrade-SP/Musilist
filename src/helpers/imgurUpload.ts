import axios from 'axios'

export const uploadImageToImgur = async (imageUrl: string): Promise<string> => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    const imageBuffer = Buffer.from(response.data, 'binary')

    const formData = new FormData()
    formData.append('image', imageBuffer.toString('base64'))

    const imgurAccessToken = process.env.VITE_IMGUR_ACCESS_TOKEN

    const imgurResponse = await axios.post('https://api.imgur.com/3/upload', formData, {
      headers: {
        Authorization: `Client-ID ${imgurAccessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    return imgurResponse.data.data.link
  } catch (error) {
    console.error('Error uploading image to Imgur:', error)
    throw new Error('Error uploading image to Imgur')
  }
}

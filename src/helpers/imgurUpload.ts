import axios from 'axios'
import { User } from '../types/UserTypes'
import { auth, db } from '../services/firebase'
import { doc, setDoc } from 'firebase/firestore'

export const uploadAndUpdateUserProfile = async (
  updatedData: Partial<User> & { profileImageUrl?: string; coverImageUrl?: string }
): Promise<void> => {
  try {
    const { profileImageUrl, coverImageUrl, ...otherData } = updatedData
    const uploadedImages: Partial<User> = {}

    if (profileImageUrl) {
      const profileResponse = await axios.get(profileImageUrl, { responseType: 'arraybuffer' })
      const profileBuffer = Buffer.from(profileResponse.data, 'binary')

      const profileFormData = new FormData()
      profileFormData.append('image', profileBuffer.toString('base64'))

      const imgurAccessToken = process.env.VITE_IMGUR_ACCESS_TOKEN
      const profileImgurResponse = await axios.post('https://api.imgur.com/3/image', profileFormData, {
        headers: {
          Authorization: `Bearer ${imgurAccessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      uploadedImages.photoURL = profileImgurResponse.data.data.link
    }

    if (coverImageUrl) {
      const coverResponse = await axios.get(coverImageUrl, { responseType: 'arraybuffer' })
      const coverBuffer = Buffer.from(coverResponse.data, 'binary')

      const coverFormData = new FormData()
      coverFormData.append('image', coverBuffer.toString('base64'))

      const imgurAccessToken = process.env.VITE_IMGUR_ACCESS_TOKEN
      const coverImgurResponse = await axios.post('https://api.imgur.com/3/image', coverFormData, {
        headers: {
          Authorization: `Bearer ${imgurAccessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      uploadedImages.coverPhotoURL = coverImgurResponse.data.data.link
    }

    const uid = auth.currentUser?.uid
    if (!uid) throw new Error('User not authenticated')
    const userRef = doc(db, 'users', uid)
    await setDoc(userRef, { ...uploadedImages, ...otherData }, { merge: true })

    console.log('User profile updated in Firestore:', { ...uploadedImages, ...otherData })
  } catch (error) {
    console.error('Error uploading and updating user profile:', error)
    throw new Error('Error uploading and updating user profile')
  }
}

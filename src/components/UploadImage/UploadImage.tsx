import React, { useState } from 'react'
import { HiddenInput, PreviewImage, UploadContainer, UploadText } from './UploadImage.styles'
import { updateUserProfile } from '../../redux/reducers/userSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import axios from 'axios'

const UploadImage = ({ type }: { type: 'profile' | 'banner' }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImagePreview(URL.createObjectURL(file))
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await axios.post('http://localhost:5000/api/imgur/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const imgurUrl = response.data.url

      const updatedData = type === 'profile' ? { photoURL: imgurUrl } : { coverPhotoURL: imgurUrl }

      await dispatch(updateUserProfile(updatedData)).unwrap()
    } catch (error) {
      console.error('Error updating user profile:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <UploadContainer>
      {imagePreview ? (
        <PreviewImage src={imagePreview} alt={`${type} preview`} />
      ) : isUploading ? (
        <UploadText>Uploading...</UploadText>
      ) : (
        <UploadText>Drop image here or click to upload</UploadText>
      )}
      <HiddenInput type="file" accept="image/*" onChange={handleImageUpload} />
    </UploadContainer>
  )
}

export default UploadImage

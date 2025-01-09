import React, { useState } from 'react'
import axios from 'axios'
import { HiddenInput, PreviewImage, UploadContainer, UploadText } from './UploadImage.styles'
import { updateUserProfile } from '../../redux/reducers/userSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { toast } from 'react-toastify'
import { UploadImageProps } from './UploadImage.interface'

const UploadImage = ({ type, onError }: UploadImageProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const MAX_FILE_SIZE = 8 * 1024 * 1024
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png']

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      onError?.(
        type === 'profile'
          ? 'Invalid format for photo. Only JPG and PNG are allowed.'
          : 'Invalid format for banner. Only JPG and PNG are allowed.'
      )
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      onError?.(
        type === 'profile'
          ? 'Photo size is too large. Maximum allowed is 8MB.'
          : 'Banner size is too large. Maximum allowed is 8MB.'
      )
      return
    }

    onError?.(null)

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

      toast.success('Upload completed successfully!')
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

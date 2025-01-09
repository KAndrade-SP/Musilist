export interface UploadImageProps {
  type: 'profile' | 'banner'
  onError?: (message: string | null) => void
}

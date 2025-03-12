import { useNavigate } from 'react-router-dom'

export const useMediaNavigation = () => {
  const navigate = useNavigate()

  const handleMediaDetails = (id: string, type: 'albums' | 'artists' | 'tracks') => {
    navigate(`/${type}/${id}`)
  }

  return { handleMediaDetails }
}

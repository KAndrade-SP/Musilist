import { useNavigate } from 'react-router-dom'

export const useMediaNavigation = () => {
  const navigate = useNavigate()

  const handleMediaDetails = (item: any, type: 'albums' | 'artists' | 'tracks') => {
    navigate(`/${type}/${item.id}`, { state: item })
  }

  return { handleMediaDetails }
}

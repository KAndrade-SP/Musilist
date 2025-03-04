import { IconHeart } from '@tabler/icons-react'
import { useTheme } from 'styled-components'
import { addToFavorites, removeFromFavorites } from '../redux/reducers/userSlice'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

interface LikeButtonProps {
  item: { id: string; name: string; image: string }
  type: 'albums' | 'artists' | 'tracks'
}

const LikeButton: React.FC<LikeButtonProps> = ({ item, type }) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { user } = useSelector((state: RootState) => state.auth)

  const isLiked = user?.favorites?.[type]?.some(fav => fav.id === item.id) ?? false

  const handleLikeToggle = () => {
    if (!user) return

    if (isLiked) {
      dispatch(removeFromFavorites({ uid: user.uid, type, id: item.id })).unwrap()
    } else {
      dispatch(addToFavorites({ uid: user.uid, type, id: item.id, name: item.name, image: item.image })).unwrap()
    }
  }

  return (
    <IconHeart
      onClick={handleLikeToggle}
      size={24}
      color={isLiked ? 'red' : theme.colors.textWhite}
      fill={isLiked ? 'red' : 'none'}
      style={{ cursor: 'pointer' }}
    />
  )
}

export default LikeButton

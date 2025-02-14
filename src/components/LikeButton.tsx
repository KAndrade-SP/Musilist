import { useState } from 'react'
import { IconHeart } from '@tabler/icons-react'
import { useTheme } from 'styled-components'

const LikeButton = () => {
  const theme = useTheme()
  const [liked, setLiked] = useState(false)

  return (
    <IconHeart
      onClick={() => setLiked(!liked)}
      size={24}
      color={liked ? 'red' : theme.colors.textWhite}
      fill={liked ? 'red' : 'none'}
      style={{ cursor: 'pointer' }}
    />
  )
}

export default LikeButton

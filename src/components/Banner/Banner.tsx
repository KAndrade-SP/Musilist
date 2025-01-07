import { useEffect, useState } from 'react'
import { User } from '../../types/UserTypes'
import { BannerContainer, BannerWrapper, UserIconHeader, UserNameHeader, UserWrapperHeader } from './Banner.styles'
import UserPhotoIcon from '../../assets/UserPhotoIcon.png'

const Banner = ({ user }: { user: User | null }) => {
  const [currentPhoto, setCurrentPhoto] = useState(UserPhotoIcon)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (user?.photoURL) {
      timeout = setTimeout(() => {
        setCurrentPhoto(user.photoURL || UserPhotoIcon)
      }, 500)
    }

    return () => clearTimeout(timeout)
  }, [user?.photoURL])

  return (
    <>
      {user && (
        <BannerWrapper>
          <BannerContainer>
            <UserWrapperHeader>
              <UserIconHeader src={currentPhoto} alt={user.displayName + ' photo'} />
              <UserNameHeader>{user.displayName}</UserNameHeader>
            </UserWrapperHeader>
          </BannerContainer>
        </BannerWrapper>
      )}
    </>
  )
}

export default Banner

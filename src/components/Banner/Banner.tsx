import { User } from '../../types/UserTypes'
import { BannerContainer, BannerWrapper, UserIconHeader, UserNameHeader, UserWrapperHeader } from './Banner.styles'

const Banner = ({ user }: { user: User | null }) => {
  return (
    <>
      {user && (
        <BannerWrapper>
          <BannerContainer>
            <UserWrapperHeader>
              <UserIconHeader
                src={user.photoURL || ''}
                alt={user.displayName + 'photo' || 'User photo'}
              ></UserIconHeader>
              <UserNameHeader>{user.displayName}</UserNameHeader>
            </UserWrapperHeader>
          </BannerContainer>
        </BannerWrapper>
      )}
    </>
  )
}

export default Banner

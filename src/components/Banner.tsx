import { styled } from 'styled-components'
import { User } from '../types/UserTypes'
import BannerImage from '../assets/PlaceholderImages/Banner.jpg'

const BannerWrapper = styled.div`
  position: relative;
  height: 330px;
  margin-top: -90px;
  background-image: url(${BannerImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`

const BannerContainer = styled.div`
  display: flex;
  width: 1440px;
  justify-self: start;
  padding: 2rem 2rem 1rem;
`

const UserWrapperHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`

const UserIconHeader = styled.img`
  ${({ theme: { breakpoints } }) => `
        width: 120px;
        border-radius: 100%;

        @media (max-width: ${breakpoints.sm}) {
            width: 60px;
        }

        @media (min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.xmd}) {
            width: 90px;
        }
    `}
`

const UserNameHeader = styled.span`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
        font-size: ${fontSizes.biggestFontSize};
        color: ${colors.textWhite};
        font-weight: bold;

        @media (max-width: ${breakpoints.sm}) {
            font-size: ${fontSizes.bigFontSize};
        }
    `}
`

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

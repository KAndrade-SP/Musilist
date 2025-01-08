import { styled } from 'styled-components'
import BannerImage from '../../assets/PlaceholderImages/Banner.jpg'

export const BannerWrapper = styled.div<{ $coverPhotoURL?: string }>`
  position: relative;
  height: 330px;
  margin-top: -90px;
  background-image: ${({ $coverPhotoURL }) => `url(${$coverPhotoURL || BannerImage})`};
  background-size: cover;
  background-position: center;
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

export const BannerContainer = styled.div`
  display: flex;
  width: 1440px;
  justify-self: start;
  padding: 2rem 2rem 1rem;
`

export const UserWrapperHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`

export const UserIconHeader = styled.img`
  ${({ theme: { breakpoints } }) => `
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;

      @media (max-width: ${breakpoints.sm}) {
          width: 60px;
          height: 60px;
      }

      @media (min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.xmd}) {
          width: 90px;
          height: 90px;
      }
  `}
`

export const UserNameHeader = styled.span`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
        font-size: ${fontSizes.biggestFontSize};
        color: ${colors.textWhite};
        font-weight: bold;

        @media (max-width: ${breakpoints.sm}) {
            font-size: ${fontSizes.bigFontSize};
        }
    `}
`

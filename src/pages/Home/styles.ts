import styled from 'styled-components'

export const HomeSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
`

export const HomeSectionRow = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`

export const ActivityArea = styled.section`
  ${({ theme: { breakpoints } }) => `
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: space-around;
    align-items: center;
    padding: 0.5rem 0;
    margin-bottom: 2rem;

    @media (max-width: ${breakpoints.xsm}) {
      gap: 1rem;
      padding: 0;
    }
  `}
`

export const ActivityItem = styled.div`
  ${({ theme: { breakpoints } }) => `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
    }
 `}
`

export const MetricItem = styled.div`
  ${({ theme: { breakpoints } }) => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.2rem;

    @media (max-width: ${breakpoints.sm}) {
      justify-content: center;
      align-items: center;
    }
 `}
`

export const MetricValue = styled.strong`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
    font-size: ${fontSizes.bigFontSize};
    color: ${colors.lightPurple};

    @media (max-width: ${breakpoints.sm}) {
      font-size: ${fontSizes.smallestFontSize};
    }
  `}
`

export const MetricLabel = styled.span`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
    font-size: ${fontSizes.smallFontSize};
    color: ${colors.textWhite};
    text-align: center;

    @media (max-width: ${breakpoints.sm}) {
      font-size: ${fontSizes.smallestFontSize};
    }
  `}
`

export const LastActivityArea = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
`

export const LastActivityDivisor = styled.div`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
    font-size: ${fontSizes.normalFontSize};
    color: ${colors.textWhite};
    border-bottom: solid 1px;
    border-color: rgba(224, 192, 255, 0.5);
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;

    @media (max-width: ${breakpoints.sm}) {
      font-size: ${fontSizes.smallestFontSize};
      padding: 1rem 0;
    }

    @media (min-width: ${breakpoints.sm}) {
      padding: 1rem 0;
    }

    @media (min-width: ${breakpoints.xmd}) {
      padding: 1.25rem;
    }
  `}
`

export const LastActivityItem = styled.div`
  ${({ theme: { breakpoints } }) => `
     display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;

    @media (max-width: ${breakpoints.mini}) {
      width: 100%;
    }

    @media (min-width: ${breakpoints.mini}) {
      width: 70%;
    }
      
    @media (min-width: ${breakpoints.xsm}) {
      width: 50%;
    }

    @media (min-width: ${breakpoints.sm}) {
      width: 40%;
    }
  `}
`

export const LastActivityText = styled.strong`
  ${({ theme: { colors } }) => `
    color: ${colors.lightPurple};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  `}
`

export const LastActivityData = styled.span`
  ${({ theme: { colors } }) => `
    color: ${colors.textWhite};
    cursor: pointer;
    font-weight: 300;

    &:hover {
      text-decoration: underline;
    }
  `}
`

export const LastActivityTime = styled.span`
  font-weight: 300;
`

export const LastActivityImage = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`

export const GenrePlayArea = styled.div`
  ${({ theme: { breakpoints } }) => `
      display: flex;
      width: 70%;
      flex-direction: column;
      gap: 0.5rem;

      @media (max-width: ${breakpoints.xmd}) {
        width: 100%;
      }
  `}
`

export const GenreOverviewArea = styled.div`
  ${({ theme: { breakpoints } }) => `
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 1.25rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      border: solid 1px;
      border-color: rgba(224, 192, 255, 0.5);
      box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);

      @media (max-width: ${breakpoints.sm}) {
        flex-wrap: wrap;
        gap: 1rem;
      }
  `}
`

export const GenreDivisor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: center;
  justify-content: center;
`

export const GenreBox = styled.div`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
    color: ${colors.textWhite};
    font-size: ${fontSizes.normalFontSize};
    border-radius: 5px;
    background-color: ${colors.darkPurple};
    padding: 0.3rem 1rem;
    font-weight: 400;

    @media (max-width: ${breakpoints.lg}) {
      font-size: ${fontSizes.smallFontSize};
    }
  `}
`

export const GenreEntries = styled.span`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
    color: ${colors.lightPurple};
    font-size: ${fontSizes.normalFontSize};
    font-weight: 400;

    @media (max-width: ${breakpoints.lg}) {
      font-size: ${fontSizes.smallFontSize};
    }
  `}
`

export const PlaylistArea = styled.div`
  ${({ theme: { breakpoints } }) => `
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    margin-top: 0.5rem;

    @media (max-width: ${breakpoints.sm}) {
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }
  `}
`

export const PlaylistBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const Playlist = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`

export const FavoritesArea = styled.div`
  ${({ theme: { breakpoints } }) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media (max-width: ${breakpoints.md}) {
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }

    @media (min-width: 769px) and (max-width: ${breakpoints.xl}) {
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: start;
    }
  `}
`

export const FavoritesBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`

export const Favorite = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`

export const TopGrid = styled.div`
  ${({ theme: { breakpoints } }) => `
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0;
    width: 100%;

    @media (max-width: ${breakpoints.xmd}) {
      grid-template-columns: repeat(5, 1fr);
    }

    @media (max-width: ${breakpoints.sm}) {
      grid-template-columns: repeat(2, 1fr);
    }
  `}
`

export const TopItem = styled.div`
  cursor: pointer;
  position: relative;
`

export const TopImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.5);
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`

export const TopDescription = styled.div`
  ${({ theme: { fontSizes, breakpoints } }) => `
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size; ${fontSizes.normalFontSize};

    @media (max-width: ${breakpoints.sm}) {
      font-size: ${fontSizes.smallFontSize};
    }

    @media (min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.xmd}) {
      font-size: ${fontSizes.smallestFontSize};
    }
  `}
`

import styled from 'styled-components'

export const DetailContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`

export const DetailContent = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
`

export const MediaDetailStats = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
`

export const MediaDetailPopularityArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const MediaPopularityBox = styled.div`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
    color: ${colors.textWhite};
    font-size: ${fontSizes.normalFontSize};
    border-radius: 5px;
    background-color: ${colors.darkPurple};
    padding: 10px 15px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      vertical-align: middle;
      font-weight: 600;
    }

    @media (max-width: ${breakpoints.lg}) {
      font-size: ${fontSizes.smallFontSize};
    }
  `}
`

export const MediaInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
  }
`

export const MediaDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: center;
    text-align: center;
  }
`

export const MediaImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 10px;
`

export const MediaArtistName = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bigFontSize};
  color: rgba(234, 234, 240, 0.8);
  margin-bottom: -1rem;
`

export const MediaTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.largestFontSize};
`

export const MediaInfo = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.normalFontSize};
`

export const MediaItems = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`

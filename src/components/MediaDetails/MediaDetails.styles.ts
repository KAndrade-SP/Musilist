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

export const MediaDetailsInfo = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`

export const MediaDetailPopularityArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const MediaDetailStats = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
`

export const MediaDetailReviewArea = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const ReviewAddButton = styled.button`
  ${({ theme: { colors, fontSizes } }) => `
    flex-shrink: 0;
    width: 150px;
    padding: 10px 15px;
    border-radius: 5px;
    text-align: center;
    background-color: ${colors.darkPurple};
    color: ${colors.textWhite};
    font-size: ${fontSizes.normalFontSize};
    border: none;
    outline: none;
    font-family: inherit;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover:not(:disabled) {
      background-color: ${colors.darkPurpleOp};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}
`

export const ReviewInput = styled.input`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
    flex: 1;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: ${colors.darkPurple};
    color: ${colors.textWhite};
    font-size: ${fontSizes.normalFontSize};
    border: none;
    outline: none;
    font-family: inherit;

    &::placeholder {
      color: ${colors.textWhite};
    }

    @media (max-width: ${breakpoints.md}) {
      width: 100%;
    }
  `}
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
    flex-direction: column;
    gap: 1rem;

    strong {
      vertical-align: middle;
      font-weight: 700;
      color: ${colors.lightPurple};
    }

    @media (max-width: ${breakpoints.md}) {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 3rem;
      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: thin;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 8px;
      font-size: ${fontSizes.smallFontSize};

      &::-webkit-scrollbar {
        height: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: ${colors.lightPurple};
        border-radius: 4px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }

      > * {
        flex: 0 0 auto;
      }
    }
  `}
`

export const MediaPopularityItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textWhite};
`

export const MediaPopularityItemLink = styled.a`
  color: ${({ theme }) => theme.colors.textWhite};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.2rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column-reverse;
  }
`

import styled from 'styled-components'

export const DetailContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`

export const DetailContainerBackground = styled.div`
  background-color: ${({ theme }) => theme.colors.grayBackgroundOp};
`

export const DetailContent = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
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

export const MediaTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.biggestFontSize};
`

export const MediaInfo = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.normalFontSize};
`

export const MediaButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  align-self: flex-start;
  margin-left: auto;
  padding-top: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-self: center;
    margin-left: 0;
    padding-top: 0;
  }
`

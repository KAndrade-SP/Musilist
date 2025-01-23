import { styled } from 'styled-components'

export const SearchContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`

export const SearchSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
`

export const SearchTag = styled.div`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
    color: ${colors.textWhite};
    font-size: ${fontSizes.normalFontSize};
    text-align: center;
    display: flex;
    align-items: center;
    justify-content:center;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    cursor: pointer;

    &:hover {
      background-color: ${colors.darkPurpleOp};
    }

    @media (max-width: ${breakpoints.md}) {
        display: none;
    }
  `}

  background-color: ${({ className, theme }) => (className ? theme.colors.darkPurpleOp : theme.colors.darkPurple)};
`

export const SearchDropdownIcon = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`

export const SearchDropdown = styled.div`
  ${({ theme: { colors, breakpoints } }) => `
    width: 100%;
    background-color: ${colors.darkBackground};
    display: none;
    flex-direction: column;
    gap: 1rem;

    @media (max-width: ${breakpoints.md}) {
      display: flex;
    }
  `}
`

export const SearchDropdownItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ className, theme }) => (className ? theme.colors.darkPurple : theme.colors.darkBackground)};
  padding: 0.5rem 2rem;
  color: ${({ className, theme }) => (className ? theme.colors.lightPurple : theme.colors.textWhite)};
  font-size: ${({ theme }) => theme.fontSizes.normalFontSize};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.smallFontSize};
  }
`

export const SearchContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  gap: 2rem;
  padding: 2rem;
`

export const TracksBox = styled.div`
  ${({ theme: { colors, breakpoints, fontSizes } }) => `
    display: grid;
    grid-template-columns: 50px 1fr 1fr 100px;
    border-radius: 8px;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    background-color: ${colors.darkPurple};
    font-size: ${fontSizes.normalFontSize};

    @media (max-width: ${breakpoints.md}) {
      font-size: ${fontSizes.smallFontSize};
    }

    @media (max-width: ${breakpoints.md}) {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
    }
  `}
`

export const TracksHeader = styled.div`
  ${({ theme: { colors, breakpoints } }) => `
    display: contents;
    color: ${colors.textWhite};
    font-weight: bold;

    @media (max-width: ${breakpoints.md}) {
      display: none;
    }
  `}
`

export const TrackCell = styled.span`
  ${({ theme: { breakpoints } }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media (max-width: ${breakpoints.md}) {
      display: none;
    }
  `}
`

export const TrackIdCell = styled.div`
  ${({ theme: { breakpoints } }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media (max-width: ${breakpoints.md}) {
      display: none;
    }
  `}
`

export const TrackIdCellMobile = styled.div`
  ${({ theme: { breakpoints } }) => `
    display: none;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media (max-width: ${breakpoints.md}) {
      display: flex;
      width: 5px;
    }
  `}
`

export const TrackEntry = styled.div`
  ${({ theme: { colors, breakpoints } }) => `
    display: contents;
    color: ${colors.textWhite};
    padding: 0.5rem 0;
    
    &:last-child {
      border-bottom: none;
    }

    @media (max-width: ${breakpoints.md}) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-radius: 5px;
      padding: 1rem 0;
    }
  `}
`

export const TrackImageCell = styled.div`
  ${({ theme: { breakpoints } }) => `
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
    }

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @media (max-width: ${breakpoints.md}) {
      img {
        width: 40px;
        height: 40px;
      }

      span {
        width: 150px;
      }
    }

    @media (max-width: ${breakpoints.mini}) {
      img {
        width: 30px;
        height: 30px;
      }

      span {
        width: 100px;
      }
    }
  `}
`

export const TrackTitleDivisor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }
`

export const TrackArtist = styled.span`
  ${({ theme: { fontSizes } }) => `
    display: block;
    font-size: ${fontSizes.smallFontSize};
    color: rgba(234, 234, 240, 0.7);
  `}
`

export const TrackDataDivisor = styled.div`
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.xsm}) {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xsm}) and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    width: 100px;
  }
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
`

export const AlbumCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
`

export const AlbumImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
`

export const AlbumInfo = styled.div`
  padding: 10px 0;

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.normalFontSize};
    color: ${({ theme }) => theme.colors.textWhite};
    margin: 0;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.normalFontSize};
    color: ${({ theme }) => theme.colors.textWhite};
    margin: 5px 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const ArtistCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
`

export const ArtistImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
`

export const ArtistInfo = styled.div`
  padding: 10px 0;

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.normalFontSize};
    color: ${({ theme }) => theme.colors.textWhite};
    margin: 0;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.normalFontSize};
    color: ${({ theme }) => theme.colors.textWhite};
    margin: 5px 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

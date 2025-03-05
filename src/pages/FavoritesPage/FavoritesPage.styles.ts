import { styled } from 'styled-components'

export const SectionFavs = styled.div`
  margin-bottom: 2rem;
`

export const TitleFavs = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.normalFontSize};
  margin-bottom: 1rem;
`

export const GridFavs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.darkPurple};
  padding: 1rem;
  border-radius: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: center;
  }
`

export const ItemFav = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`

export const ImageFavs = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

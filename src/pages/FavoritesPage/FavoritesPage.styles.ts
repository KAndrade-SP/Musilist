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
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;

  &:hover span {
    visibility: visible;
    opacity: 1;
    transform: translateX(-50%) translateY(-10px);
  }
`

export const Tooltip = styled.span`
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.grayBackground};
  color: ${({ theme }) => theme.colors.textWhite};
  padding: 6px 10px;
  border-radius: 6px;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSizes.smallFontSize};
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
`

export const ImageFavs = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
`

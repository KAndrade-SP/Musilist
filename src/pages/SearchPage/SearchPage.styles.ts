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

export const FilterTag = styled.div`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
    color: ${colors.textWhite};
    font-size: ${fontSizes.normalFontSize};
    background-color: ${colors.darkPurple};
    text-align: center;
    display: flex;
    align-items: center;
    justify-content:center;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    cursor: pointer;

    &:hover {
      background-color: rgba(80, 54, 107, 0.5)
    }

    @media (max-width: ${breakpoints.md}) {
        display: none;
    }
  `}
`

export const FilterDropdownIcon = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`

export const FiltersDropdown = styled.div`
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

export const FiltersDropdownItem = styled.div`
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

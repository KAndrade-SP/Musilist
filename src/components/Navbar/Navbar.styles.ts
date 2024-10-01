import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const NavbarContainer = styled.nav`
  ${({ theme: { colors } }) => `
    background-color: ${colors.grayBackground};
    color: ${colors.textWhite};
    width: 100vw;
    padding: 0.7rem 2rem;
    position: relative;
  `}
`

export const NavbarContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: space-between;
  }
`

export const NavbarDropdown = styled.div`
  ${({ theme: { colors, breakpoints } }) => `
    background-color: ${colors.grayBackground};
    width: 20vh;
    border-radius: 15px;
    padding: 1rem;

    display: none;
    position: absolute;
    top: 7rem;
    right: 2rem;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    justify-items: center;
    overflow-y: auto;
    z-index: 100;

    @media (max-width: ${breakpoints.md}) {
      display: grid;
    }
  `}
`

export const DropdownItem = styled(Link)`
  ${({ theme: { colors } }) => `
    color: ${colors.textWhite};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    &:hover {
      svg {
        color: ${colors.lightPurple}
      }

      span {
        color: ${colors.lightPurple}
      }
    }
  `}
`

export const DropdownIcon = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`

export const DropdownLabel = styled.span`
  ${({ theme: { fontSizes } }) => `
    font-size: ${fontSizes.smallestFontSize};
  `}
`

export const Logo = styled.img`
  width: 60px;
  height: auto;
  max-width: none;
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.1);
  }
`

export const LogoLink = styled(Link)`
  display: inline-block;
  cursor: pointer;
`

export const Menu = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

export const MenuItem = styled.li`
  ${({ theme: { fontSizes, colors } }) => `
    font-size: ${fontSizes.normalFontSize};
    color: ${colors.textWhite};
    cursor: pointer;

    & :hover {
      color: ${colors.lightPurple}
    }
  `}
`

export const NavLink = styled(Link)`
  ${({ theme: { colors } }) => `
    color: ${colors.textWhite};
  `}
`

export const LoginButton = styled.button`
  ${({ theme: { colors, fontSizes } }) => `
    color: ${colors.textWhite};
    background: transparent;
    padding: 10px 20px;
    border: 2px solid transparent;
    border-radius: 5px;
    font-size: ${fontSizes.smallFontSize};
    cursor: pointer;
    background-image: linear-gradient(135deg, #7020C0, #5A0EA0);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    transition: transform 0.2s ease, background 0.2s ease;

    &:hover {
      transform: scale(1.05); 
      background-image: linear-gradient(135deg, #5A0EA0, #7020C0);
    }
  `}
`;

export const Options = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

export const UserWrapper = styled.div`
  position: relative; 
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const UserIcon = styled.img`
  width: 36px;
  border-radius: 100%;

  &:hover {
    opacity: 0.8;
  }
`

export const OptionsDropdown = styled.div`
  ${({ theme: { colors } }) => `
    background-color: ${colors.grayBackground};
    width: 20vh;
    border-radius: 15px;
    padding: 1rem;

    position: absolute;
    top: 100%;
    right: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    overflow-y: auto;
    z-index: 100;
  `}
`
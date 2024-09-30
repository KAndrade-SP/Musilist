import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { navLinks } from '../../types/NavLinks'
import { Link } from 'react-router-dom'

import MusilistLogo from '../../assets/MusilistLogo.png'
import { IconMusicSearch } from '@tabler/icons-react'

const NavbarContainer = styled.nav`
  ${({ theme: { colors } }) => `
    background-color: ${colors.grayBackground};
    color: ${colors.textWhite};
    width: 100vw;
    padding: 1rem 2rem;
    position: relative;
  `}
`

const NavbarContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Logo = styled.img`
  width: 60px;
  height: auto;
  max-width: none;
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.1);
  }
`

const LogoLink = styled(Link)`
  display: inline-block;
  cursor: pointer;
`

const Menu = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
`

const MenuItem = styled.li`
  ${({ theme: { fontSizes, colors } }) => `
    font-size: ${fontSizes.normalFontSize};
    color: ${colors.textWhite};
    cursor: pointer;

    & :hover {
      color: ${colors.lightPurple}
    }
  `}
`

const NavLink = styled(Link)`
  color: white;
  cursor: pointer;
`

const Options = styled.div`

`

const Navbar: React.FC = () => {

  const [isHovered, setIsHovered] = useState(false)
  const theme = useTheme()

  return (
    <>
      <NavbarContainer>
        <NavbarContent>

          <LogoLink to={'/'}>
            <Logo src={MusilistLogo} alt="Musilist Logo"></Logo>
          </LogoLink>

          <Menu>
            {navLinks.map((link, index) => {
              return (
                <MenuItem key={index}>
                  <NavLink to={link.path}>
                    {link.label}
                  </NavLink>
                </MenuItem>
              )
            })}
          </Menu>

          <Options>
            <IconMusicSearch 
              size={32}
              style={{ 
                color: isHovered ? theme.colors.lightPurple : theme.colors.textWhite, 
                cursor: 'pointer' 
              }} 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </Options>

        </NavbarContent>
      </NavbarContainer>
    </>
  )
}

export default Navbar
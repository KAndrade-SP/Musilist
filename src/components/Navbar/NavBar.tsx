import { useState } from 'react'
import styled from 'styled-components'
import { navLinks } from '../../types/NavLinks'
import { Link } from 'react-router-dom'

import { IconMusicSearch } from '@tabler/icons-react'

const NavbarContainer = styled.nav`
  ${({ theme: { colors } }) => `
    background-color: ${colors.darkPurpleBackground};
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
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.div`
  color: white;
  font-size: 1.5rem;
`

const Menu = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
`

const MenuItem = styled.li`
  color: white;
  cursor: pointer;
`

const NavLink = styled(Link)`
  color: white;
  cursor: pointer;
`

const Options = styled.div`

`

const Navbar: React.FC = () => {

  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <NavbarContainer>
        <NavbarContent>

          <Logo>Logo</Logo>

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
              style={{ 
                color: isHovered ? 'lightgray' : 'white', 
                fontSize: '32px', 
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
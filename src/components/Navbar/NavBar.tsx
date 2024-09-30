import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { loginWithGoogle, logout } from '../../redux/reducers/authSlice'
import MusilistLogo from '../../assets/MusilistLogo.png'
import { navLinks } from '../../types/NavLinks'

import styled, { useTheme } from 'styled-components'
import { IconDeviceDesktopAnalytics, IconHome, IconMenuDeep, IconMusicSearch, IconMusicStar, IconPlaylist, IconSettings, IconUserCircle, IconX } from '@tabler/icons-react'

const NavbarContainer = styled.nav`
  ${({ theme: { colors } }) => `
    background-color: ${colors.grayBackground};
    color: ${colors.textWhite};
    width: 100vw;
    padding: 0.7rem 2rem;
    position: relative;
  `}
`

const NavbarContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: space-between;
  }
`

const NavbarDropdown = styled.div`
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

const DropdownItem = styled(Link)`
  ${({ theme: { colors } }) => `
    color: ${colors.textWhite};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  `}
`

const DropdownIcon = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`

const DropdownLabel = styled.span`
  ${({ theme: { fontSizes } }) => `
    font-size: ${fontSizes.smallestFontSize};
  `}
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

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
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
  ${({ theme: { colors } }) => `
    color: ${colors.textWhite};
  `}
`

const Options = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const UserWrapper = styled.div`
  position: relative; 
  cursor: pointer;
`

const OptionsDropdown = styled.div`
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
    gap: 20px;
    justify-items: center;
    overflow-y: auto;
    z-index: 100;
  `}
`

const Navbar: React.FC = () => {

  const [isSearchHovered, setIsSearchHovered] = useState(false)
  const [isUserHovered, setIsUserHovered] = useState(false)
  const theme = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const [toggle, setToggle] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const { user, loading, error } = useSelector((state: RootState) => state.auth)

  const handleLogin = () => {
    dispatch(loginWithGoogle())
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleMouseEnter = () => {
    setIsUserHovered(true)
  }

  const handleMouseLeave = () => {
    setIsUserHovered(false)
  }

  const outsideClick = (e: MouseEvent) => {
    const element = ref.current

    if (toggle && element && !element.contains(e.target as Node)) {
      setToggle(false)
    }
  }

  const handleClick = () => {
    setToggle(!toggle)
  }

  useEffect(() => {
    if (toggle) {
      document.addEventListener('mousedown', outsideClick)
    } else {
      document.removeEventListener('mousedown', outsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', outsideClick)
    }
  }, [toggle])

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
                color: isSearchHovered ? theme.colors.lightPurple : theme.colors.textWhite,
                cursor: 'pointer'
              }}
              onMouseEnter={() => setIsSearchHovered(true)}
              onMouseLeave={() => setIsSearchHovered(false)}
            />

            <UserWrapper
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <IconUserCircle
                size={32}
                style={{
                  color: isUserHovered ? theme.colors.lightPurple : theme.colors.textWhite,
                  cursor: 'pointer'
                }}
              />

              {isUserHovered &&
                <OptionsDropdown>
                  teste
                </OptionsDropdown>
              }
            </UserWrapper>
          </Options>

          <DropdownIcon onClick={handleClick}>
            {!toggle
              ?
              <IconMenuDeep
                size={32}
                style={{
                  color: theme.colors.textWhite,
                  cursor: 'pointer'
                }}
              />
              :
              <IconX
                size={32}
                style={{
                  color: theme.colors.textWhite,
                  cursor: 'pointer'
                }}
              />
            }
          </DropdownIcon>

        </NavbarContent>
      </NavbarContainer>

      {toggle &&
        <NavbarDropdown ref={ref} onClick={handleClick}>

          <DropdownItem to={'/'}>
            <IconHome />
            <DropdownLabel>
              Home
            </DropdownLabel>
          </DropdownItem>

          <DropdownItem to={'/songlist'}>
            <IconPlaylist />
            <DropdownLabel>
              Song List
            </DropdownLabel>
          </DropdownItem>

          <DropdownItem to={'/'}>
            <IconDeviceDesktopAnalytics />
            <DropdownLabel>
              Stats
            </DropdownLabel>
          </DropdownItem>

          <DropdownItem to={'/favorites'}>
            <IconMusicStar />
            <DropdownLabel>
              Favorites
            </DropdownLabel>
          </DropdownItem>

          <DropdownItem to={'/'}>
            <IconSettings />
            <DropdownLabel>
              Settings
            </DropdownLabel>
          </DropdownItem>

          <DropdownItem to={'/'}>
            <IconMusicSearch />
            <DropdownLabel>
              Search
            </DropdownLabel>
          </DropdownItem>

        </NavbarDropdown>
      }
    </>
  )
}

export default Navbar
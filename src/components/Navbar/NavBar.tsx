import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { logout } from '../../redux/reducers/authSlice'
import MusilistLogo from '../../assets/MusilistLogo.png'
import { navLinks } from '../../types/NavLinks'

import { useTheme } from 'styled-components'
import {
  IconDeviceDesktopAnalytics,
  IconHome,
  IconLogout,
  IconMenuDeep,
  IconMusicSearch,
  IconMusicStar,
  IconPlaylist,
  IconSettings,
  IconUserCircle,
  IconX
} from '@tabler/icons-react'

import {
  NavbarContainer,
  NavbarContent,
  NavbarDropdown,
  DropdownItem,
  DropdownIcon,
  DropdownLabel,
  Logo,
  LogoLink,
  Menu,
  MenuItem,
  NavLink,
  LoginButton,
  Options,
  UserWrapper,
  UserIcon,
  OptionsDropdown
} from './Navbar.styles'

const Navbar: React.FC = () => {

  const [isSearchHovered, setIsSearchHovered] = useState(false)
  const [isUserHovered, setIsUserHovered] = useState(false)
  const theme = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const [toggle, setToggle] = useState(false)

  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const { user, loading, error } = useSelector((state: RootState) => state.auth)

  const goToLogin = () => {
    navigate('/login')
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
      <NavbarContainer role='banner'>
        <NavbarContent role='navigation'>

          <LogoLink to={'/'} aria-label="logo link">
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
              aria-label="search"
              size={32}
              style={{
                color: isSearchHovered ? theme.colors.lightPurple : theme.colors.textWhite,
                cursor: 'pointer'
              }}
              onMouseEnter={() => setIsSearchHovered(true)}
              onMouseLeave={() => setIsSearchHovered(false)}
            />

            {user
              ?
              <UserWrapper
                aria-label="user options"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {user?.photoURL
                  ?
                  <UserIcon src={user.photoURL || ''} alt={user.displayName + "photo" || 'User photo'} />
                  :
                  <IconUserCircle
                    aria-label="user icon"
                    size={32}
                    style={{
                      color: isUserHovered ? theme.colors.lightPurple : theme.colors.textWhite,
                      cursor: 'pointer'
                    }}
                  />
                }

                {isUserHovered &&
                  <OptionsDropdown>
                    <DropdownItem to={'/'}>
                      <IconSettings />
                      <DropdownLabel>
                        Settings
                      </DropdownLabel>
                    </DropdownItem>

                    <DropdownItem to={'/'} onClick={handleLogout}>
                      <IconLogout />
                      <DropdownLabel>
                        Logout
                      </DropdownLabel>
                    </DropdownItem>
                  </OptionsDropdown>
                }
              </UserWrapper>
              :
              <LoginButton onClick={goToLogin}>Sign in</LoginButton>
            }

          </Options>

          <DropdownIcon role="button" aria-label="toggle menu icons" onClick={handleClick}>
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
        <NavbarDropdown ref={ref} role="menu" aria-label="dropdown menu" onClick={handleClick}>

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
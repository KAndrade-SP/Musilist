import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { User } from '../../types/UserTypes'
import { logout } from '../../redux/reducers/authSlice'
import { navLinks } from '../../types/NavLinks'
import MusilistLogo from '../../assets/MusilistLogo.png'
import UserPhotoIcon from '../../assets/UserPhotoIcon.png'

import { useTheme } from 'styled-components'
import {
  IconDeviceDesktopAnalytics,
  IconHome,
  IconLogin,
  IconLogout,
  IconMailFilled,
  IconMenuDeep,
  IconMusicSearch,
  IconMusicStar,
  IconPlaylist,
  IconSettings,
  IconX,
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
  UserPhoto,
  OptionsDropdown,
  DropdownLogoutWrapper,
} from './Navbar.styles'
import { useToggleWithOutsideClick } from '../../hooks/useToggle'

const Navbar = ({ user }: { user: User | null }) => {
  const [isSearchHovered, setIsSearchHovered] = useState(false)
  const [isUserHovered, setIsUserHovered] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState(UserPhotoIcon)
  const { toggle, ref, handleClick } = useToggleWithOutsideClick()
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (user?.photoURL) {
      timeout = setTimeout(() => {
        setCurrentPhoto(user.photoURL || UserPhotoIcon)
      }, 500)
    }

    return () => clearTimeout(timeout)
  }, [user?.photoURL])

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

  const goToBrowsePage = () => {
    navigate('/browse')
  }

  return (
    <>
      <NavbarContainer role="banner">
        <NavbarContent role="navigation">
          <LogoLink to={'/'} aria-label="logo link">
            <Logo src={MusilistLogo} alt="Musilist Logo"></Logo>
          </LogoLink>

          {user ? (
            <>
              <Menu>
                {navLinks.map((link, index) => {
                  return (
                    <MenuItem key={index}>
                      <NavLink to={link.path}>{link.label}</NavLink>
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
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setIsSearchHovered(true)}
                  onMouseLeave={() => setIsSearchHovered(false)}
                  onClick={goToBrowsePage}
                />

                <UserWrapper aria-label="user options" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <UserPhoto src={currentPhoto} alt={user.displayName + ' photo'} />

                  <OptionsDropdown className={isUserHovered ? 'visible' : ''}>
                    <DropdownItem to={'/settings'}>
                      <IconSettings />
                      <DropdownLabel>Settings</DropdownLabel>
                    </DropdownItem>

                    <DropdownItem to={'/notifications'}>
                      <IconMailFilled />
                      <DropdownLabel>Notifications</DropdownLabel>
                    </DropdownItem>

                    <DropdownLogoutWrapper role="button" aria-label="toggle logout" onClick={handleLogout}>
                      <IconLogout />
                      <DropdownLabel>Logout</DropdownLabel>
                    </DropdownLogoutWrapper>
                  </OptionsDropdown>
                </UserWrapper>
              </Options>
            </>
          ) : (
            <Options>
              <IconMusicSearch
                aria-label="search"
                size={32}
                style={{
                  color: isSearchHovered ? theme.colors.lightPurple : theme.colors.textWhite,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setIsSearchHovered(true)}
                onMouseLeave={() => setIsSearchHovered(false)}
                onClick={goToBrowsePage}
              />
              <LoginButton onClick={goToLogin}>Sign in</LoginButton>
            </Options>
          )}

          <DropdownIcon role="button" aria-label="toggle menu icons" onClick={handleClick}>
            {!toggle ? (
              <IconMenuDeep
                size={32}
                style={{
                  color: theme.colors.textWhite,
                  cursor: 'pointer',
                }}
              />
            ) : (
              <IconX
                size={32}
                style={{
                  color: theme.colors.textWhite,
                  cursor: 'pointer',
                }}
              />
            )}
          </DropdownIcon>
        </NavbarContent>
      </NavbarContainer>

      {toggle && (
        <NavbarDropdown ref={ref} role="menu" aria-label="dropdown menu" onClick={handleClick}>
          <DropdownItem to={'/'}>
            <IconHome />
            <DropdownLabel>Home</DropdownLabel>
          </DropdownItem>

          <DropdownItem to={'/browse'}>
            <IconMusicSearch />
            <DropdownLabel>Search</DropdownLabel>
          </DropdownItem>

          {user ? (
            <>
              <DropdownItem to={'/songlist'}>
                <IconPlaylist />
                <DropdownLabel>Song List</DropdownLabel>
              </DropdownItem>

              <DropdownItem to={'/stats'}>
                <IconDeviceDesktopAnalytics />
                <DropdownLabel>Stats</DropdownLabel>
              </DropdownItem>

              <DropdownItem to={'/favorites'}>
                <IconMusicStar />
                <DropdownLabel>Favorites</DropdownLabel>
              </DropdownItem>

              <DropdownItem to={'/settings'}>
                <IconSettings />
                <DropdownLabel>Settings</DropdownLabel>
              </DropdownItem>

              <DropdownItem to={'/notifications'}>
                <IconMailFilled />
                <DropdownLabel>Notifications</DropdownLabel>
              </DropdownItem>

              <DropdownLogoutWrapper role="button" aria-label="toggle logout" onClick={handleLogout}>
                <IconLogout />
                <DropdownLabel>Logout</DropdownLabel>
              </DropdownLogoutWrapper>
            </>
          ) : (
            <DropdownItem to={'/login'} onClick={goToLogin}>
              <IconLogin />
              <DropdownLabel>Sign in</DropdownLabel>
            </DropdownItem>
          )}
        </NavbarDropdown>
      )}
    </>
  )
}

export default Navbar

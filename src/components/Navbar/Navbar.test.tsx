import { fireEvent, render, screen } from '@testing-library/react'
import Navbar from './NavBar'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import authReducer from '../../redux/reducers/authSlice'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../theme/theme'
import { navLinks } from '../../types/NavLinks'
import { configureStore } from '@reduxjs/toolkit'
import store from '../../redux/store'

jest.mock('firebase/app')
jest.mock('firebase/auth')

const mockDispatch = jest.fn()

const renderNavbar = (preloadedState = {}) => {

  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  })

  store.dispatch = mockDispatch

  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

describe('Navbar on larger screens', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should correctly render navbar components', () => {

    renderNavbar()

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()

    const logoLink = screen.getByRole('link', { name: /logo/i })
    expect(logoLink).toBeInTheDocument()
    const logo = screen.getByAltText(/musilist logo/i)
    expect(logo).toBeInTheDocument()

    const menu = screen.getByRole('list')
    expect(menu).toBeInTheDocument()
    const menuItems = screen.getAllByRole('listitem')
    expect(menuItems).toHaveLength(navLinks.length)

    navLinks.forEach(link => {
      const navLink = screen.getByRole('link', { name: link.label })
      expect(navLink).toBeInTheDocument()
      expect(navLink).toHaveAttribute('href', link.path)
    })

    const searchIcon = screen.getByLabelText(/search/i)
    expect(searchIcon).toBeInTheDocument()
  })

  it('should display user options on hover when user is logged in', () => {
    const preloadedState = {
      auth: {
        user: {
          displayName: 'John Doe',
          photoURL: 'https://example.com/photo.jpg',
        },
      },
    }

    renderNavbar(preloadedState)

    const userWrapper = screen.getByLabelText(/user options/i)
    fireEvent.mouseEnter(userWrapper)

    const settingsOption = screen.getByText(/settings/i)
    const logoutOption = screen.getByText(/logout/i)
    expect(settingsOption).toBeInTheDocument()
    expect(logoutOption).toBeInTheDocument()
  })

  it('should dispatch logout action when user clicks on "Logout"', async () => {

    const preloadedState = {
      auth: {
        user: {
          displayName: 'John Doe',
          photoURL: 'https://example.com/photo.jpg',
        },
      },
    }

    renderNavbar(preloadedState)

    const userWrapper = screen.getByLabelText(/user options/i)
    fireEvent.mouseEnter(userWrapper)

    const logoutOption = screen.getByText(/logout/i)
    expect(logoutOption).toBeInTheDocument()

    fireEvent.click(logoutOption)

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(mockDispatch).toHaveBeenCalled()

    const state = store.getState().auth
    expect(state).not.toBeUndefined()

    expect(state).toEqual({
      user: null,  
      loading: false,
      error: null,   
      initializing: true
    })
  })

  it('should display the sign-in button when user is not logged in', () => {
    renderNavbar()

    const signInButton = screen.getByText(/sign in/i)
    expect(signInButton).toBeInTheDocument()
  })

  it('should go to homepage when user clicks on logo', () => {
    renderNavbar()

    const logoLink = screen.getByRole('link', { name: /logo link/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })
})

describe('Navbar on small screens', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(max-width: 768px)',
      media: query,
      onchange: null,
    }))
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should toggle the dropdown menu when clicked on small screens', () => {
    const { queryByRole } = renderNavbar()

    expect(queryByRole('menu')).not.toBeInTheDocument()

    const dropdownIcon = screen.getByLabelText(/toggle menu icons/i)
    fireEvent.click(dropdownIcon)

    const menu = screen.getByLabelText(/dropdown menu/i)
    expect(menu).toBeInTheDocument()

    fireEvent.click(dropdownIcon)
    expect(menu).not.toBeInTheDocument()
  })
})

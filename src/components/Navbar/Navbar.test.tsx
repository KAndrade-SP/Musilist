import { fireEvent, render, screen } from '@testing-library/react'
import Navbar from './NavBar'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../redux/store'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../theme/theme'

jest.mock('firebase/app')
jest.mock('firebase/auth')

const renderNavbar = () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

describe('Navbar', () => {
  it('should render correctly when user is logged in', () => {
    renderNavbar()
  })
})

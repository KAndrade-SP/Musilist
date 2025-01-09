import App from './App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme/theme'
import { Provider } from 'react-redux'
import { Bounce, ToastContainer } from 'react-toastify'
import { StyledToastContainer } from './GlobalStyle'
import store from './redux/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <StyledToastContainer>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              transition={Bounce}
              pauseOnHover={false}
              closeOnClick={true}
            />
          </StyledToastContainer>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
)

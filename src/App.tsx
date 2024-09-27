import Navbar from "./components/Navbar/NavBar"
import { Container } from "./components/Container"
import { ThemeProvider } from "styled-components"
import { theme } from "./theme/theme"
import { GlobalStyle } from "./GlobalStyle"

function App() {

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Navbar />
        <Container>
          
        </Container>
      </>
    </ThemeProvider>
  )
}

export default App

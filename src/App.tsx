import Navbar from "./components/Navbar/NavBar"
import { Container } from "./components/Container"
import { GlobalStyle } from "./GlobalStyle"
import { Route, Routes } from "react-router-dom"

import Home from "./pages/Home/Home"
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage"
import MusicList from "./pages/MusicList/MusicList"

function App() {

  return (
    <>
      <GlobalStyle />
      <Navbar />

      <Container>

        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/musiclist"
            element={<MusicList />}
          />
          <Route
            path="/favorites"
            element={<FavoritesPage />}
          />
        </Routes>

      </Container>
    </>
  )
}

export default App

import Navbar from "./components/Navbar/NavBar"
import { Container } from "./components/Container"
import { GlobalStyle } from "./GlobalStyle"
import { Route, Routes } from "react-router-dom"

import Home from "./pages/Home/Home"
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage"
import SongList from "./pages/SongList/SongList"

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
            path="/songlist"
            element={<SongList />}
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

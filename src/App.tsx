import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { auth } from "./services/firebase"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./redux/store"
import { setUser } from "./redux/reducers/authSlice"
import { GlobalStyle } from "./GlobalStyle"

import Navbar from "./components/Navbar/NavBar"
import { Container } from "./components/Container"
import Home from "./pages/Home/Home"
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage"
import SongList from "./pages/SongList/SongList"
import Login from "./pages/Login/Login"
import PublicRoute from "./components/PublicRoute"
import Stats from "./pages/Stats/Stats"
import SettingsPage from "./pages/SettingsPage/SettingsPage"
import PrivateRoute from "./components/PrivateRoute"
import SearchPage from "./pages/SearchPage/SearchPage"
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage"

function App() {

  const dispatch = useDispatch<AppDispatch>()
  const initializing = useSelector((state: RootState) => state.auth.initializing)

  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        )
      } else {
        dispatch(setUser(null))
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  if (initializing) {
    return <div>Loading...</div>
  }

  return (
    <>
      <GlobalStyle />

      {isLoginPage
        ?
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
        :
        <>
          <Navbar />
          <Container>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/browse"
                element={<SearchPage />}
              />
              <Route
                path="/songlist"
                element={
                  <PrivateRoute>
                    <SongList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <PrivateRoute>
                    <FavoritesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/stats"
                element={
                  <PrivateRoute>
                    <Stats />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <SettingsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <PrivateRoute>
                    <NotificationsPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Container>
        </>
      }
    </>
  )
}

export default App

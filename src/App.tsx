import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { auth, db } from './services/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './redux/store'
import { setUser } from './redux/reducers/authSlice'
import { GlobalStyle } from './GlobalStyle'

import Navbar from './components/Navbar/NavBar'
import Home from './pages/Home/Home'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import SongList from './pages/SongList/SongList'
import Login from './pages/Login/Login'
import PublicRoute from './components/PublicRoute'
import Stats from './pages/Stats/Stats'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import PrivateRoute from './components/PrivateRoute'
import SearchPage from './pages/SearchPage/SearchPage'
import NotificationsPage from './pages/NotificationsPage/NotificationsPage'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const initializing = useSelector((state: RootState) => state.auth.initializing)
  const profileLoading = useSelector((state: RootState) => state.user.loading)
  const { user } = useSelector((state: RootState) => state.auth)

  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid)
          const userSnap = await getDoc(userRef)

          if (userSnap.exists()) {
            dispatch(
              setUser({
                uid: user.uid,
                displayName: userSnap.data().displayName || null,
                email: userSnap.data().email || null,
                photoURL: 'https://imgur.com/P7uOmJX.jpg',
                coverPhotoURL: null,
              })
            )
          } else {
            const newUser = {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: 'https://imgur.com/P7uOmJX.jpg',
              coverPhotoURL: null,
              createdAt: new Date().toISOString(),
            }
            await setDoc(userRef, newUser)
            dispatch(setUser(newUser))
          }
        } catch (error) {
          console.error('Error fetching or creating user profile:', error)
        }
      } else {
        dispatch(setUser(null))
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  if (initializing || profileLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <GlobalStyle />

      {isLoginPage ? (
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
      ) : (
        <>
          <Navbar user={user} />

          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="/browse" element={<SearchPage />} />
            <Route
              path="/songlist"
              element={
                <PrivateRoute>
                  <SongList user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <FavoritesPage user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path="/stats"
              element={
                <PrivateRoute>
                  <Stats user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage user={user} />
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
        </>
      )}
    </>
  )
}

export default App

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

interface PublicRouteProps {
  children: JSX.Element
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, initializing } = useSelector((state: RootState) => state.auth)

  if (initializing) {
    return <div>Loading...</div>
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return children
}

export default PublicRoute

export interface User {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string
  coverPhotoURL: string | null
  favorites?: {
    albums: string[]
    artists: string[]
    tracks: string[]
  }
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  initializing: boolean
}

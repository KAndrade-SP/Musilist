export interface FavoriteItem {
  id: string
  name: string
  image: string
}

export interface ListItem {
  id: string
  name: string
  image: string
  score: number | null
  review: string | null
  type: string
}

export interface User {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string
  coverPhotoURL: string | null
  favorites?: {
    albums: FavoriteItem[]
    artists: FavoriteItem[]
    tracks: FavoriteItem[]
  }
  lists?: {
    planning: ListItem[]
    completed: ListItem[]
    dropped: ListItem[]
  }
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  initializing: boolean
}

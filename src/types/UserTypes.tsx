export interface ActivityFeedItem {
  id: string
  itemId: string
  name: string
  artist: string
  image: string
  listType: 'completed' | 'planning' | 'dropped'
  type: 'album' | 'artist' | 'track'
  timestamp: number
}

export interface FavoriteItem {
  id: string
  name: string
  image: string
}

export interface ListItem {
  id: string
  name: string
  artistName: string
  image: string
  score: number | null
  review: string | null
  type: string
  release_date: string | null
  album_type?: string
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

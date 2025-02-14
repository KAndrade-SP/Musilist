export const mapFilterToType = (filter: string): 'Albums' | 'Artists' | 'Tracks' => {
  switch (filter.toLowerCase()) {
    case 'albums':
      return 'Albums'
    case 'artists':
      return 'Artists'
    case 'tracks':
      return 'Tracks'
    default:
      return 'Albums'
  }
}

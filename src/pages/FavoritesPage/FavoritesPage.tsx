import { Container } from '../../components/Container'
import { useMediaNavigation } from '../../hooks/useMediaNavigation'
import { User } from '../../types/UserTypes'
import { GridFavs, ImageFavs, ItemFav, SectionFavs, TitleFavs, Tooltip } from './FavoritesPage.styles'

const FavoritesPage = ({ user }: { user: User | null }) => {
  const { handleMediaDetails } = useMediaNavigation()

  return (
    <Container>
      <SectionFavs>
        <TitleFavs>Albums</TitleFavs>
        {(user?.favorites?.albums?.length ?? 0) > 0 ? (
          <GridFavs>
            {user?.favorites?.albums.map(album => (
              <ItemFav key={album.id} onClick={() => handleMediaDetails(album, 'albums')}>
                <ImageFavs src={album.image} alt={album.name} />
                <Tooltip>{album.name}</Tooltip>
              </ItemFav>
            ))}
          </GridFavs>
        ) : (
          <p>Empty Albums</p>
        )}
      </SectionFavs>
      <SectionFavs>
        <TitleFavs>Artists</TitleFavs>
        {(user?.favorites?.artists?.length ?? 0) > 0 ? (
          <GridFavs>
            {user?.favorites?.artists.map(artist => (
              <ItemFav key={artist.id} onClick={() => handleMediaDetails(artist, 'artists')}>
                <ImageFavs src={artist.image} alt={artist.name} />
                <Tooltip>{artist.name}</Tooltip>
              </ItemFav>
            ))}
          </GridFavs>
        ) : (
          <p>Empty Artists</p>
        )}
      </SectionFavs>
      <SectionFavs>
        <TitleFavs>Tracks</TitleFavs>
        {(user?.favorites?.tracks?.length ?? 0) > 0 ? (
          <GridFavs>
            {user?.favorites?.tracks.map(track => (
              <ItemFav key={track.id} onClick={() => handleMediaDetails(track, 'tracks')}>
                <ImageFavs src={track.image} alt={track.name} />
                <Tooltip>{track.name}</Tooltip>
              </ItemFav>
            ))}
          </GridFavs>
        ) : (
          <p>Empty Tracks</p>
        )}
      </SectionFavs>
    </Container>
  )
}

export default FavoritesPage

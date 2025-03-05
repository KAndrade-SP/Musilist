import { Container } from '../../components/Container'
import { User } from '../../types/UserTypes'
import { GridFavs, ImageFavs, ItemFav, SectionFavs, TitleFavs } from './FavoritesPage.styles'

const FavoritesPage = ({ user }: { user: User | null }) => {
  return (
    <Container>
      <SectionFavs>
        <TitleFavs>Albums</TitleFavs>
        {(user?.favorites?.albums?.length ?? 0) > 0 ? (
          <GridFavs>
            {user?.favorites?.albums.map(album => (
              <ItemFav key={album.id}>
                <ImageFavs src={album.image} alt={album.name} />
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
              <ItemFav key={artist.id}>
                <ImageFavs src={artist.image} alt={artist.name} />
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
              <ItemFav key={track.id}>
                <ImageFavs src={track.image} alt={track.name} />
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

import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { Container } from '../../components/Container'
import { useMediaNavigation } from '../../hooks/useMediaNavigation'
import { User } from '../../types/UserTypes'
import { GridFavs, ImageFavs, ItemFav, SectionFavs, TitleFavs, Tooltip } from './FavoritesPage.styles'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { updateUserProfile } from '../../redux/reducers/userSlice'
import { useAppDispatch } from '../../hooks/useAppDispatch'

const FavoritesPage = ({ user }: { user: User | null }) => {
  const { handleMediaDetails } = useMediaNavigation()

  const favorites = useSelector(
    (state: RootState) => state.auth.user?.favorites ?? { albums: [], artists: [], tracks: [] }
  )
  const dispatch = useAppDispatch()

  const [albums, setAlbums] = useState(favorites.albums)
  const [artists, setArtists] = useState(favorites.artists)
  const [tracks, setTracks] = useState(favorites.tracks)

  const handleDragEnd = (result: any, category: 'albums' | 'artists' | 'tracks', setState: any) => {
    if (!result.destination) return

    const items = Array.from(category === 'albums' ? albums : category === 'artists' ? artists : tracks)
    const [movedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, movedItem)

    const updatedFavorites: Partial<User> = {
      favorites: { ...favorites, [category]: items },
    }

    setState(items)
    dispatch(updateUserProfile(updatedFavorites))
  }

  useEffect(() => {
    setAlbums(favorites.albums)
    setArtists(favorites.artists)
    setTracks(favorites.tracks)
  }, [favorites])

  return (
    <Container>
      <SectionFavs>
        <TitleFavs>Albums</TitleFavs>
        {(albums.length ?? 0) > 0 ? (
          <DragDropContext onDragEnd={result => handleDragEnd(result, 'albums', setAlbums)}>
            <Droppable droppableId="albums-grid" direction="horizontal">
              {provided => (
                <GridFavs ref={provided.innerRef} {...provided.droppableProps}>
                  {albums.map((album, index) => (
                    <Draggable key={album.id} draggableId={album.id} index={index}>
                      {provided => (
                        <ItemFav
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => handleMediaDetails(album, 'albums')}
                        >
                          <ImageFavs src={album.image} alt={album.name} />
                          <Tooltip>{album.name}</Tooltip>
                        </ItemFav>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </GridFavs>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <p>Empty Albums</p>
        )}
      </SectionFavs>

      <SectionFavs>
        <TitleFavs>Artists</TitleFavs>
        {(artists.length ?? 0) > 0 ? (
          <DragDropContext onDragEnd={result => handleDragEnd(result, 'artists', setArtists)}>
            <Droppable droppableId="artists-grid" direction="horizontal">
              {provided => (
                <GridFavs ref={provided.innerRef} {...provided.droppableProps}>
                  {artists.map((artist, index) => (
                    <Draggable key={artist.id} draggableId={artist.id} index={index}>
                      {provided => (
                        <ItemFav
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => handleMediaDetails(artist, 'artists')}
                        >
                          <ImageFavs src={artist.image} alt={artist.name} />
                          <Tooltip>{artist.name}</Tooltip>
                        </ItemFav>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </GridFavs>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <p>Empty Artists</p>
        )}
      </SectionFavs>

      <SectionFavs>
        <TitleFavs>Tracks</TitleFavs>
        {(tracks.length ?? 0) > 0 ? (
          <DragDropContext onDragEnd={result => handleDragEnd(result, 'tracks', setTracks)}>
            <Droppable droppableId="tracks-grid" direction="horizontal">
              {provided => (
                <GridFavs ref={provided.innerRef} {...provided.droppableProps}>
                  {tracks.map((track, index) => (
                    <Draggable key={track.id} draggableId={track.id} index={index}>
                      {provided => (
                        <ItemFav
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => handleMediaDetails(track, 'tracks')}
                        >
                          <ImageFavs src={track.image} alt={track.name} />
                          <Tooltip>{track.name}</Tooltip>
                        </ItemFav>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </GridFavs>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <p>Empty Tracks</p>
        )}
      </SectionFavs>
    </Container>
  )
}

export default FavoritesPage

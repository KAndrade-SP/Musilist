import { IconAdjustmentsHorizontal, IconX } from '@tabler/icons-react'
import FilterInput from '../../components/FilterInput/FilterInput'
import { useToggleWithOutsideClick } from '../../hooks/useToggle'
import { filters } from '../../types/SearchFilters'
import {
  SearchDropdownIcon,
  SearchDropdown,
  SearchDropdownItem,
  SearchTag,
  SearchContainer,
  SearchSection,
  TracksBox,
  TracksHeader,
  TrackCell,
  TrackEntry,
  TrackImageCell,
  SearchContent,
  TrackTitleDivisor,
  TrackArtist,
  TrackDataDivisor,
  TrackIdCellMobile,
  TrackIdCell,
  GridContainer,
  AlbumCard,
  AlbumImage,
  AlbumInfo,
  ArtistCard,
  ArtistImage,
  ArtistInfo,
} from './SearchPage.styles'
import { useTheme } from 'styled-components'
import SearchItem from '../../components/SearchItem/SearchItem'
import { useNavigate } from 'react-router-dom'
import { formatDuration } from '../../helpers/FormatDuration'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setActiveFilter } from '../../redux/reducers/searchSlice'
import { useSpotifySearch } from '../../hooks/useSpotifySearch'
import { mapFilterToType } from '../../helpers/MapFilterToType'

const SearchPage = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { search } = useSpotifySearch()
  const { toggle, ref, handleClick } = useToggleWithOutsideClick()

  const results = useSelector((state: RootState) => state.search.results)
  const query = useSelector((state: RootState) => state.search.query)
  const activeFilter = useSelector((state: RootState) => state.search.activeFilter)

  const handleFilterClick = (filter: string) => {
    const mappedFilter = mapFilterToType(filter)
    dispatch(setActiveFilter(mappedFilter))

    if (query.trim()) {
      search(query, mappedFilter)
    }
  }

  const handleItemClick = (item: any, type: 'albums' | 'artists' | 'tracks') => {
    navigate(`/${type}/${item.id}`, { state: item })
  }

  return (
    <>
      <SearchContainer>
        <SearchSection>
          <FilterInput />
          {filters.map(filter => {
            return (
              <SearchTag
                key={filter}
                className={filter === activeFilter ? 'active' : ''}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </SearchTag>
            )
          })}

          <SearchDropdownIcon role="button" aria-label="toggle settings dropdown icons" onClick={handleClick}>
            {!toggle ? (
              <IconAdjustmentsHorizontal
                size={30}
                style={{
                  color: theme.colors.textWhite,
                  cursor: 'pointer',
                }}
              />
            ) : (
              <IconX
                size={30}
                style={{
                  color: theme.colors.textWhite,
                  cursor: 'pointer',
                }}
              />
            )}
          </SearchDropdownIcon>
        </SearchSection>

        {toggle && (
          <SearchDropdown ref={ref} role="menu" aria-label="settings dropdown" onClick={handleClick}>
            {filters.map(filter => (
              <SearchDropdownItem
                key={filter}
                className={filter === activeFilter ? 'active' : ''}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </SearchDropdownItem>
            ))}
          </SearchDropdown>
        )}

        <SearchContent>
          {results.length === 0 ? (
            <p>No results found. Try searching for something!</p>
          ) : activeFilter === 'Tracks' ? (
            <>
              <TracksBox>
                <TracksHeader>
                  <TrackCell>#</TrackCell>
                  <TrackCell>Title</TrackCell>
                  <TrackCell>Album</TrackCell>
                  <TrackCell>Duration</TrackCell>
                </TracksHeader>

                {results.map((music, index) => (
                  <TrackEntry key={music.id} onClick={() => handleItemClick(music, 'tracks')}>
                    <TrackIdCell>{index + 1}</TrackIdCell>

                    <TrackImageCell>
                      <TrackIdCellMobile>{index + 1}</TrackIdCellMobile>
                      <img src={music.image} alt={music.name || 'No name available'} />
                      <TrackTitleDivisor>
                        <strong>{music.name}</strong>
                        <TrackArtist>{music.artist}</TrackArtist>
                      </TrackTitleDivisor>
                    </TrackImageCell>

                    <TrackCell>{music.album}</TrackCell>
                    <TrackCell>{formatDuration(music.duration)}</TrackCell>

                    <TrackDataDivisor>
                      <SearchItem title={music.album} />
                      <span>{formatDuration(music.duration)}</span>
                    </TrackDataDivisor>
                  </TrackEntry>
                ))}
              </TracksBox>
            </>
          ) : activeFilter === 'Albums' ? (
            <GridContainer>
              {results.map(album => (
                <AlbumCard key={album.id} onClick={() => handleItemClick(album, 'albums')}>
                  <AlbumImage src={album.image} alt={album.name} />
                  <AlbumInfo>
                    <h3>{album.name}</h3>
                    <p>{album.artist}</p>
                  </AlbumInfo>
                </AlbumCard>
              ))}
            </GridContainer>
          ) : (
            <GridContainer>
              {results.map(artist => (
                <ArtistCard key={artist.id} onClick={() => handleItemClick(artist, 'artists')}>
                  <ArtistImage src={artist.image} alt={artist.name} />
                  <ArtistInfo>
                    <h3>{artist.name}</h3>
                  </ArtistInfo>
                </ArtistCard>
              ))}
            </GridContainer>
          )}
        </SearchContent>
      </SearchContainer>
    </>
  )
}

export default SearchPage

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
import { useState } from 'react'
import SearchItem from '../../components/SearchItem/SearchItem'

const SearchPage = () => {
  const theme = useTheme()
  const { toggle, ref, handleClick } = useToggleWithOutsideClick()
  const [activeFilter, setActiveFilter] = useState('Albums')
  const [results, setResults] = useState<any[]>([])

  const handleSearchComplete = (data: any) => {
    setResults(data)
    console.log(results)
  }

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
  }

  const mapFilterToType = (filter: string): 'albums' | 'artists' | 'tracks' => {
    switch (filter) {
      case 'Albums':
        return 'albums'
      case 'Artists':
        return 'artists'
      case 'Tracks':
        return 'tracks'
      default:
        return 'albums'
    }
  }

  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <>
      <SearchContainer>
        <SearchSection>
          <FilterInput searchType={mapFilterToType(activeFilter)} onSearchComplete={handleSearchComplete} />
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
                  <TrackEntry key={music.id}>
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
                <AlbumCard key={album.id}>
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
                <ArtistCard key={artist.id}>
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

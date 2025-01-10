import { IconAdjustmentsHorizontal, IconX } from '@tabler/icons-react'
import { Container } from '../../components/Container'
import FilterInput from '../../components/FilterInput/FilterInput'
import MusicImage from '../../assets/PlaceholderImages/Music.jpg'
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
  TrackScoreSpan,
  TrackDataDivisor,
  TrackIdCell,
} from './SearchPage.styles'
import { useTheme } from 'styled-components'
import { useState } from 'react'

const SearchPage = () => {
  const theme = useTheme()
  const { toggle, ref, handleClick } = useToggleWithOutsideClick()
  const [activeFilter, setActiveFilter] = useState('Albums')

  const musicData = [
    { id: 1, image: MusicImage, title: 'Symbol I: △', score: 10, progress: '1', type: 'Music', comments: true },
    { id: 2, image: MusicImage, title: 'Symbol II: 🜁', score: 10, progress: '1', type: 'Music', comments: true },
    { id: 3, image: MusicImage, title: 'Symbol III: ▽', score: 10, progress: '1', type: 'Music', comments: true },
    { id: 4, image: MusicImage, title: 'Elements', score: 10, progress: '12/12', type: 'Album', comments: true },
  ]

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
  }

  return (
    <>
      <SearchContainer>
        <SearchSection>
          <FilterInput />
          {filters.map(filter => {
            return <SearchTag key={filter}>{filter}</SearchTag>
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
          <TracksBox>
            <TracksHeader>
              <TrackCell>#</TrackCell>
              <TrackCell>Title</TrackCell>
              <TrackCell>Album</TrackCell>
              <TrackCell>Duration</TrackCell>
            </TracksHeader>

            {musicData.map((music, index) => (
              <TrackEntry key={index}>
                <TrackCell>{music.id}</TrackCell>

                <TrackImageCell>
                  <TrackIdCell>{music.id}</TrackIdCell>
                  <img src={music.image} alt="Song Cover" />
                  <TrackTitleDivisor>
                    <strong>{music.title}</strong>
                    <TrackScoreSpan>Artist</TrackScoreSpan>
                  </TrackTitleDivisor>
                </TrackImageCell>

                <TrackCell>Album</TrackCell>
                <TrackCell>00:00</TrackCell>

                <TrackDataDivisor>
                  <span>Album</span>
                  <span>00:00</span>
                </TrackDataDivisor>
              </TrackEntry>
            ))}
          </TracksBox>
        </SearchContent>
      </SearchContainer>
    </>
  )
}

export default SearchPage

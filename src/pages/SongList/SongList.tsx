import { useState } from 'react'
import { User } from '../../types/UserTypes'
import { Container } from '../../components/Container'
import Dropdown from '../../components/Dropdown/Dropdown'
import MusicImage from '../../assets/PlaceholderImages/Music.jpg'
import { IconAdjustmentsHorizontal, IconX } from '@tabler/icons-react'
import FilterInput from '../../components/FilterInput/FilterInput'
import { useTheme } from 'styled-components'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import {
  DropdownFilter,
  FilterList,
  FilterListItem,
  Filters,
  FiltersDivisor,
  FilterSearch,
  FiltersMenu,
  FilterTitle,
  ListBox,
  ListCell,
  ListDataDivisor,
  ListEntry,
  ListHeader,
  ListImageCell,
  ListScoreSpan,
  ListTitle,
  ListTitleDivisor,
  MessageIcon,
  SongListSection,
} from './SongList.styles'

const SongList = ({ user }: { user: User | null }) => {
  const theme = useTheme()
  const [toggle, setToggle] = useState(false)
  const isLargeScreen = useBreakpoint(parseInt(theme.breakpoints.xmd))

  const musicData = [
    { image: MusicImage, title: 'Symbol I: △', score: 10, progress: '1', type: 'Music', comments: true },
    { image: MusicImage, title: 'Symbol II: 🜁', score: 10, progress: '1', type: 'Music', comments: true },
    { image: MusicImage, title: 'Symbol III: ▽', score: 10, progress: '1', type: 'Music', comments: true },
    { image: MusicImage, title: 'Elements', score: 10, progress: '12/12', type: 'Album', comments: true },
  ]

  const [selectedFormat, setSelectedFormat] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedGenres, setSelectedGenres] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null)

  const handleSelect = (option: string, type: string) => {
    if (option !== type) {
      console.log(`Option selected for ${type}:`, option)

      if (type === 'Format') {
        setSelectedFormat(option)
      } else if (type === 'Status') {
        setSelectedStatus(option)
      } else if (type === 'Genres') {
        setSelectedGenres(option)
      } else if (type === 'Country') {
        setSelectedCountry(option)
      } else if (type === 'Title') {
        setSelectedTitle(option)
      }
    }
  }

  const handleClear = (type: string) => {
    console.log(`Clear filter for ${type}`)

    if (type === 'Format') {
      setSelectedFormat(null)
    } else if (type === 'Status') {
      setSelectedStatus(null)
    } else if (type === 'Genres') {
      setSelectedGenres(null)
    } else if (type === 'Country') {
      setSelectedCountry(null)
    } else if (type === 'Title') {
      setSelectedTitle(null)
    }
  }

  const handleClick = () => {
    setToggle(!toggle)
  }

  return (
    <>
      <Container>
        <SongListSection>
          <Filters>
            <FilterSearch>
              <FilterInput />

              <DropdownFilter role="button" aria-label="toggle filters" onClick={handleClick}>
                {!toggle ? (
                  <IconAdjustmentsHorizontal
                    size={32}
                    style={{
                      color: theme.colors.textWhite,
                      cursor: 'pointer',
                    }}
                  />
                ) : (
                  <IconX
                    size={32}
                    style={{
                      color: theme.colors.textWhite,
                      cursor: 'pointer',
                    }}
                  />
                )}
              </DropdownFilter>
            </FilterSearch>

            {(toggle || isLargeScreen) && (
              <FiltersMenu>
                <FilterList>
                  <FilterTitle>Lists</FilterTitle>
                  <FilterListItem>All</FilterListItem>
                  <FilterListItem>Completed</FilterListItem>
                  <FilterListItem>Dropped</FilterListItem>
                  <FilterListItem>Planning</FilterListItem>
                </FilterList>

                <FiltersDivisor>
                  <FilterTitle>Filters</FilterTitle>
                  <Dropdown
                    options={['Option 1', 'Option 2', 'Option 3']}
                    defaultLabel="Format"
                    selected={selectedFormat}
                    onSelect={option => handleSelect(option, 'Format')}
                    onClear={() => handleClear('Format')}
                  />
                  <Dropdown
                    options={['Option 1', 'Option 2', 'Option 3']}
                    defaultLabel="Status"
                    selected={selectedStatus}
                    onSelect={option => handleSelect(option, 'Status')}
                    onClear={() => handleClear('Status')}
                  />
                  <Dropdown
                    options={['Option 1', 'Option 2', 'Option 3']}
                    defaultLabel="Genres"
                    selected={selectedGenres}
                    onSelect={option => handleSelect(option, 'Genres')}
                    onClear={() => handleClear('Genres')}
                  />
                  <Dropdown
                    options={['Option 1', 'Option 2', 'Option 3']}
                    defaultLabel="Country"
                    selected={selectedCountry}
                    onSelect={option => handleSelect(option, 'Country')}
                    onClear={() => handleClear('Country')}
                  />
                </FiltersDivisor>

                <FiltersDivisor>
                  <FilterTitle>Sort</FilterTitle>
                  <Dropdown
                    options={['Option 1', 'Option 2', 'Option 3']}
                    defaultLabel="Title"
                    selected={selectedTitle}
                    onSelect={option => handleSelect(option, 'Title')}
                    onClear={() => handleClear('Title')}
                  />
                </FiltersDivisor>
              </FiltersMenu>
            )}
          </Filters>

          <Filters>
            <ListTitle>Completed</ListTitle>
            <ListBox>
              <ListHeader>
                <ListCell>Title</ListCell>
                <ListCell>Score</ListCell>
                <ListCell>Progress</ListCell>
                <ListCell>Type</ListCell>
              </ListHeader>

              {musicData.map((music, index) => (
                <ListEntry key={index}>
                  <ListImageCell>
                    <img src={music.image} alt="Song Cover" />
                    <ListTitleDivisor>
                      <strong>{music.title}</strong>
                      <ListScoreSpan>
                        <strong>Score: </strong>
                        {music.score}
                      </ListScoreSpan>
                    </ListTitleDivisor>

                    {music.comments && <MessageIcon size={20} />}
                  </ListImageCell>

                  <ListCell>{music.score}</ListCell>
                  <ListCell>{music.progress}</ListCell>
                  <ListCell>{music.type}</ListCell>

                  <ListDataDivisor>
                    <span>{music.progress}</span>
                    <span>{music.type}</span>
                  </ListDataDivisor>
                </ListEntry>
              ))}
            </ListBox>
          </Filters>
        </SongListSection>
      </Container>
    </>
  )
}

export default SongList

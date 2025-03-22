import { useState } from 'react'
import { User } from '../../types/UserTypes'
import { Container } from '../../components/Container'
import Dropdown from '../../components/Dropdown/Dropdown'
import { IconAdjustmentsHorizontal, IconX } from '@tabler/icons-react'
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
            {user?.lists && (
              <>
                {user.lists.completed.length > 0 && (
                  <>
                    <ListTitle>Completed</ListTitle>
                    <ListBox>
                      <ListHeader>
                        <ListCell>Title</ListCell>
                        <ListCell>Score</ListCell>
                        <ListCell>Type</ListCell>
                      </ListHeader>

                      {user.lists.completed.map((item, index) => (
                        <ListEntry key={index}>
                          <ListImageCell>
                            <img src={item.image} alt={item.name} />
                            <ListTitleDivisor>
                              <strong>{item.name}</strong>
                              <ListScoreSpan>
                                <strong>Score: </strong>
                                {item.score ? item.score : '- / 0'}
                              </ListScoreSpan>
                            </ListTitleDivisor>

                            {item.review && <MessageIcon size={20} />}
                          </ListImageCell>

                          <ListCell>{item.score ? item.score : '- / 0'}</ListCell>
                          <ListCell>{item.type}</ListCell>

                          <ListDataDivisor>
                            <span>{item.type}</span>
                          </ListDataDivisor>
                        </ListEntry>
                      ))}
                    </ListBox>
                  </>
                )}

                {user.lists.dropped.length > 0 && (
                  <>
                    <ListTitle>Dropped</ListTitle>
                    <ListBox>
                      <ListHeader>
                        <ListCell>Title</ListCell>
                        <ListCell>Score</ListCell>
                        <ListCell>Type</ListCell>
                      </ListHeader>

                      {user.lists.dropped.map((item, index) => (
                        <ListEntry key={index}>
                          <ListImageCell>
                            <img src={item.image} alt={item.name} />
                            <ListTitleDivisor>
                              <strong>{item.name}</strong>
                              <ListScoreSpan>
                                <strong>Score: </strong>
                                {item.score ? item.score : '- / 0'}
                              </ListScoreSpan>
                            </ListTitleDivisor>

                            {item.review && <MessageIcon size={20} />}
                          </ListImageCell>

                          <ListCell>{item.score ? item.score : '- / 0'}</ListCell>
                          <ListCell>{item.type}</ListCell>

                          <ListDataDivisor>
                            <span>{item.type}</span>
                          </ListDataDivisor>
                        </ListEntry>
                      ))}
                    </ListBox>
                  </>
                )}

                {user.lists.planning.length > 0 && (
                  <>
                    <ListTitle>Planning</ListTitle>
                    <ListBox>
                      <ListHeader>
                        <ListCell>Title</ListCell>
                        <ListCell>Score</ListCell>
                        <ListCell>Type</ListCell>
                      </ListHeader>

                      {user.lists.planning.map((item, index) => (
                        <ListEntry key={index}>
                          <ListImageCell>
                            <img src={item.image} alt={item.name} />
                            <ListTitleDivisor>
                              <strong>{item.name}</strong>
                              <ListScoreSpan>
                                <strong>Score: </strong>
                                {item.score ? item.score : '- / 0'}
                              </ListScoreSpan>
                            </ListTitleDivisor>

                            {item.review && <MessageIcon size={20} />}
                          </ListImageCell>

                          <ListCell>{item.score ? item.score : '- / 0'}</ListCell>
                          <ListCell>{item.type}</ListCell>

                          <ListDataDivisor>
                            <span>{item.type}</span>
                          </ListDataDivisor>
                        </ListEntry>
                      ))}
                    </ListBox>
                  </>
                )}
              </>
            )}
          </Filters>
        </SongListSection>
      </Container>
    </>
  )
}

export default SongList

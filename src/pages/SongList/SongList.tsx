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
  ListDivisor,
  ListEntry,
  ListHeader,
  ListImageCell,
  ListScoreSpan,
  ListSection,
  ListTitle,
  ListTitleDivisor,
  MessageIcon,
  SongListSection,
} from './SongList.styles'
import { useMediaNavigation } from '../../hooks/useMediaNavigation'
import FilterInput from '../../components/FilterInput/FilterInput'

const SongList = ({ user }: { user: User | null }) => {
  const theme = useTheme()
  const { handleMediaDetails } = useMediaNavigation()
  const [toggle, setToggle] = useState(false)
  const isLargeScreen = useBreakpoint(parseInt(theme.breakpoints.xmd))

  const [listFilter, setListFilter] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [yearFilter, setYearFilter] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState<string | null>(null)

  const allItems = Object.values(user?.lists ?? {}).flat()
  const typeOptions = ['Albums', 'Artists', 'Tracks']
  const yearOptions = [...new Set(allItems.map(item => item.release_date))].filter(Boolean).sort() as string[]
  const sortOptions = ['Title Z-A', 'Score 1-10', 'Score 10-1']

  const filteredItems = allItems
    .filter(item => typeFilter === null || item.type + 's' === typeFilter)
    .filter(item => yearFilter === null || item.release_date === yearFilter)
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === null) return a.name.localeCompare(b.name)
      if (sortOption === 'Title Z-A') return b.name.localeCompare(a.name)
      if (sortOption === 'Score 1-10') return (a.score ?? 0) - (b.score ?? 0)
      if (sortOption === 'Score 10-1') return (b.score ?? 0) - (a.score ?? 0)
      return 0
    })

  const handleListFilter = (filter: string) => {
    setListFilter(filter)
  }

  const handleClear = (type: string) => {
    if (type === 'Type') {
      setTypeFilter(null)
    } else if (type === 'Year') {
      setYearFilter(null)
    } else if (type === 'Sort') {
      setSortOption(null)
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
              <FilterInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </FilterSearch>

            {(toggle || isLargeScreen) && (
              <FiltersMenu>
                <FilterList>
                  <FilterTitle>Lists</FilterTitle>
                  {['All', 'Completed', 'Planning', 'Dropped'].map(filter => (
                    <FilterListItem
                      key={filter}
                      onClick={() => handleListFilter(filter)}
                      style={{
                        fontWeight: listFilter === filter ? 'bold' : 'normal',
                        backgroundColor: listFilter === filter ? theme.colors.darkPurpleOp : 'transparent',
                      }}
                    >
                      {filter}
                    </FilterListItem>
                  ))}
                </FilterList>

                <FiltersDivisor>
                  <FilterTitle>Filters</FilterTitle>
                  <Dropdown
                    options={typeOptions}
                    defaultLabel="Type"
                    selected={typeFilter}
                    onSelect={setTypeFilter}
                    onClear={() => handleClear('Type')}
                  />
                  <Dropdown
                    options={yearOptions}
                    defaultLabel="Year"
                    selected={yearFilter}
                    onSelect={setYearFilter}
                    onClear={() => handleClear('Year')}
                  />
                </FiltersDivisor>

                <FiltersDivisor>
                  <FilterTitle>Sort</FilterTitle>
                  <Dropdown
                    options={sortOptions}
                    defaultLabel="Sort"
                    selected={sortOption}
                    onSelect={setSortOption}
                    onClear={() => handleClear('Sort')}
                  />
                </FiltersDivisor>
              </FiltersMenu>
            )}
          </Filters>

          <ListSection>
            {user?.lists && (
              <>
                {(['completed', 'planning', 'dropped'] as const)
                  .filter(status => listFilter === 'All' || listFilter.toLowerCase() === status)
                  .map(status => {
                    const items = filteredItems.filter(item => user.lists?.[status]?.includes(item))

                    return items.length > 0 ? (
                      <ListDivisor key={status}>
                        <ListTitle>{status.charAt(0).toUpperCase() + status.slice(1)}</ListTitle>
                        <ListBox>
                          <ListHeader>
                            <ListCell>Title</ListCell>
                            <ListCell>Score</ListCell>
                            <ListCell>Type</ListCell>
                          </ListHeader>

                          {items.map((item, index) => (
                            <ListEntry
                              key={index}
                              onClick={() =>
                                handleMediaDetails(
                                  item.id,
                                  (item.type.toLowerCase() + 's') as 'albums' | 'artists' | 'tracks'
                                )
                              }
                            >
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
                              <ListCell>{item.type === 'Album' ? item.album_type : item.type}</ListCell>

                              <ListDataDivisor>
                                <span>{item.type === 'Album' ? item.album_type : item.type}</span>
                              </ListDataDivisor>
                            </ListEntry>
                          ))}
                        </ListBox>
                      </ListDivisor>
                    ) : null
                  })}
              </>
            )}
          </ListSection>
        </SongListSection>
      </Container>
    </>
  )
}

export default SongList

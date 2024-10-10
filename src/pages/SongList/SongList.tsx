import { useEffect, useState } from 'react'
import { User } from '../../types/UserTypes'
import { styled } from 'styled-components'
import Banner from '../../components/Banner'
import { Container } from '../../components/Container'
import Dropdown from '../../components/Dropdown'
import MusicImage from '../../assets/PlaceholderImages/Music.jpg'
import { IconAdjustmentsHorizontal, IconMessageCircleFilled, IconX } from '@tabler/icons-react'
import FilterInput from '../../components/FilterInput'
import { useTheme } from 'styled-components'
import { useBreakpoint } from '../../hooks/useBreakpoint'

const SongListSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 5fr;
  margin-bottom: 2rem;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.xmd}) {
    display: flex;
    flex-direction: column;
    margin-top: 0;
  }
`

const ListTitle = styled.h2`
  ${({ theme: { colors, fontSizes } }) => `
    color: ${colors.lightPurple};
    font-size: ${fontSizes.bigFontSize};
    font-weight: 400;
  `}
`

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FiltersMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const DropdownFilter = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.xmd}) {
    display: flex;
  }
`

const FiltersDivisor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FilterTitle = styled.h3`
  ${({ theme: { colors, fontSizes } }) => `
    color: ${colors.lightPurple};
    font-size: ${fontSizes.normalFontSize};
    font-weight: 400;
  `}
`

const FilterSearch = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
`

const FilterList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
`

const FilterListItem = styled.li`
  ${({ theme: { fontSizes, colors } }) => `
    font-size: ${fontSizes.normalFontSize};
    color: ${colors.textWhite};
    cursor: pointer;
  `}
`

const ListBox = styled.div`
  ${({ theme: { colors, breakpoints, fontSizes } }) => `
    display: grid;
    grid-template-columns: 1fr 100px 100px 80px;
    border-radius: 8px;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    background-color: ${colors.darkPurple};
    font-size: ${fontSizes.normalFontSize};

    @media (max-width: ${breakpoints.md}) {
      font-size: ${fontSizes.smallFontSize};
    }

    @media (max-width: ${breakpoints.sm}) {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
    }
  `}
`

const ListHeader = styled.div`
  ${({ theme: { colors, breakpoints } }) => `
    display: contents;
    color: ${colors.textWhite};
    font-weight: bold;

    @media (max-width: ${breakpoints.sm}) {
      display: none;
    }
  `}
`

const ListEntry = styled.div`
  ${({ theme: { colors, breakpoints } }) => `
    display: contents;
    color: ${colors.textWhite};
    padding: 0.5rem 0;
    

    &:last-child {
      border-bottom: none;
    }

    @media (max-width: ${breakpoints.sm}) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-radius: 5px;
      padding: 1rem 0;
    }
  `}
`

const ListImageCell = styled.div`
  ${({ theme: { breakpoints } }) => `
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
    }

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @media (max-width: ${breakpoints.sm}) {
      img {
        width: 40px;
        height: 40px;
      }

      span {
        width: 150px;
      }
    }

    @media (max-width: ${breakpoints.mini}) {
      img {
        width: 30px;
        height: 30px;
      }

      span {
        width: 100px;
      }
    }
  `}
`

const ListTitleDivisor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ListScoreSpan = styled.span`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: block;
  }
`

const ListDataDivisor = styled.div`
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
  }
`

const MessageIcon = styled(IconMessageCircleFilled)`
  ${({ theme: { colors, breakpoints } }) => `
    color: ${colors.textWhite};
    margin-left: auto;

    @media (max-width: ${breakpoints.sm}) {
      display: none;
    }

    @media (max-width: ${breakpoints.md}) {
      width: 16px;
      height: 16px;
    }
  `}
`

const ListCell = styled.span`
  ${({ theme: { breakpoints } }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media (max-width: ${breakpoints.sm}) {
      display: none;
    }
  `}
`

const SongList = ({ user }: { user: User | null }) => {

  const theme = useTheme()
  const [toggle, setToggle] = useState(false)
  const isLargeScreen = useBreakpoint(parseInt(theme.breakpoints.xmd))

  const musicData = [
    { image: MusicImage, title: "Symbol I: △", score: 10, progress: '1', type: "Music", comments: true },
    { image: MusicImage, title: "Symbol II: 🜁", score: 10, progress: '1', type: "Music", comments: true },
    { image: MusicImage, title: "Symbol III: ▽", score: 10, progress: '1', type: "Music", comments: true },
    { image: MusicImage, title: "Elements", score: 10, progress: '12/12', type: "Album", comments: true },
  ]

  const [selectedFormat, setSelectedFormat] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedGenres, setSelectedGenres] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null)

  const handleSelect = (option: string, type: string) => {
    if (option !== type) {

      console.log(`Option selected for ${type}:`, option)

      if (type === "Format") {
        setSelectedFormat(option)
      } else if (type === "Status") {
        setSelectedStatus(option)
      } else if (type === "Genres") {
        setSelectedGenres(option)
      } else if (type === "Country") {
        setSelectedCountry(option)
      } else if (type === "Title") {
        setSelectedTitle(option)
      }
    }
  }

  const handleClear = (type: string) => {

    console.log(`Clear filter for ${type}`)

    if (type === "Format") {
      setSelectedFormat(null)
    } else if (type === "Status") {
      setSelectedStatus(null)
    } else if (type === "Genres") {
      setSelectedGenres(null)
    } else if (type === "Country") {
      setSelectedCountry(null)
    } else if (type === "Title") {
      setSelectedTitle(null)
    }
  }

  const handleClick = () => {
    setToggle(!toggle)
  }

  return (
    <>
      <Banner user={user} />
      <Container>
        <SongListSection>

          <Filters>

            <FilterSearch>
              <FilterInput />

              <DropdownFilter role="button" aria-label="toggle filters" onClick={handleClick}>
                {!toggle
                  ?
                  <IconAdjustmentsHorizontal
                    size={32}
                    style={{
                      color: theme.colors.textWhite,
                      cursor: 'pointer'
                    }}
                  />
                  :
                  <IconX
                    size={32}
                    style={{
                      color: theme.colors.textWhite,
                      cursor: 'pointer'
                    }}
                  />
                }
              </DropdownFilter>
            </FilterSearch>

            {(toggle || isLargeScreen) &&
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
                    onSelect={(option) => handleSelect(option, "Format")}
                    onClear={() => handleClear("Format")}
                  />
                  <Dropdown
                    options={['Option 1', 'Option 2', 'Option 3']}
                    defaultLabel="Status"
                    selected={selectedStatus}
                    onSelect={(option) => handleSelect(option, "Status")}
                    onClear={() => handleClear("Status")}
                  />
                  <Dropdown
                    options={['Option 1', 'Option 2', 'Option 3']}
                    defaultLabel="Genres"
                    selected={selectedGenres}
                    onSelect={(option) => handleSelect(option, "Genres")}
                    onClear={() => handleClear("Genres")}
                  />
                  <Dropdown
                    options={['Option 1', 'Option 2', 'Option 3']}
                    defaultLabel="Country"
                    selected={selectedCountry}
                    onSelect={(option) => handleSelect(option, "Country")}
                    onClear={() => handleClear("Country")}
                  />
                </FiltersDivisor>

                <FiltersDivisor>
                  <FilterTitle>Sort</FilterTitle>
                  <Dropdown
                    options={['Option 1', 'Option 2', 'Option 3']}
                    defaultLabel="Title"
                    selected={selectedTitle}
                    onSelect={(option) => handleSelect(option, "Title")}
                    onClear={() => handleClear("Title")}
                  />
                </FiltersDivisor>
              </FiltersMenu>
            }

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
                      <ListScoreSpan><strong>Score: </strong>{music.score}</ListScoreSpan>
                    </ListTitleDivisor>

                    {music.comments &&
                      <MessageIcon size={20} />
                    }
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
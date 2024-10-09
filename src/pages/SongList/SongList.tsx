import { User } from '../../types/UserTypes'
import { styled } from 'styled-components'
import Banner from '../../components/Banner'
import { Container } from '../../components/Container'
import Dropdown from '../../components/Dropdown'

const SongListSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 5fr;
  margin-bottom: 2rem;
  margin-top: 2rem;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.xmd}) {
    display: flex;
    flex-direction: column;
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
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
    color: ${colors.textWhite};
    font-size: ${fontSizes.normalFontSize};
    border-radius: 5px;
    background-color: ${colors.darkPurple};
    padding: 0.3rem 1rem;
    font-weight: 400;

    @media (max-width: ${breakpoints.lg}) {
      font-size: ${fontSizes.smallFontSize};
    }
  `}
`

const FilterList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
`

export const FilterListItem = styled.li`
  ${({ theme: { fontSizes, colors } }) => `
    font-size: ${fontSizes.normalFontSize};
    color: ${colors.textWhite};
    cursor: pointer;
  `}
`

const SongList = ({ user }: { user: User | null }) => {

  const handleSelect = (option: string) => {
    if (option === 'Select') {
      console.log('Clean filter')
    } else {
      console.log('Option:', option)
    }
  }

  return (
    <>
      <Banner user={user} />
      <Container>
        <SongListSection>

          <Filters>
            <FilterSearch>Search</FilterSearch>

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
                onSelect={handleSelect}
              />
              <Dropdown
                options={['Option 1', 'Option 2', 'Option 3']}
                defaultLabel="Status"
                onSelect={handleSelect}
              />
              <Dropdown
                options={['Option 1', 'Option 2', 'Option 3']}
                defaultLabel="Genres"
                onSelect={handleSelect}
              />
              <Dropdown
                options={['Option 1', 'Option 2', 'Option 3']}
                defaultLabel="Country"
                onSelect={handleSelect}
              />
            </FiltersDivisor>

            <FiltersDivisor>
              <FilterTitle>Sort</FilterTitle>
              <Dropdown
                options={['Option 1', 'Option 2', 'Option 3']}
                defaultLabel="Title"
                onSelect={handleSelect}
              />
            </FiltersDivisor>
            
          </Filters>

          <Filters>
            <ListTitle>Completed</ListTitle>
            <FilterSearch>Teste</FilterSearch>
          </Filters>

        </SongListSection>
      </Container>
    </>
  )
}

export default SongList
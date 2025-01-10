import { IconAdjustmentsHorizontal, IconX } from '@tabler/icons-react'
import { Container } from '../../components/Container'
import FilterInput from '../../components/FilterInput/FilterInput'
import { useToggleWithOutsideClick } from '../../hooks/useToggle'
import { filters } from '../../types/SearchFilters'
import {
  FilterDropdownIcon,
  FiltersDropdown,
  FiltersDropdownItem,
  FilterTag,
  SearchContainer,
  SearchSection,
} from './SearchPage.styles'
import { useTheme } from 'styled-components'
import { useState } from 'react'

const SearchPage = () => {
  const theme = useTheme()
  const { toggle, ref, handleClick } = useToggleWithOutsideClick()
  const [activeFilter, setActiveFilter] = useState('Albums')

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
  }

  return (
    <>
      <SearchContainer>
        <SearchSection>
          <FilterInput />
          {filters.map(filter => {
            return <FilterTag key={filter}>{filter}</FilterTag>
          })}

          <FilterDropdownIcon role="button" aria-label="toggle settings dropdown icons" onClick={handleClick}>
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
          </FilterDropdownIcon>
        </SearchSection>

        {toggle && (
          <FiltersDropdown ref={ref} role="menu" aria-label="settings dropdown" onClick={handleClick}>
            {filters.map(filter => (
              <FiltersDropdownItem
                key={filter}
                className={filter === activeFilter ? 'active' : ''}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </FiltersDropdownItem>
            ))}
          </FiltersDropdown>
        )}
      </SearchContainer>
    </>
  )
}

export default SearchPage
